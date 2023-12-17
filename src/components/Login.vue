<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const errorMessage = ref('');

const username = ref('');
const password = ref('');

const loginUser = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username.value, password: password.value }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Login successful:', data);

      localStorage.setItem('token', data.data.token);
      localStorage.setItem('username', username.value);
      localStorage.setItem('admin', data.data.admin);

      //console.log(localStorage);
      if( data.data.admin){
        router.push('/orders');
      } else{
        router.push('/shoe');
        //window.alert('You are not an admin. Access denied.');
        //console.error('Access denied. User is not an admin.');
      }

    } else {
      console.error('Login failed:', data.message);
      errorMessage.value = 'Username or password invalid';
    }
  } catch (error) {
    console.error('Error during login:', error.message);
    errorMessage.value = 'An error occurred during login';
  }
};
</script>

<template>
  <main>
  <div class="login">
    <img class="login__logo" src="../assets/logo2.png" alt="Logo">
  </div>
  <!-- Login Form -->
  <div class="login-form">
    <form class="login-form__form" @submit.prevent="loginUser">
      <label class="login-form__label" for="username">Username</label>
      <p class="login-form__error" v-if="errorMessage">{{ errorMessage }}</p>
      <input v-model="username" class="login-form__input" type="text" id="username" name="username">

      <label class="login-form__label" for="password">Password</label>
      <input v-model="password" class="login-form__input" type="password" id="password" name="password">

      <input class="login-form__submit" type="submit" value="Log in">
    </form>
  </div>
</main>
</template>


<style scoped>
main{
  background-color: #1E1E1E;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.login-form__error{
  font-size: 0.8em;
  color: red;
}

.login{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  height: 40vh;
  margin-bottom: 2em;
}

.login__logo {
  width: 60%;
  border-radius: 10px;
}

.login-form {
  display: flex;
  justify-content: center;
  margin-top: 8em;
  font-size: 1.2em;
}

.login-form__form {
  color: white;
  font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.login-form__label {
  display: block;
  margin-bottom: 0.5em;
  font-weight: bolder;
}

.login-form__input {
  display: block;
  margin-bottom: 1em;
  padding: 0.5em;
  border-radius: 8px;
  padding: 1em 2.8em;
  border-style: none;
}

.login-form__submit {
  background-color: #F433FF;
  border-radius: 8px;
  border-style: none;
  color: white;
  width: 100%;
  display: block;
  font-size: 1em;
  padding-top: 0.7em;
  padding-bottom: 0.7em;
  font-weight: bold;
}
@media (min-width: 1000px) {
  .login__logo{
    width: 20%;
  }
}
</style>
