export default {
    // 스토어에 토큰과 사용자 정보가 있으면
    // 현재 로그인된 상태임
    isAuthorized (state) {
        return state.accessToken.length > 0 && !!state.me
    }
}