export const API_URLS ={
    Get_PRODUCTS: '/api/products',
    Get_CATEGORIES: '/api/category',

    Get_PRODUCT:(id)=> `/api/product/${id}`,
    Get_CATEGORY: (id) => `/api/category/${id}`,


}

export const API_BASE_URL = 'http://localhost:8080';