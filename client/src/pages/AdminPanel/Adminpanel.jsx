import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Admin, fetchUtils, Resource, withLifecycleCallbacks, Layout, AppBar } from 'react-admin';
import Button from '@mui/material/Button';
import simpleRestProvider from 'ra-data-simple-rest';
import Productlistdis from './Productlistdis';
import EditProduct from './EditProduct';
import CreateProduct from './CreateProduct';
import CategoryList from './Categoryforadmin/CategoryList';
import CategoryEdit from './Categoryforadmin/CategoryEdit';
import { fileUploadAPI } from '../../api/FileUpload/Fileupload';



const httpClient = (url,options={})=>{

  const token = localStorage.getItem('authToken');
  if(!options.headers) options.headers = new Headers();
  options.headers.set('Authorization',`Bearer ${token}`);
  return fetchUtils.fetchJson(url,options);
}

const dataProvider = withLifecycleCallbacks(
  simpleRestProvider('http://localhost:8080/api', httpClient),
  [
    {
      resource: "products",
      beforeSave: async (params, dataProvider) => {
        let requestBody = {
          ...params
        };
        let productResList = params?.productResources ?? [];

        // Upload thumbnail and use Cloudinary URL
        const thumbnailFormData = new FormData();
        thumbnailFormData.append("file", params?.thumbnail?.rawFile);
        const thumbnailResponse = await fileUploadAPI(thumbnailFormData);
        const thumbnailUrl = thumbnailResponse?.url || thumbnailResponse;

        // Create thumbnail resource object
        const thumbnailResource = {
          name: params?.thumbnail?.rawFile?.name || "thumbnail",
          type: "image",
          url: thumbnailUrl,
          isPrimary: true
        };

        // Upload each product resource and use Cloudinary URL
        const newProductResList = await Promise.all(
          productResList?.map(async (productResource) => {
            const formData = new FormData();
            formData.append("file", productResource?.url?.rawFile);
            const fileUploadRes = await fileUploadAPI(formData);
            return {
              ...productResource,
              url: fileUploadRes?.url || fileUploadRes,
              isPrimary: false
            };
          })
        );

        // Add thumbnail resource at the beginning
        const allResources = [thumbnailResource, ...newProductResList];

        // Remove thumbnail field from request
        delete requestBody.thumbnail;

        const request = {
          ...requestBody,
          productResources: allResources
        };
        return request;
      }
    }
  ]
);




const CustomAppBar = (props) => {
  const navigate = useNavigate();
  return (
    <AppBar {...props}>
      <Button
        variant="contained"
        color="primary"
        style={{marginLeft: '16px'}}
        onClick={() => navigate('/')}
      >
        Back to Home
      </Button>
    </AppBar>
  );
};

const CustomLayout = (props) => <Layout {...props} appBar={CustomAppBar} />;

const Adminpanel = () => {
  return (
    <Admin dataProvider={dataProvider} basename='/admin' layout={CustomLayout}>
      <Resource name="products" list={Productlistdis} edit={EditProduct} create={CreateProduct}/>
      <Resource name='category' list={CategoryList} edit={CategoryEdit}/>
    </Admin>
  );
}

export default Adminpanel