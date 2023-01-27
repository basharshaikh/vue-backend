<template>
    <div class="">
        <div v-if="blogs.length == 0">
            <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                <p class="font-bold">Empty!</p>
                <p>No blog available now.</p>
            </div>
        </div>
        <div v-else>
            <div class="mb-4">
                <h3 class="font-bold text-xl mb-2">Blog List</h3>
                <p>You can edit or delete blog from here by click on pencil icon of trash icon</p>
            </div>
            <div v-if="!loading" class="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:grid-cols-1 md:grid-cols-2">
                <div v-for="(blog, i) in blogs" class="bg-[#FEFFE1] rounded-md overflow-hidden">

                    <div v-if="blog.mediaUrl" class="relative">
                        <img :src="blog.mediaUrl" alt="">
                    </div>
                    <div v-else class="relative">
                        <div class=" h-[188px] bg-[#333]"></div>
                    </div>

                    <div class="project-cont p-4">
                        <h3 class="mb-2 font-bold text-md relative">{{blog.title}}</h3>
                        <p class="text-sm">{{blog.excerpt}}</p>
                    </div>

                    <div class="border-t border-[#f1f1f1] flex justify-between p-2">
                        <router-link :to="`/edit-blog/${blog.id}`">
                            <EditIcon/>
                        </router-link>
                        <DeleteIcon @click="deleteBlog(blog.id)"/>
                    </div>
                </div>
            </div>
            <div v-else><InfiniteLoading /></div>
            <!-- Pagination -->
            <Pagination :pagLinks="pagLinks" @getPageData="getPageBlog"/>
        </div>

        
    </div>
</template>

<script setup>
import EditIcon from '../../_icons/EditIcon.vue';
import DeleteIcon from '../../_icons/DeleteIcon.vue';
import Pagination from '../../_partials/Pagination.vue';
import InfiniteLoading from '../../_icons/InfiniteLoading.vue';
import {ref} from 'vue'
import store from '../../../store';

//Get all blogs
const loading = ref(true)
const pagLinks = ref({})
const blogs = ref({})
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
  }
}


</script>