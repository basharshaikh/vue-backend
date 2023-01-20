<template>
    <div class="w-[300px] border text-center p-6">
        <img class="w-[100px] m-auto mb-2" src="http://127.0.0.1:8000/storage/130/upwork-VByt.png" alt="">
        <div class="">
            <p><strong>Welocome!</strong> {{ userMeta.name }}</p>
            <p><strong>Email:</strong> {{ userMeta.email }}</p>
        </div>
        
    </div>
</template>

<script setup>
import store from '../store'
import {computed} from 'vue'

const userMeta = computed(() => store.state.userData);
</script>