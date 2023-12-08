<script setup>
</script>

<template>
<div class="order-details">
  <div class="order-details__title">
    <h1>Order Details</h1>
  </div>
  <div class="order-details__content">
    <a class="order-details__delete-button">Delete Order</a>
    <div class="order-details__info">
      <div class="order-details__text-info">
        <p class="order-details__info-item"><strong>Order from:</strong> Name</p>
        <p class="order-details__info-item"><strong>Size:</strong> 39</p>
        <p class="order-details__info-item"><strong>Adjustments</strong></p>
        <p class="order-details__info-item"><strong>Laces:</strong> green</p>
        <p class="order-details__info-item"><strong>Soul:</strong> pink</p>
        <p class="order-details__info-item"><strong>Outside:</strong> blue</p>
        
        <label for="textInput" class="order-details__label">Status: </label>
        <input type="text" id="textInput" placeholder="Current status" class="order-details__input">
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
