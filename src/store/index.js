import { createStore } from 'vuex'


const getProducts = () => {
  return fetch('https://jurapro.bhuser.ru/api-shop/products',{
    method: "GET",
    headers:{
      'Content-Type': 'application/json'
    },
  })
}



export default createStore({
  state: {
    token:null,
    products:[]
  },
  getters: {
    getToken(state){
      return state.token
    },
    getProducts(state){
      return state.products
    }
  },
  mutations: {
    SET_TOKEN(state,payload){
      state.token=payload
    },
    DELETE_TOKEN(state){
      state.token=null
    },
    SET_PRODUCTS(state,payload){
      state.products=payload
    },
  },
  actions: {
    setToken({commit}, payload){
      commit('SET_TOKEN',payload)
    },
    deleteToken({commit}){
      commit('DELETE_TOKEN')
    },
    async getProducts({commit}){
      try{
        const prod = await getProducts()
        console.log(prod.json().then(function(value){commit('SET_PRODUCTS', value)}))


      }
      catch(error){
        console.log(error)
      }
    }
  },
})
