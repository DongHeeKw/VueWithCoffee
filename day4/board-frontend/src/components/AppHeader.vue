<template>
    <div class="app-header">
        <h1>Community</h1>
        <div v-if="isAuthorized">
            <strong>
                <button @click="toggle">{{ me.name }}님 환영합니다.</button>
                <i v-if="!isActive" class="fas fa-sort-down"></i>
                <i v-else class="fas fa-sort-up"></i>
            </strong>
            <ul v-if="isActive">
                <li><button @click="onClickSignout">로그아웃</button></li>
            </ul>
        </div>
        <div v-else>
            <router-link :to="{ name : 'SignIn' }">로그인</router-link>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
    name : "AppHeader",
    data () {
        return {
            isActive : false
        }
    },
    computed : {
        // getter를 이용해서 component의 DOM이
        // 로그인과 로그아웃일 때 상태에 따라 변경되도록 해보자
        ...mapGetters(['isAuthorized']),
        ...mapState(['me'])
    },
    methods : {
        toggle() {
            this.isActive = !this.isActive
        },
        onClickSignOUt() {
            this.signout()
            this.$router.push({ name : 'PostListPage' })
        },
        ...mapActions([ 'singout' ])
    }
}
</script>