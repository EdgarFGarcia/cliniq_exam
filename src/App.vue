<template>
  <div id="app">
    <HelloWorld 
      :username="username"
    />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data: () => ({
    username: 'Mack Arroni',
  }),
  mounted () {
    this.fetchrecord()
  },
  created () {

  },
  methods: {
    async fetchrecord(){
      await axios.get('https://gist.githubusercontent.com/jrequiroso/0d3f9d97b916647e52c328dfc71634b6/raw/1e1667d82b35b6ce8ee21556b5f92133282c088f/list.json')
      .then(({data}) => {
        //if(this.udata.length == 0){
          this.$store.dispatch('udata/set_user_data', data.list)
        //}
      })
    }
  },
  computed: {
    ...mapGetters({
      udata:        'udata/get_user_data'
    })
  }
}
</script>

<style lang="scss">
body {
  background: #ccc;
  font-family: 'Roboto', sans-serif;
  
  #widget {
    width: 360px;
    height: 750px;
    background: #fff;
    margin: 0 auto;
    box-shadow: 0 0 10px rgba(65,75,100,.1);

    #widget-header {
      height: 72px;
      background: #257381;
      
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 18px;
      
      .branding, .user {
        color: white;
      }
      
      .branding {
        font-size: 18px;
        font-weight: 600;
      }
    }
    
    #widget-body {
      height: 680px;
      overflow-y: auto;
    }
  }
  // filter content
  .filtercontent{
    margin: 18px;
    background: white;
    .filtercontentinner{
      display: flex;
      justify-content: center;
      flex-grow: 4;
      margin-top: 10px;

      #datepicker{
        width: 140px;
        margin-right: 15px;
        margin-left: 15px;
        height: 40px;
      }
    }
    .sortby{
      margin-top: 50px;
      select{
        display: block;
        margin: 5px 0;
        width: 310px;
        max-width: 310px;
        height: 40px;
      }
    }
    .reset_filter{
      display: flex;
      justify-content: center;
      margin-top: 290px;
    }
    .applybtn{
      display: flex;
      justify-content: center;
      margin-top: 10px;
      button{
        padding-top: 10px;
        padding-bottom: 10px;
        padding-right: 60px;
        padding-left: 60px;
        background: #414b64;
        color: white;
      }
    }
  }
  // end filter content
  // search content
  .search_content{
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    padding: 10px 0 10px 0;
    margin: 5px 15px 5px 15px;
    width: 320px;
    max-width: 100%;
    font-size: 16px;
    display: flex;
    flex-grow: 2;
    background: white;
    justify-content: flex-start;

    #search_div{
      width: 75%;
    }

    #search_input{
      width: 80%;
      height: 35px;
      border-radius: 25px;
      text-indent: 30px;
      background: #9dd4e1 url("@/assets/search-icon.png") no-repeat scroll 7px 10px;
    }

    #filter{
      position: relative;
      top: 10px;

      img{
        margin-left: 8px;
        position: relative;
        top: 3px;
        cursor: pointer;
      }

      small{
        cursor: pointer;
      }

    }

  }
  // end search content

  // list items
  .listholder {
    background: #f0fafa;
      .sections {
        display: flex;
        flex-grow: 4;
        justify-content: flex-start;
        margin: 5px 15px 5px 15px;
        border: 1px;
        max-width: 90%;
        padding: 1rem;
        border-width: 1px;
        border-style: solid;
        border-radius: 10px;
        border-left-color: #3ba9c2;
        .br {
          display: block;
          margin: 5px 0;
          max-width: 230px;
        }
        small {
          color: #205fb0;
        }
        .icon_grouping{
          position: relative;
          top: 30px;
          img{
            margin-right: 14px;
          }
        }
      }
  }
  // end list items
  clear_result_filter{
    display: flex;
    justify-content: center;
    label: {
      position: relative;
      left: 25px;
    }
  }
}


</style>
