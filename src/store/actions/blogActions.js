import axiosClient from '../../axios'

export default {
    allBlogs(){
        return axiosClient.get('/blog-all')
        .then((response) => {
          return response;
        })
    },
    deleteBlog({}, blogId){
        return axiosClient.delete(`/blog-single/${blogId}`)
        .then((response) => {
          return response;
        })
    },
    paginatedBlog({}, {url}){
        return axiosClient.get(url).then((res) => {
            return res;
        });
    },
    insertBlog({}, blogData){
        if(blogData.id){
            let blogDataa = {...blogData, description: JSON.stringify(blogData.description)}
            return axiosClient.put(`/blog-single/${blogData.id}`, blogDataa)
            .then((response) => {
              return response;
            })
        } else {
            let blogDataa = {...blogData, description: JSON.stringify(blogData.description)}
            return axiosClient.post('/blog-add', blogDataa)
            .then((response) => {
              return response;
            })
        }
    },

    singleBlog({}, blogID){
        return axiosClient.get(`/blog-single/${blogID}`)
        .then((response) => {
          return response;
        })
    },

    //Blog category related actions
    addOrUpdateBlogCat({}, blogCat){
        if(blogCat.id){
            return axiosClient.put(`/blog-cat-update/${blogCat.id}`, blogCat)
            .then((response) => {
              return response;
            })
        } else {
            return axiosClient.post('/blog-cat-add', blogCat)
            .then((response) => {
              return response;
            })
        }
    },
    deleteBlogCategory({}, catId){
        return axiosClient.delete(`/blog-cat-delete/${catId}`)
        .then((response) => {
          return response;
        })
    },
    getBlogCat({}, catId){
        return axiosClient.get(`/blog-cat-single/${catId}`)
        .then((response) => {
          return response;
        })
    },
    getBlogCats({}){
        return axiosClient.get('/blog-cat-all')
        .then((response) => {
          return response;
        })
    },
}