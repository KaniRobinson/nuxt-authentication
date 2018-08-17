<template>
    <div class="bg-blue-dark">
        <div class="container mx-auto px-4">
            <div class="flex items-center md:justify-between py-4">
                <!-- Burger Menu -->
                <div class="w-1/4 md:hidden">
                    <svg class="fill-current text-white h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M16.4 9H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zm0 4H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zM3.6 7h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1z"/></svg>
                </div>

                <!-- Logo -->
                <div class="w-1/2 md:w-auto text-center">
                    <nuxt-link to="/" class="no-underline text-grey-lighter text-2xl font-medium hover:text-white">Frontend</nuxt-link>
                </div>

                <!-- Header Navigation -->
                <div class="w-1/4 md:w-auto md:flex text-right">
                    <nuxt-link to="/login" class="bg-transparent text-white font-light border border-white ml-2 py-2 px-4 rounded no-underline" v-if="!this.authenticated">Login</nuxt-link>
                    <nuxt-link to="/register" class="bg-transparent text-white font-light border border-white ml-2 py-2 px-4 rounded no-underline" v-if="!this.authenticated">Register</nuxt-link>
                    <nuxt-link to="/dashboard" class="bg-transparent text-white font-light border border-white ml-2 py-2 px-4 rounded no-underline" v-if="this.authenticated">{{ me.first_name }} Dashboard</nuxt-link>
                    <button @click="post" class="bg-transparent text-white font-light border border-white ml-2 py-2 px-4 rounded no-underline" v-if="this.authenticated">Logout</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        computed: {
            ...mapGetters('user', [
                'authenticated',
                'me',
            ])
        },
        methods: {
            ...mapActions('logout', [
                'post'
            ])
        }
    }
</script>
