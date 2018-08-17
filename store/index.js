import Vuex from 'vuex'
import user from './modules/user'
import login from './modules/login'
import logout from './modules/logout'
import forgot from './modules/forgot'
import refresh from './modules/refresh'
import confirm from './modules/confirm'
import register from './modules/register'
import navigation from './modules/navigation'

export default () => new Vuex.Store({
    namespaced: true,
    strict: true,
    modules: {
        user,
        login,
        logout,
        forgot,
        refresh,
        confirm,
        register,
        navigation,
    }
})
