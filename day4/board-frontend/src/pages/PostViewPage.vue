<template>
    <div class="post-view-page">
        <!-- <div class="post-view">
            <div>
                <h1>게시글의 제목이 노출된다</h1>
                <span>게시판 번호 1</span>
                <strong>홍길동 . 2019-01-01 09:00</strong>
            </div>
            <p>해당 영역에는 게시글의 콘텐츠 내용이 노출된다.</p>
        </div> -->
        <post-view v-if="post" :post="post"/>
        <p v-else> 게시글 불러오는 중...</p>
        <router-link :to="{ name: 'PostEditPage', parmas : { postId } }">수정</router-link>
        <router-link :to="{ name : 'PostListPage'}">목록</router-link>
        <button @click="onDelete">삭제</button>
        <router-link :to="{ name : 'PostListPage' }">목록</router-link>
        <comment-list v-if="post" :comments="post.comments"/>
        <comment-form @submit="onCommentSubmit"/>
    </div>
</template>

<script>
import api from '@/api'
import { mapGetters, mapState, mapActions } from 'vuex'
import PostView from '@/components/PostView'
import CommentList from '@/components/CommentList'
import CommentForm from '@/components/CommentForm'

export default {
    name : 'PostViewPage',
    components : {
        PostView,
        CommentList,
        CommentForm
    },
    methods : {
        ...mapActions(['fetchPost']),
        onDelete() {
            const { id } = this.post
            // console.log(id)
            api.delete(`/posts/${id}`)
                .then(() => {
                    alert('게시글이 성공적으로 삭제되었습니다.')
                    this.$router.push({ name : 'PostListPage' }) 
                })
                .catch(err => {
                    if(err.response.status === 401) {
                        alert('로그인이 필요합니다.')
                        this.$router.push({ name : 'SignIn' })
                    } else {
                        alert(err.response.data.msg)
                    }
                })
        },
        onCommentSubmit(comment) {
            if(!this.isAuthorized) {
                alert('로그인이 필요하지않습니다.')
                this.$router.push({ name : 'SignIn' })
            } else {
                this.createComment(comment)
                    .then(() => {
                        alert('댓글이 성공적으로 작성되었습니다.')
                    })
                    .catch(err => {
                        alert(err.response.data.msg)
                    })
            }
        }
    },
    props : {
        postId: {
            type : String,
            required : true,
        }
    },
    created () {
        this.fetchPost(`/${this.postId}`)
            .catch(err => {
                alert(err.response.data.msg)
                this.$router.back()
            })
    },
    computed : {
        ...mapState([ 'post' ]),
        ...mapGetters([ 'isAuthorized' ]),
        ...mapActions([ 'createComment' ])
    },
}
</script>