import { create } from "zustand"
import { devtools } from "zustand/middleware"

import { getAllColors } from "../services/colorServices";
import type { Color, ColorState } from "./ColorTypes";


export const useColorStore = create<ColorState>()(devtools(((set) => ({
    colorsList: [],
    currentPage: 1,
    totalPages: 1,
    totalColors: 0,
    colorsLimit: 10,

    isDataUpdated: false,
    isLoading: false,

    setIsDataUpdated: () => {
        set((state) => ({ isDataUpdated: true }))
    },

    setCurrentPage: (page) => {
        set((state) => ({ currentPage: +page }))
    },

    getColors: async () => {
        set((state) => ({ isLoading: true }));
        try {
            const response = await getAllColors(
                {
                    limit: useColorStore.getState().colorsLimit,
                    page: useColorStore.getState().currentPage,
                }
            );

            const colorsList = response.data.colors.map((color: Color) => ({
                ...color,
                key: color._id,
            }))

            set((state) => ({
                colorsList: colorsList,
                currentPage: +response.data.currentPage,
                totalPages: response.data.totalPages,
                totalColors: response.data.totalColors,
                isLoading: false,
                isDataUpdated: false,
            }));

        } catch (error) {
            console.log(error)
        }
    },


}))));
