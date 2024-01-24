<template >
<div v-if="cart">


<ul v-if="cart.length">
    <li v-for="(prod, index) in cart" :key="prod.id" ><b>id в корзине:</b> {{ prod.id }} <br> <b>Название:</b> {{ prod.name }} <br> <b>Описание:</b> {{ prod.description }} <br> <b>id товара:</b> {{ prod.product_id }} <br> <b>Цена:</b> {{ prod.price }}
        <button @click="addProd(prod.product_id)"> Добавить в корзину</button>
        <button @click="removeProd(prod.id)"> Убрать из корзины</button>
    </li>
</ul>

<h1 v-else>Нет товаров в корзине</h1>
<button  v-if="cart.length" @click="Order()">Заказать</button>
</div>
</template>


<script>
export default {
    name: "Cart",
    computed: {
    cart(){
        const cart = this.$store.getters.getCart.data
        return cart
    },
    token(){
        return this.$store.getters.getToken
    }
    },
    methods:{
    async addProd(index){
        if(this.token){
          const res = await fetch(`https://jurapro.bhuser.ru/api-shop/cart/${index}`,{
        method: "POST",
        headers:{
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${this.token}`
        }
      })
      const data = await res.json()
        this.$store.dispatch('getCart',this.token)
        }
    },
    async removeProd(index){
        if(this.token){
          const res = await fetch(`https://jurapro.bhuser.ru/api-shop/cart/${index}`,{
        method: "DELETE",
        headers:{
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${this.token}`
        }
      })
      const data = await res.json()
        this.$store.dispatch('getCart',this.token)
        }
    }, 
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
   
  },


}

</script>

<style scoped>
ul{
    list-style-type: none;
    margin:0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px;
        border: 1px black solid;
        border-radius: 4px;
}
li{
    margin-bottom:20px;
    padding: 0;
    text-align: justify;

    
}
.prod{
  margin-top:50px;


}
</style>