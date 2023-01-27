<template>
    <div class="media-upload-wrap">
        <div class="flex mb-6">
            <h2 class="font-bold text-xl">Media Library</h2>
            <button @click="openUploadArea" class="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md ml-6 -mt-1">Add New</button>
        </div>

        <Alert v-if="errorMsg">
            <span class="block sm:inline">{{errorMsg}}</span>
        </Alert>

        <div class="mb-5 clear-both">
            <div v-for="(file, i) in base64files.base" class="float-left ">
                <img :src="file" class="w-[100px] h-[75px] rounded-md mr-3 mb-5">
            </div>
        </div>

        <form action="" @submit="uploadFiles">
            <div class="flex items-center justify-center w-full" :class="(uploadArea == false) ? 'hidden' : '' ">
                <label for="dropzone-file" class="relative flex flex-col items-center justify-center w-full h-auto border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 mb-6">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <FileUploadCloud />
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 10MB)</p>

                        <button type="submit" class="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md mt-3" :class="(uploadBtn == false) ? 'hidden' : ''">Upload</button>
                    </div>
                    <input @change="fileChoosen" id="dropzone-file" type="file" class="hidden" multiple />
                    <div class="absolute right-3 top-3 z-50" @click="closeUploadArea">
                        <CloseIcon/>
                    </div>
                </label>
            </div> 

            <!-- Upload Progress bar -->
            <div v-if="store.state.mediaUpload.progressBar" class="relative w-full bg-gray-300 rounded-full h-4 text-sm text-center dark:bg-gray-700 mb-8">
                <span class="text-white -top-0.5 relative z-50">{{ store.state.mediaUpload.progress }}</span>
                <div class="bg-green-700 h-4 rounded-full absolute top-0" 
                :style="`width: ${store.state.mediaUpload.progress}%`"></div>
            </div>
        </form>
    </div>

    <div class="media-content-wrap relative">
        <AllMedia />
    </div>
</template>

<script setup>
import FileUploadCloud from '../../_icons/FileUploadCloud.vue'
import AllMedia from '../../page-group/media/AllMedia.vue'
import CloseIcon from '../../_icons/CloseIcon.vue'
import Alert from '../../_partials/Alert.vue';
import {ref} from 'vue'
import store from '../../../store'


let errorMsg = ref('');
let uploadBtn = ref(false)
const base64files = ref({
    'base' : {},
    'name' : {}
})

//Submit and upload files
function uploadFiles(ev){
    ev.preventDefault()
    store.dispatch('addToMediaLibrary', base64files.value)
    .then( (res) => {
        errorMsg.value = '';
        store.commit('notify', {
            type: 'success',
            message: res.data //Message from backend
        })
        store.commit("uploadSuccess", false)
    })
    .catch((err) => {
        console.log(err)
        errorMsg.value = err.response.data.message;
    })
}

function fileChoosen(ev){
    uploadBtn.value = true

    if (window.File && window.FileReader && window.FileList && window.Blob) {
        const files = ev.target.files;
        for (let i = 0; i < files.length; i++) {
        if (!files[i].type.match("image")) continue;
            const picReader = new FileReader();
            
            picReader.addEventListener("load", function (event) {
                const picFile = event.target;
                base64files.value.base[i] = picFile.result
                base64files.value.name[i] = files[i].name
            });
            picReader.readAsDataURL(files[i]);
        }
    }
}



let uploadArea = ref(false)

function openUploadArea(ev){
    uploadArea.value = true
}
function closeUploadArea(ev){
    ev.preventDefault()
    uploadArea.value = false
}



</script>
