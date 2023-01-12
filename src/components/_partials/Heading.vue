<template>
    <div class="mb-3">
        <h3 class="font-bold text-xl mb-2">{{title}}</h3>
        <p>{{subtitle}}</p>
    </div>
</template>

<script setup>
const props = defineProps({
    title: String,
    subtitle: String
})
</script>