<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-button
          size="small"
          type="primary"
          @click="handleCreate"
        >
          New Call
        </el-button>
      </el-col>
      <el-col :span="2" :offset="6">
        <el-button
          size="small"
          type="success"
          @click="exportExcel"
        >
          Export Xls&nbsp;<i class="el-icon-download el-icon-right"></i>
        </el-button>
      </el-col>
      <el-col :span="8">
        <el-upload
          class="upload-demo"
          :on-change="importExcel"
          :auto-upload="false"
          action=""
          :file-list="fileImport"
          :multiple="false">
          <el-button size="small" type="primary">Import Xls&nbsp;<i class="el-icon-upload2 el-icon-right"></i></el-button>
        </el-upload>
      </el-col>
    </el-row>
    <el-table
      v-loading="loading"
      :data="dataList"
      style="width: 100%;margin-top:30px;"
      border
    >
      <el-table-column
        align="header-center"
        label="Call Subject"
      >
        <template slot-scope="{row}">
          {{ row.call_subject }}
        </template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="Direction Status"
      >
        <template slot-scope="{row}">
          {{ row.call_status_direction }}
        </template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="Status Call"
      >
        <template slot-scope="{row}">
          {{ row.call_status }}
        </template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="Start Date"
      >
        <template slot-scope="{row}">
          {{ row.call_start_date }}
        </template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="User Owner"
      >
        <template slot-scope="{row}">
          {{ row.m_userowner_nama }}
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
                      label="Subject"
                      prop="call_subject"
                      :error="getErrorForField('call_subject', errors)"
                      required>
                      <el-input
                        v-model="form.call_subject"
                        placeholder="Call Subject"
                      />
                    </el-form-item>
                    <el-form-item
                      label="Temperature"
                      prop="call_temperature">
                      <el-select v-model="form.optionsTemperature" placeholder="Customers Temperature">
                        <el-option
                          v-for="item in optionsTemperature"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item
                      label="Interesting"
                      prop="call_interesting">
                      <el-select v-model="form.call_interesting" placeholder="Select">
                        <el-option
                          v-for="item in optionsInterest"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item
                      label="Status Call"
                      prop="call_status">
                      <el-select v-model="form.call_status" placeholder="Select">
                        <el-option
                          v-for="item in optionsStatus"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item
                      label="Start Date"
                      prop="call_start_date">
                      <el-date-picker
                        v-model="form.call_start_date"
                        type="date"
                        format="dd-MM-yyyy"
                        value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item
                      label="Duration Minute"
                      prop="call_minutesduration">
                      <el-select v-model="form.call_minutesduration" placeholder="Select">
                        <el-option
                          v-for="item in optionsMinutes"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item
                      label="Related To"
                      prop="m_customerrelated_id"
                      :error="getErrorForField('m_customerrelated_id', errors)"
                      required>
                      <el-select v-model="form.m_customerrelated_id" placeholder="Select"
                        filterable
                        remote
                        :remote-method="remoteCustomerMethod"
                        :loading="loadingCustomer"
                        @change="selectCustomer">
                        <el-option
                          v-for="item in optionsCustomers"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="Description"
                      prop="call_description"
                      :error="getErrorForField('call_description', errors)"
                      required>
                      <el-input
                        v-model="form.call_description"
                        placeholder="Call Description"
                        type="textarea"
                        :rows="6"
                      />
                    </el-form-item>
                    <el-form-item
                      label="Offer WA"
                      prop="call_offerwa">
                      <el-select v-model="form.call_offerwa" placeholder="Select">
                        <el-option
                          v-for="item in optionsOfferWa"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item
                      label="Duration Hour"
                      prop="call_hourduration">
                      <el-select v-model="form.call_hourduration" placeholder="Select">
                        <el-option
                          v-for="item in optionsHours"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item
                      label="Calls Owner"
                      prop="m_userowner_id">
                      <el-select v-model="form.m_userowner_nama" placeholder="Select"
                        filterable
                        remote
                        :remote-method="remoteUserMethod"
                        :loading="loadingUser"
                        @change="selectUser">
                        <el-option
                          v-for="item in optionsUsers"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
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
                  @click="confirmCall"
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
import { getCustomers } from '@/api/customer'
import { getUsers } from '@/api/user'
import { getCalls, updateCalls, createCalls, deleteCall, exportExcel, importExcel } from '@/api/call'
export default {
  data() {
    return {
      loading : false,
      dataList : [],
      dataListTotal : 0,
      form : {
        call_id       : 0,
        call_key      : "",
        call_subject  : "",
        call_description : "",
        call_temperature : "",
        call_offerwa  : "",
        call_interesting : "",
        call_status_direction : "",
        call_status : null,
        call_start_date   : "",
        call_hourduration : null,
        call_minutesduration : null,
        t_relatedproj_id  : 0,
        m_userowner_id : null,
        m_userowner_nama : "",
        m_customerrelated_id : null,
        m_customerrelated_nama : 0
      },
      dialogType : 'New',
      customerDrawer : false,
      rules : {
        call_subject : [
          {required: true, message: 'Call Subject cannot be empty', trigger: 'blur'},
          {min: 3, max: 50, message: 'The Call Subject should be at least 3 characters and a maximum of 50 characters', trigger: 'blur'}
        ],
        call_description : [
          {required: true, message: 'Call Subject cannot be empty', trigger: 'blur'},
        ]
      },
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
      ],
      errors : [],
      optionsOfferWa : [
        {
          value: 'y',
          label: 'Yes'
        }, {
          value: 't',
          label: 'No'
        }
      ],
      optionsInterest : [
        {
          value: 'Interest',
          label: 'Interest'
        }, {
          value: 'Not Interest',
          label: 'Not Interest'
        }, {
          value: 'Tentative',
          label: 'Tentative'
        }
      ],
      optionsStatus : [
        {
          value: 'Held',
          label: 'Held'
        }, {
          value: 'Not held',
          label: 'Not held'
        }, {
          value: 'Planed',
          label: 'Planed'
        }
      ],
      optionsTemperature : [
        {
          value: 'Cold',
          label: 'Cold'
        }, {
          value: 'Hot',
          label: 'Hot'
        }, {
          value: 'Very Cold',
          label: 'Very Cold'
        }, {
          value: 'Very Hot',
          label: 'Very Hot'
        }, {
          value: 'Warm',
          label: 'Warm'
        }
      ],
      optionsHours : [],
      optionsMinutes : [],
      optionsUsers : [],
      loadingUser : false,
      loadingCustomer : false,
      optionsCustomers : [],
      formInline: {
        method: '',
        flag: ''
      },
      fileImport : []
    }
  },

  created(){
    let me = this
    var pad = "00"
    for (let index = 0; index < 24; index++) {
      const hour = '' + index
      var ans = pad.substring(0, pad.length - hour.length) + hour
      me.optionsHours.push({
        value: '' + ans,
        label: '' + ans
      })
    }

    for (let index = 0; index < 60; index++) {
      const hour = '' + index
      var ans = pad.substring(0, pad.length - hour.length) + hour
      me.optionsMinutes.push({
        value: '' + ans,
        label: '' + ans
      })
    }

    this.getUsers('')
    this.getCalls()
    this.getCustomers('')
  },

  methods : {
    reset(){
      this.form = {
        call_id       : 0,
        call_key      : "",
        call_subject  : "",
        call_description : "",
        call_temperature : "",
        call_offerwa  : "",
        call_interesting : "",
        call_status_direction : "",
        call_status : null,
        call_start_date   : "",
        call_hourduration : null,
        call_minutesduration : null,
        t_relatedproj_id  : 0,
        m_userowner_id : null,
        m_userowner_nama : "",
        m_customerrelated_id : null,
        m_customerrelated_nama : 0
      }
    },

    handleCreate(){
      this.dialogType = 'New'
      this.customerDrawer = true
      this.reset();
    },

    getErrorForField(field, error) {
      var errfield = error.filter(p=>p.field === field)

      if (errfield.length > 0) {
        return errfield[0].message
      }
    },

    remoteUserMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.getUsers(query)


        }, 500);
      } else {
        this.optionsUsers = [];
      }
    },

    selectUser(value){
      this.form.m_userowner_id = value
    },

    getUsers(filter) {
      let me = this
      me.loadingUser = true
      getUsers({ filter : filter }).then(response => {
        let optionsUsers = response.users
        optionsUsers.forEach(element => {
          me.optionsUsers.push({
            value: element.user_id,
            label: element.name
          })
        });

        me.loadingUser = false
      })
    },

    getCustomers(filter){
      let me = this
      me.loadingCustomer = true
      getCustomers({ filter : '' }).then(response => {
        let optionsCustomers = response.data
        optionsCustomers.forEach(element => {
          me.optionsCustomers.push({
            value: element.customer_id,
            label: element.customer_firstname + ' ' + element.customer_lastname,
            email : element.customer_email
          })
        });
        me.loadingCustomer = false
      })
    },

    remoteCustomerMethod(query){
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.getCustomers(query)


        }, 500);
      } else {
        this.optionsCustomers = [];
      }
    },

    selectCustomer(value){
      this.form.m_userowner_id = value
    },

    getCalls(){
      let me = this
      me.loadingUser = true
      getCalls({ filter : '' }).then(response => {
        me.dataList = response.data
        me.dataListTotal = response.total
      })
    },

    async exportExcel(){
      exportExcel().then(response => {
        window.open(response.url)
      });
    },

    async importExcel(params){
      let me = this
      let formData = new FormData()

      formData.append('file', params.raw)
      importExcel(formData).then(response => {
        if (response.status == 'success') {
          me.fileImport = []

          this.$message({
            type: 'success',
            message: 'Imported success!'
          })
          this.getCustomers()
        } else {
          this.$message({
            type: 'errpr',
            message: 'Imported failed!'
          })
        }
      });
    },

    handleEdit(scope){
      this.$router.push({ path: '/activity/call/edit/' + scope.row.call_key });
    },

    handleDelete(scope){
      const { $index, row } = scope
      this.$confirm('Confirm to remove this call?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
      .then(async() => {
        deleteCall(row.call_id).then(response => {
          if(response.status == 'success') {
            this.$message({
              type: 'success',
              message: 'Deleted!'
            })
            this.getCalls()
          }
        })
      })
      .catch(err => { console.error(err) })
    },

    successResponse() {
      const { customer_subject, m_userowner_nama } = this.form
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>Subject: ${customer_subject}</div>
            <div>Related: ${m_userowner_nama}</div>
          `,
        type: 'success'
      })

      this.reset()
    },

    confirmCall(){
      const me = this
      const isEdit = me.dialogType === 'Edit'
      if (!me.validateForm()) {
        return false;
      }
      if (isEdit) {
          updateCalls(me.form.call_id, me.form).then(response => {
            me.customerDrawer = false
            if (response.status == 'success') {
                me.getCalls();
                me.successResponse()
            }
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
        createCalls(me.form).then(response => {
          me.customerDrawer = false
          me.getCalls();
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

    validateForm(){
      var validform = false
      let el = this.$refs["submitForm"]
      el.validate(valid => {
        validform = valid
      })

      return validform
    },

  }
}
</script>
