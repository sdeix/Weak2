<template>
 <div class="products">
        <ul>
            <li v-for="(prod, index) in prods" :key="prod.id" @click="addProd(index)">id: {{ prod.id }} <br> <b>Название:</b> {{ prod.name }} <br> <b>Описание:</b> {{ prod.description }}</li>
        </ul>
 </div>
</template>


<script>
export default {
    name: "Products",
    props: {
    prods: Object
  },
  methods:{
    addProd(index){
        console.log(index)
    }
  }
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