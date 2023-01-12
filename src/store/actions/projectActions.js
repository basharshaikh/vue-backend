import axiosClient from "../../axios"


export default {
    // Project related
    addorUpdateProject({commit}, project){
        
        let projectData = {
            ...project, 
            description: JSON.stringify(project.description),
            ingredients: JSON.stringify(project.ingredients)
        }

        if(project.id){
            return axiosClient.put(`/project/${project.id}`, projectData)
            .then((response) => {
                return response;
            })
        } else {
            return axiosClient.post('/project', projectData)
            .then((response) => {
                return response;
            })
        }
    },
    projectLists(){
        return axiosClient.get('/project')
        .then((response) => {
          return response;
        })
    },
    paginatedProjects({}, {url}){
        return axiosClient.get(url).then((res) => {
            return res;
        });
    },
    getProject({commit}, id){
        return axiosClient.get(`/project/${id}`)
        .then((response) => {
          return response;
        })
    },
    deleteProject({}, id){
        return axiosClient.delete(`/project/${id}`)
        .then((response) => {
          return response;
        })
    },

}