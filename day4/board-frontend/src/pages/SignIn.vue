<template>
    <div class="sign-in-page">
        <h3>로그인</h3>
        <p>
            <sign-in-form @submit="onSubmit"/>
            회원이 아니신가요??
            <router-link :to="{ name : 'SignUp' }">회원가입하러 가기</router-link>
        </p>
    </div>
</template>

<script>
// import api from '@/api'
import SignInForm from "../components/SignInForm.vue"
// import SignInForm from "@/components/SignInForm"
import { mapActions } from 'vuex'

export default { 
  components: { SignInForm },
  name : "SingIn",
  methods : {
    onSubmit (payload) {
        //console.log(payload)
        // const { email, password } = payload
        // api.post('/auth/signin', { email, password })
        //     .then( res => {
        //         const { accessToken } = res.data
        //         api.defaults.headers.common.Authorization = `Bearer${accessToken}`
        //         alert('로그인이 완료되었습니다')
        //         //로그인 완료 후 PostListPage 페이지로 이동
        //         this.$router.push({ name : 'PostListPage' })
        //     })
        //     .catch(err => {
        //         alert(err.response.data.msg)
        //     })
        this.signin(payload)
            .then(res => {
                alert('로그인이 완료되었습니다.')
                this.$router.push({ name : 'PostListPage' })
                console.log(res.data);
            })
            .catch(err => {
                alert(err.response.data.msg)
            })
    },
    ...mapActions([ 'signin' ])
  }
}
</script>