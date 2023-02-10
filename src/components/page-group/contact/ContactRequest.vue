<template>
    
    <div class="grid grid-cols-1 lg:grib-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6">
        <div @click="expandThis" v-for="(contact) in contacts" class="bg-cyan-100 p-4 rounded-sm">
            <div class="flex justify-between cursor-pointer">
                <h2 class="font-bold text-lg">{{ contact.subject }}</h2>
                <ChevronDownIcon class="w-6"/>
            </div>

            <div class="">
                <h2>Name: <b>{{contact.name}}</b></h2>
                <h2>Email: <b>{{contact.email}}</b></h2>
                <h2>Phone Number: <b>{{contact.phone}}</b></h2>
                <h2>Website: <b>{{contact.website}}</b></h2>
                <div class="mt-2 border-t">
                    <QuillEditor :content="JSON.parse(contact.description)" toolbar="" :readOnly="true" style="" class="mb-3 rounded-sm" />
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import store from '../../../store';
import {ref} from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const contacts = ref({})
store.dispatch("getContactReq")
.then((res) => {
    contacts.value = res.data
})

function expandThis(ev){
    let elem = ev.target.classList.add("active")
}
</script>
