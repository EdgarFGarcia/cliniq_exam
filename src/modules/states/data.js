export default {
    namespaced: true,
    state: {
        user_data: [],
        search_result: []
    },
    mutations: {
        set_user_data(state, payload){
            state.user_data = [...payload]
        },
        dispatch_date_search(state, payload){
            const orig_data = state.user_data.filter(q => {
                return q.due_local_timestamp >= payload.start
            })
            // console.log(orig_data)
            state.search_result = [...orig_data]
        },
        dispatch_dropdown_search(state, payload){
            console.log(state, payload)
            let data = null
            switch(payload){
                case 'due date ascending':
                    // ascending 
                    state.search_result = state.user_data
                    data = state.user_data.sort(function(a,b){
                        return new Date(a.due) - new Date(b.due);
                    });
                    state.search_result = [...data]
                break

                case 'due date descending':
                    // descending
                    state.search_result = state.user_data
                    data = state.user_data.sort(function(a,b){
                        return new Date(b.due) - new Date(a.due);
                    });
                    state.search_result = [...data]
                break

                case 'name ascending':
                    // ascending
                    state.search_result = state.user_data
                    data = state.search_result.sort(function (a, b) {
                        return a.patient_name.localeCompare(b.patient_name);
                    });
                    state.search_result = [...data]
                break

                case 'name descending':
                    // descending
                    state.search_result = state.user_data
                    data = state.search_result.sort(function (a, b) {
                        return b.patient_name.localeCompare(a.patient_name);
                    });
                    state.search_result = [...data]
                break
            }
        }
    },
    getters: {
        get_user_data : state => value => {
            console.log(value)
            if(value == null || value == ''){
                return state.user_data
            }
            return state.user_data.filter(q => {
                return q.patient_name.toLowerCase().includes(value)
            })
            // return state.user_data
        },
        get_user_data_search_result(state){
            return state.search_result
        }
    },
    actions: {
        set_user_data({commit}, payload){
            commit('set_user_data', payload)
        },
        dispatch_date_search({commit}, payload){
            commit('dispatch_date_search', payload)
        },
        dispatch_dropdown_search({commit}, payload){
            commit('dispatch_dropdown_search', payload)
        }
    }
}