<template>
    <div class="signIn">
        <input type="email" v-model="form.email" placeholder="Email">
        <input type="password" v-model="form.password" placeholder="Password">
        <button v-on:click="submit">SignIn</button>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name: 'SignIn',
        data() {
            return {
                form: {
                    email: '',
                    password: '',
                }
            }
        },
        methods: {
            ...mapActions({
                signIn: 'auth/signIn'
            }),

            async submit () {

                await this.signIn(this.form)
                await this.$router.replace({name: 'home'})

            }
        }
    }
</script>
<style scoped lang="scss">
    .signIn{
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
