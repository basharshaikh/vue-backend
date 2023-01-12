<template>
    <button 
    :type="type" 
    @click="readyMediaSection"
    :class="`py-2 px-4 rounded-sm
        border border-transparent 
        text-sm font-medium text-${Tcolor} 
        bg-${BGcolor}-600 hover:bg-${BGcolor}-700 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${BGcolor}-500`">
        {{text}}
    </button>


    <!-- media instans -->
    <div v-if="showMedia" id="media-overlay-glass" @click="hideMediaSection" class="fixed w-[100%] h-[100%] bg-gray-900 top-0 left-0 bg-opacity-50 z-99999"></div>

    <div v-if="showMedia" class="overflow-auto fixed w-[96%] h-[400px] top-[20%] left-[2%] bg-white  shadow-lg p-5 rounded-md">
      <AllMedia @insertMedia="insertMediaa"/>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import store from "../../store";
import AllMedia from '../../components/page-group/media/AllMedia.vue';

const showMedia = ref(false)


const emit = defineEmits(["insertMediaa"])

function insertMediaa(){
    emit("insertMediaa");
}

const props = defineProps({
    type:{
        type: String,
        default: 'button'
    },
    text: {
        type: String,
        default: 'Enter'
    },
    BGcolor: {
        type: String,
        default: 'indigo'
    },
    Tcolor: {
        type: String,
        default: 'white'
    }
})

// Get ready media section to choose
function readyMediaSection(){
    showMedia.value = true
}
function hideMediaSection(){
    showMedia.value = false
}


</script>