<template>
    <div class="flex mb-4">
        <div class="w-full bg-white border border-grey p-5 rounded">
            <h1 class="mb-5">Forgot Password</h1>
            <form class="w-full" @submit.prevent="post">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="email">Email Address</label>
                        <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey" id="email" type="email" placeholder="jane@doe.com" v-model="email">
                        <p v-if="emailErrors" v-for="(error, index) in emailErrors" :key="index" class="text-red text-xs italic mt-2">{{ error }}</p>
                    </div>
                </div>

                <div class="flex items-center justify-between">
                    <button :disabled="loading" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">{{ loading ? 'Loading' : 'Send' }}</button>
                    <nuxt-link to="/login" class="no-underline inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker">Remembered your password?</nuxt-link>
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
            ...mapGetters('forgot', [
                'loading',
                'emailErrors'
            ]),

            ...mapTwoWayState('forgot', {
                email: 'setEmail',
            })
        },

        methods: {
            ...mapActions('forgot', [
                'post'
            ])
        }
    }
</script>
