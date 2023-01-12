<template>
    <button 
    :disabled="loading"
    :type="type" 
    :class="
        `group relative flex justify-center py-2 px-4 border rounded-sm border-transparent text-sm font-medium text-${Tcolor} bg-${BGcolor}-600 hover:bg-${BGcolor}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${BGcolor}-500 ${RoundLeflt} ${RoundRight}`
    "
    >
        {{text}}
        <LoadingSpinner v-if="loading" />
    </button>
</template>

<script setup>
import LoadingSpinner from '../_icons/LoadingSpinner.vue'

const props = defineProps({
    loading: Boolean,
    type: {
        type: String,
        default: 'submit'
    },
    text: {
        type: String,
        default: 'Submit'
    },
    BGcolor: {
        type: String,
        default: 'indigo'
    },
    Tcolor:{
        type: String,
        default: 'white'
    },
    RoundL: {
        type: String,
        default: 'yes'
    },
    RoundR: {
        type: String,
        default: 'yes'
    }
})


let RoundLeflt = '';
if(props.RoundL == 'no'){
    RoundLeflt = ' rounded-l-none'
} else {
    RoundLeflt = ''
}
let RoundRight = '';
if(props.RoundR == 'no'){
    RoundRight = ' rounded-r-none'
} else {
    RoundRight = ''
}
</script>