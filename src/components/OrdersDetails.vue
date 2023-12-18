<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const orderDetails = ref(null);
const route = useRoute();
const router = useRouter();

const ws = new WebSocket("wss://eindbaasdev.onrender.com/primus");
ws.onopen = () => {
  console.log("Connected to websocket 😊");
};

ws.onmessage = (event) => {
  console.log("Received message:", event.data);
  const data = JSON.parse(event.data);

  if (data.action === "statusUpdated" && data.orderId === route.params.id) {
    orderDetails.value.status = data.newStatus;
  }
};

onMounted(async () => {
  const orderId = route.params.id;

  try {
    const response = await fetch(`https://eindbaasdev.onrender.com/api/v1/shoes/${orderId}`,
    {headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    });
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


const updateStatus = async () => {
  const orderId = route.params.id;

  try {
    const response = await fetch(`https://eindbaasdev.onrender.com/api/v1/shoes/${orderId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        status: orderDetails.value.status,
      }),
    });

    if (response.ok) {
      console.log('Order status updated successfully');
      ws.send(JSON.stringify({
        action: 'updateStatus',
        orderId: orderId,
        newStatus: orderDetails.value.status,
      }));
    } else {
      const responseData = await response.json();
      if (response.status === 400 && responseData.message.includes('Missing required fields')) {
        console.error('Missing required fields:', responseData.message);
        errorMessage.value = 'Missing required fields: status';
      } else {
        console.error('Failed to update order status:', responseData.message);
      }
    }
  } catch (error) {
    console.error('Error updating order status:', error);
  }
};


const deleteOrder = async () => {
  const orderId = route.params.id;

  try {
    const response = await fetch(`https://eindbaasdev.onrender.com/api/v1/shoes/${orderId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
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

const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      second: 'numeric', 
      timeZoneName: 'short' 
    };

    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
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
        <p class="order-details__info-item"><strong>Ordered on:</strong> {{ formatDate(orderDetails.date) }}</p>
        <p class="order-details__info-item"><strong>Quantity:</strong> {{ orderDetails.quantity }}</p>
        <p class="order-details__info-item"><strong>Size:</strong> {{ orderDetails.shoeSize }}</p>
        <p class="order-details__info-item"><strong>Laces:</strong> {{ orderDetails.colorLaces }}</p>
        <p class="order-details__info-item"><strong>Sole:</strong> {{ orderDetails.colorSole }}</p>
        <p class="order-details__info-item"><strong>Outside:</strong> {{ orderDetails.colorOutside }}</p>
        
        <div class="order-details__status-container">
          <label for="textInput" class="order-details__label">Status: </label>
            <select id="statusSelect" v-model="orderDetails.status" class="order-details__input" @change="updateStatus">
              <option value="in progress">In Progress</option>
              <option value="on its way">On Its Way</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
      </div>
      <div class="order-details__image">
        <img src="../assets/schoen.png" alt="tijdelijk">
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
  .order-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  .order-details__title {
    margin-left: 1em;
    margin-bottom: 2em;
  }

  .order-details__content a {
    background-color: #FF3333;
    padding: 0.5em 0.8em;
    border-radius: 8px;
    border-style: solid;
    border-color: #FF3333;
    border-width: 2px;
    text-decoration: none;
    color: #FFFFFF;
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

  
  .order-details__status-container{
    display: flex;
  }

  .order-details__input {
    border-radius: 8px;
    background-color: #f9f9f9;
    border: none;
    padding: 15px 90px 15px 20px;
    display: block;
    margin-top: -0.7em;
  }
/*
  .order-details__adjust-button {
    background-color: black;
    border-radius: 8px;
    border-style: none;
    color: white;
    width: 100%;
    display: block;
    font-size: 1em;
    padding-top: 0.7em;
    padding-bottom: 0.7em;
    font-weight: bold;
  }*/

  .order-details__image img {
    display: none;
  }

  @media (min-width: 800px) {
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
