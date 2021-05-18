<template>
  <div class="app-container">
    <el-row>
      <el-col :lg="{span: 24}" :md="{span: 24}" :sm="{span: 24}">
        <div class="grid-content">
          <el-card shadow="always">
            <el-row style="margin-top: 10px;">
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
                <el-row>
                  <div style="text-align:right;">
                    <el-button
                      type="danger"
                      size="small"
                      @click="reset(), $router.push({ path: '/activity/call' })"
                    >
                      Cancel
                    </el-button>
                    <el-button
                      type="primary"
                      size="small"
                      @click="confirmCalls"
                    >
                      Save
                    </el-button>
                  </div>
                </el-row>
              </el-form>
            </el-row>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getCustomers } from '@/api/customer'
import { getUsers } from '@/api/user'
import { getCallDetail, updateCalls, createCalls, deleteCall } from '@/api/call'
export default {
  data() {
    return {
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
      errors : [],
      rules : {
        call_subject : [
          {required: true, message: 'Subject cannot be empty', trigger: 'blur'},
          {min: 3, max: 50, message: 'The Subject should be at least 3 characters and a maximum of 50 characters', trigger: 'blur'}
        ],
        call_description : [
          {required: true, message: 'Call Subject cannot be empty', trigger: 'blur'},
        ]
      },
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
      optionsCustomers : []
    }
  },

  beforeCreate(){
    let me = this
    const id = this.$route.params && this.$route.params.id

    getCallDetail(id).then(response => {
      me.form = {
        call_id       : response.customer.call_id,
        call_key      : response.customer.call_key,
        call_subject  : response.customer.call_subject,
        call_description : response.customer.call_description,
        call_temperature : response.customer.call_temperature,
        call_offerwa  : response.customer.call_offerwa,
        call_interesting : response.customer.call_interesting,
        call_status_direction : response.customer.call_status_direction,
        call_status : response.customer.call_status,
        call_start_date   : response.customer.call_start_date,
        call_hourduration : response.customer.call_hourduration,
        call_minutesduration : response.customer.call_minutesduration,
        t_relatedproj_id  : response.customer.t_relatedproj_id,
        m_userowner_id : response.customer.m_userowner_id,
        m_userowner_nama : response.customer.m_userowner_nama,
        m_customerrelated_id : response.customer.m_customerrelated_id,
        m_customerrelated_nama : response.customer.m_customerrelated_nama
      }
    })
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

    successResponse() {
      const { call_subject, m_userowner_nama } = this.form
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>Subject: ${call_subject}</div>
            <div>Related: ${m_userowner_nama}</div>
          `,
        type: 'success'
      })
    },

    confirmCalls(){
      let me = this
      const loadingscreen = this.$loading({
          lock: false,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        updateCalls(me.form.call_id, me.form).then(response => {
          if (response.status == 'success') {
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

      loadingscreen.close()
    }
  }
}
</script>
