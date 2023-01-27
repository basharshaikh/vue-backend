<template>

<div v-if="media.data?.length == 0">
    <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
        <p class="font-bold">Empty!</p>
        <p>No blog available now.</p>
    </div>
</div>

<div v-else class="relative" >
    <div v-if="!loadingMediaGrid" class="grid grid-cols-3 lg:grid-cols-8 gap-2 sm:grid-cols-3 md:grid-cols-6">
        <div v-for="(media, i) in media.data" @click="getMediaData" class="media-single-view h-[120px] bg-[#1E293B] border-[#1E293B] rounded-sm overflow-hidden bg-cover bg-no-repeat bg-center cursor-pointer" :class="(media.id == activeMediaId) ? 'border-4' : ''" :style="{ backgroundImage: 'url(' + media.media[0].original_url + ')' }" :media-data-id="media.id">
            <CheckedIcon :class="(media.id == activeMediaId) ? '' : 'hidden'" class="media-checked-icon bg-[#1E293B] p-1 rounded-br-sm inline-block"/>
        </div>
    </div>
    <div v-else><InfiniteLoading /></div>

    <div v-if="activeMediaId" class="fixed overflow-auto w-[300px] h-[92%] right-0 border-[1px] border-t-0 border-r-0 p-4 pt-8 top-16 bg-white z-[100]">
        <CloseIcon class="abosolute cursor-pointer" @click="inactiveMedia" />
        <div class="single-media-info text-left">
            <div class="flex">
                <div class="w-[50%]">
                    <Button class="mt-3" @click="insertMedia" text="Insert" BGcolor="indigo"/>
                </div>
                <div class="w-[50%] text-right">
                    <Button class="mt-3" text="Delete" BGcolor="#D53343" :media-id="media.id" @click="deleteMedia(activeMediaId)"/>
                </div>
            </div>
            <img class="w-[100%] mt-4 mb-4" :src="singleMedia.url" :alt="singleMedia.alt">
            <label class="mb-3 block border-[1px] p-2 break-all">Name: <br> {{singleMedia.alt}}</label>
            <label class="mb-2">File Url:</label>
            <textarea disabled class="w-[100%] border-[1px] p-2" rows="7">{{singleMedia.url}}</textarea>
        </div>
    </div>

    <!-- Pagination -->
    <Pagination :pagLinks="pagLinks" @getPageData="getPageMedia"/>
</div>
</template>

<script setup>
import store from '../../../store'
import CheckedIcon from '../../_icons/CheckedIcon.vue'
import Button from '../../_partials/Button.vue'
import CloseIcon from '../../_icons/CloseIcon.vue'
import Pagination from '../../_partials/Pagination.vue'
import {computed, ref, watch} from 'vue'
import InfiniteLoading from '../../_icons/InfiniteLoading.vue'

const media = ref({})
const pagLinks = ref({})
const singleMedia = ref({})
const activeMediaId = computed(() => store.state.mediaLibrary.id);


// define emit
const emit = defineEmits(["insertMedia"])
function insertMedia(){
    emit("insertMedia");
}

// Reset active media
function inactiveMedia(ev){
    store.commit('activeMedia', {
        active: false,
        id: '',
        url: ''
    })
}

// click on media
function getMediaData(ev){
    let mediaId = ev.currentTarget.getAttribute('media-data-id')

    // get active media data
    store.dispatch('getSingleMedia', mediaId)
    .then((res) => {
        singleMedia.value = res.data
        store.commit('activeMedia', {
            active: true,
            id: mediaId,
            url: singleMedia.value.url
        })
    })
}


// Show all media
const loadingMediaGrid = ref(true)
store.dispatch('allMeidiaLibrary')
.then( (res) => {
    loadingMediaGrid.value = false
    media.value = res.data
    
    pagLinks.value = {
        links: res.data.links,
        per_page: res.data.per_page,
        total: res.data.total,
    }
})


watch(() => store.state.mediaUploaded, 
() => {
    store.dispatch('allMeidiaLibrary')
    .then( (res) => {
        loadingMediaGrid.value = false
        media.value = res.data
        
        pagLinks.value = {
            links: res.data.links,
            per_page: res.data.per_page,
            total: res.data.total,
        }
    })
})

// Get paginated media
function getPageMedia(link){
    if (!link.url || link.active) {
        return;
    }
    store.dispatch("paginatedMedia", {url: link.url})
    .then((res) => {
        media.value = res.data
        pagLinks.value = {
            links: res.data.links,
            per_page: res.data.per_page,
            total: res.data.total,
        }
    })
}

// Delete a media
function deleteMedia(id){
    if(confirm("Are you sure?")){
        store.dispatch("deleteSingleMedia", id)
        .then((res) => {
            store.commit('notify', {
                type: 'success',
                message: res.data
            })

            store.dispatch('allMeidiaLibrary')
            .then( (res) => {
                loadingMediaGrid.value = false
                media.value = res.data
                
                pagLinks.value = {
                    links: res.data.links,
                    per_page: res.data.per_page,
                    total: res.data.total,
                }
            })

            store.commit('activeMedia', {
                active: false,
                id: '',
                url: ''
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
}
</script>