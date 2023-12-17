<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { jwtDecode } from 'jwt-decode';

//const route = useRoute();
const router = useRouter();

let currentPassword = ref('');
let newPassword = ref('');
let errorMessage = ref('');

const changePassword = async () => {
  const decodedToken = jwtDecode(localStorage.getItem('token'));
  const id = decodedToken.userId;
  try {
    const apiUrl = `http://localhost:3000/api/v1/users/${id}`;

    const response = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        currentPassword: currentPassword.value,
        newPassword: newPassword.value,
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData.message);
    } else {
      const errorData = await response.json();
      errorMessage.value = 'Current password is incorrect';
      console.error(errorData.message);
    }
  } catch (error) {
    console.error(error.message);
  }
};

const logout = () => {
  localStorage.clear();
  router.push('/');
};
</script>

<template>
  <div class="content">
      <div class="change-password">
      <h2 class="change-password__title">Change Password</h2>
      <div class="change-password__form-container">
          <form class="change-password__form" @submit.prevent="changePassword">
            <label class="change-password__label" for="currentPassword">Current Password:</label>
            <p class="change-password__error" v-if="errorMessage">{{ errorMessage }}</p>
            <input class="change-password__input" type="password" id="currentPassword" v-model="currentPassword" required>

            <label class="change-password__label" for="newPassword">New Password:</label>
            <input class="change-password__input" type="password" id="newPassword" v-model="newPassword" required>

            <button class="change-password__button" type="submit">Change Password</button>
        </form>
      </div>
    </div>
    <div class="logout">
      <a class="logout__button" @click="logout">log out</a>
    </div>
  </div>
</template>

<style scoped>
  h2{
    font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin-left: 1em;
  }

  .change-password__error{
    font-size: 0.8em;
    color: red;
  }

  .change-password__form-container{
    display: flex;
    justify-content: center;
  }

  .change-password__form{
    display: flex;
    flex-direction: column;
    width: 250px;
  }

  .change-password__label{
    margin-bottom: 0.8em;
    font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .change-password__input{
    margin-bottom: 1.5em;
    border-radius: 8px;
    padding: 0.8em;
  }

  .change-password__button{
    background-color: white;
    padding: 0.8em 1em;
    border-radius: 8px;
    border-style: solid;
    border-color: #F433FF;
    border-width: 2px;
    text-decoration: none;
    color: black;
    font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .change-password{
    margin-bottom: 2em;
  }

  .logout{
    display: flex;
    justify-content: center;
    text-decoration: underline;
    margin-top: 5em;
    font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  @media (min-width: 600px) and (max-width: 1200px) {
    h2{
      margin-left: 2em;
    }
  }

  @media (min-width: 1200px){
    .change-password {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  }
</style>
