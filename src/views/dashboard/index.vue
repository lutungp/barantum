<template>
  <div class="dashboard-container">
    <div class="dashboard-text">Login Name: {{ name }}</div>
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
