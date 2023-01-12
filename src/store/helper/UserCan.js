import { ref } from "vue"
import store from ".."

let roles = ref([])
let caps = ref([])

store.dispatch("getCurrentUser")
.then((res) => {
    let userData = {
        'user': res.data,
        'token': sessionStorage.getItem('TOKEN')
    }
    store.commit('setUser', userData)

    caps.value = res.data.user.capable
    roles.value = res.data.user.roles
})

function UserCan(userCapable){
    let superAdmin = roles.value.includes("Super-Admin")
    let userRole = caps.value.includes(userCapable)

    if(superAdmin || userRole){
        return true
    }
    return false
}
export default UserCan