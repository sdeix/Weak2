<template >
        <div id="page" class="preloader">
    <div class="loader-line1">

      <div class="loader-line2">

        <div class="loader-line3">
        </div>
      </div>
    </div>
  </div>
    <div v-if="prods">
    <ul class="orders" v-if="prods.length!=0">
        <li class="order" v-for="(prod, index) in prods">
            <ul>
                <p>Заказ № {{ index+1 }}</p>
                <li>Продукты в заказе <ul class="products">
                    <li v-for="i in    countproducts[index] ">Id: {{ i.id }} - {{ i.count }}шт.</li>
                </ul>
                    
                </li>
                <li>Цена заказа: {{ prod.order_price }}</li>
            </ul>
        </li>
    </ul>
    <h1 v-else>Нет заказов</h1>
</div>
    </template>
    
    
    <script>
    export default {
        name: "Orders",
        computed: {
        prods(){
          return this.$store.getters.getOrders.data  
        },
        token(){
            return this.$store.getters.getToken
        },
        countproducts(){

            const cart = this.$store.getters.getOrders.data
            let cart2 = []

            if(cart){
            for(let i in cart){
            cart2.push(cart[i].products)
            }
            }
            let resultArray = []
            for(let item of cart2){
                let resultObject = {}
                for(let i in item){
                    const resultValue = resultObject[item[i]]
                    if(resultValue){
                        resultObject[item[i]].count+=1
                    }
                    else{
                        resultObject[item[i]] = {id:item[i],count:1} 
                    }
                    
                }
                resultArray.push(resultObject)
            }

            return resultArray
            }
      },
      mounted() {
    this.$nextTick(function () {
      var page_preloader = document.getElementById("page");
      setTimeout(function () {
        page_preloader.style.display = "none";

      }, 1000);
    })
  },
    
    
    }
    
    </script>
    
    <style scoped>  
    .orders{
        list-style-type: none;
        margin-top:50px;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .order{
        margin-top:50px;
        padding: 10px;
        display: flex;
        border: 1px black solid;
        border-radius: 4px;
    }
    .products{
        margin-left: 20px;
        padding-bottom: 10px;
    }
    li{
        margin-top:10px;
        padding: 0;
        width: 300px;
        height: auto;
        text-align: justify;
    }
    </style>