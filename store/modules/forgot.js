export default {
    namespaced: true,
    state: {
        loading: false,
        errors: [],
        redirectTo: '/login',
        data: {
            email: '',
            password: '',
            password_confirmation: '',
        }
    },
    actions: {
        post({ commit, state }) {
            if(!state.loading) {
                commit('setLoading', true)
                commit('setErrors', [])

                this.$axios.$post('/forgot', state.data)
                    .then(response => {
                        commit('setLoading', false)
                        this.$toast.success('Succesfully sent password reset email. Please check your email.')
                        // Redirect
                    })
                    .catch(({ response }) => {
                        commit('setLoading', false)
                        commit('setErrors', response.data)
                    })
            }
        },
        reset({ commit, state }, token) {
            if(!state.loading) {
                commit('setLoading', true)
                commit('setErrors', [])

                this.$axios.$post(`/reset/${token}`, state.data)
                    .then(response => {
                        commit('setLoading', false)
                        this.$toast.success('Succesfully reset password, please log in.')

                        this.$router.replace({
                            path: state.redirectTo
                        })
                    })
                    .catch(({ response }) => {
                        commit('setLoading', false)
                        commit('setErrors', response.data)

                        if(response.data.errors.token) {
                            this.$toast.error(response.data.errors.token[0])

                            this.$router.replace({
                                path: state.redirectTo
                            })
                        }
                    })
            }
        }
    },
    mutations: {
        setLoading: (state, loading) =>  state.loading = loading,
        setErrors: (state, errors) =>  state.errors = errors,
        setEmail: (state, email) =>  state.data.email = email,
        setPassword: (state, password) =>  state.data.password = password,
        setPasswordConfirmation: (state, password_confirmation) =>  state.data.password_confirmation = password_confirmation,
    },
    getters: {
        loading: (state) =>  state.loading,
        errors: (state) =>  state.errors,
        email: (state) =>  state.data.email,
        emailErrors: (state) => state.errors.errors && state.errors.errors.email ? state.errors.errors.email : null,
        passwordErrors: (state) => state.errors.errors && state.errors.errors.password ? state.errors.errors.password : null,
    },
}
