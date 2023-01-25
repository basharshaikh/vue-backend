<template>
<header class="sticky top-0 bg-white border-b border-slate-200 z-30">
    <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 -mb-px">
            <div class="flex" >
                <button @click="showAside" v-if="!ShowSidebar" class="text-slate-500 hover:text-slate-600">
                <Bars3Icon class="w-[32px]" />
                </button>
            </div>

            
            <div class="flex items-center relative">

                <HeaderPopup>
                    <template v-slot:iconWrap>
                        <MagnifyingGlassIcon class="w-[20px] text-slate-600" />
                    </template>

                    <template v-slot:contentWrap>
                       Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum officiis soluta, unde eius ea itaque qui, doloribus numquam architecto vero iure consequuntur aspernatur maxime incidunt excepturi nulla assumenda eligendi quibusdam!
                    </template>
                </HeaderPopup>

                <HeaderPopup>
                    <template v-slot:iconWrap>
                        <BellIcon class="w-[20px] text-slate-600" />
                    </template>

                    <template v-slot:contentWrap>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, ipsum. Sint magnam nam nostrum nobis adipisci expedita obcaecati atque eius unde iste itaque, provident quos fuga error repellat sequi rem.
                    </template>
                </HeaderPopup>

                <HeaderPopup>
                    <template v-slot:iconWrap>
                        <UserIcon class="w-[20px] text-slate-600" />
                    </template>

                    <template v-slot:contentWrap>
                        <Button loading="true" BGcolor="#D33446" @click="logout" class="absolute right-2"  text="Logout" />

                        <img class="mb-3 rounded-md" src="https://via.placeholder.com/100" alt="">

                        <ul class="mb-3 text-white">
                            <li><strong>Name:</strong> {{ userData.data.name }}</li>
                            <li><strong>Role: </strong> {{ userData.roles[0] }}</li>
                            <li><strong>Email:</strong> {{ userData.data.email }}</li>
                        </ul>
                    </template>
                </HeaderPopup>

            </div>

        </div>
    </div>
</header>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import store from "../../store";
import HeaderPopup from "./HeaderPopup.vue";
import { BellIcon, UserIcon, MagnifyingGlassIcon, Bars3Icon } from "@heroicons/vue/24/solid"
import Button from "./Button.vue"
import { useRouter } from 'vue-router'

const router = useRouter()
const ShowSidebar = computed(() => store.state.sidebar);


const userData = ref({
    data: {
        name: '',
        email: ''
    },
    roles: []
})
store.dispatch("getCurrentUser")
.then((res) => {
    userData.value = res.data.user
    store.commit("setUserData", res.data.user)
})



// Show sidebar
function showAside(){
    store.commit('showAside', {show: true})
}

// Logout
function logout(){
    store.dispatch("logout")
    .then((res) => {
        router.push({name: 'Login'})
    })
}
</script>