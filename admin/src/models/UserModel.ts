import {User} from "api";

export interface UserData {
    firstName?: string,
    lastName?: string,
    displayName?: string,
}
export type UserWithData = Omit<User, "data"> & {data: UserData}

export const jsonToUserData =(json: string) => {
    const rawUserData = JSON.parse(json);
    return {
        ...rawUserData
    } as UserData
};

export const userDataToJson = (data: UserData) => {
    return JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        displayName: data.displayName,
    })
};
