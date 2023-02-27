<template>
<div>
    <h2>Data</h2>
    {{ data }}
</div>
</template>

<script setup>
import store from '../store';
import {ref} from 'vue'

const data = ref({})
// auth checker
store.dispatch("authChecker")
.then(res => {
    data.value = res.data
})
</script>