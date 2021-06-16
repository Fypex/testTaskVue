<template>
    <div class="success">
        <h3>Thank you for the order. Your order #{{$route.params.id}} has been sent for processing</h3>
        <router-link to="/">Go to Home</router-link>
    </div>
</template>
<style scoped lang="scss">
    .success{
        display: flex;
        flex-direction: column;
        height: 80vh;
        align-items: center;
        justify-content: center;
        a{
            margin-top: 40px;
            padding: 10px 20px;
            font-size: 20px;
            text-decoration: none;
            color: #2c3e50;
            border: 1px solid #dbdbdb;
        }
    }
</style>
