<template>
    <div id="page" class="preloader">
    <div class="loader-line1">

      <div class="loader-line2">

        <div class="loader-line3">
        </div>
      </div>
    </div>
  </div>
<ul>
    <li class="prod col-xxl-3 col-lg-5 col-11 ms-1  rounded border-4 border border-secondary" v-for="(prod, index) in prods" :key="prod.id">id: {{ prod.id }} <br> <b>Название:</b> {{ prod.name }} <br> <b>Описание:</b> {{ prod.description }} <br> <b>Цена:</b> {{ prod.price }}
    <br>
      <button class="add btn btn-outline-secondary w-100"  v-if="token" @click="addProd(prod.id)"> Добавить в корзину</button>
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
    justify-content: space-around;
}
li{
    margin:10px;
    padding: 10px ;
    text-align: left;
    
}

</style>