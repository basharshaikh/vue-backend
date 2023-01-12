<template>
    <div>
        <RoundedButton class="relative header-popup" @click="togglePopup">
            <div class="popup-back-glass w-full h-full top-0 right-0 fixed bg-black opacity-20 -z-1 hidden"></div>
            <slot name="iconWrap"></slot>
            <div class="codelover-arrow hidden w-0 absolute border-slate-500 border-b-[12px] bottom-[-13px] "></div>
        </RoundedButton>

        <div class="cursor-default header-pop-content absolute hidden top-[45px] -right-4 min-w-[250px] bg-slate-500 min-h-[100px] rounded-md shadow-sm border p-4 text-left z-100">
            <slot name="contentWrap"></slot>
        </div>
    </div>
</template>

<script setup>
import RoundedButton from './RoundedButton.vue'
import {ref} from 'vue'



// toggle the popup
let toggler = ref(true)
function togglePopup(ev){
    let headerIcons = document.getElementsByClassName("header-popup")
    if(toggler.value){
        for (var hIcon of headerIcons) {
            hIcon.classList.remove("active")
        }
        ev.currentTarget.classList.add("active")
        toggler.value = false
    } else {
        for (var hIcon of headerIcons) {
            hIcon.classList.remove("active")
        }
        ev.currentTarget.classList.remove("active")
        toggler.value = true
    }
}
</script>