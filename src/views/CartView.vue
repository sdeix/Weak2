<template>
<div class="home">

    <Cart/>
    <button @click="Order()">Заказать</button>
    <h1 v-if="text">{{ text }}</h1>
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
data() {
  return {
    text: ""
  }
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
        if(res.status==422){
          this.text="Ошибка, Корзина пуста"
          setTimeout(() => this.text="", 2000);
        }
        else if(res.status==201){
          this.text="Заказ совершён"
          setTimeout(() => this.text="", 2000);
        }
        }
    },  
}
}
</script>
