<template >
<div v-if="cart">
  <div id="page" class="preloader">
    <div class="loader-line1">

      <div class="loader-line2">

        <div class="loader-line3">
        </div>
      </div>
    </div>
  </div>
  <button  v-if="cart.length" class="btn  btn-secondary  w-25" @click="Order()">Заказать</button>
<ul v-if="cart.length" class="row">
    <li class="col-xxl-4 col-lg-6 col-12 rounded border-4 border border-secondary " v-for="(prod, index) in cart" :key="prod.id" > <b>Название:</b> {{ prod.name }} <br> <b>Описание:</b> {{ prod.description }} <br> <b>id товара:</b> {{ prod.product_id }} <br> <b>Цена:</b> {{ prod.price }} <br> <b>Колличество:</b> {{ prod.count }}
        <br>
      <button class="add btn btn-outline-secondary " @click="addProd(prod.product_id)"> Добавить в корзину</button>
        <button class="remove btn btn-outline-secondary ms-1 " @click="removeProd(prod.id)"> Убрать из корзины</button>
    </li>
</ul>

<h1 v-else>Нет товаров в корзине</h1>

</div>
</template>


<script>
export default {
    name: "Cart",
    computed: {
    cart(){
        const cart = this.$store.getters.getCart.data
        let cart2 = []
        if(cart){
          for(let i in cart){
          cart2.push({id:cart[i].id, product_id:cart[i].product_id,name:cart[i].name,description:cart[i].description,price:cart[i].price,count:1})
        }
        }
        const resultObject = {}
        for(let item of cart2){
          const resultValue = resultObject[item.product_id]
          if(resultValue){
            resultValue.count +=1
          }
          else{
            resultObject[item.product_id] = {...item}
          }
        }
        const cart3 = Object.values(resultObject)
        return cart3
    },
    token(){
        return this.$store.getters.getToken
    },
    host(){
        return this.$store.getters.getHost
    },
    
    },
    mounted() {
    this.$nextTick(function () {
      var page_preloader = document.getElementById("page");
      setTimeout(function () {
        page_preloader.style.display = "none";

      }, 1000);
    })
  },
    methods:{
    async addProd(index){
        if(this.token){
          const res = await fetch(`${this.host}/cart/${index}`,{
        method: "POST",
        headers:{
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${this.token}`
        }
      })
      const data = await res.json()
        this.$store.dispatch('getCart',this.token)
        const buttons =document.getElementsByClassName('add')
        for (let p in buttons){
          try{
            if(Number.isInteger(Number(p))){
            buttons[p].disabled=true
            setTimeout(() => {
              buttons[p].disabled = false;
            }, 2000);
          }
          }
          catch(err){
          }
        }
        }
    },
    async removeProd(index){
        if(this.token){
          const res = await fetch(`${this.host}/cart/${index}`,{
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
          const res = await fetch(`${this.host}/order`,{
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
    margin:20px 0;
    padding-right:   50px ;
    padding-bottom: 20px;
    padding-top: 20px;
    text-align: justify;


    
}
.prod{
  margin-top:50px;


}

</style>