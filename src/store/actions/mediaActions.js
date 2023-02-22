import axiosClient from '../../axios'

export default {

    // Media library related 
    addToMediaLibrary({commit}, MediaFiles){
        return axiosClient.post('/media-add', MediaFiles, {
          onUploadProgress: (progressEvent) => {
            let progress = Math.round((progressEvent.loaded / progressEvent.total) * 100)
            commit("uploadProgress", {progress: progress, progressBar: true})
          }
        })
        .then((response) => {
          console.log(MediaFiles)
          console.log('MediaFiles')
          commit("uploadSuccess", true)
          commit("uploadProgress", {progress: 0, progressBar: false})
          return response;
        })
    },
    deleteSingleMedia({ }, id){
      return axiosClient.delete(`/media-delete/${id}`)
      .then((response) => {
        return response;
      })
    },
    getSingleMedia({}, mediaId){
        return axiosClient.get(`/media-single/${mediaId}`, mediaId)
        .then((response) => {
          return response;
        }) 
    },

    allMeidiaLibrary(){
        return axiosClient.get('/media-get-all')
        .then((response) => {
          return response;
        })
    },
    paginatedMedia({}, {url}){
        return axiosClient.get(url).then((res) => {
            return res;
        });
    },
}