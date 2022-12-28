import { 
    FETCH_POST_LIST, 
    FETCH_POST, 
    SET_ACCESS_TOKEN,
    SET_MY_INFO,
    DESTROY_ACCESS_TOKEN,
    DESTROY_MY_INFO,
    UPDATE_COMMENT
 } from './mutations-types'

import api from '@/api'
import Cookies from 'js-cookie'

export default {
    [FETCH_POST_LIST] (state, posts) {
        state.posts = posts
    },
    [FETCH_POST] (state, post) {
        state.post = post
    },
    [SET_ACCESS_TOKEN] (state, accessToken) {
        // store 되어있는 accessToken의 상태를 업데이트하고
        // api 모듈을 사용하여 HTTP 헤더에 토큰을 심어준다.
        if (accessToken) {
            state.accessToken = accessToken
            api.defaults.headers.common.Authorization = `Bearer ${accessToken}`
            Cookies.set('accessToken', accessToken)
        }
    },
    [SET_MY_INFO] (state, me) {
        if (me) {
            state.me = me
        }
    },
    [DESTROY_ACCESS_TOKEN] (state) {
        state.accessToken = ''
        delete api.defaults.headers.common.Authorization
        Cookies.remove('accessToken')
    },
    [DESTROY_MY_INFO] (state) {
        state.me = null
    },
    [UPDATE_COMMENT] (state, payload) {
        state.post.comments.push(payload)
    }
}