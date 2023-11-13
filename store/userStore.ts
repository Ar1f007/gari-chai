import {proxy} from 'valtio';
import {devtools} from 'valtio/utils';
import {IS_SERVER} from "@/lib/constants";

type TUserStore = {
    user: {} | null;
    status: () => "pending" | "loggedOut" | "loggedIn";
};

const initialState: TUserStore = {
    user: null,
    status() {
        return this.user instanceof Promise
            ? "pending"
            : this.user === null
                ? "loggedOut"
                : "loggedIn";
    }
}

export const userStore = proxy<TUserStore>(initialState);

export const userActions = {
    setUser() {
    }
};


devtools(userStore, {
    name: 'user',
    enabled: IS_SERVER,
});
