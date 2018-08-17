export default {
    namespaced: true,

    state: {
        loading: false,
        errors: [],
        redirectTo: '/login',
        data: {
            email: ''
        }
    },

    actions: {
        post({ commit, state }, confirmation_token) {
            if(!state.loading) {
                commit('setLoading', true)
                commit('setErrors', [])

            this.$axios.$post(`/confirm/${confirmation_token}`)
                .then(response => {
                    commit('setLoading', false)

                    this.$toast.success('succesfully verified email address');
                    this.$router.replace({
                        path: state.redirectTo
                    })
                })
                .catch(({ response }) => {
                    commit('setLoading', false)
                    commit('setErrors', response.data)

                    if(response.data.errors.token) {
                        this.$toast.error(response.data.errors.token[0]);
                    }

                    this.$router.replace({
                        path: state.redirectTo
                    })
                })

            }
        },

        resend({ state, commit }) {
            if(!state.loading) {
                commit('setLoading', true)
                commit('setErrors', [])

                this.$axios.$post('/resend', state.data)
                    .then(response => {
                        commit('setLoading', false)
                        this.$toast.success('Succesfully resend confirmation link to your email.')

                        this.$router.replace({
                            path: state.redirectTo
                        })
                    })
                    .catch(({ response }) => {
                        commit('setLoading', false)
                        commit('setErrors', response.data)
                    })
            }
        }
    },

    mutations: {
        setLoading: (state, loading) =>  state.loading = loading,
        setErrors: (state, errors) =>  state.errors = errors,
        setEmail: (state, email) =>  state.data.email = email,
    },

    getters: {
        loading: (state) =>  state.loading,
        errors: (state) =>  state.errors,
        email: (state) =>  state.data.email,
        emailErrors: (state) => state.errors.errors && state.errors.errors.email ? state.errors.errors.email : null,
    }
}
