import axios from "axios"; // Biblioteca no qual vai puxar os dados da API com mais facilidade do q o FETCH

// BASE: https://api.themoviedb.org/3/


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;