export default function ({ $axios, store }) {
    /**
     * When a request has been made
     */
    $axios.onRequest(config => {
        config.headers.common['Content-Type'] = 'application/json';
        config.headers.common['Accept'] = 'application/json';

        if(localStorage.getItem('access_token')) {
            config.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
        }
    })

    /**
     * When a request has been succesful
     */
    $axios.onResponse(({response}) => {
        //
    })

    /**
     * When an error has been captured
     */
    $axios.onError(({response}) => {

        /**
         * When request URI is not the refresh uri
         */
        if (response.request.responseURL !== `${response.config.baseURL}/refresh`) {

            /**
             * Check for Token Error
             */
            if(response.data.error && response.data.error.token) {

                /**
                 * Refresh Token
                 */
                store.dispatch('refresh/post', null, { root: true })
            }
        }
    })
}
