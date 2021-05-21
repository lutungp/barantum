<template>
  <div class="app-container">
    <el-button size="small"
      type="primary"
      @click="handleCreate"
    >
      New User
    </el-button>
    <el-table
      v-loading="loading"
      :data="dataList"
      style="width: 100%;margin-top:30px;"
      border
    >
      <el-table-column
        align="center"
        label="Kode User"
        width="300"
      >
        <template slot-scope="{row}">
          {{ row.user_kode }}
        </template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="Nama User"
      >
        <template slot-scope="{row}">
          {{ row.name }}
        </template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="Role"
      >
        <template slot-scope="{row}">
          {{ row.role_nama }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="Operations"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="handleEdit(scope)"
          >
            Edit
          </el-button>
          <el-button
            type="danger"
            size="small"
            @click="handleDelete(scope)"
          >
            Delete
          </el-button>
          <el-button
            type="success"
            size="small"
            @click="pingUser1(scope)"
            icon="el-icon-bell" circle
          >
          </el-button>
          <!-- <el-button
            type="warning"
            size="small"
            @click="pingUser2(scope)"
            icon="el-icon-bell" circle
          >
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="block bottom-static">
      <el-pagination
        layout="prev, pager, next"
        :total="dataListTotal">
      </el-pagination>
    </div>
      <el-dialog
        :visible.sync="dialogVisible"
        width="30%"
        :title="dialogType==='Edit'?'Edit User':'New User'"
      >
        <el-form
          :model="form"
          label-width="100px"
          label-position="left"
          :rules="rules"
          ref="submitForm"
        >
          <el-form-item label="Kode">
            <el-input
              v-model="form.user_kode"
              placeholder="Kode User"
            />
          </el-form-item>
          <el-form-item
            label="Nama"
            prop="name"
            :error="getErrorForField('name', errors)"
            required>
            <el-input
              v-model="form.name"
              placeholder="Nama User"
            />
          </el-form-item>
          <el-form-item
            label="User Role"
            prop="s_role_id"
            :error="getErrorForField('s_role_id', errors)"
            required>
            <el-select v-model="form.s_role_id"
              clearable
              placeholder="Select"
              @change="selectRole">
              <el-option
                v-for="item in optionRoles"
                :key="item.role_id"
                :label="item.role_nama"
                :value="item.role_id"
                width="100%">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="Password"
            prop="password"
            :error="getErrorForField('password', errors)"
            required>
            <el-input
              v-model="form.password"
              type="password"
              placeholder="Password"
            />
          </el-form-item>
        </el-form>
        <div style="text-align:right;">
          <el-button
            type="danger"
            @click="dialogVisible=false"
          >
            Cancel
          </el-button>
          <el-button
            type="primary"
            @click="confirmUser"
          >
            Save
          </el-button>
        </div>
      </el-dialog>
  </div>
</template>
<script>
import { getUsers, updateUser, createUser, deleteUser } from '@/api/user'
import { getRoles } from '@/api/roles'
import socket from "./../../socket";
export default {
    data() {
      return {
        loading : false,
        dataList : [],
        dataListTotal : 0,
        form : {
          user_id : 0,
          user_kode : "",
          name : "",
          s_role_id : null,
          role_nama : "",
          password : ""
        },
        dialogVisible : false,
        dialogType : 'New',
        rules : {
          name : [
            {required: true, message: 'Name cannot be empty', trigger: 'blur'},
            {min: 3, max: 100, message: 'The name should be at least 3 characters and a maximum of 100 characters', trigger: 'blur'}
          ],
          s_role_id : [
            {required: true, message: 'Role cannot be empty', trigger: 'blur'}
          ],
          password : [
            {required: true, message: 'Password cannot be empty', trigger: 'blur'},
            {min: 3, max: 100, message: 'Password of at least 3 characters', trigger: 'blur'}
          ],
        },
        errors : [],
        optionRoles : []
      }
    },

    created() {
      this.getUsers()
      this.getRoles()
    },

    methods : {
      getUsers() {
        this.loading = true
        getUsers({ filter : '', role : '' }).then(response => {
          this.dataList = response.users;
          this.dataListTotal = response.total
          this.loading = false
        })
      },

      getRoles() {
        getRoles().then(response => {
          this.optionRoles = response.items
        })
      },

      reset(){
        this.form = {
          user_id : 0,
          user_kode : "",
          name : "",
          s_role_id : null,
          role_nama : "",
          password : ""
        }
      },

      handleCreate() {
        this.dialogType = 'New'
        this.dialogVisible = true
        this.reset();
      },

      validateForm(){
        var validform = false
        let el = this.$refs["submitForm"]
        el.validate(valid => {
          validform = valid
        })

        return validform
      },

      handleEdit(scope){
        this.dialogType = 'Edit'
        this.dialogVisible = true
        this.reset();
        this.form = {
          user_id : scope.row.user_id,
          user_kode : scope.row.user_kode,
          name : scope.row.name,
          s_role_id : scope.row.s_role_id,
          role_nama : scope.row.role_nama,
          password : scope.row.password,
        }
      },

      handleDelete(scope){
        const { $index, row } = scope
        this.$confirm('Confirm to remove the user?', 'Warning', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
        .then(async() => {
          deleteUser(row.user_id).then(response => {
            console.log(response)
          })
          this.$message({
            type: 'success',
            message: 'Deleted!'
          })
          this.getUsers()
        })
        .catch(err => { console.error(err) })
      },

      pingUser(scope){

      },

      confirmUser(){
        let me = this
        const isEdit = me.dialogType === 'Edit'
        if (!me.validateForm()) {
          return false;
        }
        if (isEdit) {
            updateUser(me.form.user_id, me.form).then(response => {
              me.dialogVisible = false
              me.getUsers();
              me.successResponse()
            })
            .catch(function (error) {
              var errmsg = Object.entries(error.response.data.message);
              var datamsg = []
              errmsg.forEach(function (params) {
                var msg = Object.values(params[1])
                if (msg.length > 0) {
                    datamsg.push({
                      field : params[0],
                      message : msg[0]
                    })
                }
              })

              me.errors = datamsg
            })
        } else {
            createUser(me.form).then(response => {
              me.dialogVisible = false
              me.getUsers();
              me.successResponse()
            })
            .catch(function (error) {
              var errmsg = Object.entries(error.response.data.message);
              var datamsg = []
              errmsg.forEach(function (params) {
                var msg = Object.values(params[1])
                if (msg.length > 0) {
                    datamsg.push({
                      field : params[0],
                      message : msg[0]
                    })
                }
              })
              me.errors = datamsg
            })
        }
      },

      successResponse(){
        const { role_nama, name } = this.form
        this.dialogVisible = false
        this.$notify({
          title: 'Success',
          dangerouslyUseHTMLString: true,
          message: `
              <div>Name: ${name}</div>
              <div>Role: ${role_nama}</div>
            `,
          type: 'success'
        })

        this.reset()
      },

      getErrorForField(field, error) {
        var errfield = error.filter(p=>p.field === field)

        if (errfield.length > 0) {
          return errfield[0].message
        }
      },

      selectRole(value){
        var selectRole = this.optionRoles.filter(p=>p.role_id==value);
        if (selectRole.length > 0) {
          this.form.role_nama = selectRole[0].role_nama
        }
      },

      pingUser1(scope){
        socket.emit("pingUser1", { "to": scope.row.socktoken })
      },

      pingUser2(){

      }

    }
}
</script>
