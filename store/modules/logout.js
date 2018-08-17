export default {
    namespaced: true,
    state: {
        loading: false,
        errors: [],
        redirectTo: '/'
    },
    actions: {
        post ({ commit, state }) {
            if(!state.loading) {
                commit('setLoading', true)
                commit('setErrors', [])

                this.$axios.$post('/logout')
                    .then(response => {
                        commit('setLoading', false)
                        commit('deleteAccessToken')
                        commit('deleteRefreshToken')
                        commit('deleteExpiresIn')
                        commit('user/setAuthenticated', false, { root: true })
                        commit('user/setIndexUser', {}, { root: true })
                        commit('user/setUpdateUser', {}, { root: true })

                        this.$toast.success('Succesfully logged out')
                        this.$router.replace({
                            path: state.redirectTo
                        })
                    })
                    .catch(({ response }) => {
                        commit('setLoading', false)
                        commit('setErrors', response.data)
                        commit('deleteAccessToken')
                        commit('deleteRefreshToken')
                        commit('deleteExpiresIn')
                        commit('user/setAuthenticated', false, { root: true })
                        commit('user/setIndexUser', {}, { root: true })
                        commit('user/setUpdateUser', {}, { root: true })
                    })
            }
        }
    },
    mutations: {
        setLoading: (state, loading) => state.loading = loading,
        deleteAccessToken: () => localStorage.removeItem('access_token'),
        deleteRefreshToken: () => localStorage.removeItem('refresh_token'),
        deleteExpiresIn: () => localStorage.removeItem('expires_in'),
        setErrors: (state, errors) => state.errors = errors,
    },
    getters: {
        loading: (state) => state.loading,
        errors: (state) => state.errors || null,
    },
}
