<template>
  <div class="login">
    <form @submit.prevent="SignUp">
    <h3>Зарегистрироваться</h3>
    <label>
      ФИО
      <input
        type="text"
        class=""
        placeholder="Фамилия Имя Отчество"
        v-model="form.fio"
      >
    </label>
    <label>
      Email
      <input
        type="email"
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
      fio: '',
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
  async SignUp(){
    const res = await fetch('https://jurapro.bhuser.ru/api-shop/signup',{
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fio:this.form.fio,
        email:this.form.email,
        password:this.form.password
      })
    })
    console.log(res)
    const data = await res.json()
    if(res.status==201){
      this.errors =''
      console.log(data.data['user_token'])
    }
    else if(res.status==422){
      this.errors =''
      this.errors="Ошибка валидации полей"
    }
  }
}
}
</script>
