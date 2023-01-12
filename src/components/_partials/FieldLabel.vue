<template>
    <label class="font-bold mb-2 block text-gray-500">{{text}}</label>
</template>

<script setup>
const props = defineProps({
  text: String
});

</script>