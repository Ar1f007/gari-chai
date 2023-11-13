import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import {IS_SERVER} from "@/lib/constants";

type TUserStore = {
    isLoggedIn: boolean;
    user: {} | null;
};

const initialState: TUserStore = {
    isLoggedIn: false,
    user: null,
}

export const userStore = proxy<TUserStore>(initialState);

export const userActions = {
    setUser(){}
};