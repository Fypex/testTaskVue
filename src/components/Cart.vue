<template>
  <div class="cart" v-bind:class="{'hide': isActive}">
    <div v-if="authenticated && discount" class="discount">
      Your discount - {{discount}}%
    </div>
    <div class="products">

      <div v-if="cart.length === 0">
        Empty
      </div>

      <div v-for="item in cart" class="product">
        <div class="info">
          <p>{{item.product.name}}</p>
          <p>{{item.total}}$ <span v-if="discount">({{item.subtotal}}$)</span></p>
        </div>
        <div class="actions">
          <button v-on:click="minusAction(item.product.id)" v-if="item.amount > 1">-</button>
          <button v-on:click="plusAction(item.product.id)">+</button>
          <button v-on:click="removeAction(item.product.id)">Del</button>
        </div>
      </div>
    </div>
    <div class="buy">
      <button v-on:click="buy()" v-if="cart.length" class="buy-btn">Buy</button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import axios from "axios";

export default {
  name: 'Cart',
  props: ['isActive'],
  data(){
    return {
      items: {
        products:{

        }
      }
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      cart: 'cart/products',
      auth: 'auth/user',
      discount: 'auth/discount',
    })
  },
  methods:{
    ...mapActions({
      clearCartAction: 'cart/clearCart',
      removeAction: 'cart/removeProduct',
      plusAction: 'cart/plusProduct',
      minusAction: 'cart/minusProduct',
    }),
    buy(){
      this.items.products = [];
      this.cart.map((value) => {
        this.items.products.push({
          id: value.product.id,
          amount: value.amount
        });
      });

      this.$emit('toggle-cart');
      this.buyRequest();

    },
    async buyRequest(){
      return await axios.post('/products/order', this.items).then((response) => {
        let id = response.data;
        this.clearCartAction();
        this.$router.replace({name: 'Success', params: {id}})

      }).catch((e) => {
        console.log(e);
      })

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cart{
  min-width: 310px;
  position: absolute;
  background: white;
  box-shadow: 0 0 3px 0 #d5d5d5;
  border-radius: 4px;
  right: 0;
  top: 40px;
  margin: 10px;
  padding: 10px;
  .discount{
    margin-bottom: 10px;
  }
  .products{
    overflow-y: auto;
    max-height: 300px;
    padding: 10px;
    .product{
      display: flex;
      flex-direction: column;
      width: 100%;
      background: #ffffff;
      border-radius: 4px;
      padding: 10px;
      box-shadow: 0 0 3px 0 #dddddd;
      margin-bottom: 10px;
      .info{
        display: flex;
        justify-content: space-between;
      }
      .actions{
        display: flex;
        justify-content: flex-end;
        button{
          cursor: pointer;
          padding: 5px;
          min-width: 20px;
        }
      }
    }
  }
  .btn, .buy-btn{
      width: 100%;
      padding: 10px;
      cursor: pointer;
  }
}
.hide {
  display: none;
}
</style>
