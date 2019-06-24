import { graphql, MutationFn, DataValue } from 'react-apollo';
import gql from "graphql-tag";
import {
    Asset,
    AssetInput, AssetPatch,
    CreateAssetInput,
    CreateAssetPayload,
    UpdateAssetInput, UpdateAssetPayload
} from "api";

export const AssetFragment = gql`
fragment assetFragment on Asset {
    nodeId
    id
    state
    data
    uri
    createdBy
    updatedBy
    createdAt
    updatedAt
  }
`

type CreateAssetWithFileInput = Omit<CreateAssetInput, "asset"> & {
    asset: Omit<AssetInput, "uri"> & {
        uri: File
    }
}
export type CreateAssetVariables = { input: CreateAssetWithFileInput }
export type CreateAssetResult = { createAsset: CreateAssetPayload; }
export type CreateAssetInjectedProps = { createAsset: MutationFn<CreateAssetResult, CreateAssetVariables> }
const CREATE_ASSET_MUTATION = gql`
    mutation createAsset($input: CreateAssetInput!) {
        createAsset(input: $input) {
            asset {
                ...assetFragment
            }
        }
    }
    ${AssetFragment}
`;
export const withCreateAsset = graphql<any, CreateAssetResult, CreateAssetVariables, CreateAssetInjectedProps>(
    CREATE_ASSET_MUTATION,
    {
        props: props => ({ createAsset: props.mutate! })
    }
);

export type AssetWithFilePatch = Omit<UpdateAssetInput, "patch"> & {
    patch: Omit<AssetPatch, "uri"> & {
        uri?: File
    }
}
export type UpdateAssetVariables = { input: AssetWithFilePatch }
export type UpdateAssetResult = { updateAsset: UpdateAssetPayload; }
export type UpdateAssetInjectedProps = { updateAsset: MutationFn<UpdateAssetResult, UpdateAssetVariables> }
export const UPDATE_ASSET_MUTATION = gql`
    mutation updateAsset($input: UpdateAssetInput!) {
        updateAsset(input: $input) {
            asset {
                ...assetFragment
            }
        }
    }
    ${AssetFragment}
`;
export const withUpdateAsset = graphql<any, UpdateAssetResult, UpdateAssetVariables, UpdateAssetInjectedProps>(
    UPDATE_ASSET_MUTATION,
    {
        props: props => ({ updateAsset: props.mutate! })
    }
);

export type DeleteAssetVariables = { assetId: number; }
export type DeleteAssetResult = {}
export type DeleteAssetInjectedProps = { deleteAsset: MutationFn<DeleteAssetResult, DeleteAssetVariables> }
const DELETE_ASSET_MUTATION = gql`
mutation DeleteAsset($assetId: Int!) {
    deleteAsset(input: {id: $assetId}) {
        clientMutationId
    }
}
`;
export const withDeleteAsset = graphql<any, DeleteAssetResult, DeleteAssetVariables, DeleteAssetInjectedProps>(DELETE_ASSET_MUTATION, {
    props: props => ({
        deleteAsset: props.mutate!
    })
});

export type GetAssetListVariables = {}
export type GetAssetListResult = { assets: Asset[] }
export type AssetListInjectedProps = { assets: DataValue<GetAssetListResult, GetAssetListVariables> }
export const ASSET_LIST_QUERY = gql`
query Assets {
    assets(orderBy: [UPDATED_BY_DESC]) {
        ...assetFragment
    }
}
${AssetFragment}
`;
export const withAssetList = graphql<any, GetAssetListResult, GetAssetListVariables, AssetListInjectedProps>(
    ASSET_LIST_QUERY,
    {
        props: props => ({ assets: props.data! })
    }
)

export type GetAssetByIdVariables = { assetId: number }
export type GetAssetByIdResult = { asset?: Asset }
export type AssetInjectedProps = { asset: DataValue<GetAssetByIdResult, GetAssetByIdVariables> }
export const ASSET_BY_ID_QUERY = gql`
query AssetById($assetId: Int!) {
    asset(id: $assetId) {
        ...assetFragment
    }
}
${AssetFragment}
`;
export const withAsset = graphql<any, GetAssetByIdResult, GetAssetByIdVariables, AssetInjectedProps>(
    ASSET_BY_ID_QUERY,
    {
        props: props => ({ asset: props.data! })
    }
)