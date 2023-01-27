<template>
    <div class="bg-gray-100 border-l-4 border-gray-500 text-gray-700 p-4 mb-10" role="alert">
        <p class="font-bold text-lg">User roles and permissions</p>
        <p>You can add edit delete user role and parmissions and set parmissions to any users</p>
    </div>

    <div>
        <div class="grid grid-cols-1 lg:grid-cols-8 gap-4 sm:grid-cols-1 md:grid-cols-1">
            <div class="col-span-4">

                <!-- Assign role to user -->
                <WidgetBox title="Assign role to user" subtitle="You assign multiple role on a user">
                    <div class="assign-role-form">
                        <form action="" class="flex">
                            <select @change="userFieldChanged" v-model="assignRole.userID" class="vbc-input-field w-[50%]">
                                <option value="">Select User</option>
                                <option v-for="(user, ind) in Users" :value="user.id">{{user.email}}</option>
                            </select>
                            <div class="ml-2">
                                <SLButton :disabled="(assignRole.userID) ? false : true" @click="assignRoles" text="Assign" />
                            </div>
                        </form>
                    </div>

                    <div class="all-roles mt-4 mb-2">
                        <span v-for="(role, ind) in assignRole.roles">
                            <span v-if="role.id" class="px-3 py-1 inline-flex mr-2 mb-2 bg-blue-200 text-gray-800 text-sm font-medium rounded-md ">{{role.name}}</span>
                        </span> 

                        <div class="mb-3"></div>

                        <div v-for="(role, i) in roles" class="inline-flex items-center mb-4 mr-4 border py-1 px-2 rounded-sm">
                            <input 
                                @change="getRoleInfo" 
                                name="roleCheckbox" 
                                class="cursor-pointer vbc-checkbox-field"
                                type="checkbox" 
                                :value="role.id" 
                                :data-role-name="role.name"
                                :checked="checkedOldRole(role.id)"
                            >
                            <label class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{role.name}}</label>
                        </div>
                    </div>
                </WidgetBox>


                <!-- Assign role caps -->
                <WidgetBox title="Assign capabilites in role" subtitle="You assign multiple capabities / parmissions in a role">
                    <div class="assign-role-form">
                        <form action="" class="flex">
                            <select @change="roleFielsChanged" v-model="assignCap.roleID" class="vbc-input-field w-[50%]">
                                <option value="">Select role</option>
                                <option v-for="(role, ind) in roles" :value="role.id">{{role.name}}</option>
                            </select>
                            <div class="ml-2">
                                <SLButton :disabled="(assignCap.roleID) ? false : true" @click="assignCapabilities" text="Assign" />
                            </div>
                        </form>
                    </div>

                    <div class="all-roles mt-4 mb-2">
                        <div>
                            <span v-for="(cap, ind) in assignCap.caps">
                                <span v-if="cap.id" class="px-3 py-1 inline-flex mr-2 mb-2 bg-blue-200 text-gray-800 text-sm font-medium rounded-md ">{{cap.name}}</span>
                            </span>                            
                        </div>


                        <div class="mb-3"></div>

                        <div v-for="(cap, i) in capabilities" class="inline-flex items-center mb-4 mr-4 border py-1 px-2 rounded-sm">
                            <input 
                                @change="getCapInfo" 
                                name="capCheckbox" 
                                class="cursor-pointer vbc-checkbox-field"
                                type="checkbox" 
                                :value="cap.id" 
                                :data-cap-name="cap.name"
                                :checked="checkedOld(cap.id)"
                            >
                            <label class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{cap.name}}</label>
                        </div>
                    </div>
                </WidgetBox>

            </div>

            <div class="col-span-4">
                <!-- User role -->
                <WidgetBox title="User roles" subtitle="You can add role from here and see all bellow.">
                    <div class="add-role-form">
                        <form action="" class="flex">
                            <input class="w-[50%] vbc-input-field" v-model="role.name" type="text" placeholder="Role name" @keyup="roleFieldChanged">
                            <div class="ml-2">
                                <SLButton :disabled="(role.name) ? false : true" @click="addNewRole" text="Add role" />
                            </div>
                        </form>
                    </div>

                    <div class="all-roles mt-4 mb-2">
                        <span 
                            v-for="(role, ind) in roles" 
                            class="inline-flex px-2 py-1 mr-2 mb-2 bg-blue-200 text-gray-800 text-sm font-medium rounded-sm">
                            <PencilSquareIcon @click="editRole({id: role.id, name: role.name})" class="w-4 mr-2 cursor-pointer text-green-900"/>{{role.name}}
                            <TrashIcon @click="deleteRole(role.id)" class="w-4 ml-2 cursor-pointer text-red-500" />
                        </span>
                    </div>
                </WidgetBox>

                <!-- User capabilities -->
                <WidgetBox title="User capabilities" subtitle="You can add single capability from here and see all bellow.">
                    <div class="add-role-form">
                        <form action="" class="flex">
                            <input class="w-[50%] vbc-input-field" v-model="capability.name"  placeholder="Capable" @keyup="capFieldChanged">
                            <div class="ml-2">
                                <SLButton :disabled="(capability.name) ? false : true" @click="addNewCapable" text="Add capability" />
                            </div>
                        </form>
                    </div>

                    <div class="all-roles mt-4 mb-2">
                        <span 
                            v-for="(capability, ind) in capabilities" 
                            class="inline-flex px-3 py-1 mr-2 mb-2 bg-gray-300 text-gray-800 text-sm font-medium rounded-sm">
                            <PencilSquareIcon @click="editCap({id: capability.id, name: capability.name})" class="w-4 mr-2 cursor-pointer text-green-900"/>
                                {{capability.name}}
                            <TrashIcon @click="deleteCap(capability.id)" class="w-4 ml-2 cursor-pointer text-red-500" />
                        </span>
                    </div>
                </WidgetBox>
            </div>
        </div>
    </div>
</template>

<script setup>
import WidgetBox from '../../_partials/WidgetBox.vue'
import SLButton from '../../_partials/SLButton.vue'
import { TrashIcon , PencilSquareIcon} from '@heroicons/vue/24/solid'
import {ref} from 'vue'
import store from '../../../store'

/*
|-----------------------------------------------
|-- Assign role on user
|---------------------------------------------
*/
const assignRole = ref({
    userID: '',
    roles: [{
        id: '',
        name: ''
    }]
})

const Users = ref({})
store.dispatch("AllUsers")
.then((res) => {
    Users.value = res.data
})

function getRoleInfo(ev){
  let checkboxRoles = document.getElementsByName('roleCheckbox'); 

  let checkedRoles = []
  let count = -1
  for (var checkbox of checkboxRoles) {
    if (checkbox.checked){
      count++
      checkedRoles[count] = {
        id: parseInt(checkbox.value),
        name: checkbox.getAttribute('data-role-name')
      }
    }
  }
  assignRole.value.roles = checkedRoles
}

function assignRoles(ev){
    ev.preventDefault()
    store.dispatch("AssignRoleInUser", assignRole.value)
    .then((res) => {
        store.commit("notify", {
            type: 'success',
            message: res.data
        })
    })
    .catch((err) => {
        store.commit("notify", {
            type: 'error',
            message: err.response.data
        })
    })
}

// Checked olds
function checkedOldRole(roleID){
    if (assignRole.value.roles.find(e => e.id === roleID)) {
        return 1
    }
    return
}

// On change user field
function userFieldChanged(){
    if (assignRole.value.userID) {
        store.dispatch("getRolesFromUser", assignRole.value)
        .then((res) => {
            assignRole.value.roles = res.data
        })   
    }
}


/*
|-----------------------------------------------
|-- Assign cap in role
|---------------------------------------------
*/
const assignCap = ref({
    roleID: '',
    caps: [{
        id: '',
        name: ''
    }]
})

// On change role field
function roleFielsChanged(){
    store.dispatch("getPermissionFromRole", assignCap.value)
    .then((res) => {
        assignCap.value.caps = res.data
    })
}

function getCapInfo(ev){
  let checkboxCaps = document.getElementsByName('capCheckbox'); 

  let checkedCaps = []
  let count = -1
  for (var checkbox of checkboxCaps) {
    if (checkbox.checked){
      count++
      checkedCaps[count] = {
        id: parseInt(checkbox.value),
        name: checkbox.getAttribute('data-cap-name')
      }
    }
  }
  assignCap.value.caps = checkedCaps
}

// Checked olds
function checkedOld(capID){
    if (assignCap.value.caps.find(e => e.id === capID)) {
        return 1
    }
    return
}

function assignCapabilities(ev){
    ev.preventDefault()
    store.dispatch("AssignInRole", assignCap.value)
    .then((res) => {
        store.commit("notify", {
            type: 'success',
            message: res.data
        })
    })
}

/*
|------------------------------------------------------------
| //User capabilities
|------------------------------------------------------------
*/ 
const capabilities = ref({})
store.dispatch("AllCapabilities")
.then((res) => {
    capabilities.value = res.data
})

const capability = ref({
    id: '',
    name: ''
})
function addNewCapable(ev){
    ev.preventDefault()
    store.dispatch("AddOrEditCapable", capability.value)
    .then((res)=>{
      store.commit('notify', {
        type: 'success',
        message: res.data
      })
    })
    store.dispatch("AllCapabilities")
    .then((res) => {
        capabilities.value = res.data
    })
}

function editCap(capData){
    capability.value = capData
}

function capFieldChanged(ev){
    if(!ev.target.value){
        capability.value.id = ''
    }
}

function deleteCap(id){
    if(confirm("Do you want to delete this permission?")){
        store.dispatch("deleteCap", id)
        .then((res) => {
            store.commit('notify', {
                type: 'success',
                message: res.data
            })
            store.dispatch("AllCapabilities")
            .then((res) => {
                capabilities.value = res.data
            })
        })
    }
}
/*
|-------------------------------------
| User role
|-------------------------------------
*/ 
const roles = ref({})
store.dispatch("AllRoles")
.then((res) => {
    roles.value = res.data
})

const role = ref({
    id: '',
    name: ''
})

function roleFieldChanged(ev){
    if(!ev.target.value){
        role.value.id = ''
    }
}

// delete role
function deleteRole(id){
    if(confirm("Do you want to delete this role?")){
        store.dispatch("deleteRole", id)
        .then((res) => {
            store.commit('notify', {
                type: 'success',
                message: res.data
            })
            store.dispatch("AllRoles")
            .then((res) => {
                roles.value = res.data
            })
        })
    }
}

// Edit Role
function editRole(roleData) {
    role.value = roleData
}
// Add Role
function addNewRole(ev){
    ev.preventDefault()
    store.dispatch("AddEditRole", role.value)
    .then((res) => {
      store.commit('notify', {
        type: 'success',
        message: res.data
      })
    })
    store.dispatch("AllRoles")
    .then((res) => {
        roles.value = res.data
    })
}




</script>