import { Axios } from "@/util/http-commons"

const http = Axios();
//board

export const getArticleListAPI = async(params) =>{
    const response = await http.get('board/list', {params : params})
    return response;
}

export const writeArticleAPI = async(data) =>{
    const response = await http.post('board/write',data);
    return response;
}

export const getArticleAPI = async(params) =>{
    const response = await http.get(`board/view/${params}`)
    return response;
}

export const delteArticleAPI = async(params) =>{
    const response = await http.delete(`board/delete/${params}`)
    return response;
}

export const updateArticleAPI = async(data,params) =>{
    const response = await http.put(`board/modify/${params}`,data)
    return response;
}


