import React from 'react'
import {VideoSlice} from "../../models/PostModel";
import GenericAssetSlice from "./GenericAssetSlice";

interface ComponentProps {
    slice: VideoSlice;
    name: string;
}

export default (props: ComponentProps) => {
    return <GenericAssetSlice {...props} type="VIDEO" />
}