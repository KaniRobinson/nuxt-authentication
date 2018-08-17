<template>
    <div class="flex mb-4">
        <div class="w-full bg-white border border-grey p-5 rounded">
            <h1 class="mb-5">Frontend Authentication Implementation</h1>
            <p class="mb-5 text-grey-darker">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit urna id venenatis euismod. Morbi sed augue augue. Nunc quis gravida quam. Vivamus eget porttitor dui, placerat rutrum mauris. Phasellus sagittis nisi vitae varius rhoncus. Aenean magna mi, placerat at maximus id, fermentum non lacus. Quisque commodo eu velit sit amet vulputate. In lorem mauris, ornare eu felis id, feugiat semper metus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla facilisi. Integer augue nisl, dignissim sed pharetra eu, tempus a nunc. Integer leo libero, luctus et sem non, pretium cursus massa. Quisque in dolor sapien. Suspendisse ut magna pellentesque, lobortis orci et, bibendum nulla. Aenean bibendum mi quis vulputate fermentum.</p>
        </div>
    </div>
</template>

<script>
    export default {
        fetch({ store }) {
            store.dispatch('navigation/fill', store.state.navigation.defaultNavigation)
        }
    }
</script>
