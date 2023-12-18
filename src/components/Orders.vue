<script setup>
    import { ref, onMounted } from 'vue';
    import { jwtDecode } from "jwt-decode";
    const orders = ref([]);
    const ws = new WebSocket("wss://eindbaasdev.onrender.com/primus");

    ws.onopen = () => {
        console.log("Connected to websocket");
    };

    ws.onmessage = (event) => {
        console.log("Received message:", event.data);
        const data = JSON.parse(event.data);
        if (data.action === "create") {
            orders.value.push(data.data.shoe);
        } else if (data.action === "updateStatus") {
            // Update the status in the local orders array
            console.log("Updating status:", data.orderId, data.newStatus);

            const orderToUpdate = orders.value.find(order => order._id === data.orderId);
            if (orderToUpdate) {
                orderToUpdate.status = data.newStatus;
                console.log("Orders array after update:", orders.value);
            }
        }
    };

    onMounted(async () => {
        console.log(localStorage.getItem("token"));
        //decode jwt token
        const decoded = jwtDecode(localStorage.getItem("token"));
        console.log(decoded);
        
        try {
            const response = await fetch("https://eindbaasdev.onrender.com/api/v1/shoes", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            });
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
  <div class="content">
    <h1 class="content__title">Orders</h1>
    <h2 class="content__subtitle">Amount of orders: {{ orders.length }}</h2>

    <button class="content__btn" @click="newestFilter">Newest first</button>
    <button class="content__btn" @click="oldestFilter">Oldest first</button>

    <div v-for="o in orders" :key="o._id" class="order">
      <div class="order__img">
        <img src="../assets/schoen.png" alt="tijdelijk">
      </div>
    <div class="order__text">
        <p>Ordered on: {{ formatDate(o.date) }}</p>
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
    .content {
        font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    }
    .order{
        display: flex;
        flex-direction: row;
        background-color: #FFEBFB;
        padding: 1em 0.5em;
        border-radius: 8px;
        margin-bottom: 1em;
        /*font-family: sans-serif;*/
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
        padding-left: 1em;
        margin-top: -1em;
        font-weight: bold;
    }
    .content__btn{
        background-color: #F433FF;
        padding: 0.5em 0.8em;
        border-radius: 8px;
        border-style: solid;
        border-color: #F433FF;
        border-width: 2px;
        text-decoration: none;
        color: white;
        margin-bottom: 1em;
        margin-right: 1em;
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
            font-size: 1em;
            padding-bottom: 1em;
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
            margin-top: -0.2em;
        }

        .order__price {
            margin-left: auto;
            margin-right: 4em;
        }
    }

</style>