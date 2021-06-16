<template>
    <div class="signUp">
        <input required type="text" v-model="form.name" placeholder="Name">
        <input required type="email" v-model="form.email" placeholder="Email">
        <input required type="password" v-model="form.password" placeholder="Password">
        <input required type="password" v-model="form.password_confirmation" placeholder="Confirmation">
        <button v-on:click="signUp">SignUp</button>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: 'SignUp',
        data() {
            return {
                form:{
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
                }
            }
        },
        methods:{
            ...mapActions({
                signUpAction: 'auth/signUp'
            }),
            async signUp() {
                await this.signUpAction(this.form)
            }
        }
    }
</script>
<style scoped lang="scss">
    .signUp{
        display: flex;
        height: 80vh;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        input{
            border: 1px solid #d7d7d7;
            outline: none;
            width: 100%;
            max-width: 250px;
            padding: 10px;
            margin: 5px;
        }

        button{
            width: 100%;
            max-width: 250px;
            padding: 10px;
            margin: 5px;
            cursor: pointer;
        }

    }
</style>
