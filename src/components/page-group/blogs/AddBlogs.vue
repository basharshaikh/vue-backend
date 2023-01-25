<template>
    <!-- Add blog form -->
    <form class="space-y-6" @submit="addBlog">
      <div class="grid grid-cols-1 lg:grid-cols-10 gap-4 sm:grid-cols-1 md:grid-cols-1">
        <div class="col-span-7">
          <Alert v-if="Object.keys(errors).length" class="flex-col items-stretch text-sm">
            <div v-for="(field, i) of Object.keys(errors)" :key="i">
              <div v-for="(error, ind) of errors[field] || []" :key="ind">
                * {{ error }}
              </div>
            </div>
          </Alert>

          <div class="flex mb-4">
            <h3 class="font-bold text-xl">Add new blog</h3>
          </div>

          <!-- Left full section -->
          <div class="-space-y-px">
            <div>
              <FieldLabel text="blog title"/>
              <input v-model="blog.title" name="title" type="text" class="vbc-input-field" placeholder="blog title" />
            </div>

            <div v-if="!loading" class="pt-3">
              <FieldLabel text="Blog Description"/>
              <QuillEditor v-model:content="blog.description" toolbar="full" style="height:200px;" class="mb-3 rounded-sm" />
            </div>

            <div>
              <FieldLabel text="Blog Excerpt"/>
              <textarea v-model="blog.excerpt" name="excerpt" cols="30" rows="10" class="vbc-input-field" placeholder="Blog excerpt"></textarea>
            </div>

          </div>
        </div>      

        <!-- Right sidebar -->
        <div class="col-span-3">
          <div class="publish-box border-[1px] mb-4 rounded-sm">
              <h4 class="text-lg font-bold border-b-[1px] py-2 px-3">Publish</h4>
              <div class="p-3">
                  You can save as draft or publish it publicly. also delete it from here.
              </div>
              <div class="p-3">
                  <div class="w-[60%] inline-block">
                    <div class="inline-block">
                        <select v-model="blog.status" name="status" class="vbc-input-field rounded-r-none">
                            <option value="publish">Publish</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>
                    <div class="inline-block">
                        <SLButton @click="InsertBlog" text="Submit" RoundL="no" />
                    </div>
                  </div>

                  <div v-if="blog.id" class="w-[40%] inline-block text-right">
                      <Button @click="deleteBlog(blog.id)" text="Delete" BGcolor="#D33446"/>
                  </div>
              </div>
          </div>

          <div class="publish-box border-[1px] rounded-sm mb-4">
              <h4 class="text-lg font-bold border-b-[1px] py-2 px-3">Blog Category</h4>
              <div class="p-3">You can choose one or multiple category from here</div>

              <div v-if="!loading" class="px-3 overflow-auto max-h-[150px]">
                  <div v-for="(category, i) in blogCats" class="flex items-center mb-4">
                      <input 
                        @change="getBlogCatsId" 
                        name="catCheckbox" 
                        type="checkbox" 
                        :value="category.id" 
                        class="vbc-checkbox-field"
                        :checked="checkedOld(category.id)"
                      >

                      <label class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{category.title}}</label>
                  </div>
              </div>
          </div>

          <div class="publish-box border-[1px] rounded-sm">
              <h4 class="text-lg font-bold border-b-[1px] py-2 px-3">Featured Image</h4>
              <div class="p-3">
                  You can choose an image from media as this project featured image.
              </div>

              <div class="px-3">
                <img v-if="blog.mediaUrl" :src="blog.mediaUrl" class="mb-3"/>
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
import FieldLabel from '../../_partials/FieldLabel.vue';
import Alert from '../../_partials/Alert.vue';
import PlaceholdImg from '../../_icons/PlaceholdImg.vue';
import ButtonMedia from '../../_partials/ButtonMedia.vue';
import Button from '../../_partials/Button.vue';
import SLButton from '../../_partials/SLButton.vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import {computed, ref, onMounted} from 'vue'
import store from '../../../store';
import { useRoute, useRouter } from "vue-router"

const route = useRoute();
const paramId = route.params.id;
const loading = ref(false)
const router = useRouter();

const blog = ref({
    title: '',
    description: {},
    excerpt: '',
    status: 'publish',
    catID: [],
    mediaID: '',
    mediaUrl: ''
})

const errors = ref({});
const blogCats = ref({})
const mediaInfo = computed(() => store.state.mediaLibrary);

// Delete this blog
function deleteBlog(blogId){
  if(confirm("Do you want to delete this Blog?")){
    store.dispatch("deleteBlog", blogId)
    .then((res) => {
      store.commit('notify', {
        type: 'success',
        message: res.data
      })
      router.push({
        name: "Blogs",
      })
    })
  }
}

// Get Old blog
if(paramId){
  loading.value = true
  store.dispatch("singleBlog", paramId)
  .then((res) => {
    loading.value = false
    blog.value = res.data.data
    blog.value.description = JSON.parse(res.data.data.description)
    blog.value.catID = res.data.data.catID
  })
}

// Checked olds
function checkedOld(catid){
  if(blog.value.catID.includes(catid)){
    return 1
  }
  return
}


// Insert blog
function InsertBlog(ev){
  ev.preventDefault()
  store.dispatch("insertBlog", blog.value)
  .then((res) => {
    errors.value = 0;
    store.commit('notify', {
      type: 'success',
      message: res.data
    })
  })
  .catch((err) => {
    if(err.response.status === 422){
      errors.value = err.response.data.errors
    }
  })
}

// Insert media to blog
function insertingMedia(){
  blog.value.mediaID = mediaInfo.value.id
  blog.value.mediaUrl = mediaInfo.value.url
  
  // Hide the media popup
  document.getElementById('media-overlay-glass').click()
}

//Get blog categories
store.dispatch("getBlogCats")
.then((res) => {
  blogCats.value = res.data.data
})

// On check the cats
function getBlogCatsId(ev){
  let checkboxCats = document.getElementsByName('catCheckbox'); 
  let checkedCats = []
  let count = -1
  for (var checkbox of checkboxCats) {
    if (checkbox.checked){
      count++
      checkedCats[count] = parseInt(checkbox.value)
    }
  }
  blog.value.catID = checkedCats
}



</script>