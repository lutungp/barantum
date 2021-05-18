<template>
  <div class="app-container">
    <el-button
      size="small"
      type="primary"
      @click="handleCreate"
    >
      New Call
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
                    prop="call_temperature"
                    :error="getErrorForField('call_temperature', errors)">
                    <el-input
                      v-model="form.call_temperature"
                      placeholder="Customers Temperature"
                    />
                  </el-form-item>
                  <el-form-item
                    label="Interesting"
                    prop="call_interesting"
                    :error="getErrorForField('call_interesting', errors)">
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
                    prop="call_status"
                    :error="getErrorForField('call_status', errors)">
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
                    prop="call_start_date"
                    :error="getErrorForField('call_start_date', errors)">
                    <el-date-picker
                      v-model="form.call_start_date"
                      type="date"
                      format="dd-MM-yyyy"
                      value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item
                    label="Duration Minute"
                    prop="call_minutesduration"
                    :error="getErrorForField('call_minutesduration', errors)">
                    <el-select v-model="form.call_minutesduration" placeholder="Select">
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
                      v-model="form.call_description"
                      placeholder="Call Description"
                      type="textarea"
                      :rows="6"
                    />
                  </el-form-item>
                  <el-form-item
                    label="Offer WA"
                    prop="call_offerwa"
                    :error="getErrorForField('call_offerwa', errors)">
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
                    prop="call_hourduration"
                    :error="getErrorForField('call_hourduration', errors)">
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
                    prop="m_userowner_id"
                    :error="getErrorForField('m_userowner_id', errors)">
                    <el-select v-model="form.m_userowner_id" placeholder="Select"
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
          </el-container>
        </div>
    </el-drawer>
  </div>
</template>
<script>
import { getUsers } from '@/api/user'
import { getUsers } from '@/api/Call'
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
        m_userowner_nama : ""
      },
      dialogType : 'New',
      customerDrawer : false,
      rules : {
        call_subject : [
          {required: true, message: 'Call Subject cannot be empty', trigger: 'blur'},
          {min: 3, max: 100, message: 'The Call Subject should be at least 3 characters and a maximum of 100 characters', trigger: 'blur'}
        ],
        call_description : [
          {required: true, message: 'Call Subject cannot be empty', trigger: 'blur'},
          {min: 3, max: 100, message: 'The Call Subject should be at least 3 characters and a maximum of 100 characters', trigger: 'blur'}
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
      optionsHours : [],
      optionsMinutes : [],
      optionsUsers : [],
      loadingUser : false
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
        m_userowner_nama : ""
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
      this.formCalls.m_userowner_id = value
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
  }
}
</script>
