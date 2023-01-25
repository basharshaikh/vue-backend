import {createStore} from 'vuex'
import actions from './actions'



const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem('TOKEN')
        },
        userData: {
            data: {
                name: '',
                email: ''
            },
            roles: [],
            capable: []
        },
        notification: {
            show: false,
            type: '',
            message: ''
        },
        sidebar: true,
        mediaLibrary: {
            id: '',
            active: false,
            url: ''
        },
        mediaUpload: {
            progressBar: false,
            progress: 0
        },
        mediaUploaded: false
    },
    getters: {},
    actions,
    mutations: {

        activeMedia: (state, {id, active, url}) => {
            state.mediaLibrary.active = active
            state.mediaLibrary.id = id
            state.mediaLibrary.url = url
        },
        setUserData: (state, userData) => {
            state.userData = userData
        },
        setUser: (state, userData) => {
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem('TOKEN', userData.token);
        },
        uploadProgress: (state, progData) => {
            state.mediaUpload.progressBar = progData.progressBar
            state.mediaUpload.progress = progData.progress
        },
        uploadSuccess: (state, status) => {
            state.mediaUploaded = status
        },
        notify: (state, {type, message}) => {
            state.notification.show = true;
            state.notification.type = type;
            state.notification.message = message;

            setTimeout(() => {
                state.notification.show = false;
            }, 3000)
        },
        hideAside: (state, {show}) => {
            state.sidebar = show
        },
        showAside: (state, {show}) => {
            state.sidebar = show
        },
        logout: (state) => {
            state.user.data = {};
            state.user.token = null;
            sessionStorage.removeItem('TOKEN');

        },

        
    },
    modules: {}
})

export default store