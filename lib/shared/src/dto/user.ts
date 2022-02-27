import { UserState } from "../types";

export interface UserDto {
    id: string;
    username: string | null;
    state: UserState;
}