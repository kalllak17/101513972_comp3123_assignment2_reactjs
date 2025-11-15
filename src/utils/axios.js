import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://comp3123assignment01.vercel.app/api/v1',
});


export default instance;