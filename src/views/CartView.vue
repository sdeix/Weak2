<template>
<div class="home">

    <Cart/>
    <button @click="Order()">qweqw</button>
</div>
</template>

<script>
import Cart from "../components/Cart.vue"

export default {
name: 'CartView',
computed: {
    token(){
        return this.$store.getters.getToken
    }
},
components: {
    Cart
},
methods:{
    async Order(){
        console.log(typeof this.token)
        if(this.token){
          const res = await fetch(`https://jurapro.bhuser.ru/api-shop/order`,{
        method: "POST",
        headers:{
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${this.token}`
        }
      })
      const data = await res.json()
        this.$store.dispatch('getOrders',this.token)
        this.$store.dispatch('getCart',this.token)
        }
    },  
}
}
</script>
