<template>
    <div class="home">
      <Products v-if="data" :prods="data"/>
      <h1 v-else>Загрузка товаров</h1>
    </div>
  </template>
  
<script setup>
// @ is an alias to /src
import Products from '@/components/Products.vue'

import { ref } from 'vue';
import axios from "axios"
const data = ref(["qwe","qweqw"])
const url = "https://jurapro.bhuser.ru/api-shop/products"




await axios.get(url).then(response => (data = response.data));
console.log('info')


  </script>

