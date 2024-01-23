<template>
    <div class="login">
      <form @submit.prevent="SignIn">
      <h3>Войти</h3>
      <label>
        Email
        <input
          type="text"
          class=""
          placeholder="Ваша эл. почта"
          v-model="form.email"
        >
      </label>
      <label>
        Пароль
        <input
          type="password"
          class=""
          placeholder="Ваш пароль"
          v-model="form.password"
        >
      </label>
      <div class="actions">
        <button type="button" class="">Отмена</button>
        <button type="submit" class="" > Подтвердить </button>
      </div>
    </form>
    <p v-if="errors">{{errors}}</p>
</div>
</template>
  
<script>
export default {
  name: 'LoginView',
  data() {
    return {
      form: {
        email: '',
        password: '' 
      },
      errors: ''
    }
  },
  methods: {
    async SignIn(){
      const res = await fetch('https://jurapro.bhuser.ru/api-shop/login',{
        method: "POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email:this.form.email,
          password:this.form.password
        })
      })
    const data = await res.json()
    if(res.status==200){
      this.errors =''
      console.log(data.data['user_token'])
      this.$store.dispatch('setToken',data.data['user_token'])
      localStorage.setItem('token',data.data['user_token'])
      this.$router.push('/');
    }
    else if(res.status==401){
      this.errors =''
      this.errors="Ошибка авторизации"
    }
    
    }
  }
}
</script>
