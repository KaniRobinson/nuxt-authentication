export default async function ({ store , req , redirect , route }) {
    let access_token = localStorage.getItem('access_token')

    if(access_token) {
        redirect({
            path: '/dashboard'
        })
    }
}
