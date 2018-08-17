export default {
    namespaced: true,

    state: {
        redirectTo: '/'
    },

    actions: {
        post({ commit, state, dispatch }) {
            if(localStorage.getItem('refresh_token')) {
                this.$axios.$post('/refresh', {
                    refresh_token: localStorage.getItem('refresh_token')
                })
                    .then(response => {
                        commit('login/setAccessToken', response.access_token, { root: true })
                        commit('login/setRefreshToken', response.refresh_token, { root: true })
                        commit('login/setAccessExpiry', response.expires_in, { root: true })
                        commit('user/setAuthenticated', true, { root: true })
                        dispatch('login/refreshTimer', response.expires_in, { root: true })
                    })
                    .catch(({ response }) => {
                        commit('logout/deleteAccessToken', null, { root: true })
                        commit('logout/deleteRefreshToken', null, { root: true })
                        commit('logout/deleteExpiresIn', null, { root: true })
                        commit('user/setAuthenticated', false, { root: true })
                        commit('user/setIndexUser', {}, { root: true })
                        commit('user/setUpdateUser', {}, { root: true })

                        this.$toast.error('Your session has expired!')
                        this.$router.replace({
                            path: state.redirectTo
                        })
                    })
            }
        }
    }
}
