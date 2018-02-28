<template>
    <div id="text">{{text}}</div>
</template>

<script>
    export default {
        data() {
            return {
                text: 'hello vue！'
            }
        }
    }
</script>

<style>
    #text{
        color: red
    }
</style>