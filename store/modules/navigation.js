export default {
    namespaced: true,
    state: {
        navigation: [],
        defaultNavigation: [
            {
                name: 'Login',
                path: '/login',
                auth: false
            },
            {
                name: 'Register',
                path: '/register',
                auth: false
            },
            {
                name: 'Dashboard',
                path: '/dashboard',
                auth: true
            },
            {
                name: 'Profile',
                path: '/profile',
                auth: true
            },
            {
                name: 'Update Profile',
                path: '/profile/update',
                auth: true
            }
        ]
    },
    actions: {
        clear ({ commit }) {
            commit('clearNavigation')
        },
        fill ({ commit }, navigation) {
            commit('setNavigation', navigation)
        }
    },
    mutations: {
        clearNavigation: (state) => state.visibility = [],
        setNavigation: (state, navigation) => state.navigation = navigation
    },
    getters: {
        navigation: (state) => state.navigation,
        visibility: (state) => state.navigation.length > 0
    }
}
