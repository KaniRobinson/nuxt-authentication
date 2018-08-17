<template>
    <div class="flex mb-4"></div>
</template>

<script>
    export default {
        middleware: 'guest',

        fetch({ store, params }) {
            store.dispatch('confirm/post', params.token)
        }
    }
</script>
