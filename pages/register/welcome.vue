<template>
    <div class="flex mb-4">
        <div class="w-full bg-white border border-grey p-5 rounded">
            <h1 class="mb-5">Welcome to Frontend</h1>
            <p>Please check your email to continue...</p>
        </div>
    </div>
</template>

<script>
    export default {
        middleware: 'guest',

        fetch({ store }) {
            store.dispatch('navigation/fill', store.state.navigation.defaultNavigation)
        }
    }
</script>
