<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <div v-if="!authenticated">
        <router-link to="/signIn">SignIn</router-link>
        <router-link to="/signUp">SignUp</router-link>
      </div>
      <div v-else>
        <router-link to="/about">{{user.name}}</router-link>
        <a href="#" @click.prevent="signOut">Sign out</a>
      </div>
        <a class="link cursor-pointer">Cart</a>

    </div>
    <router-view/>
  </div>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {
    mounted() {
      this.checkSignIn();
      this.getProducts();
    },
    computed: {
      ...mapGetters({
        authenticated: 'auth/authenticated',
        user: 'auth/user',
        products: 'products/products',
      })
    },
    methods: {
      ...mapActions({
        productsAction: 'products/getProducts',
        signOutAction: 'auth/signOut',
        checkSignInAction: 'auth/checkSignIn'
      }),
      async getProducts() {
        await this.productsAction()
      },
      async checkSignIn () {
        await this.checkSignInAction()
      },
      async signOut () {
        await this.signOutAction()
      }
    }
  }
</script>
<style lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  a {
    font-weight: bold;
    color: #2c3e50;
    margin-right: 10px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.cursor-pointer{
  cursor: pointer;
}
</style>
