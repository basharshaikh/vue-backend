<template>
    <!-- Add blog form -->
    <form class="space-y-6" @submit="addCategory">
      <div class="grid grid-cols-1 lg:grid-cols-10 gap-4 sm:grid-cols-1 md:grid-cols-1">
        <div class="col-span-5">
          <div class="flex mb-4">
            <h3 class="font-bold text-xl">Add new category</h3>
          </div>
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
          <!-- Left full section -->
          <div class="-space-y-px">
            <div>
              <FieldLabel text="blog title"/>
              <input v-model="cat.title" name="title" type="text" class="vbc-input-field" placeholder="Category title" />
            </div>

            <div>
              <FieldLabel text="Category Description"/>
              <textarea v-model="cat.description" name="description" cols="30" rows="10" class="vbc-input-field" placeholder="Category Description"></textarea>
            </div>

            <SLButton :loading="loading"/>
          </div>
        </div>      

        <!-- Right sidebar -->
        <div class="col-span-5">
            <div class="mb-4">
                <h3 class="font-bold text-xl mb-2">Blog Categories</h3>
                <p>You can edit a category from left form after click on pencil icon</p>
            </div>

            <div v-if="loadCats" class="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:grid-cols-1 md:grid-cols-2">
                <div v-for="(cat, i) in cats.data" class="project-item bg-[#FEFFE1] rounded-md overflow-hidden">

                    <div class="project-cont p-4">
                        <h3 class="mb-2 font-bold text-md relative">{{cat.title}}</h3>
                        <p class="text-sm">{{cat.description}}</p>
                    </div>

                    <div class="border-t border-[#f1f1f1] flex justify-between p-2">
                        <EditIcon @click="editCategory" :data-id="cat.id"/>
                        <DeleteIcon @click="deleteCategory" :data-id="cat.id"/>
                    </div>
                </div>
            </div>
            <div v-else><InfiniteLoading /></div>
        </div>
      </div>
    </form>
</template>

<script setup>
import FieldLabel from '../../_partials/FieldLabel.vue';
import SLButton from '../../_partials/SLButton.vue';
import DeleteIcon from '../../_icons/DeleteIcon.vue';
import EditIcon from '../../_icons/EditIcon.vue';
import Alert from '../../_partials/Alert.vue';
import InfiniteLoading from '../../_icons/InfiniteLoading.vue';
import {ref} from 'vue'
import store from '../../../store';

const cats = ref({})
const cat = ref({
    id: '',
    title: '',
    description: ''
})
let loading = ref(false)
const errors = ref({});

// Get all categories
const loadCats = ref(false)
store.dispatch("getBlogCats")
.then((res) => {
    cats.value = res.data
    loadCats.value = true
})

// Add or update category
function addCategory(ev){
    ev.preventDefault()
    loading.value = true;

    store.dispatch("addOrUpdateBlogCat", cat.value)
    .then((res) => {
        loading.value = false;
        errors.value = 0;
        store.commit('notify', {
            type: 'success',
            message: res.data
        })
        store.dispatch("getBlogCats")
        .then((res) => {
            cats.value = res.data
        })
    })
    .catch((err) => {
        loading.value = false;
        if(err.response.status === 422){
            errors.value = err.response.data.errors
        }
    })
}

//Edit the category
function editCategory(ev){
    let catId = ev.currentTarget.getAttribute('data-id')
    store.dispatch("getBlogCat", catId)
    .then((res) => {
        cat.value = res.data
    })
}

// delete the category
function deleteCategory(ev){
    let catId = ev.currentTarget.getAttribute('data-id')

    if(confirm("Do you want to delete this category?")){
        store.dispatch("deleteBlogCategory", catId)
        .then((res) => {
            store.commit('notify', {
                type: 'success',
                message: res.data
            })
        })
        store.dispatch("getBlogCats")
        .then((res) => {
            cats.value = res.data
        })
    }
}
</script>