<template>
    <small :style="`background-color: ${color}`" class="text-white py-[2px] px-2 rounded inline-block mr-1 mt-[5px]">{{text}}</small>
</template>
<script setup>
const props = defineProps({
    color: String,
    text: String
})
</script>