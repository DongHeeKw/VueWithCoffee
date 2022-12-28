<template>
    <div class="comment-item">
        <strong>{{ comment.user.name }}</strong>
        <span>{{ comment.createdAt }}</span>
        <p>{{ comment.contents }}</p>
        <ul v-if="isMyComment">
            <li><button type="button">수정</button></li>
            <li><button type="button">삭제</button></li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    name : 'CommonItem',
    props : {
        comment : {
            type : Object,
            required : true,
            validator (comment) {
                const isValidCommentId = typeof comment.id==='number'
                const isValidContents = comment.contents && comment.contents.length
                const isValidUser = !!comment.user
                return isValidCommentId && isValidContents && isValidUser
            }
        }
    },
    computed : {
        // 현재 로그인한 사용자의 정보를 스토어의 상태를 참조하여 가져옴
        ...mapState(['me']),
        // 현재 로그인 여부를 알 수 있는 isAuthorized 게터를 가져옴
        ...mapGetters(['isAuthorized']),
        // 댓글을 작성한 사용자의 아이디와 현재 로그인한 사용자의 아이디를 비교
        isMyComment() {
            return this.isAuthorized && this.comment.user.id === this.me.id
        }
    },
    data () {
        return {
            isEditing : false,
            editMessage : '',
        }
    },
    methods : {
        toggleEditMode() {
            this.isEditing = !this.isEditing
            if(this.isEditing) {
                this.editMessage = this.comment.contents
            }
        }
    }
}
</script>