import {create} from "zustand";
import {message} from "antd";

export const useInitialDataStore = create((set, get) => ({
    users: [],
    todos: [],
    initData: async () => {
        try {
            let resp = await fetch("https://jsonplaceholder.typicode.com/users");
            let resp1 = await fetch("https://jsonplaceholder.typicode.com/todos");
            set({
                users: await resp?.json(),
                todos: await resp1?.json()
            });
        } catch (e) {
            console.log(e);
            message?.error("Error!")
        }
    }
}));