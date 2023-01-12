<template>

<div v-if="projects.data == ''">
    <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
        <p class="font-bold">Empty!</p>
        <p>No projects available now.</p>
    </div>
</div>

<div v-else>
    <div v-if="!loadProject" class="grid grid-cols-1 lg:grid-cols-4 gap-5 sm:grid-cols-1 md:grid-cols-2">
        <div v-for="(project, i) in projects.data" class="project-item bg-[#FEFFE1] rounded-md overflow-hidden">
            <div v-if="project.mediaUrl" class="project-img relative">
                <small v-if="project.label" class="bg-[#f71c4b] text-white py-[2px] px-2 rounded inline-block mr-1 mt-[5px] absolute top-1 right-1">{{project.label}}</small>
                <img :src="project.mediaUrl" alt="">
            </div>
            <div v-else class="project-img relative">
                <small v-if="project.label" class="bg-[#f71c4b] text-white py-[2px] px-2 rounded inline-block mr-1 mt-[5px] absolute top-1 right-1">{{project.label}}</small>
                <div class="preview-img h-[188px] bg-[#333]"></div>
            </div>

            <div class="project-cont p-4">
                <h3 class="mb-2 font-bold text-lg relative">{{project.title}}</h3>
                <p class="text-sm">{{project.excerpt}}</p>

                <div class="mt-3" v-if="(JSON.parse(project.ingredients)).length > 0">
                    <h4 class="font-medium">Ingredients:</h4>
                    <Pill v-for="(ingredient, i) in (JSON.parse(project.ingredients))" :color="ingredient.color" :text="ingredient.text"/>
                </div>
            </div>

            <div class="border-t border-[#f1f1f1] flex justify-between p-2">
                <router-link :to="`/project/${project.id}`" class="p-3 block">
                    <LinkOpen />
                </router-link>
                <DeleteIcon @click="deleteProject(project.id)"/>
            </div>
        </div>
    </div>
    <div v-else><InfiniteLoading /></div>

    <!-- Pagination -->
    <Pagination :pagLinks="pagLinks" @getPageData="getPageProject"/>
</div>
</template>

<script setup>
import { ref } from 'vue';
import LinkOpen from '../../_icons/LinkOpen.vue';
import Pagination from '../../_partials/Pagination.vue';
import store from '../../../store';
import DeleteIcon from '../../_icons/DeleteIcon.vue';
import Pill from '../../_partials/Pill.vue';
import InfiniteLoading from '../../_icons/InfiniteLoading.vue';
import { useRouter } from 'vue-router';
const router = useRouter()


const projects = ref({})
const pagLinks = ref({})
const loadProject = ref(true)

//
store.dispatch('projectLists')
.then( (res) => {
    loadProject.value = false
    projects.value = res.data
    pagLinks.value = res.data.meta
})
.catch((err) => {
    loadProject.value = false
    if(err.response.status == 403){
        router.push({name: 'NoAccess'})
    }
})




function getPageProject(link){
    if (!link.url || link.active) {
        return;
    }
    store.dispatch("paginatedProjects", {url: link.url})
    .then((res) => {
        projects.value = res.data
        pagLinks.value = res.data.meta
    })
    .catch((err) => {
        console.log(err)
    })
}

// Delete the project
function deleteProject(id){
  if(confirm("Do you want to delete this Project?")){
    store.dispatch("deleteProject", id)
    .then((res) => {
        store.commit('notify', {
            type: 'success',
            message: res.data
        })
        store.dispatch("projectLists")
        .then((res) => {
            projects.value = res.data
            pagLinks.value = res.data.meta
        })
    })
  }
}



</script>