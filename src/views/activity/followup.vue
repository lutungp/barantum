<template>
  <div class="app-container">
    <el-button size="small"
      type="primary"
      @click="handleCreate"
    >
      New Activity
    </el-button>
    <el-table
      v-loading="loading"
      :data="dataList"
      style="width: 100%;margin-top:30px;"
      border
    >
      <el-table-column
        align="center"
        label="Activity Number"
        width="300"
      >
        <template slot-scope="{row}">
          {{ row.activity_no }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="Date"
        width="300"
      >
        <template slot-scope="{row}">
          {{ row.activity_tgl }}
        </template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="Activity Description"
      >
        <template slot-scope="{row}">
          {{ row.activity_deskripsi }}
        </template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="User Name"
      >
        <template slot-scope="{row}">
          {{ row.name }}
        </template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="Stats"
      >
        <template slot-scope="{row}">
          {{ row.activity_status }}
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
        :title="dialogType==='Edit'?'Edit Activity':'New Activity'"
      >
        <el-form
          :model="form"
          label-width="150px"
          label-position="left"
          :rules="rules"
          ref="submitForm"
        >
          <el-form-item label="Activity Number">
            <el-input
              v-model="form.activity_no" readonly=""
            />
          </el-form-item>
          <el-form-item
            label="Date"
            prop="activity_tgl"
            :error="getErrorForField('activity_tgl', errors)"
            required>
            <el-date-picker
              v-model="form.activity_tgl"
              type="datetime"
              format="dd-MM-yyyy HH:mm:ss"
              value-format="dd-MM-yyyy HH:mm:ss"
              placeholder="Select date and time">
            </el-date-picker>
          </el-form-item>

          <el-form-item
            label="Customer"
            prop="m_user_id"
            :error="getErrorForField('m_user_id', errors)"
            required>
            <el-select
              filterable
              remote
              v-model="form.name"
              placeholder="Please enter a keyword"
              :remote-method="remoteMethod"
              :loading="loadingUsers"
              @change="selectUser">
              <el-option
                v-for="item in optionsUser"
                :key="item.user_id"
                :label="item.name"
                :value="item.user_id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="Description"
            prop="activity_deskripsi"
            :error="getErrorForField('activity_deskripsi', errors)"
            required>
            <el-input
              v-model="form.activity_deskripsi"
              placeholder="Description"
            />
          </el-form-item>

        </el-form>
        <div style="text-align:right;">
          <el-button
            type="danger"
            @click="dialogVisible=false"
          >
            Tutup
          </el-button>
          <el-button
            type="primary"
            @click="confirmActivity"
          >
            Simpan
          </el-button>
        </div>
      </el-dialog>
  </div>
</template>
<script>
import { getActivities, updateActivity, createActivity, deleteUser, deleteActivity } from '@/api/activity'
import { getUsers } from '@/api/user'
export default {
    data() {
      return {
        loading : false,
        dataList : [],
        dataListTotal : 0,
        form : {
          activity_id : 0,
          activity_no : "",
          activity_deskripsi : "",
          activity_tgl : new Date(),
          m_user_id : null,
          name : ''
        },
        dialogVisible : false,
        dialogType : 'New',
        rules : {
          activity_tgl : [
            {required: true, message: 'Date cannot be empty', trigger: 'blur'},
          ],
          activity_deskripsi : [
            {required: true, message: 'Description cannot be empty', trigger: 'blur'},
            {min: 10, max: 100, message: 'Description of at least 10 characters', trigger: 'blur'}
          ],
          m_user_id : [
            {required: true, message: 'Customer cannot be empty', trigger: 'blur'},
          ]
        },
        errors : [],
        loadingUsers : false,
        optionsUser : []
      }
    },

    created() {
      this.getActivity()
    },

    methods : {
      getActivity() {
        this.loading = true
        getActivities().then(response => {
          this.dataList = response.activity;
          this.dataListTotal = response.total
          this.loading = false
        })
      },

      getUser(filter){
        this.loadingUsers = true
        getUsers({ filter : filter, role : 'CUSTOMER' }).then(response => {
          this.optionsUser = response.users;
          this.loadingUsers = false
        })
      },

      reset(){
        this.form = {
          activity_id : 0,
          activity_no : "",
          activity_deskripsi : "",
          activity_tgl : new Date(),
          m_user_id : null,
          name : ''
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
        // this.getUser({ filter : scope.row.name })
        this.form = {
          activity_id : scope.row.activity_id,
          activity_no : scope.row.activity_no,
          activity_deskripsi : scope.row.activity_deskripsi,
          activity_tgl : scope.row.activity_tgl,
          m_user_id : scope.row.m_user_id,
          name : scope.row.name
        }
      },

      handleDelete(scope){
        let me = this;
        const { $index, row } = scope
        me.$confirm('Confirm to remove the user?', 'Warning', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
        .then(async() => {
          deleteActivity(row.activity_id).then(response => {
            me.$message({
              type: 'success',
              message: 'Deleted!'
            })

            me.getActivity()
          })
        })
        .catch(err => { console.error(err) })
      },

      confirmActivity(){
        let me = this
        const isEdit = me.dialogType === 'Edit'
        if (!me.validateForm()) {
          return false;
        }
        if (isEdit) {
            updateActivity(me.form.activity_id, me.form).then(response => {
              me.dialogVisible = false
              me.getActivity();
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
            createActivity(me.form).then(response => {
              me.dialogVisible = false
              me.getActivity();
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
        const { activity_no, activity_tgl } = this.form
        this.dialogVisible = false
        this.$notify({
          title: 'Success',
          dangerouslyUseHTMLString: true,
          message: `
              <div>Number: ${activity_no}</div>
              <div>Date: ${activity_tgl}</div>
            `,
          type: 'success'
        })

        this.reset()
      },

      remoteMethod(query){
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.getUser(query)
          }, 500);
        } else {
          this.optionsUser = [];
        }
      },

      selectUser(value){
        this.form.m_user_id=value
      },

      getErrorForField(field, error) {
        var errfield = error.filter(p=>p.field === field)

        if (errfield.length > 0) {
          return errfield[0].message
        }
      },
    }
}
</script>
