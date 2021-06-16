import axios from 'axios'
import router from '../router'
import products from "./products";
import cart from "./cart";

export default {
    namespaced: true,

    state: {
        authenticated: false,
        user: null,
        discount: null
    },
    getters: {
        authenticated (state) {
            return state.authenticated
        },
        user (state) {
            return state.user
        },
        discount (state) {
            return state.discount
        },
    },
    mutations: {
        SET_AUTHENTICATED (state, value) {
            state.authenticated = value
        },
        SET_USER (state, value) {
            state.user = value
        },
        SET_DISCOUNT (state, value) {
            state.discount = value
        }
    },
    actions: {
        async signUp({ dispatch }, credentials){
            await axios.post('/signUp', credentials).then(() => {
                router.push({path: '/signIn'})
            }).catch(() => {

            })
        },
        async signIn({ dispatch }, credentials) {
            await axios.get('/sanctum/csrf-cookie')
            await axios.post('/signIn', credentials)
            return dispatch('me')
        },
        async signOut({ dispatch }) {
            await axios.post('/logout')
            return dispatch('me')
        },
        async checkSignIn({ dispatch }) {
            return dispatch('me')
        },
        me ({ commit }) {
            return axios.get('/user').then((response) => {
                let discount = null;
                if (response.data.active_discount){
                    discount = response.data.active_discount.discount.discount_percent;
                }
                commit('SET_AUTHENTICATED', true)
                commit('SET_USER', response.data)
                commit('SET_DISCOUNT', discount)
                commit('cart/CART_RECALCULATE_DISCOUNT_PRODUCTS')
            }).catch(() => {
                commit('SET_AUTHENTICATED', false)
                commit('SET_USER', null)
                commit('SET_DISCOUNT', null)
                commit('cart/CART_RECALCULATE_DISCOUNT_PRODUCTS')
            })
        }
    },
    modules: {
        cart
    }
}
