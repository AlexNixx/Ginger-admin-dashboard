import { create } from "zustand"
import { devtools } from "zustand/middleware"

import type { CategoryState } from "./CategoryTypes";

import { getAllCategory } from "../services/categoryServices";

export const useCategoryStore = create<CategoryState>()(devtools(((set) => ({
    categoryList: [],
    currentPage: 1,
    totalPages: 1,
    totalCategories: 0,
    categoriesLimit: 10,

    isDataUpdated: false,
    isLoading: false,

    setIsDataUpdated: () => {
        set((state) => ({ isDataUpdated: true }))
    },

    setCurrentPage: (page) => {
        set((state) => ({ currentPage: +page }))
    },

    getCategories: async () => {
        set((state) => ({ isLoading: true }));
        try {
            const response = await getAllCategory(
                {
                    limit: useCategoryStore.getState().categoriesLimit,
                    page: useCategoryStore.getState().currentPage,
                }
            );

            const categoryList = response.data.categories.map((category) => ({
                ...category,
                key: category._id,
            }))

            set((state) => ({
                categoryList: categoryList,
                currentPage: +response.data.currentPage,
                totalPages: response.data.totalPages,
                totalCategories: response.data.totalCategories,
                isLoading: false,
                isDataUpdated: false,
            }));

        } catch (error) {
            console.log(error)
        }
    },


}))));
