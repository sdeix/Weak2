<template #default>
    <ul v-if="prods.length!=0">
        <li  v-for="(prod, index) in prods" :key="prod.id" @click="addProd(prod.id)">{{ prod }}</li>
    </ul>
    <h1 v-else>Нет заказов</h1>
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
    
    <style>
    ul{
        list-style-type: none;
        margin:0;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    li{
        margin:0;
        padding: 0;
        width: 200px;
        height: 350px;
    }
    </style>