<script setup>

</script>

<template>
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
      <!--a form to order a shoe. select a size, a color and a quantity-->
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
        <!--<select name="color" id="color" class="order-form__select">
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
        </select>-->
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
</template>

<style scoped>
.page-container {
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
  /* Your styles for the form selects */
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
  appearance: none; /* Remove default styling in some browsers */
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
    /* Optional: add additional styling for spacing, margin, etc. */
  }
  .order-form__form {
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  }
  .shoe-image__img {
  width: 40em;
}
}
</style>
