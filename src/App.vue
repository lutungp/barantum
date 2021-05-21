<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',

  data(){
    return {
      socktoken : this.getSockToken()
    }
  },

  created(){

  },

  methods : {
    ...mapGetters('user', ['getSockToken']),
  }
}
</script>
