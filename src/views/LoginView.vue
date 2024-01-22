<template>
    <div class="login">
        <p>Авторизация</p>
    </div>
  </template>
  
<script setup>
import {useFetch} from '@vueuse/core'
import { ref } from 'vue';

const url = "https://jurapro.bhuser.ru/api-shop/login"

const dataq = {
   "email": "admin@admin.ru",
   "password": "admin"
}

const { error,data } = useFetch(url).post().text()
console.log(error)

  </script>
   