import { create } from "zustand"
import { devtools } from "zustand/middleware"

import type { UsersState } from "./UsersTypes";
import { getAllUsers } from "../services/usersServices";

export const useUsersStore = create<UsersState>()(devtools(((set) => ({
    usersList: [],
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
    usersLimit: 10,

    userEmailFilter: "",

    isDataUpdated: false,
    isLoading: false,

    setIsDataUpdated: () => {
        set((state) => ({ isDataUpdated: true }))
    },

    setCurrentPage: (page) => {
        set((state) => ({ currentPage: +page }))
    },

    setUserEmailFilter: (email) => {
        set((state) => ({ userEmailFilter: email }))
    },

    getUsers: async () => {
        set((state) => ({ isLoading: true }));
        try {
            const response = await getAllUsers(
                {
                    limit: useUsersStore.getState().usersLimit,
                    page: useUsersStore.getState().currentPage,
                    userEmail: useUsersStore.getState().userEmailFilter,
                }
            );

            const usersList = response.data.users.map((user) => ({
                ...user,
                key: user.id,
            }))

            set((state) => ({
                usersList: usersList,
                currentPage: +response.data.currentPage,
                totalPages: response.data.totalPages,
                totalUsers: response.data.totalUsers,
                isLoading: false,
                isDataUpdated: false,
            }));

        } catch (error) {
            console.log(error)
        }
    },


}))));
