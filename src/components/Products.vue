<template>
 <div class="products">
        <ul>
            <li v-for="(prod, index) in prods.data" :key="index" @click="addProd(index)">{{ prod }}</li>
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