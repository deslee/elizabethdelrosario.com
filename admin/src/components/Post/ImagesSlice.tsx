import React from 'react'
import {ImagesSlice} from "./PostData";
import GenericAssetSlice from "./GenericAssetSlice";

interface ComponentProps {
    slice: ImagesSlice;
    name: string;
}

export default (props: ComponentProps) => {
    return <GenericAssetSlice {...props} type="IMAGE" />
}