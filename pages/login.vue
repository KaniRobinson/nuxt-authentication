<template>
    <div class="flex mb-4">
        <div class="w-full bg-white border border-grey p-5 rounded">
            <h1 class="mb-5">Login</h1>
            <form class="w-full" @submit.prevent="post">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="username">Email Address</label>
                        <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey" id="username" type="email" placeholder="jane@doe.com" v-model="username">
                        <p v-if="usernameErrors" v-for="(error, index) in usernameErrors" :key="index" class="text-red text-xs italic mt-2">{{ error }}</p>
                    </div>
                </div>

                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="password">Password</label>
                        <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey" id="password" type="password" placeholder="******************" v-model="password">
                        <p v-if="passwordErrors" v-for="(error, index) in passwordErrors" :key="index" class="text-red text-xs italic mt-2">{{ error }}</p>
                    </div>
                </div>

                <div class="flex items-center justify-between">
                    <button :disabled="loading" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">{{ loading ? 'Loading' : 'Sign In' }}</button>
                    <nuxt-link to="/confirm/resend" v-if="show_resend" class="no-underline inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker">Resend Confirmation</nuxt-link>
                    <nuxt-link to="/forgot" class="no-underline inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker">Forgot Password?</nuxt-link>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'
    import { mapTwoWayState } from 'spyfu-vuex-helpers'

    export default {
        middleware: 'guest',

        fetch({ store }) {
            store.dispatch('navigation/fill', store.state.navigation.defaultNavigation)
        },

        computed: {
            ...mapGetters('login', [
                'loading',
                'errors',
                'show_resend',
                'usernameErrors',
                'passwordErrors',
            ]),

            ...mapTwoWayState('login', {
                username: 'setUsername',
                password: 'setPassword'
            }),
        },

        methods: {
            ...mapActions('login', [
                'post'
            ])
        }
    }
</script>
