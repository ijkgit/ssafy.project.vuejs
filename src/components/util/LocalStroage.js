export const getLocalStorageToken = () =>{
    const token = localStorage.getItem('access_token')
    return token;
}

export const setLocalStorage = (token) =>{
    localStorage.setItem('access_token',token)
}