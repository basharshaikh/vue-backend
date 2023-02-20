<template>
    <Alert
      v-if="Object.keys(errors).length"
      class="flex-col items-stretch text-sm"
    >
      <div v-for="(field, i) of Object.keys(errors)" :key="i">
        <div v-for="(error, ind) of errors[field] || []" :key="ind">
          * {{ error }}
        </div>
      </div>
    </Alert>

    <!-- Add project form -->
    <form class="space-y-6" @submit="addproject">
      <div class="grid grid-cols-1 lg:grid-cols-10 gap-4 sm:grid-cols-1 md:grid-cols-1">
        <div class="col-span-7">
          <div class="flex mb-4">
            <h3 class="font-bold text-xl w-[50%]">Add new project</h3>
          </div>

          <!-- Left full section -->
          <div class=" -space-y-px">
            <div>
              <FieldLabel text="Project title" />
              <input v-model="project.title" type="text" class="vbc-input-field" placeholder="Project title" />
            </div>

            <div class="pt-3" v-if="!loading">
              <FieldLabel text="Project Description" />
              <QuillEditor v-model:content="project.description" toolbar="full" style="height:500px;" class="mb-3" />
            </div>
    
            <div class="pt-3">              
              <FieldLabel text="Project Excerpt" />
              <textarea v-model="project.excerpt" cols="30" rows="10" class="vbc-input-field" placeholder="Proejct excerpt"></textarea>
            </div>

            <div>
              <FieldLabel text="Project Video Overview url" />
              <input v-model="project.video_overview" type="text" class="vbc-input-field" placeholder="Paste embed code url" />
            </div>

            <div>
              <FieldLabel text="Project live url" />
              <input v-model="project.live_url" type="text" class="vbc-input-field" placeholder="Project live url" />
            </div>

            <div  class="pt-3">
              <FieldLabel text="Project Label" />
              <input v-model="project.label" type="text" class="vbc-input-field"  placeholder="Proejct label" />
            </div>
          </div>
        </div>

        <!-- Right sidebar -->
        <div class="col-span-7 lg:col-span-3">
          <div class="publish-box border-[1px] mb-4">
                <h4 class="text-lg font-bold border-b-[1px] py-2 px-3">Publish</h4>
                <div class="p-3">
                    You can save as draft or publish it publicly. also delete it from here.
                </div>
                <div class="p-3">
                    <div class="w-[60%] inline-block">
                      <div class="inline-block">
                          <select v-model="project.status" class="vbc-input-field">
                              <option value="publish">Publish</option>
                              <option value="draft">Draft</option>
                          </select>
                      </div>
  
                      <div class="inline-block">
                          <SLButton @click="InsertProject" text="Submit" RoundL="no" />
                      </div>
                    </div>

                    <div v-if="project.id" class="w-[40%] inline-block text-right">
                      <Button @click="deleteProject(project.id)" text="Delete" BGcolor="#D33446"/>
                    </div>
                </div>
          </div>

          <div class="publish-box border-[1px] mb-4">
              <h4 class="text-lg font-bold border-b-[1px] py-2 px-3">Project ingredients</h4>
              <div class="p-3">
                  You can add multiple items from here.
              </div>
              
              <div class="px-3">
                <div class="w-full text-right">
                  <Button class="mb-3" text="+ Add" @click="addIngredient(0)"/>
                </div>
                <div class="mb-4" v-if="project.ingredients.length > 0">
                  <hr>
                  <Pill v-for="(ingredient, i) in project.ingredients" :color="ingredient.color" :text="ingredient.text"/>
                </div>
                <div v-for="(ingredient, i) in project.ingredients" class="flex">
                  <ColorPicker :index="i" @changeColor="changeColor" :hexCode="ingredient.color"/>
                  <input v-model="project.ingredients[i].text" type="text" class="vbc-input-field" placeholder="ingredient" />

                  <!-- add ingre -->
                  <button type="button" class="bg-blue-900 p-2 px-3 inline-block h-[41px] relative -top-[1px] border rounded-sm cursor-pointer">
                    <PlusIcon @click="addIngredient(i)" class="text-white" />
                  </button>
                  <!-- delete ingre -->
                  <button type="button" class="bg-red-500 p-2 inline-block h-[41px] relative -top-[1px] border rounded-sm cursor-pointer">
                    <TrashIcon @click="removeIngredient(i)" class="text-white" />
                  </button>
                </div>
              
              </div>
            </div>

          <div class="publish-box border-[1px]">
              <h4 class="text-lg font-bold border-b-[1px] py-2 px-3">Featured Image</h4>
              <div class="p-3">
                  You can choose an image from media as this project featured image.
              </div>
              
              <div class="px-3">
                <img v-if="project.mediaUrl" :src="project.mediaUrl" class="mb-3"/>
                <span v-else class="w-[100px] block bg-gray-100">
                  <PlaceholdImg/>
                </span>
              </div>
              
              <div class="p-3 text-right">
                <ButtonMedia @insertMediaa="insertingMedia" text="Choose"/>
              </div>
            </div>
          </div>
      </div>
      
    </form>    
</template>

<script setup>
import { computed, ref } from "vue";
import store from '../../../store';
import Alert from '../../_partials/Alert.vue';
import PlaceholdImg from '../../_icons/PlaceholdImg.vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import ColorPicker from '../../_partials/ColorPicker.vue'
import PlusIcon from '../../_icons/PlusIcon.vue'
import FieldLabel from "../../_partials/FieldLabel.vue";
import TrashIcon from '../../_icons/TrashIcon.vue'
import {v4 as uuidv4} from 'uuid'
import Pill from "../../_partials/Pill.vue";
import Button from "../../_partials/Button.vue";
import ButtonMedia from "../../_partials/ButtonMedia.vue"
import SLButton from "../../_partials/SLButton.vue";
import { useRoute, useRouter } from "vue-router"

const route = useRoute();
const paramId = route.params.id
const router = useRouter()
const loading = ref(false)

const project = ref({
    title: '',
    description: {},
    mediaUrl: '',
    mediaID: '',
    label: '',
    status: 'publish',
    excerpt: '',
    ingredients: [],
    video_overview: '',
    live_url: ''
})

const mediaInfo = computed(() => store.state.mediaLibrary);

// If its edit page
if(paramId){
  loading.value = true
  store.dispatch("getProject", paramId)
  .then((res) => {
    loading.value = false
    project.value = res.data.data
    project.value.description = JSON.parse(res.data.data.description)
    project.value.ingredients = JSON.parse(res.data.data.ingredients)
  })
}

// Add Ingredient
function addIngredient(index){
  const newIngredient = {
    id: uuidv4(),
    text: 'vuex',
    color: '#4F46E5'
  }
  project.value.ingredients.splice(index, 0, newIngredient)
}

// Remove ingredient
function removeIngredient(index){
  if (index > -1) {
    project.value.ingredients.splice(index, 1)
  }
}

// On change color of any picker
function changeColor(colorInfo){
  let {hexCode, index} = colorInfo
  project.value.ingredients[index].color = hexCode
}

// Insert featured img
function insertingMedia(ev){
  project.value.mediaID = mediaInfo.value.id
  project.value.mediaUrl = mediaInfo.value.url

  document.getElementById('media-overlay-glass').click()
}

const errors = ref({});
function InsertProject(e){
  e.preventDefault()
  loading.value = true;

  store.dispatch('addorUpdateProject', project.value)
    .then( (res) => {
      loading.value = false;
      errors.value = 0;
      store.commit('notify', {
        type: 'success',
        message: res.data //Message from backend
      })
    })
    .catch((err) => {
      loading.value = false;
      if(err.response.status === 422){
        errors.value = err.response.data.errors
      }
      if (err.response.status === 403) {
        router.push({name: 'NoAccess'})
      }
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
      router.push({
        name: "Projects",
      })
    })
  }
}

</script>