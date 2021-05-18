<template>
  <div class="app-container">
    <el-button
      size="small"
      type="primary"
      @click="handleCreate"
    >
      New Customer
    </el-button>
    <el-table
      v-loading="loading"
      :data="dataList"
      style="width: 100%;margin-top:30px;"
      border
    >
      <el-table-column
        align="header-center"
        label="First Name"
      >
        <template slot-scope="{row}">
          {{ row.customer_firstname }}
        </template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="Last Name"
      >
        <template slot-scope="{row}">
          {{ row.customer_lastname }}
        </template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="Address"
      >
        <template slot-scope="{row}">
          {{ row.customer_address }}
        </template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="Mobile Phone"
      >
        <template slot-scope="{row}">
          {{ row.customer_phone1 }}
        </template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="Work Phone"
      >
        <template slot-scope="{row}">
          {{ row.customer_phone2 }}
        </template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="Job Title"
      >
        <template slot-scope="{row}">
          {{ row.customer_job }}
        </template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="Description"
      >
        <template slot-scope="{row}">
          {{ row.customer_desc }}
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
      <el-pagination layout="prev, pager, next" :total="dataListTotal"></el-pagination>
    </div>
    <el-drawer
      title="Form Customer"
      :visible.sync="customerDrawer"
      :with-header="false"
      size="50%">
        <div class="demo-drawer__content">
          <el-container>
            <el-header></el-header>
            <el-main>
              <el-form
                :model="form"
                label-width="150px"
                label-position="left"
                :rules="rules"
                ref="submitForm"
              >
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item
                      label="Solutations"
                      prop="customer_solutation"
                      :error="getErrorForField('customer_solutation', errors)"
                      required>
                      <el-select v-model="form.customer_solutation" placeholder="Select">
                        <el-option
                          v-for="item in optionsSolutation"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item
                      label="Last Name"
                      prop="customer_lastname"
                      :error="getErrorForField('customer_lastname', errors)"
                      required>
                      <el-input
                        v-model="form.customer_lastname"
                        placeholder="Customer Name"
                      />
                    </el-form-item>
                    <el-form-item
                      label="Customer Email"
                      prop="customer_email"
                      :error="getErrorForField('customer_email', errors)"
                      required>
                      <el-input
                        v-model="form.customer_email"
                        placeholder="Customer Name"
                      />
                    </el-form-item>
                    <el-form-item
                      label="Mobile Phone"
                      prop="customer_phone1"
                      :error="getErrorForField('customer_phone1', errors)"
                      required>
                      <el-input
                        v-model="form.customer_phone1"
                        placeholder="Customer Name"
                      />
                    </el-form-item>
                    <el-form-item
                      label="Job Title"
                      prop="customer_job"
                      :error="getErrorForField('customer_job', errors)"
                      required>
                      <el-input
                        v-model="form.customer_job"
                        placeholder="Job Title"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="First Name"
                      prop="customer_firstname"
                      :error="getErrorForField('customer_firstname', errors)"
                      required>
                      <el-input
                        v-model="form.customer_firstname"
                        placeholder="Customer Name"
                      />
                    </el-form-item>
                    <el-form-item
                      label="Address"
                      prop="customer_address"
                      :error="getErrorForField('customer_address', errors)"
                      required>
                      <el-input
                        v-model="form.customer_address"
                        placeholder="Customer Address"
                      />
                    </el-form-item>
                    <el-form-item
                      label="Work Phone"
                      prop="customer_phone2"
                      :error="getErrorForField('customer_phone2', errors)"
                      required>
                      <el-input
                        v-model="form.customer_phone2"
                        placeholder="Customer Name"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-main>
            <el-footer>
              <div style="text-align:right;">
                <el-button
                  type="danger"
                  size="small"
                  @click="customerDrawer=false, reset()"
                >
                  Cancel
                </el-button>
                <el-button
                  type="primary"
                  size="small"
                  @click="confirmCustomer"
                >
                  Save
                </el-button>
              </div>
            </el-footer>
          </el-container>
        </div>
    </el-drawer>
  </div>
</template>
<script>
import { getCustomers, updateCustomer, createCustomer, deleteCustomer } from '@/api/customer'
import { getRoles } from '@/api/roles'
export default {
    data() {
      return {
        loading : false,
        dataList : [],
        dataListTotal : 0,
        form : {
          customer_id : 0,
          customer_key : "",
          customer_solutation : "",
          customer_lastname : "",
          customer_email : "",
          customer_firstname : "",
          customer_address : ""
        },
        dialogType : 'New',
        rules : {
          customer_firstname : [
            {required: true, message: 'First Name cannot be empty', trigger: 'blur'},
            {min: 3, max: 100, message: 'The First Name should be at least 3 characters and a maximum of 100 characters', trigger: 'blur'}
          ],
          customer_lastname : [
            {required: true, message: 'Last Name cannot be empty', trigger: 'blur'},
            {min: 3, max: 100, message: 'The Last Name should be at least 3 characters and a maximum of 100 characters', trigger: 'blur'}
          ]
        },
        errors : [],
        customerDrawer : false,
        optionsSolutation : [
          {
            value: 'Dr.',
            label: 'Dr.'
          }, {
            value: 'Mr.',
            label: 'Mr.'
          }, {
            value: 'Mrs.',
            label: 'Mrs.'
          }, {
            value: 'Ms.',
            label: 'Ms.'
          }, {
            value: 'Prof.',
            label: 'Prof.'
          }
        ]
      }
    },

    created() {
      this.getCustomers()
    },

    methods : {
      getCustomers() {
        this.loading = true
        getCustomers({ filter : '' }).then(response => {
          this.dataList = response.data;
          this.dataListTotal = response.total
          this.loading = false
        })
      },

      reset(){
        this.form = {
          customer_id : 0,
          customer_key : "",
          customer_solutation : "",
          customer_lastname : "",
          customer_email : "",
          customer_firstname : "",
          customer_address : ""
        }
      },

      handleCreate() {
        this.dialogType = 'New'
        this.customerDrawer = true
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
        this.customerDrawer = true
        this.reset();

        this.$router.push({ path: '/master/customer/edit/' + scope.row.customer_key });
      },

      handleDelete(scope){
        const { $index, row } = scope
        this.$confirm('Confirm to remove the customer?', 'Warning', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
        .then(async() => {
          deleteCustomer(row.customer_id).then(response => {
            this.$message({
              type: 'success',
              message: 'Deleted!'
            })
            this.getCustomers()
          })
          .catch(err => { console.error(err) })
        })
        .catch(err => { console.error(err) })
      },

      confirmCustomer(){
        const me = this
        const isEdit = me.dialogType === 'Edit'
        if (!me.validateForm()) {
          return false;
        }
        if (isEdit) {
            updateCustomer(me.form.customer_id, me.form).then(response => {
              me.customerDrawer = false
              me.getCustomers();
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
          createCustomer(me.form).then(response => {
            me.customerDrawer = false
            me.getCustomers();
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
        const { customer_firstname } = this.form
        this.customerDrawer = false
        this.$notify({
          title: 'Success',
          dangerouslyUseHTMLString: true,
          message: `
              <div>Name: ${customer_firstname}</div>
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
      }

    }
}
</script>
