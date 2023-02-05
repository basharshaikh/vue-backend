<template>
<!-- Sidebar links -->
<div class="space-y-4">
    
    <!-- Dashboard -->
    <div>
        <ul class="mt-3">
            <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0 bg-slate-900">
                <a @click.prevent="activeDash = !activeDash" href="">
                    <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <ChartBarIcon class="inline-block shrink-0 h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                        <span class="text-sm font-medium ml-3 text-white">
                            Dashboard
                        </span>
                    </div>
                    
                    <div class="flex shrink-0 ml-2">
                        <ArrowDown :class="[activeDash ? 'rotate-180' : '']" />
                    </div>
                    </div>
                </a>

                <div v-if="activeDash" class="">
                    <ul class="pl-9 mt-1">
                    <li class="mb-1 last:mb-0">
                        <router-link to="/dashboard" 
                            class="block text-slate-400 hover:text-slate-200 transition">
                            <span class="text-sm font-medium">Home</span>
                        </router-link>
                    </li>
                    </ul>
                </div>
            </li>
    
        </ul>
    </div>

    <!-- Projects -->
    <div>
        <div>
            <h3 class="text-xs uppercase text-slate-500 font-semibold pl-3">                           
                <span class="">Projects</span>
            </h3>

            <ul class="mt-3">
                <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0 bg-slate-900">
                    <a @click.prevent="activeProject = !activeProject" href="/all-projects">
                        <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <RectangleGroupIcon class="inline-block shrink-0 h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                            <span class="text-sm font-medium ml-3 text-white">
                                Projects
                            </span>
                        </div>
                        
                        <div class="flex shrink-0 ml-2">
                            <ArrowDown :class="[activeProject ? 'rotate-180' : '']" />
                        </div>
                        </div>
                    </a>

                    <div v-if="activeProject" class="">
                        <ul class="pl-9 mt-1">
                        <li class="mb-1 last:mb-0">
                            <router-link to="/all-projects" 
                                class="block text-slate-400 hover:text-slate-200 transition duration-150">
                                <span class="text-sm font-medium">
                                    All Projects
                                </span>
                            </router-link>
                        </li>
                        <li class="mb-1 last:mb-0">
                            <router-link to="/add-new-project" 
                                class="block text-slate-400 hover:text-slate-200 transition duration-150">                                        
                                <span class="text-sm font-medium">
                                    Add new
                                </span>
                            </router-link>
                        </li>
                        </ul>
                    </div>
                </li>
        
            </ul>
        </div>  
    </div>
    
    <!-- Blogs -->
    <div>
        <h3 class="text-xs uppercase text-slate-500 font-semibold pl-3">                           
            <span class="">Blog</span>
        </h3>

        <ul class="mt-3">
            <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0 bg-slate-900">
                <a @click.prevent="activeBlog = !activeBlog" href="/all-blogs">
                    <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <RectangleGroupIcon class="inline-block shrink-0 h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                        <span class="text-sm font-medium ml-3 text-white">
                            Blog
                        </span>
                    </div>
                    
                    <div class="flex shrink-0 ml-2">
                        <ArrowDown :class="[activeBlog ? 'rotate-180' : '']" />
                    </div>
                    </div>
                </a>

                <div v-if="activeBlog" class="">
                    <ul class="pl-9 mt-1">
                        <li class="mb-1 last:mb-0">
                            <router-link to="/all-blogs" 
                                class="block text-slate-400 hover:text-slate-200 transition duration-150">
                                <span class="text-sm font-medium">
                                    All Blog
                                </span>
                            </router-link>
                        </li>
                        <li class="mb-1 last:mb-0">
                            <router-link to="/add-new-blog" 
                                class="block text-slate-400 hover:text-slate-200 transition duration-150">                                        
                                <span class="text-sm font-medium">
                                    Add new
                                </span>
                            </router-link>
                        </li>
                        <li class="mb-1 last:mb-0">
                            <router-link to="/blog-categories" 
                                class="block text-slate-400 hover:text-slate-200 transition duration-150">                                        
                                <span class="text-sm font-medium">
                                    Blog Category
                                </span>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </li>
    
        </ul>
    </div>  
    
    <!-- Media -->
    <div>
        <h3 class="text-xs uppercase text-slate-500 font-semibold pl-3">                           
            <span class="">Media manager</span>
        </h3>

        <ul class="mt-3">
            <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0 bg-slate-900">
                <a @click.prevent="activeMedia = !activeMedia" href="/media-manager">
                    <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <FolderIcon class="inline-block shrink-0 h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                        <span class="text-sm font-medium ml-3 text-white">
                            Media 
                        </span>
                    </div>
                    
                    <div class="flex shrink-0 ml-2">
                        <ArrowDown :class="[activeMedia ? 'rotate-180' : '']" />
                    </div>
                    </div>
                </a>

                <div v-if="activeMedia" class="">
                    <ul class="pl-9 mt-1">
                    <li class="mb-1 last:mb-0">
                        <router-link to="/media-manager" 
                            class="block text-slate-400 hover:text-slate-200 transition duration-150">
                            <span class="text-sm font-medium">
                                All Media
                            </span>
                        </router-link>
                    </li>
                    <li class="mb-1 last:mb-0">
                        <router-link to="/add-new-media" 
                            class="block text-slate-400 hover:text-slate-200 transition duration-150">                                        
                            <span class="text-sm font-medium">
                                Add new
                            </span>
                        </router-link>
                    </li>
                    </ul>
                </div>
            </li>
    
        </ul>
    </div>

    <!-- User manager -->
    <div>
        <h3 class="text-xs uppercase text-slate-500 font-semibold pl-3">                           
            <span class="">User manager</span>
        </h3>

        <ul class="mt-3">
            <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0 bg-slate-900">
                <a @click.prevent="activeUserManage = !activeUserManage" href="/media-manager">
                    <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <FolderIcon class="inline-block shrink-0 h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                        <span class="text-sm font-medium ml-3 text-white">
                            Users
                        </span>
                    </div>
                    
                    <div class="flex shrink-0 ml-2">
                        <ArrowDown :class="[activeUserManage ? 'rotate-180' : '']" />
                    </div>
                    </div>
                </a>

                <div v-if="activeUserManage" class="">
                    <ul class="pl-9 mt-1">
                    <li class="mb-1 last:mb-0">
                        <router-link to="/user-manager" 
                            class="block text-slate-400 hover:text-slate-200 transition duration-150">
                            <span class="text-sm font-medium">
                                Manage Users
                            </span>
                        </router-link>
                    </li>
                    <li class="mb-1 last:mb-0">
                        <router-link to="/user-role-manager" 
                            class="block text-slate-400 hover:text-slate-200 transition duration-150">                                        
                            <span class="text-sm font-medium">
                                Role & parmissions
                            </span>
                        </router-link>
                    </li>
                    </ul>
                </div>
            </li>
    
        </ul>
    </div>
    

</div>


</template>

<script setup>
import ArrowDown from '../_icons/ArrowDown.vue'
import { ChartBarIcon } from '@heroicons/vue/24/solid'
import { RectangleGroupIcon } from '@heroicons/vue/24/solid'
import { FolderIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'

let activeDash = ref(true)
let activeProject = ref(false)
let activeMedia = ref(false)
let activeBlog = ref(false)
let activeUserManage = ref(false)




</script>

<style>
.router-link-active {
    @apply !text-slate-200
} 
</style>