<script setup>

</script>

<template>
  <div class="content">
    <h1>Orders</h1>
    <h2>Amount of orders: 12</h2>

    <div class="order">
        <div class="order__img">
            <img src="../assets/schoen.png" alt="tijdelijk">
        </div>
        <div class="order__text">
            <p>Order from: Username</p>
            <p>Status: <spam>In production</spam></p>
            <router-link to="/Orders/1">View details</router-link>
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

        .order__text a{
            padding: 0.6em 1.5em;
            margin-top: 2em;
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

        .order__text a{
            padding: 0.6em 1.5em;
            margin-top: 1.8em;
        }

        .order__price {
            margin-left: auto;
            margin-right: 4em;
        }
    }

</style>
