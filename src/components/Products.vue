<template #default>
<ul>
    <button @click="Test2">Тест2</button>
    <li v-for="(prod, index) in prods" :key="prod.id" @click="addProd(index)">id: {{ prod.id }} <br> <b>Название:</b> {{ prod.name }} <br> <b>Описание:</b> {{ prod.description }}</li>
</ul>
</template>


<script>
export default {
    name: "Products",
    computed: {
    prods(){
        return this.$store.getters.getProducts.data
    },
    token(){
        return this.$store.getters.getToken
    }
  },
  methods:{
    async addProd(index){
      console.log(this.token)
        if(this.token){
          const res = await fetch(`https://jurapro.bhuser.ru/api-shop/cart/${index}`,{
        method: "POST",
        headers:{
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${this.token}`
        }
      })
      const data = await res.json()
        console.log(data)
        }
    },    
    async Test2(){
      console.log(this.token)
        if(this.token){
          const res = await fetch('https://jurapro.bhuser.ru/api-shop/cart',{
        method: "GET",
        headers:{
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${this.token}`
        }
      })
      const data = await res.json()
        console.log(data)
        }
    }
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