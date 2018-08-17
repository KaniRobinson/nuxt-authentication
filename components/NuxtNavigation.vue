<template>
    <div v-if="visibility" class="hidden bg-blue-dark md:block md:bg-white md:border-b">
        <div class="container mx-auto px-4">
            <div class="md:flex">
                <div v-for="(item, index) in menuItems" :key="index" class="flex -mb-px mr-8">
                    <nuxt-link :to="item.path" class="no-underline text-white opacity-50 md:text-grey-dark md:opacity-100 flex items-center py-4 border-b border-transparent hover:opacity-100 md:hover:border-grey-dark">{{ item.name }}</nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: {
            ...mapGetters('navigation', [
                'navigation',
                'visibility',
            ]),

            ...mapGetters('user', [
                'authenticated'
            ]),

            menuItems () {
                return [...this.navigation].filter((value) => {
                    if(value.hasOwnProperty('auth')) {
                        if(!value.auth && this.authenticated || value.auth && !this.authenticated) {
                            return false
                        }
                    }

                    return true
                })
            }
        }
    }
</script>
