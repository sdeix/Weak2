<template>
    <div class="login">
      <form @submit.prevent="SignIn">
      <h3>Войти</h3>
      <label>
        Email
        <input
          type="text"
          class="form-control"
          placeholder="Ваша эл. почта"
          v-model="form.email"
        >
      </label>
      <label>
        Пароль
        <input
          type="password"
          class="form-control"
          placeholder="Ваш пароль"
          v-model="form.password"
        >
      </label>
      <div class="actions">
        <button type="button" class="">Отмена</button>
        <button type="submit" class="" > Подтвердить </button>
      </div>
    </form>
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
      errors: []
    }
  },
  methods: {
    changeUserState() {
      if (this.auth) {
        localStorage.removeItem('auth')
        this.$router.push({ name: 'main'})
      } else {
        localStorage.setItem('auth', true)
        this.auth = true
      }
    },
    close() {
      this.$emit('close')
    },
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
      console.log(res)
    }
  }
}
</script>
