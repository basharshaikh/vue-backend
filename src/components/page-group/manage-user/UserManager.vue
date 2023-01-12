<template>
    <div class="grid grid-cols-1 lg:grid-cols-10 gap-10 sm:grid-cols-1 md:grid-cols-1">
        <div class="col-span-5">
            <Heading title="All Users" subtitle="Here is all users are listed. you can edit or delete from action" />

            <div v-if="!loadUsers" class="grid grid-cols-1 lg:grid-cols-8 gap-4 sm:grid-cols-1 md:grid-cols-1">
                <div v-for="(user, i) in Users" class="bg-blue-200 rounded-sm overflow-hidden col-span-4">
                    <!-- <div v-if="blog.mediaUrl" class="relative">
                        <img :src="blog.mediaUrl" alt="">
                    </div> -->
                    <!-- <div v-else class="relative">
                        <div class=" h-[188px] bg-[#333]"></div>
                    </div> -->

                    <div class="project-cont p-4">
                        <h3 class="mb-2 font-bold text-md relative">{{user.name}}</h3>
                        <p class="text-sm">{{user.email}}</p>
                    </div>

                    <div class="border-t border-[#f1f1f1] flex justify-between p-2">
                        <EditIcon @click="editUser(user.id)"/>
                        <DeleteIcon @click="deleteUser(user.id)"/>
                    </div>
                </div>
            </div>
            <div v-else><InfiniteLoading /></div>

        </div>

        <div class="col-span-5">
            <Heading title="Add or update user" subtitle="You can add edit any user from this form" />

            <div class="shadow-md p-5 rounded-md">
                <div v-if="user.id" class="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-2 mb-4" role="alert">
                    <p class="font-bold">{{user.name}}</p>
                    <p>You are updating this user.</p>
                </div>

                <div>
                    <FieldLabel text="Full Name"/>
                    <input v-model="user.name" type="text" :class="DefaultClass.class.inputField" placeholder="User full name" />
                </div>
                <div>
                    <FieldLabel text="Email"/>
                    <input v-model="user.email" type="email" :class="DefaultClass.class.inputField" placeholder="User email" />
                </div>
                <div>
                    <FieldLabel text="Password"/>
                    <input v-model="user.password" type="password" :class="DefaultClass.class.inputField" placeholder="User password" />
                </div>
                <div>
                    <FieldLabel text="Confirm Password"/>
                    <input v-model="user.password_confirmation" type="password" :class="DefaultClass.class.inputField" placeholder="Confirm password" />
                </div>

                <SLButton @click="SubmitUser" />
            </div>
          
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import store from '../../../store';
import Heading from '../../_partials/Heading.vue';
import EditIcon from '../../_icons/EditIcon.vue';
import DeleteIcon from '../../_icons/DeleteIcon.vue';
import FieldLabel from '../../_partials/FieldLabel.vue';
import Alert from '../../_partials/Alert.vue';
import DefaultClass from '../../_partials/DefaultClass.vue';
import SLButton from '../../_partials/SLButton.vue';
import InfiniteLoading from '../../_icons/InfiniteLoading.vue';

const user = ref({
    id: '',
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
})

// Submit user
function SubmitUser(ev){
    ev.preventDefault()
    store.dispatch("AddOrUpdateUser", user.value)
    .then((res) => {
        store.commit('notify', {
            type: 'success',
            message: res.data
        })
        store.dispatch("AllUsers")
        .then((res) => {
            Users.value = res.data
        })
    })
}

// edit user
function editUser(id){
    // get targeted user
    store.dispatch("getUser", id)
    .then((res) => {
        user.value = res.data
        console.log(res)
    })
}

// delete user
function deleteUser(id){
    if(confirm("Are you sure?")){
        store.dispatch("deleteUser", id)
        .then((res) => {
            store.commit('notify', {
                type: 'success',
                message: res.data
            })
            store.dispatch("AllUsers")
            .then((res) => {
                Users.value = res.data
            }) 
        })
    }
}

const Users = ref({})
const loadUsers = ref(true)
store.dispatch("AllUsers")
.then((res) => {
    Users.value = res.data
    loadUsers.value = false
})
</script>