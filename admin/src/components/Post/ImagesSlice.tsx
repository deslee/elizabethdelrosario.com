import React from 'react'
import {ImagesSlice} from "../../models/PostModel";
import GenericAssetSlice from "./GenericAssetSlice";

interface ComponentProps {
    slice: ImagesSlice;
    name: string;
}

export default (props: ComponentProps) => {
    return <GenericAssetSlice {...props} type="IMAGE" />
}