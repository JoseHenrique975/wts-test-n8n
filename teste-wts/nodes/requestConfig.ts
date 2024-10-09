import axios from 'axios';


export const axiosRequest = axios.create();

/*
axiosRequest.interceptors.request.use((config) => {
    const { data } = config;
    if(data.departmentId === 'null' || data.userId === 'null' || data.botId == 'null'){

    }
})*/