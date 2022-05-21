<template>
    <div class="listholder">
        <div class="search_content">
            <div id="search_div">
                <input id="search_input" v-model="search" type="text"/>
            </div>
            <div id="filter" @click="showresult = !showresult">
                <small>Filters</small>
                <img v-if="showresult" src="@/assets/adjust.png"/>
                <img v-else src="@/assets/menu.open.png"/>
            </div>
        </div>
        <div v-if="!showresult" class="filtercontent">
            <small>Filter by</small>
            <div class="filtercontentinner">
                <div>
                    <input
                        v-model="datepicker.start"
                        placeholder="start date" 
                        id="datepicker" 
                        type="text" 
                        onfocus="(this.type='date')" 
                        onblur="(this.type='text')"/>
                </div>
                <div>
                    <input
                        v-model="datepicker.end"
                        placeholder="end date" 
                        id="datepicker" 
                        type="text" 
                        onfocus="(this.type='date')" 
                        onblur="(this.type='text')"/>
                </div>
            </div>
            <div class="sortby">
                <small>Sort by</small>
                <select @change="dropdown($event)">
                    <option
                        v-for="(item, itemindex) in sorting"
                        :key="itemindex"
                        :value="item"
                    >
                        {{item}}
                    </option>
                    <!--<option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>-->
                </select>
            </div>
            <div class="reset_filter">
                <small @click="resetdata">Reset filter</small>
            </div>
            <div class="applybtn">
                <button @click="fsearchr">Apply</button>
            </div>
        </div>
        <div v-if="showresult && sresultstatus" class="clear_result_filter">
            <div
                v-for="(item, itemIndex) in sresult"
                :key="itemIndex"
            >
                <div>
                    <div class="sections">
                        <div>
                            <strong>{{item.patient_name}}</strong>
                            <small class="br">MSP Medicare Secondary Financial Services Payer Campaign (2019)</small>
                            <small class="br">Due date: {{item.due_label}}</small>
                        </div>
                        <div>
                            <div class="icon_grouping">
                                <img src="@/assets/phone-OUT.png"/>
                                <img style="position: relative; top: 2px;" src="@/assets/alarmbell.png"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            v-for="(item, itemIndex) in get_users"
            :key="itemIndex"
        >
            <div v-if="showresult && !sresultstatus">
                <div class="sections">
                    <div>
                        <strong>{{item.patient_name}}</strong>
                        <small class="br">MSP Medicare Secondary Financial Services Payer Campaign (2019)</small>
                        <small class="br">Due date: {{item.due_label}}</small>
                    </div>
                    <div>
                        <div class="icon_grouping">
                            <img src="@/assets/phone-OUT.png"/>
                            <img style="position: relative; top: 2px;" src="@/assets/alarmbell.png"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
  components: {
  },
  props: [
  ],
  data: () => ({
    search: null,
    showresult: true,
    datepicker: {
        start: null,
        end: null
    },
    sresultstatus: false,
    sorting: ['','due date ascending', 'due date descending', 'name ascending', 'name descending'],
    dd: null
  }),
  mounted () {
  },
  created () {
  },
  computed: {
    ...mapGetters({
        sresult:        'udata/get_user_data_search_result'
    }),
    get_users(){
        return this.$store.getters['udata/get_user_data'](this.search)
    }
  },
  methods: {
    fsearchr(){
      //console.log(this.datepicker)
      this.$store.dispatch('udata/dispatch_date_search', this.datepicker)
      this.datepicker = {}
      this.showresult = true
      this.sresultstatus = true
    },
    dropdown(data){
        this.$store.dispatch('udata/dispatch_dropdown_search', data.target.value)
        this.datepicker = {}
        this.showresult = true
        this.sresultstatus = true
    },
    async resetdata(){
        await axios.get('https://gist.githubusercontent.com/jrequiroso/0d3f9d97b916647e52c328dfc71634b6/raw/1e1667d82b35b6ce8ee21556b5f92133282c088f/list.json')
        .then(({data}) => {
          this.$store.dispatch('udata/set_user_data', data.list)
          this.datepicker = {}
          this.showresult = true
          this.sresultstatus = true
        })
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
</style>