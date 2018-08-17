export default {
    namespaced: true,
    state: {
        loading: false,
        errors: [],
        redirectTo: '/register/welcome',
        data: {
            first_name: '',
            last_name: '',
            password: '',
            password_confirmation: '',
            email: ''
        }
    },
    actions: {
        post({ commit, state }) {
            if(!state.loading) {
                commit('setLoading', true)
                commit('setErrors', [])

                this.$axios.$post('/register', state.data)
                    .then(response => {
                        commit('setLoading', false)
                        this.$toast.success('Sucesfully Registered, Please check your email to continue.')
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
        setFirstName: (state, first_name) =>  state.data.first_name = first_name,
        setLastName: (state, last_name) =>  state.data.last_name = last_name,
        setPassword: (state, password) =>  state.data.password = password,
        setPasswordConfirmation: (state, password_confirmation) =>  state.data.password_confirmation = password_confirmation,
        setEmail: (state, email) =>  state.data.email = email,
    },
    getters: {
        loading: (state) =>  state.loading,
        errors: (state) =>  state.errors,
        firstName: (state) =>  state.data.first_name,
        lastName: (state) =>  state.data.last_name,
        password: (state) =>  state.data.password,
        passwordConfirmation: (state) =>  state.data.password_confirmation,
        email: (state) =>  state.data.email,
        firstNameErrors: (state) => state.errors.errors && state.errors.errors.first_name ? state.errors.errors.first_name : null,
        lastNameErrors: (state) => state.errors.errors && state.errors.errors.last_name ? state.errors.errors.last_name : null,
        passwordErrors: (state) => state.errors.errors && state.errors.errors.password ? state.errors.errors.password : null,
        emailErrors: (state) => state.errors.errors && state.errors.errors.email ? state.errors.errors.email : null,
    },
}
