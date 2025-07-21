import React, { useMemo } from 'react'
import ProductCard from './ProductCard'
import Data from '../../data/content.json'
import Filter  from '../Productfilter/Filter'
import Pricefilter from '../Productfilter/Pricefilter'
import Colorfilter from '../Productfilter/Colorfilter'


const Productlist = ({categorytype}) => {

    const Categorydata = Data?.categories;

    const categorycontent = useMemo(() => {
    return Categorydata ?.find((category)=> category.code === categorytype)
    }, [categorytype]);

  return (
    <div>
        <Filter types={categorycontent?.types} />
        <Pricefilter />
        <Colorfilter />
    </div>

    
  )
}

export default Productlist