<template>
  <div class="dashboard-container">
    <div class="dashboard-text">Login Name: {{ name }}</div>
    <el-table
      v-loading="loadingActivity"
      :data="activity"
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
        align="center"
        label="Operations"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="handleConfirm(scope)"
          >
            Confirm
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { confirmActivity } from '@/api/activity'
export default {
  name: 'Dashboard',
  data(){
    return {
      activity : [],
      loadingActivity : false,
      dataListTotal : 0
    }
  },

  created(){
    let me = this
    me.getActivity().then(function(res){
      me.activity = res
    })
  },

  methods : {
    ...mapActions('user', ['getActivity']),

    handleConfirm(scope){
      let me = this
      confirmActivity(scope.row.activity_id).then(function(res){
        if (res.status == "success") {
          me.getActivity().then(function(res){
            me.activity = res
          })
        }
      })
    }
  },

  computed: {
    ...mapGetters([
      'name'
    ]),
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
