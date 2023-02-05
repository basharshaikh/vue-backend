<template>
    <div class="flex h-screen overflow-hidden">

        <!-- Sidebar Area -->
        <div v-if="ShowSidebar">
            <div @click="hideSidebar" class="fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200"
            ></div>

            <!-- Sidebar -->
            <div id="sidebar"
                class="flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64     bg-slate-800 p-4 transition-all duration-200 ease-in-out"
            >
                <!-- Sidebar header -->
                <div class="flex justify-between mb-2 pr-3 sm:px-2">
                    <!-- Close button -->
                    <button @click="hideSidebar" class="text-slate-500 hover:text-slate-400 lg:hidden">
                        <ArrowLeftIcon class="w-6"/>
                    </button>

                    <!-- Logo -->   
                    <img width="90" src="../../assets/images/backend-logo.png" alt="">                
                </div>

                <SidebarLinks />
            </div>
            
        </div>

        <!-- Main Content -->
        <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

            <!-- Header area -->
            <Header />


            <!-- Content area -->
            <main class="lvs-main-content">
                <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                    <router-view></router-view>
                </div>
            </main>
            <div class="clear text-center text-sm mt-12 py-2 border-t text-slate-600">
                Copyright &copy; 2022 Secretiodata All Right Reserved
            </div>

        </div>
    </div>

    <Notification/>
</template>


<script setup>
import { computed , onMounted, watch, ref} from "vue";
import store from "../../store";
import Notification from '../_partials/Notification.vue';
import Header from '../_partials/Header.vue';
import SidebarLinks from '../_partials/SidebarLinks.vue';
import { ArrowLeftIcon } from "@heroicons/vue/24/solid"


const ShowSidebar = computed(() => store.state.sidebar);

// hide sidebar
function hideSidebar(){
   store.commit('hideAside', {show: false})
}

</script>

<style>
.lvs-main-content {
    /* min-height: 100vh;
    max-height:  auto; */
}
</style>