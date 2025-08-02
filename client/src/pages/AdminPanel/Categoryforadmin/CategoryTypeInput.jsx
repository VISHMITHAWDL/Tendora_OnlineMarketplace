import React, { useMemo } from 'react'
import { required, SelectInput, useGetList } from 'react-admin'
import { useWatch } from 'react-hook-form'

const CategoryTypeInput = () => {

    const categoryId = useWatch({ name: 'categoryId' });
    const { data } = useGetList("category");

    const categoryTypes = useMemo(() => {
        return data?.find((category) => category?.id === categoryId)?.categoryTypes;
    }, [data, categoryId]);
    
    return (
        <SelectInput source="categoryTypeId" choices={categoryTypes} validate={[required()]} />
    )
}

export default CategoryTypeInput