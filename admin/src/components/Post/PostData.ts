import { PostInput, Post, PostInputShape } from 'api';
import * as yup from 'yup';

export type SliceState = 'NEW' | 'ACTIVE'
export type SliceType = 'TEXT' | 'IMAGES' | 'VIDEO'

export interface Slice {
    id: string,
    state: SliceState,
    type?: SliceType
}

export interface TextSlice extends Slice {
    text?: string;
}
export interface ImagesSlice extends Slice {
    assetIds?: number[];
}
export interface VideoSlice extends Slice {
    assetIds?: number[];
}

export function isTextSlice(slice: Slice): slice is TextSlice {
    return slice.type === 'TEXT';
}
export function isImagesSlice(slice: Slice): slice is ImagesSlice {
    return slice.type === 'IMAGES';
}
export function isVideoSlice(slice: Slice): slice is VideoSlice {
    return slice.type === 'VIDEO';
}

export interface PostData {
    title: string,
    slices: Slice[]
}

export type PostInputWithData = Omit<PostInput, 'data'> & { data: PostData }
export type PostWithData = Omit<Post, "data"> & { data: PostData }

export const PostInputWithDataShape = PostInputShape.clone().shape({
    data: yup.object().shape({
        title: yup.string().required()
    })
})

export function jsonToPostData(json: string): PostData {
    const rawPostData = JSON.parse(json) as PostData;
    return {
        ...rawPostData,
        slices: (rawPostData.slices || []).map(slice => ({
            ...slice,
            state: 'ACTIVE'
        }))
    }
}

export function postDataToJson(data: PostData): string {
    return JSON.stringify({
        title: data.title,
        slices: data.slices.map(slice => ({
            id: slice.id,
            type: slice.type,
            ...(isTextSlice(slice) && {
                text: slice.text
            }),
            ...(isImagesSlice(slice) && {
                assetIds: slice.assetIds
            }),
            ...(isVideoSlice(slice) && {
                assetIds: slice.assetIds
            })
        }))
    })
}