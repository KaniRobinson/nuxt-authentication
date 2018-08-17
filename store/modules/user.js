export default {
    namespaced: true,
    state: {
        authenticated: false,
        index: {
            loading: false,
            user: {},
            errors: []
        },
        view: {
            loading: false,
            user: {},
            errors: []
        },
        update: {
            loading: false,
            user: {},
            errors: []
        }
    },
    actions: {
        index ({ commit, state }) {
            if(localStorage.getItem('access_token')) {
                if(!state.index.loading) {
                    commit('setIndexLoading', true)
                    commit('setIndexErrors', [])

                    this.$axios.$get('/user')
                        .then(response => {
                            commit('setIndexLoading', false)
                            commit('setIndexUser', response.data)
                            commit('setUpdateUser', response.data)
                            commit('setAuthenticated', true)

                        })
                        .catch(({ response }) => {
                            commit('setIndexLoading', false)
                            commit('setIndexErrors', response.data)
                        })
                }
            }
        },

        view({ commit, state }, user_id) {
            if(!state.view.loading) {
                commit('setViewLoading', true)
                commit('setViewErrors', [])

                this.$axios.$get(`/user/${user_id}`)
                    .then(response => {
                        commit('setViewLoading', false)
                        commit('setViewUser', response.data)
                    })
                    .catch(({ response }) => {
                        commit('setViewLoading', false)
                        commit('setViewErrors', response.data)

                        if(response.status === 404) {
                            this.$toast.error('That user does not exist.')
                            this.$router.replace({
                                path: '/dashboard'
                            })
                        }
                    })
            }
        },

        update({ commit, state }) {
            if(!state.update.loading) {
                commit('setUpdateLoading', true)
                commit('setUpdateErrors', [])

                this.$axios.$put(`/user/${state.index.user.id}`, state.update.user)
                    .then(response => {
                        commit('setUpdateLoading', false)
                        commit('setIndexUser', response.data)
                        commit('setUpdateUser', response.data)
                        this.$toast.success('Profile succesfully updated.')
                    })
                    .catch(({ response }) => {
                        commit('setUpdateLoading', false)
                        commit('setUpdateErrors', response.data)
                    })
            }
        }
    },
    mutations: {
        setAuthenticated: (state, authenticated) => state.authenticated = authenticated,
        setIndexLoading: (state, loading) =>  state.index.loading = loading,
        setIndexUser: (state, user) =>  state.index.user = user,
        setIndexErrors: (state, errors) =>  state.index.errors = errors,
        setViewLoading: (state, loading) =>  state.view.loading = loading,
        setViewUser: (state, user) =>  state.view.user = user,
        setViewErrors: (state, errors) =>  state.view.errors = errors,
        setUpdateLoading: (state, loading) =>  state.update.loading = loading,
        setUpdateErrors: (state, errors) =>  state.update.errors = errors,
        setUpdateUser: (state, user) =>  state.update.user = user,
        setUpdateFirstName: (state, first_name) =>  state.update.user.first_name = first_name,
        setUpdateLastName: (state, last_name) =>  state.update.user.last_name = last_name,
        setUpdatePassword: (state, password) =>  state.update.user.password = password,
        setUpdatePasswordConfirmation: (state, password_confirmation) =>  state.update.user.password_confirmation = password_confirmation,
        setUpdateEmail: (state, email) =>  state.update.user.email = email,
    },
    getters: {
        authenticated: (state) => state.authenticated,
        me: (state) => state.index.user,
        meErrors: (state) => state.index.errors,
        meLoading: (state) => state.index.loading,
        user: (state) => state.view.user,
        userErrors: (state) => state.view.errors,
        userLoading: (state) => state.view.loading,
        updateLoading: (state) =>  state.update.loading,
        updateUser: (state) => state.update.user,
        updateErrors: (state) =>  state.update.errors,
        updateFirstName: (state) =>  state.update.user.first_name,
        updateLastName: (state) =>  state.update.user.last_name,
        updatePassword: (state) =>  state.update.user.password,
        updatePasswordConfirmation: (state) =>  state.update.user.password_confirmation,
        updateEmail: (state) =>  state.update.user.email,
        firstNameErrors: (state) => state.update.errors.errors && state.update.errors.errors.first_name ? state.update.errors.errors.first_name : null,
        lastNameErrors: (state) => state.update.errors.errors && state.update.errors.errors.last_name ? state.update.errors.errors.last_name : null,
        passwordErrors: (state) => state.update.errors.errors && state.update.errors.errors.password ? state.update.errors.errors.password : null,
        emailErrors: (state) => state.update.errors.errors && state.update.errors.errors.email ? state.update.errors.errors.email : null,
    },
}
