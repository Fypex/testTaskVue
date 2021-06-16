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
      <div>
        <a v-on:click="toggle" class="link cursor-pointer" v-bind:class="{'router-link-exact-active': !isActive}">Cart</a>
        <Cart @toggle-cart="toggle" v-bind:isActive="isActive"></Cart>
      </div>
    </div>
    <router-view/>
  </div>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex'
  import Cart from './components/Cart'
  export default {
    data(){
      return {
        isActive: true,
        loading: false,
      }
    },
    mounted() {
      this.checkSignIn();
      this.getProducts();
      this.cartRestore();
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
        cartRestoreAction: 'cart/productsRestore',
        productsAction: 'products/getProducts',
        signOutAction: 'auth/signOut',
        checkSignInAction: 'auth/checkSignIn'
      }),

      toggle: function(value){
        this.isActive = !this.isActive
      },
      cartRestore(){
        this.cartRestoreAction();
      },
      async getProducts() {
        await this.productsAction()
      },
      async checkSignIn () {
        await this.checkSignInAction()
      },
      async signOut () {
        await this.signOutAction()
      }
    },
    components:{
      Cart
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
  min-height: 100vh;
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
