import auth from "./auth";

export default {
    namespaced: true,
    state: {
        cart: {
            products: []
        }
    },
    getters: {
        products (state) {
            return state.cart.products
        },
    },
    mutations: {
        CART_SET_PRODUCT(state, item) {
            let exits = state.cart.products.some((product) => {
                return product.product.id === item.product.id
            })
            if (!exits){
                state.cart.products.push(item)
            }
        },
        CART_REMOVE_PRODUCT(state, product_id) {
            state.cart.products = state.cart.products.filter((product) => {
                return product.product.id !== product_id;
            });
        },
        CART_MINUS_PRODUCT(state, product_id) {
            let index = state.cart.products.findIndex((product) => {
                return product.product.id === product_id;
            });
            state.cart.products[index].amount -= 1;
        },
        CART_PLUS_PRODUCT(state, product_id) {
            let index = state.cart.products.findIndex((product) => {
                return product.product.id === product_id;
            });
            state.cart.products[index].amount += 1;
        },
        CART_CALCULATE_PRODUCT(state, product_id) {

            let index = state.cart.products.findIndex((product) => {
                return product.product.id === product_id;
            });
            let originalPrice = state.cart.products[index].product.price;
            let amount = state.cart.products[index].amount;
            let result = originalPrice * amount;
            state.cart.products[index].total = result;
            state.cart.products[index].subtotal = result;

        },
        CART_CALCULATE_DISCOUNT_PRODUCT(state, product_id) {
            let index = state.cart.products.findIndex((product) => {
                return product.product.id === product_id;
            });
            let subtotal = state.cart.products[index].subtotal;

            if (auth.state.discount){
                let discount = subtotal / 100 * auth.state.discount
                state.cart.products[index].total = subtotal - discount;
            }
        },
        CART_RECALCULATE_DISCOUNT_PRODUCTS(state){
            state.cart.products.map(function(value, key) {
                if ( auth.state.discount > 0){
                    state.cart.products[key].total -= value.subtotal / 100 * auth.state.discount;
                }else{
                    state.cart.products[key].total = value.subtotal
                }
            });
        },
        CLEAR_CART(state){
            state.cart.products = [];
        },
        SAVE_CART(state){
            localStorage.setItem('cart', JSON.stringify(state.cart.products));
        },
        RESTORE_CART(state){
            if (localStorage.getItem('cart')){
                state.cart.products = JSON.parse(localStorage.getItem('cart'));
            }

        }
    },
    actions: {
        productsRestore({commit}){
            commit('RESTORE_CART')
        },
        clearCart({ commit }){
            commit('CLEAR_CART')
        },
        minusProduct({ dispatch }, product_id) {
            return dispatch('minus_product', product_id)
        },
        plusProduct({ dispatch }, product_id) {
            return dispatch('plus_product', product_id)
        },
        setProduct({ dispatch }, product) {
            return dispatch('add_product', product)
        },
        removeProduct({ dispatch }, product_id) {
            return dispatch('remove_product', product_id)
        },
        async getProducts({ dispatch }) {
            return dispatch('products')
        },
        add_product({ commit }, product) {
            commit('CART_SET_PRODUCT', product)
            commit('CART_CALCULATE_DISCOUNT_PRODUCT', product.product.id)
            commit('SAVE_CART')
        },
        remove_product({ commit }, product_id) {
            commit('CART_REMOVE_PRODUCT', product_id)
            commit('SAVE_CART')
        },
        minus_product({ commit }, product_id) {
            commit('CART_MINUS_PRODUCT', product_id)
            commit('CART_CALCULATE_PRODUCT', product_id)
            commit('CART_CALCULATE_DISCOUNT_PRODUCT', product_id)
            commit('SAVE_CART')
        },
        plus_product({ commit }, product_id) {
            commit('CART_PLUS_PRODUCT', product_id)
            commit('CART_CALCULATE_PRODUCT', product_id)
            commit('CART_CALCULATE_DISCOUNT_PRODUCT', product_id)
            commit('SAVE_CART')
        },
        recalculate({ commit }) {
            commit('CART_RECALCULATE_DISCOUNT_PRODUCTS')
            commit('SAVE_CART')
        },

    }
}
