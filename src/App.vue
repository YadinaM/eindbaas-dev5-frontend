<script setup>
  import { useRoute } from 'vue-router'
  const route = useRoute()
</script>

<template>
      <header v-if="route && route.path !== '/'">
        <nav>
            <div class="nav">
                <div>
                    <router-link to="/Shoe"><a><img src="./assets/logo.png" alt="terug naar home"></a></router-link>
                </div>
                <div class="nav__text">
                    <router-link to="/Orders"><a>Orders</a></router-link>
                    <router-link to="/"><a>Profile</a></router-link>
                    <router-link to="/Orders"><a class="nav__text__order">Order Shoe</a></router-link>
                </div>
            </div>
        </nav>
    </header>
    <div>
        <router-view></router-view>
    </div>
</template>

<style scoped>
  :root{ /* css variabelen */
      --colorText: black;
      --colorButton: #F433FF;
      --fontFamily: sans-serif;
  }

  body{
    font-family: var(--fontFamily);
  }

  nav{
    margin-top: 1em;
  }

  .nav{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
  }

  .nav img{
      width: 90px;
      margin-top: -1em;
  }

  .nav a{
      text-decoration: none;
      color: var(--colorText);
      margin-left: 0.3em;
      margin-right: 0.3em;
  }

  .nav__text{
      margin-top: 1.2em;
  }

  .nav__text .nav__text__order{
      color: white;
      background-color: #F433FF;
      padding: 0.5em 1em;
      border-radius: 30px;
  }

  @media (min-width: 600px) {
    .nav a{
        text-decoration: none;
        color: var(--colorText);
    }

    .nav img{
      width: 140px;
      margin-top: -2.5em;
    }

    .nav{
        display: flex;
        justify-content: space-between;
        margin-left: 2em;
        margin-right: 2em;
    }

    .nav__text .nav__text__order{
        margin-right: 2em;
    }
  }
</style>
