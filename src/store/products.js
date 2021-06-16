import axios from 'axios'

export default {
    namespaced: true,

    state: {
        products: null
    },
    getters: {
        products (state) {
            return state.products
        },
    },
    mutations: {
        SET_PRODUCTS(state, value) {
            state.products = value
        },
    },
    actions: {
        async getProducts({ dispatch }) {
            return dispatch('products')
        },
        products({ commit }) {
            return axios.get('/products').then((response) => {
                commit('SET_PRODUCTS', response.data)
            }).catch(() => {
                commit('SET_PRODUCTS', null)
            })
        }
    }
}
