<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/catalog">Каталог</router-link> |
    <router-link to="/login">Авторизация</router-link> |
    <router-link to="/register">Регистрация</router-link> |
    <a href="#" @click="Log">log</a>\
    <a href="#" @click="LogOut">Выйти</a>
  </nav>
  <router-view/>
</template>

<script>
export default {
name: 'LoginView',
data() {
  return {
    form: {
      fio: '',
      email: '',
      password: '' ,
      token:null
    },
    errors: ""
  }
},
methods: {
  Log() {
    console.log(this.token)
  },
  LogOut() {
    console.log(this.token)
    localStorage.clear()
    this.token=null
  },
},
mounted() {
            if (localStorage.getItem('token')) {
                  try {
                    this.token = localStorage.getItem('token');
                  } catch(e) {
                    localStorage.removeItem('token');
                  }
            }
    },
}
</script>





<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
