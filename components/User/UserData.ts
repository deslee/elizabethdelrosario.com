import {User} from "../../app/schema";

export interface UserData {
    name: string
}
export type UserWithData = Omit<User, "data"> & {data: UserData}

export const jsonToUserData =(json: string) => {
    const rawUserData = JSON.parse(json);
    return {
        ...rawUserData
    }
};

export const userDataToJson = (data: UserData) => {
    return JSON.stringify({
        name: data.name
    })
};
