import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const appStore = create(
    (set) => ({
        loader: false,
        modal: false,
        startLoader: () => set({ loader: true }),
        stopLoader: () => set({ loader: false }),
        openModal: () => set({ modal: true }),
        closeModal: () => set({ modal: false }),
    })
)


const authStore = create(
    persist(
        (set) => ({
            user: null,
            role: null,
            storeData: {
                categories: [],
                products: []
            },
            adminData: {
                dashboard: {
                    buyers: 0,
                    sellers: 0,
                    agents: 0,
                    subscribers: 0,
                },
                sellers: [],
                buyers: [],
                agents: []
            },
            agentData: {
                sellers: []
            },
            sellerData: {
                products: []
            },
            login: (user, role) => set({ user, role }),
            logout: () => set({ user: null, role: null }),
            setAdminDashboard: (data) => set((state) => ({
                ...state,
                adminData: { 
                    ...state.adminData,
                    dashboard: data
                }
            })),
            setAdminSellers: (data) => set((state) => ({
                ...state,
                adminData: { 
                    ...state.adminData,
                    sellers: data
                }
            })),
            setAdminBuyers: (data) => set((state) => ({
                ...state,
                adminData: { 
                    ...state.adminData,
                    buyers: data
                }
            })),
            setAdminAgents: (data) => set((state) => ({
                ...state,
                adminData: { 
                    ...state.adminData,
                    agents: data
                }
            })),
            setCategories: (data) => set((state) => ({
                ...state,
                storeData: { 
                    ...state.storeData,
                    categories: data
                }
            })),
            setProducts: (data) => set((state) => ({
                ...state,
                storeData: { 
                    ...state.storeData,
                    products: data
                }
            })),
            setSellerProducts: (data) => set((state) => ({
                ...state,
                sellerData: { 
                    ...state.sellerData,
                    products: data
                }
            })),
            setAgentSellers: (data) => set((state) => ({
                ...state,
                agentData: { 
                    ...state.agentData,
                    sellers: data
                }
            })),
        }),
        {
            name: 'bmn-auth',
        }
    )
)

export { appStore, authStore }