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
              </el-row>
              <el-row>
                <div style="text-align:right;">
                  <el-button
                    type="danger"
                    size="small"
                    @click="reset()"
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
              </el-row>
            </el-card>
          </div>
        </el-col>
     </el-row>
     <br>
     <el-row>
       <el-tabs type="border-card">
        <el-tab-pane label="Calls">
          <el-row style="margin-top: 10px;">
            <el-form ref="formCalls" :model="formCalls" label-width="150px">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item
                    label="Subject"
                    prop="call_subject"
                    :error="getErrorForField('call_subject', errors)"
                    required>
                    <el-input
                      v-model="formCalls.call_subject"
                      placeholder="Call Subject"
                    />
                  </el-form-item>
                  <el-form-item
                    label="Temperature"
                    prop="call_temperature"
                    :error="getErrorForField('call_temperature', errors)">
                    <el-input
                      v-model="formCalls.call_temperature"
                      placeholder="Customers Temperature"
                    />
                  </el-form-item>
                  <el-form-item
                    label="Interesting"
                    prop="call_interesting"
                    :error="getErrorForField('call_interesting', errors)">
                    <el-select v-model="formCalls.call_interesting" placeholder="Select">
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
                    prop="call_status"
                    :error="getErrorForField('call_status', errors)">
                    <el-select v-model="formCalls.call_status" placeholder="Select">
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
                    prop="call_start_date"
                    :error="getErrorForField('call_start_date', errors)">
                    <el-date-picker
                      v-model="formCalls.call_start_date"
                      type="date"
                      format="dd-MM-yyyy"
                      value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item
                    label="Duration Minute"
                    prop="call_minutesduration"
                    :error="getErrorForField('call_minutesduration', errors)">
                    <el-select v-model="formCalls.call_minutesduration" placeholder="Select">
                      <el-option
                        v-for="item in optionsMinutes"
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
                      v-model="formCalls.call_description"
                      placeholder="Call Description"
                      type="textarea"
                      :rows="6"
                    />
                  </el-form-item>
                  <el-form-item
                    label="Offer WA"
                    prop="call_offerwa"
                    :error="getErrorForField('call_offerwa', errors)">
                    <el-select v-model="formCalls.call_offerwa" placeholder="Select">
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
                    prop="call_hourduration"
                    :error="getErrorForField('call_hourduration', errors)">
                    <el-select v-model="formCalls.call_hourduration" placeholder="Select">
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
                    prop="m_userowner_id"
                    :error="getErrorForField('m_userowner_id', errors)">
                    <el-select v-model="formCalls.m_userowner_id" placeholder="Select"
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
        </el-tab-pane>
        <el-tab-pane label="Notes">

        </el-tab-pane>
       </el-tabs>
     </el-row>
  </div>
</template>
<script>
import { getCustomerDetail, updateCustomer, confirmCustomerCalls } from '@/api/customer'
import { getUsers } from '@/api/user'
export default {
  data() {
    return {
      loading : false,
      loadingUser : false,
      form : {
        customer_id : 0,
        customer_solutation : "",
        customer_lastname : "",
        customer_email : "",
        customer_firstname : "",
        customer_address : "",
        customer_phone1 : "",
        customer_phone2 : "",
        customer_job : ""
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
      rules : {
        customer_firstname : [
          {required: true, message: 'First Name cannot be empty', trigger: 'blur'},
          {min: 3, max: 100, message: 'The First Name should be at least 3 characters and a maximum of 100 characters', trigger: 'blur'}
        ],
        customer_lastname : [
          {required: true, message: 'Last Name cannot be empty', trigger: 'blur'},
          {min: 3, max: 100, message: 'The Last Name should be at least 3 characters and a maximum of 100 characters', trigger: 'blur'}
        ],
        call_subject : [
          {required: true, message: 'Call Subject cannot be empty', trigger: 'blur'},
        ]
      },
      formCalls : {
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
        m_userowner_nama : ""
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
      optionsHours : [],
      optionsMinutes : [],
      optionsUsers : []
    }
  },

  beforeCreate(){
    let me = this
    const id = this.$route.params && this.$route.params.id

    getCustomerDetail(id).then(response => {
      me.form = {
        customer_id : response.customer_id,
        customer_solutation : response.customer_solutation,
        customer_lastname : response.customer_lastname,
        customer_email : response.customer_email,
        customer_firstname : response.customer_firstname,
        customer_address : response.customer_address,
        customer_phone1 : response.customer_phone1,
        customer_phone2 : response.customer_phone2,
        customer_job : response.customer_job
      }
    });
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
  },

  methods : {
    getErrorForField(field, error) {
      var errfield = error.filter(p=>p.field === field)

      if (errfield.length > 0) {
        return errfield[0].message
      }
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
      this.formCalls.m_userowner_id = value
    },

    confirmCustomer(evt){
      const me = this
      if (!me.validateForm()) {
        return false;
      }
      const loadingscreen = this.$loading({
          lock: false,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      updateCustomer(me.form.customer_id, me.form).then(response => {
        this.$notify({
          title: 'Success',
          dangerouslyUseHTMLString: true,
          message: `<div>Save Successfully</div>`,
          type: 'success'
        })
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
    },

    validateForm(){
      var validform = false
      let el = this.$refs["submitForm"]
      el.validate(valid => {
        validform = valid
      })

      return validform
    },

    selectOfferWa(value){
      this.formCalls.call_offerwa = value
    },

    selectHourDuration(value) {
      this.formCalls.call_hourduration = value
    },

    selectMinutes(value) {
      this.formCalls.call_minutesduration = value
    },

    confirmCalls(){
      let me = this
      const loadingscreen = this.$loading({
          lock: false,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      confirmCustomerCalls(me.form.customer_id, me.formCalls).then(response => {
        this.resetCall()
        this.$notify({
          title: 'Success',
          dangerouslyUseHTMLString: true,
          message: `<div>Save Successfully</div>`,
          type: 'success'
        })
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
    },

    reset(){
      this.form = {
        customer_id : 0,
        customer_solutation : "",
        customer_lastname : "",
        customer_email : "",
        customer_firstname : "",
        customer_address : "",
        customer_phone1 : "",
        customer_phone2 : "",
        customer_job : ""
      }
    },

    resetCall(){
      this.formCalls = {
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
        m_userowner_nama : ""
      }
    }
  }
}
</script>
