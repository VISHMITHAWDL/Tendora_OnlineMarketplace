import React from 'react'
import { API_BASE_URL, API_URLS } from './const'
import axios from 'axios'

export const getAllProducts = async (id, typeId) => {
  let url = API_BASE_URL + API_URLS.Get_PRODUCTS + `?categoryId=${id}`
  if (typeId) {
    url = url + `&typeId=${typeId}`
  }
  try{
    const result = await axios(url,{

      method: 'GET',
    })
    return result?.data

  }catch(error){

    console.error('Error fetching products:', error)
  }
    
}

export const getProductById = async (id) => {
  const url = API_BASE_URL + API_URLS.Get_PRODUCTS + `/${id}`;
  try {
    const result = await axios(url, {
      method: "GET",
    });
    return result?.data;
  } catch (error) {
    console.error(error);
  }
}