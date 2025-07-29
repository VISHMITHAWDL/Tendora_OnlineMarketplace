import React from 'react';
import axios from 'axios';
import { API_BASE_URL, API_URLS } from './const'

const fetchCategories = async () => {
    const url = API_BASE_URL + API_URLS.Get_CATEGORIES;
    try {
        const response = await axios(url, {
            method: 'GET'
        });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Failed to fetch categories");
        }

    }catch(error){
        console.log(error);
    }

}

export default fetchCategories;
