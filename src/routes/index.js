import { createRouter, createWebHistory } from "vue-router";

import AuthLayout from '../components/_parents/AuthLayout.vue'
import AdminLayout from '../components/_parents/AdminLayout.vue'

import Dashboard from '../views/Dashboard.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'

//
import ContactRequest from '../components/page-group/contact/ContactRequest.vue'
import Projects from '../components/page-group/projects/Projects.vue'
import Blogs from '../components/page-group/blogs/Blogs.vue'
import AddBlogs from '../components/page-group/blogs/AddBlogs.vue'
import BlogCategories from '../components/page-group/blogs/BlogCategories.vue'
import AddProject from '../components/page-group/projects/AddProject.vue'

import MediaManager from '../components/page-group/media/MediaManager.vue'

import UserManager from '../components/page-group/manage-user/UserManager.vue'
import UserRoleManager from '../components/page-group/manage-user/UserRoleManager.vue'

import NoAccess from '../views/NoAccess.vue'



import store from '../store'

const routes = [
    {
        path: '/auth',
        redirect: '/login',
        name: 'Auth',
        component: AuthLayout,
        meta: {isGuest: true},
        children: [
            {
                path: '/register',
                name: 'Register',
                component: Register
            },
            {
                path: '/login',
                name: 'Login',
                component: Login
            },
        ]
    },
    {
        path: '/',
        redirect: '/dashboard',
        name: 'Admin',
        component: AdminLayout,
        meta: {rquiresAuth: true},
        children: [
            {
                path: '/require-access',
                name: 'NoAccess',
                component: NoAccess
            },
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: Dashboard
            },
            {
                path: '/contacts',
                name: 'ContactRequest',
                component: ContactRequest
            },
            {
                path: '/all-projects',
                name: 'Projects',
                component: Projects
            },
            {
                path: '/add-new-project',
                name: 'AddProject',
                component: AddProject
            },
            {
                path: '/project/:id',
                name: 'EditProject',
                component: AddProject
            },
            {
                path: '/media-manager',
                name: 'MediaManager',
                component: MediaManager
            },
            {
                path: '/add-new-media',
                name: 'AddNewMdia',
                component: MediaManager
            },
            {
                path: '/all-blogs',
                name: 'Blogs',
                component: Blogs
            },
            {
                path: '/add-new-blog',
                name: 'AddBlogs',
                component: AddBlogs
            },
            {
                path: '/edit-blog/:id',
                name: 'EditBlog',
                component: AddBlogs
            },
            {
                path: '/blog-categories',
                name: 'BlogCategories',
                component: BlogCategories
            },
            {
                path: '/user-manager',
                name: 'UserManager',
                component: UserManager
            },
            {
                path: '/user-role-manager',
                name: 'UserRoleManager',
                component: UserRoleManager
            },
        ]
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.rquiresAuth && !store.state.user.token) {
        next({name: 'Login'});
    } else if (store.state.user.token && to.meta.isGuest) {
        next({name: 'Dashboard'});
    } else {
        next();
    }
})

export default router
