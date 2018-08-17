export default async function ({ redirect }) {
    let access_token = localStorage.getItem('access_token')

    if(!access_token) {
        redirect({
            path: '/login'
        })
    }
}
