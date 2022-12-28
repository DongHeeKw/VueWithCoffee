<template>
    <div class="sign-up-page">
        <h1>회원가입</h1>
        <sign-up-form @submit="onSubmit"/>
        <p>
            이미 가입하셨나요?
            <router-link :to="{ name : 'Signin'}">로그인하러 가기</router-link>
        </p>
    </div>
</template>

<script>
import api from '@/api'
import SignUpForm from "@/components/SignUpForm"

export default {
    name:'SignUp',
    components : { SignUpForm },
    methods : {
        onSubmit (payload) {
            const { name, email, password } = payload
            api.post('/auth/signup', { name, email, password })
                .then(res => {
                    console.log(res)
                    alert('회원가입이 완료되었습니다')
                    // 회원가입 완료 후 SignIn 페이지로 이동
                    this.$router.push({ name : 'SignIn' })
                })
                .catch(err => {
                    alert(err.response.data.msg)
                })
        }
    }
}
</script>