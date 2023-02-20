<template>
    <div class="mb-4">
        <h3 class="font-bold text-xl mb-2">Blog List</h3>
        <p>You can edit or delete blog from here by click on pencil icon or trash icon</p>
    </div>
    <div v-if="!loading">
        <div v-if="blogs && blogs.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:grid-cols-1 md:grid-cols-2">
            <div v-for="(blog, i) in blogs" class="bg-cyan-100 rounded-md overflow-hidden">

                <div v-if="blog.mediaUrl" class="relative">
                    <img class="w-full h-60 object-cover" :src="blog.mediaUrl" alt="">
                </div>
                <div v-else class="relative">
                    <div class=" h-[188px] bg-[#333]"></div>
                </div>

                <div class="project-cont p-4">
                    <h3 class="mb-2 font-bold text-md relative">{{blog.title}}</h3>
                    <div class="mb-2 flex justify-between mt-3 border-y py-2 pb-1 border-white">
                        <p class="font-semibold flex text-cyan-900">
                            <PencilSquareIcon class="h-4 text-cyan-600"/>
                            <span class="text-sm relative -top-[3px] ml-1">{{ blog.author.name }}</span>
                        </p>
                        <p class="font-semibold flex text-cyan-900">
                            <ClockIcon class="h-4 text-cyan-600"/>
                            <span class="text-sm relative -top-[3px] ml-1">{{ blog.created_at }}</span>
                        </p>
                    </div>
                    <p>{{blog.excerpt}}</p>
                </div>

                <div class="px-4 pb-2">
                    <p class="font-bold mb-1">Categories:</p>
                    <span class="vbc-pill" v-for="(cat, ind) in blog.catsInfo">{{ cat.title }}</span>
                </div>

                <div class="border-t border-white flex justify-between p-2">
                    <router-link :to="`/edit-blog/${blog.id}`">
                        <EditIcon/>
                    </router-link>
                    <DeleteIcon @click="deleteBlog(blog.id)"/>
                </div>
            </div>
        </div>
        <div v-else class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
            <p class="font-bold">Empty!</p>
            <p>No blog available now.</p>
        </div>
    </div>
    <div v-else><InfiniteLoading /></div>
    <!-- Pagination -->
    <Pagination :pagLinks="pagLinks" @getPageData="getPageBlog"/>
</template>

<script setup>
import EditIcon from '../../_icons/EditIcon.vue';
import DeleteIcon from '../../_icons/DeleteIcon.vue';
import Pagination from '../../_partials/Pagination.vue';
import InfiniteLoading from '../../_icons/InfiniteLoading.vue';
import {ref} from 'vue'
import store from '../../../store';
import { ClockIcon, PencilSquareIcon } from '@heroicons/vue/24/solid';

//Get all blogs
const loading = ref(true)
const pagLinks = ref({})
const blogs = ref([])
store.dispatch("allBlogs")
.then((res) => {
    // console.log(res)
    blogs.value = res.data.data
    loading.value = false
    pagLinks.value = res.data.meta
})

// Get paginated blogs
function getPageBlog(link){
    if (!link.url || link.active) {
        return;
    }
    store.dispatch("paginatedBlog", {url: link.url})
    .then((res) => {
        blogs.value = res.data.data
        pagLinks.value = res.data.meta
    })
}

// delete blog
function deleteBlog(blogId){
    if(confirm("Do you want to delete this Blog?")){
    store.dispatch("deleteBlog", blogId)
    .then((res) => {
        store.commit('notify', {
            type: 'success',
            message: res.data
        })
        store.dispatch("allBlogs")
        .then((res) => {
            blogs.value = res.data.data
            loading.value = false
        })
    })
    .catch(err => {
        store.commit('notify', {
            type: 'error',
            message: err.response.data
        })
    })
  }
}


</script>