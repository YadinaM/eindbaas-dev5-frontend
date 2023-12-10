<script setup>
import { ref, onMounted } from 'vue';

const name = ref('');
const username = ref('');
const shoeSize = ref('');
const color = ref('');
const status = ref('');
const shoes = ref([]);

const submitOrder = async () => {
  // Send a POST request to the backend to create a new shoe order
  const response = await fetch("http://localhost:3000/api/v1/shoes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.value,
      username: username.value,
      shoeSize: shoeSize.value,
      color: color.value,
      status: status.value,
    }),
  });

  const data = await response.json();

  if (response.ok) {
    // If the request is successful, update the list of orders
    if (shoes.value) {
      shoes.value.push(data.data.shoe);
    }
    // Clear the form fields
    name.value = '';
    username.value = '';
    shoeSize.value = '';
    color.value = '';
    status.value = '';
  } else {
    console.error("Failed to submit order:", data.message);
  }
};

const fetchShoes = async () => {
  // Fetch the list of shoe orders from the backend
  const response = await fetch("http://localhost:3000/api/v1/shoes");
  const data = await response.json();

  if (response.ok) {
    shoes.value = data.data.shoes;
  } else {
    console.error("Failed to fetch shoe orders:", data.message);
  }
};

onMounted(() => {
  // Fetch the list of shoe orders when the component is mounted
  fetchShoes();
});
</script>

<template>
  <div>
    <h2>Shoe Orders</h2>

    <!-- Form to submit a new shoe order -->
    <form @submit.prevent="submitOrder">
      <label for="name">Name:</label>
      <input v-model="name" type="text" required />

      <label for="username">Username:</label>
      <input v-model="username" type="text" required />

      <label for="shoeSize">Shoe Size:</label>
      <input v-model="shoeSize" type="text" required />

      <label for="color">Color:</label>
      <input v-model="color" type="text" required />

      <label for="status">Status:</label>
      <input v-model="status" type="text" required />

      <button type="submit">Submit Order</button>
    </form>
  </div>
</template>
<!--<template>
  <div class="page-container">
    <div class="shoe-product">
      <div class="shoe-details">
        <h1 class="shoe-title">Title</h1>
        <span class="shoe-price">Price</span>
      </div>
      <div class="shoe-image">
        <img src="../assets/schoen.png" alt="" class="shoe-image__img">
      </div>
    </div>
    <div class="order-form">
      <form class="order-form__form">
        <label for="size" class="order-form__label">Size</label>
        <select name="size" id="size" class="order-form__select">
          <option value="39">39</option>
          <option value="40">40</option>
          <option value="41">41</option>
        </select>
        <label for="color" class="order-form__label">Select a color</label>
        <div class="order-form__container">
          <label for="colorLaces" class="order-form__label">Laces</label>
          <input type="color" id="selectedColor" name="selectedColor" class="order-form__color">
        </div>
        <div class="order-form__container">
          <label for="colorSole" class="order-form__label">Sole</label>
          <input type="color" id="selectedColor" name="selectedColor" class="order-form__color">
        </div>  
        <div class="order-form__container">
          <label for="colorOutside" class="order-form__label">Outside</label>
          <input type="color" id="selectedColor" name="selectedColor" class="order-form__color">
        </div>
        <label for="quantity" class="order-form__label">Quantity</label>
        <input type="number" name="quantity" id="quantity" class="order-form__input" min="1" max="10">
        <input type="submit" value="Order" class="order-form__submit">
      </form>
    </div>
  </div>
</template>-->

<style scoped>
/*.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: sans-serif;
}
.shoe-product {
  display: flex;
  flex-direction: column;
}
.shoe-details {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.shoe-title {
  margin-left: 1em;
}
.shoe-price {
  margin-right: 2em;
}
.shoe-image__img {
  width: 20em;
  margin-left: auto;
  margin-right: auto;
  display: block;
}
.order-form__form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2em;
}
.order-form__label {
  display: block;
  margin-bottom: 0.5em;
}
.order-form__select, .order-form__input{
  display: block;
  margin-bottom: 3em;
  padding: 10px 80px;
  border-radius: 8px;
  border: none;
  background-color: #f9f9f9;
}
.order-form__container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.order-form__color {
  width: 40px;
  height: 40px;
  border: none;
  padding: 0;
  margin: 0;
  appearance: none; 
}
.order-form__submit {
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
}
@media (min-width: 500px){
  .shoe-image__img {
  width: 35em;
}
}
@media (min-width: 768px) {
  .page-container {
    flex-direction: row;
    align-items: center;
  }
  .shoe-product, .order-form {
    flex: 1;
  }
  .order-form__form {
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  }
  .shoe-image__img {
  width: 40em;
}
}*/
</style>
