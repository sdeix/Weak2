<template >
<div v-if="cart">


<ul v-if="cart.length">
    <li v-for="(prod, index) in cart" :key="prod.id" ><b>id в корзине:</b> {{ prod.id }} <br> <b>Название:</b> {{ prod.name }} <br> <b>Описание:</b> {{ prod.description }} <br> <b>id товара:</b> {{ prod.product_id }} <br> <b>Цена:</b> {{ prod.price }}
        <br><b>Колличество:</b> {{ prod.count }}<br>
        <button @click="addProd(prod.product_id)"> Добавить в корзину</button>
        <button @click="removeProd(prod.id)"> Убрать из корзины</button>
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
        const cart1 = this.$store.getters.getCart.data
        let cart2 = []
        let cart3 = []
        for(let u in cart1){
            cart2.push(cart1[u])
        }
        cart3 = cart2.slice(0)
        let maincart = []
        for(let i in cart3){
            if(maincart.length==0){
                maincart.push({
                    id:cart3[i].id,
                    product_id:cart3[i].product_id,
                    name:cart3[i].name,
                    description:cart3[i].description,
                    price:cart3[i].price,
                    count:1,
                })           
            }
            else{
                for(let j in maincart){
                if(cart3[i].product_id==maincart[j].product_id){
                    maincart[j].count+=1
                    break
                }
                else{
                    console.log("qqq")
                    cart3[i].count=0
                    maincart.push({
                    id:cart3[i].id,
                    product_id:cart3[i].product_id,
                    name:cart3[i].name,
                    description:cart3[i].description,
                    price:cart3[i].price,
                    count:1,
                }) 


                }}
            }

            
        }
        console.log(maincart)
        return maincart
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