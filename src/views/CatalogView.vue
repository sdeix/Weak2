<template>
    <div class="home">
      <Products :prods="data"/>
    </div>
  </template>
  
<script setup>
// @ is an alias to /src
import Products from '@/components/Products.vue'
import {useFetch} from '@vueuse/core'
import { ref } from 'vue';

const dat = ref(["qwe","qweqw"])
const url = "https://jurapro.bhuser.ru/api-shop/products"
const {isFetching, error, data} = useFetch(url).json()
console.log(data)

  </script>
   