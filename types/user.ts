import { UserFormData } from "../actions/auth/schemas";
import { UpdateUserFormData } from "../actions/users/schemas";
import { IUserEntity } from "../actions/users/types";

export interface IHandleActionUsers {
    handleActionDeleteById: (userId: number) =>Promise<void>;
    handleActionCreateUser: (userData: UserFormData) => Promise<IUserEntity | null>;
    handleActionUpdateUserById: (userId: number, userData: UpdateUserFormData) => Promise<IUserEntity | null>;
    handleActionGetUserById: (userId: number) => Promise<IUserEntity | null>;
}