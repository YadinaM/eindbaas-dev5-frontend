<script setup>
import { ref } from 'vue';
//import { useRoute, useRouter } from 'vue-router';
import { jwtDecode } from 'jwt-decode';

//const route = useRoute();
//const router = useRouter();

let currentPassword = ref('');
let newPassword = ref('');

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
      console.error(errorData.message);
    }
  } catch (error) {
    console.error(error.message);
  }
};
</script>

<template>
  <div>
    <h2>Change Password</h2>
    <form @submit.prevent="changePassword">
      <label for="currentPassword">Current Password:</label>
      <input type="password" id="currentPassword" v-model="currentPassword" required>

      <label for="newPassword">New Password:</label>
      <input type="password" id="newPassword" v-model="newPassword" required>

      <button type="submit">Change Password</button>
    </form>
  </div>
</template>

<style scoped>

</style>
