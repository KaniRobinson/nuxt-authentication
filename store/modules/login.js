import moment from 'moment'
import { format } from 'url';

export default {
    namespaced: true,
    state: {
        username: '',
        password: '',
        loading: false,
        errors: [],
        redirectTo: '/dashboard',
        show_resend: false
    },
    actions: {
        post ({ commit, state, dispatch }) {
            if(!state.loading) {
                commit('setLoading', true)
                commit('setErrors', [])
                commit('setShowResend', false)

                this.$axios.$post('/login', {
                    'username': state.username,
                    'password': state.password
                })
                    .then(response => {
                        commit('setLoading', false)
                        commit('setAccessToken', response.access_token)
                        commit('setRefreshToken', response.refresh_token)
                        commit('setAccessExpiry', response.expires_in)
                        commit('user/setAuthenticated', true, { root: true })
                        dispatch('refreshTimer', response.expires_in)

                        this.$toast.success('Succesfully logged in')
                        this.$router.replace({
                            path: state.redirectTo
                        })
                    })
                    .catch(({ response }) => {
                        commit('setLoading', false)
                        commit('setErrors', response.data)

                        if(response.data.errors.verified) {
                            commit('setShowResend', true)
                        }

                        this.$toast.error(response.data.message)
                    })
            }
        },
        refreshTimer({ dispatch }) {
            const duration = moment.duration(moment().diff(moment(localStorage.getItem('expires_in')))).asMilliseconds()

            if(duration <= 0) {
                const expires_in = Math.abs(duration)

                setTimeout(function() {
                    dispatch('refresh/post', null, { root: true })
                }, expires_in)
            } else {
                dispatch('refresh/post', null, { root: true })
            }
        }
    },
    mutations: {
        setUsername: (state, username) => state.username = username,
        setPassword: (state, password) => state.password = password,
        setLoading: (state, loading) => state.loading = loading,
        setAccessToken: (state, access_token) => localStorage.setItem('access_token', access_token),
        setRefreshToken: (state, refresh_token) => localStorage.setItem('refresh_token', refresh_token),
        setErrors: (state, errors) => state.errors = errors,
        setAccessExpiry: (state, expires_in) => localStorage.setItem('expires_in', moment().add(expires_in - 30, 'seconds').format('YYYY-MM-DD HH:mm:ss')),
        setShowResend: (state, show_resend) => state.show_resend = show_resend
    },
    getters: {
        loading: (state) => state.loading,
        errors: (state) => state.errors || null,
        show_resend: (state) => state.show_resend,
        usernameErrors: (state) => state.errors.errors && state.errors.errors.username ? state.errors.errors.username : null,
        passwordErrors: (state) => state.errors.errors && state.errors.errors.password ? state.errors.errors.password : null,
    },
}
