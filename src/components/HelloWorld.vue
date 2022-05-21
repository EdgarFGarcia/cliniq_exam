<template>
  <div id="widget">
      <div id="widget-header">
        <div class="branding">
           Phone Manager
        </div>
        <div class="user">
          {{ username }}
        </div>
      </div>
      <div id="widget-body">
        <ListItem/>
      </div>
    </div>
</template>

<script>
import ListItem from '../modules/udataresult/ListItem.vue'
export default {
  name: 'HelloWorld',
  components: {
    ListItem,
  },
  props: [
    'username'
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
