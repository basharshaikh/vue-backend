import axiosClient from '../../axios'

export default {
    //get all contact re q
    getContactReq(){
      return axiosClient.get('/contact-form-res')
      .then((response) => {
        return response;
      })  
    },

    // User related
    register({ commit }, user){
        return axiosClient.post('/register', user)
        .then(({data}) => {
            commit('setUser', data);
            return data;
        })
    },

    login({ commit }, user){
        return axiosClient.post('/login', user)
        .then(({data}) => {
            commit('setUser', data);
            return data;
        })
    },

    logout({commit}){
        return axiosClient.post('/logout')
        .then(response => {
            commit('logout')
            return response
        })
    },
    AllUsers(){
        return axiosClient.get('/user-manager')
        .then((response) => {
          return response;
        })            
    },
    AddOrUpdateUser({}, user){
        if(user.id){
            return axiosClient.put(`/user-manager/${user.id}`, user)
            .then((response) => {
                return response;
            })
        } else {
            return axiosClient.post('/user-manager', user)
            .then((response) => {
                return response;
            })
        }
    },
    deleteUser({}, id){
        return axiosClient.delete(`/user-manager/${id}`)
        .then((response) => {
          return response;
        })
    },
    getCurrentUser(){
      return axiosClient.get(`/current-user`)
      .then((response) => {
        return response;
      })
    },
    getUser({}, id){
        return axiosClient.get(`/user-manager/${id}`)
        .then((response) => {
          return response;
        })
    },
    deleteRole({}, id){
        return axiosClient.delete(`/user-role/${id}`)
        .then((response) => {
          return response;
        })
    },
    AllRoles(){
        return axiosClient.get('/user-role')
        .then((response) => {
          return response;
        })
    },
    AddEditRole({}, role){
        if(role.id){
            return axiosClient.put(`/user-role/${role.id}`, role)
            .then((response) => {
              return response;
            }) 
        } else {
            return axiosClient.post('/user-role', role)
            .then((response) => {
              return response;
            }) 
        }
    },
    AllCapabilities(){
        return axiosClient.get('/user-capability')
        .then((response) => {
          return response;
        })
    },
    AddOrEditCapable({}, capability){
        if(capability.id){
            return axiosClient.put(`/user-capability/${capability.id}`, capability)
            .then((response) => {
              return response;
            }) 
        } else {
            return axiosClient.post('/user-capability', capability)
            .then((response) => {
              return response;
            }) 
        }
    },
    deleteCap({}, id){
        return axiosClient.delete(`/user-capability/${id}`)
        .then((response) => {
          return response;
        })
    },

    AssignInRole({}, AssignCaps){
        return axiosClient.post('/assign-caps-onrole', AssignCaps)
        .then((response) => {
          return response;
        }) 
    },
    AssignRoleInUser({}, AssignRole){
        return axiosClient.post('/assign-role-onuser', AssignRole)
        .then((response) => {
          return response;
        }) 
    },
    getPermissionFromRole({}, AssignCaps){
        return axiosClient.post('/permissions-from-role', AssignCaps)
        .then((response) => {
          return response;
        }) 
    },
    getRolesFromUser({}, AssignRoles){
        return axiosClient.post('/roles-from-user', AssignRoles)
        .then((response) => {
          return response;
        }) 
    },
    totalUserCount(){
      return axiosClient.get('/total-user-count')
      .then((response) => {
        return response;
      }) 
    }
}