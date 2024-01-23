<template #default>
<ul>
    <li v-for="(prod, index) in cart" :key="prod.id" >id в корзине: {{ prod.id }} <br> <b>Название:</b> {{ prod.name }} <br> <b>Описание:</b> {{ prod.description }} <br> <b>id товара:</b> {{ prod.product_id }}</li>
</ul>
</template>


<script>
export default {
    name: "Products",
    computed: {
    cart(){
        return this.$store.getters.getCart.data
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

</style>