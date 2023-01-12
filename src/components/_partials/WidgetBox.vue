<template>
<div class="publish-box border-[1px] mb-4 rounded-sm">
    <h4 class="text-lg font-bold border-b-[1px] py-2 px-3">{{title}}</h4>
    <div v-if="subtitle" class="p-3">
        {{subtitle}}
    </div>
    <div class="p-3">
        <slot></slot>
    </div>
</div>
</template>

<script setup>
const props = defineProps({
    title: String,
    subtitle: String
})
</script>