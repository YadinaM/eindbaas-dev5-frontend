<!--<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

//const currentPassword = ref('');
const newPassword = ref('');

const changePassword = async () => {
  try {
    /*const userId = route.params.id;
    const apiUrl = `http://localhost:3000/api/v1/users/${userId}`;*/

    /*hard coded, pas automatiserend mogelijk na login*/
    const userId = '656b3237e2c3b968f84fa896';
    const apiUrl = `http://localhost:3000/api/v1/users/${userId}`;

    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        password: newPassword.value,
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

      <label for="newPassword">New Password:</label>
      <input type="password" id="newPassword" v-model="newPassword" required>

      <button type="submit">Change Password</button>
    </form>
  </div>
</template>

<style scoped>

</style>-->
<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const currentPassword = ref('');
const newPassword = ref('');

const changePassword = async () => {
  try {
    const userId = route.params.id;

    if (!userId) {
      console.error('No user ID provided');
      return;
    }
    const apiUrl = `http://localhost:3000/api/v1/users/${userId}`;

    const response = await fetch(apiUrl, {
      method: 'PUT',
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