<template>
<ul>
    <li class="prod" v-for="(prod, index) in prods" :key="prod.id">id: {{ prod.id }} <br> <b>Название:</b> {{ prod.name }} <br> <b>Описание:</b> {{ prod.description }} <br> <b>Цена:</b> {{ prod.price }}
    <button class="add"  v-if="token" @click="addProd(prod.id)"> Добавить в корзину</button>
    </li>
</ul>
</template>


<script scoped>
export default {
    name: "Products",
    computed: {
    prods(){
        return this.$store.getters.getProducts.data
    },
    token(){
        return this.$store.getters.getToken
    },
    host(){
        return this.$store.getters.getHost
    }
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
}
li{
    margin:0;
    padding: 0;
    width: 200px;
    
}
.prod{
  margin-top:50px;
        padding: 10px;
        border: 1px black solid;
        border-radius: 4px;
        text-align: justify;
}
</style>