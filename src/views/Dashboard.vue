<template>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700">

  <!-- User profile  -->
  <div class="bg-white shadow-md p-3 flex flex-col order-1 lg:order-2 rounded-md">
    <h3 class="text-xl mb-4">Welcome <strong>{{ userMeta.data.name }}!</strong></h3>
    <div class="flex">
        <div>
            <img class="w-[100px] mb-2" src="http://127.0.0.1:8000/storage/130/upwork-VByt.png">
        </div>
        <div class="">
            <p class="py-2 border-0 border-b mb-2">
                <strong>You Email: </strong> 
                {{ userMeta.data.email }}
            </p>
            <p class="pb-2 border-0 border-b mb-2">
                <strong>Your roles: </strong><br> 
                <span v-for="role in userMeta.roles" class="bg-indigo-500 text-white px-2 rounded-sm inline-block text-sm mr-1 mb-1">{{role}}</span>
            </p>
        </div>
    </div>
  </div>

  <!-- Total users -->
  <div class="bg-white shadow-md p-3 text-center flex flex-col order-2 lg:order-4 rounded-md">
    <h3 class="text-3xl font-semibold">Total Users</h3>
    <div class="text-5xl font-bold flex-1 flex items-center justify-center">20</div>
  </div>

  <!-- Project status -->
  <div class="bg-slate-100 shadow-md p-4 row-span-2 order-3 lg:order-1 rounded-md">
    <h3 class="text-2xl font-bold mb-4">Project Status:</h3>
    <chartBar />
  </div>

  <!-- Latest projects -->
  <div class="bg-white shadow-md p-3 row-span-2 order-4 lg:order-2 rounded-md">
      <div class="flex justify-between items-center mb-3 px-2">
        <h3 class="text-2xl font-bold">Latest projects:</h3>
        <a href="/all-projects"><Button text="See all" /></a>
      </div>

      <div v-for="(project, i) in projects" class="project-item bg-slate-200 rounded-md overflow-hidden mb-2">
        <div v-if="i < 2">
            <div class="project-cont p-4">
                <h3 class="mb-2 font-bold text-lg relative">{{project.title}}</h3>
                <div class="mt-3" v-if="project.ingredients">
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
  </div>
</div>
    
</template>

<script setup>
import store from '../store'
import {computed, ref} from 'vue'
import Button from '../components/_partials/Button.vue';
import chartBar from '../components/_partials/chartBar.vue';
import LinkOpen from '../components/_icons/LinkOpen.vue';
import Pill from '../components/_partials/Pill.vue';
import DeleteIcon from '../components/_icons/DeleteIcon.vue';

const userMeta = computed(() => store.state.userData);
const projects = ref({})
store.dispatch('projectLists')
.then( (res) => {
    projects.value = res.data.data
})
.catch((err) => {
  console.log(err)
})



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
            projects.value = res.data.data
        })
    })
  }
}
</script>