<script setup>
    import { ref, onMounted } from 'vue';

    const orders = ref([]);
    const ws = new WebSocket("ws://localhost:3000/primus");
    ws.onopen = () => {
        console.log("Connected to websocket");
    };
    ws.onmessage = (event) => {
        console.log("Received message:", event.data);
        const data = JSON.parse(event.data);
        if (data.action === "create") {
            orders.value.push(data.data.shoe);
        }
    };

    onMounted(async () => {
        try {
            const response = await fetch("http://localhost:3000/api/v1/shoes");
            const result = await response.json();
            console.log(result); // Log the data to the console

            const data = result.data[0].shoes;

            orders.value = data;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    });
    const newestFilter = () => {
        orders.value.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
    };
    newestFilter();

    const oldestFilter = () => {
        orders.value.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
    };
    oldestFilter();
</script>

<template>
  <div class="content">
    <h1>Orders</h1>
    <h2>Amount of orders: {{ orders.length }}</h2>

    <button @click="newestFilter">Newest first</button>
    <button @click="oldestFilter">Oldest first</button>

    <div v-for="o in orders" :key="o._id" class="order">
      <div class="order__img">
        <img src="../assets/schoen.png" alt="tijdelijk">
      </div>
    <div class="order__text">
        <p>Ordered on: {{ o.date }}</p>
        <p>Order from: {{ o.username }}</p>
        <p>Status: {{ o.status }}</p>
        <router-link :to="'/Orders/' + o._id">View details</router-link>
    </div>
      <div class="order__price">
        <p>€112</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

    .order{
        display: flex;
        flex-direction: row;
        background-color: #FFEBFB;
        padding: 1em 0.5em;
        border-radius: 8px;
        margin-bottom: 1em;
    }

    .order__img img{
        width: 120px;
    }

    .order__text p{
        margin-top: -0.5em;
    }

    .order__text{
        margin-left: 0.5em;
        margin-top: 0.5em;
    }

    .order__text a{
        background-color: white;
        padding: 0.5em 0.8em;
        border-radius: 8px;
        border-style: solid;
        border-color: #F433FF;
        border-width: 2px;
        text-decoration: none;
        color: black;
    }

    .order__price{
        margin-left: 1.8em;
        margin-top: -1em;
    }

     @media (min-width: 600px) and (max-width: 1200px) {
         .content{
             margin-left: 2em;
             margin-right: 2em;
         }

        .order__img img{
            width: 200px;
        }

        .order__text p{
            margin-bottom: 1.5em;
        }

        .order__text{
            margin-left: 2em;
            display: flex;
            flex-direction: column;
        }

        .order__text a {
            padding: 0.6em 1.5em;
            margin: 2em auto;
            display: inline-block;
        }

        .order__price {
            margin-left: auto;
            margin-right: 2em;
        }
    }

    @media (min-width: 1201px){
        .content{
            margin-left: 220px;
            margin-right: 220px;
        }

        .order{
            font-size: 1.2em;
        }

        .order__img img{
            width: 260px;
        }

        .order__text p{
            margin-bottom: 2em;
        }

        .order__text{
            margin-left: 2em;
            display: flex;
            flex-direction: column;
        }

        .order__text a {
            padding: 0.6em 1.5em;
            margin: 2em auto;
            margin-bottom: -1em;
            margin-left: -0.2em;
            display: inline-block;
        }

        .order__price {
            margin-left: auto;
            margin-right: 4em;
        }
    }

</style>