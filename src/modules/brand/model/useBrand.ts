import { create } from "zustand"
import { devtools } from "zustand/middleware"

import { getAllBrands } from "../services/brandServices";
import type { Brand, BrandState } from "./BrandTypes";


export const useBrandStore = create<BrandState>()(devtools(((set) => ({
    brandList: [],
    currentPage: 1,
    totalPages: 1,
    totalBrands: 0,
    brandsLimit: 10,

    isDataUpdated: false,
    isLoading: false,

    setIsDataUpdated: () => {
        set((state) => ({ isDataUpdated: true }))
    },

    setCurrentPage: (page) => {
        set((state) => ({ currentPage: +page }))
    },

    getBrands: async () => {
        set((state) => ({ isLoading: true }));
        try {
            const response = await getAllBrands(
                {
                    limit: useBrandStore.getState().brandsLimit,
                    page: useBrandStore.getState().currentPage,
                }
            );

            const brandsList = response.data.brands.map((brand: Brand) => ({
                ...brand,
                key: brand._id,
            }))

            set((state) => ({
                brandList: brandsList,
                currentPage: +response.data.currentPage,
                totalPages: response.data.totalPages,
                totalBrands: response.data.totalBrands,
                isLoading: false,
                isDataUpdated: false,
            }));

        } catch (error) {
            console.log(error)
        }
    },


}))));
