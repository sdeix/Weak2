<template >
    <div v-if="prods">
    <ul class="orders" v-if="prods.length!=0">
        <li class="order" v-for="(prod, index) in prods">
            <ul>
                <p>Заказ № {{ index+1 }}</p>
                <li>ID в корзине:{{ prod.id }}</li>
                <li>Id продуктов <ul class="products">
                    <li v-for="i in  prod.products">Id продукта: {{ i }}</li>
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
        }
      },
      methods:{ 
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