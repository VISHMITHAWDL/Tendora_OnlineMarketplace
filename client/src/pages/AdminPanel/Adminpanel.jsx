import React from 'react'
import { Admin, fetchUtils,Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import Productlistdis from './Productlistdis';
import EditProduct from './EditProduct';
import CreateProduct from './CreateProduct';








const httpClient = (url,options={})=>{

  const token = localStorage.getItem('authToken');
  if(!options.headers) options.headers = new Headers();
  options.headers.set('Authorization',`Bearer ${token}`);
  return fetchUtils.fetchJson(url,options);
}

const dataProvider = (simpleRestProvider('http://localhost:8080/api',httpClient));
const Adminpanel = () => {
  return (
    <Admin dataProvider={dataProvider} basename='/admin'>
      {/* <Resource name="users" /> */}
      <Resource name="products" list={Productlistdis} edit={EditProduct} create={CreateProduct}/>
      {/* <Resource name="orders" /> */}

    </Admin>
  )
}

export default Adminpanel