<template>
    <div class="font-sans bg-grey-lighter flex flex-col min-h-screen w-full">
        <NuxtHeader />
        <NuxtNavigation />
        <div class="flex-grow container mx-auto sm:px-4 pt-6 pb-8">
            <nuxt />
        </div>
    </div>
</template>

<script>
    import NuxtHeader from '~/components/NuxtHeader.vue'
    import NuxtNavigation from '~/components/NuxtNavigation.vue'

    export default {
        components: {
            NuxtHeader,
            NuxtNavigation
        },

        mounted() {
            this.$store.dispatch('user/index')
            this.$store.dispatch('login/refreshTimer')
        },

        watch: {
            $route () {
                this.$store.dispatch('user/index')
            }
        }
    }
</script>

