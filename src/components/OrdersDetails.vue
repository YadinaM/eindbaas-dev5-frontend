<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const orderDetails = ref(null);
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const orderId = route.params.id;

  try {
    const response = await fetch(`http://localhost:3000/api/v1/shoes/${orderId}`);
    const result = await response.json();
    console.log(result);

    if (result.data && result.data.length > 0) {
      orderDetails.value = result.data[0].shoe;
      console.log("Order details found:", orderDetails.value);
    } else {
      console.error("No order details found in the response:", result);
    }
  } catch (error) {
    console.error("Error fetching order details:", error);
  }
});

const deleteOrder = async () => {
  const orderId = route.params.id;

  try {
    const response = await fetch(`http://localhost:3000/api/v1/shoes/${orderId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log('Order deleted successfully');
      router.push('/orders');
    } else {
      console.error('Failed to delete order:', response.statusText);
    }
  } catch (error) {
    console.error('Error deleting order:', error);
  }
};
</script>

<template>
<div class="order-details">
  <div class="order-details__title">
    <h1>Order Details</h1>
  </div>
  <div class="order-details__content" v-if="orderDetails">
    <a class="order-details__delete-button" @click="deleteOrder">Delete Order</a>
    <div class="order-details__info">
      <div class="order-details__text-info">
        <p class="order-details__info-item"><strong>Order from:</strong> {{ orderDetails.username }}</p>
        <p class="order-details__info-item"><strong>Size:</strong>{{ orderDetails.shoeSize }}</p>
        <p class="order-details__info-item"><strong>Adjustments</strong></p>
        <p class="order-details__info-item"><strong>Laces:</strong> green</p>
        <p class="order-details__info-item"><strong>Soul:</strong> pink</p>
        <p class="order-details__info-item"><strong>Outside:</strong> {{ orderDetails.color }}</p>
        
        <label for="textInput" class="order-details__label">Status: </label>
        <input type="text" id="textInput" v-model="orderDetails.status" placeholder="Current status" class="order-details__input">
        <button class="order-details__adjust-button">Adjust</button>
      </div>
      <div class="order-details__image">
        <img src="../assets/schoen.png" alt="tijdelijk">
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
  .order-details__title {
    margin-left: 1em;
    margin-bottom: 2em;
  }

  .order-details__content a {
    background-color: white;
    padding: 0.5em 0.8em;
    border-radius: 8px;
    border-style: solid;
    border-color: #FF3333;
    border-width: 2px;
    text-decoration: none;
    color: #FF3333;
    font-weight: bold;
  }

  .order-details__content {
    margin-left: 1em;
  }

  .order-details__text-info {
    margin-top: 2em;
  }

  .order-details__label {
    font-weight: bolder;
  }

  .order-details__input {
    border-radius: 8px;
    padding-top: 0.3em;
    padding-bottom: 0.3em;
  }

  .order-details__adjust-button {
    border-radius: 8px;
    background-color: white;
    padding: 0.5em 0.8em;
    border-style: solid;
    border-color: #F433FF;
    border-width: 2px;
    text-decoration: none;
    color: black;
  }

  .order-details__image img {
    display: none;
  }

  @media (min-width: 600px) {
    .order-details {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .order-details__image img{
      display: flex;
      width: 400px;
      margin-right: 2em;
      margin-left: 10em;
    }

    .order-details__info{
      display:flex;
      flex-direction: row;
    }
  }

</style>
