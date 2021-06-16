<template>
    <div class="home">
        <!--    <img v-if="data.isEmpty()" class="preloader" width="150px" src="../assets/loading.gif" alt="">-->
        <div class="products">
            <div v-for="product in products" class="product">
                {{product.name}} ({{product.price}}$)
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: 'Home',
        computed: {
            ...mapGetters({
                products: 'products/products',
            })
        },
    }
</script>
<style scoped lang="scss">
    .preloader{
        margin: 0 auto;
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
