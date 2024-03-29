import { create } from "zustand"
import { devtools } from "zustand/middleware"

import type { ProductState } from "./ProductTypes";

import { getAllProduct, getBrands, getCategories, getColors } from "../services/productServices";

import { convertToURLFormat } from "../utils/convertToUrlFormat";

export const useProductStore = create<ProductState>()(devtools(((set) => ({
    productsList: [],
    currentPage: 1,
    totalPages: 1,
    productsLimit: 10,
    totalProducts: 0,
    categories: [],
    brands: [],
    colors: [],
    categoriesFilter: [],
    brandsFilter: [],
    slugFilter: "",

    isDataUpdated: false,
    isLoading: false,

    setIsDataUpdated: () => {
        set((state) => ({ isDataUpdated: true }))
    },

    setCurrentPage: (page) => {
        set((state) => ({ currentPage: page }))
    },

    setSlugFilter: (productName) => {
        set((state) => ({ slugFilter: productName, currentPage: 1 }))
    },

    setBrandsFilter: (brands) => {
        set((state) => ({ brandsFilter: brands, currentPage: 1 }))
    },

    setCategoriesFilter: (categories) => {
        set((state) => ({ categoriesFilter: categories, currentPage: 1 }))
    },

    getProducts: async () => {
        set((state) => ({ isLoading: true }));
        try {
            const brandsFilter = convertToURLFormat(useProductStore.getState().brandsFilter);
            const categoriesFilter = convertToURLFormat(useProductStore.getState().categoriesFilter);

            const response = await getAllProduct(
                {
                    limit: useProductStore.getState().productsLimit,
                    page: useProductStore.getState().currentPage,
                    brands: brandsFilter,
                    categories: categoriesFilter,
                    slug: useProductStore.getState().slugFilter,
                }
            );

            const productsList = response.data.products.map((product) => ({
                ...product,
                key: product._id,
            }))

            set((state) => ({
                productsList: productsList,
                currentPage: +response.data.currentPage,
                totalPages: response.data.totalPages,
                totalProducts: response.data.totalProducts,
                isLoading: false,
                isDataUpdated: false,
            }));

        } catch (error) {
            console.log(error)
        }
    },

    getBrands: async () => {
        set((state) => ({ isLoading: true }));
        try {
            const response = await getBrands();

            set((state) => ({
                brands: response.data.brands,
                isLoading: false,
            }));

        } catch (error) {
            console.log(error)
        }
    },

    getCategories: async () => {
        set((state) => ({ isLoading: true }));
        try {
            const response = await getCategories();

            set((state) => ({
                categories: response.data.categories,
                isLoading: false,
            }));

        } catch (error) {
            console.log(error)
        }
    },

    getColors: async () => {
        set((state) => ({ isLoading: true }));
        try {
            const response = await getColors();

            set((state) => ({
                colors: response.data,
                isLoading: false,
            }));

        } catch (error) {
            console.log(error)
        }
    },

}))));
