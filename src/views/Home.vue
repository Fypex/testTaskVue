<template>
    <div class="home">
        <!--    <img v-if="data.isEmpty()" class="preloader" width="150px" src="../assets/loading.gif" alt="">-->
        <div class="products">
            <div v-for="product in products" class="product">
                {{product.name}} ({{product.price}}$)
                <div>
                    <button v-on:click="setProductAction({
                        'product': product,
                        'total': product.price,
                        'subtotal': product.price,
                        'amount' : 1
                    })">Add To Cart</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        name: 'Home',
        data(){
            return {
                amount: []
            }
        },
        computed: {
            ...mapGetters({
                products: 'products/products',
            })
        },
        methods: {
            ...mapActions({
                setProductAction: 'cart/setProduct'
            }),
        }
    }
</script>
<style scoped lang="scss">
    .preloader{
        margin: 0 auto;
    }
    button{
        padding: 5px;
    }
    .products{

        margin: 0 auto;
        display: flex;
        width: 100%;
        max-width: 1200px;
        flex-wrap: wrap;

        .product{
            width: 100%;
            max-width: 31%;
            background: white;
            box-shadow: 0 1px 3px 0 #dbdbdb;
            margin: 1%;
            padding: 40px;
            border-radius: 6px;
            cursor: pointer;
            transition: all .3s;
            &:hover{
                background: #42b983;
                color: white;
            }
        }

        @media screen and (max-width: 768px) {
            .product{
                max-width: 48%;
            }
        }
        @media screen and (max-width: 468px) {
            .product{
                max-width: 98%;
            }
        }

    }
</style>
