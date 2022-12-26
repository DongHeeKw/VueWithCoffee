<template>
    <div class="memo-app"> 
        <memo-form @addMemo = "addMemo"/>
        <ul class="memo-list">
            <memo v-for="memo in memos"
                  :key="memo.id"
                  :memo="memo"
                  @deleteMemo="deleteMemo"
                  @updateMemo="updateMemo"
                  :editingID="editingID"
                  @setEditingId="SET_EDITING_ID"
                  @resetEditingId="RESET_EDITING_ID"/>
        </ul>
    </div>
</template>

<script>
import MemoForm from './MemoForm';
import Memo from "./Memo";
// import axios from 'axios';
import { mapActions, mapState, mapMutations } from 'vuex';
import { RESET_EDITING_ID, SET_EDITING_ID } from '../store/mutations-types';

// const memoAPICore = axios.create({
//     baseURL : 'http://localhost:8000/api/memos'
// });

export default{
    name : 'MemoApp',
    // data () {
    //     return {
    //         memos :[],
    //     };
    // },
    computed : {
      ...mapState([
        'memos',
        'editingID'
      ])  
    },
    // created 훅은 일반적인 생명주기에서 가장 먼저 실행된다.
    // 따라서, 컴포넌트의 초기화에 필요한 데이터를 API 서버와 같이 외부에서 가져오거나
    // 지금과 같이 로컬스토리지의 데이터를 받아오는 경우 created 훅에서 실행시켜준다.
    created() {
        //this.memos = localStorage.memos ? JSON.parse(localStorage.memos) : [];
        // memoAPICore.get('/')
        //     .then(res=> {
        //         this.memos = res.data;
        //     })
        this.fetchMemos();
    },
    methods : {
        // addMemo (payload) {
        //     // console.log(this);
        //     // this.memos.push(payload);
        //     // this.storeMemo();
        //     memoAPICore.post('/', payload)
        //         .then(res => {
        //             this.memos.push(res.data);
        //         })
        // },
        // storeMemo() {
        //     // stringify() ==> js를 string으로 변환
        //     const memosToString = JSON.stringify(this.memos);
        //     localStorage.setItem('memos',memosToString);
        // },
        // deleteMemo(id) {
        //     //console.log("test2");
        //     const targetIndex = this.memos.findIndex(v => v.id === id);
        //     memoAPICore.delete(`/${id}`)
        //         .then(() => {
        //             //slice(시작, 끝) ==> 새로운 배열을 리턴
        //             //splice(해당 Index, 제거할 요소 수) ==> 수정된 원본 배열을 리턴
        //             this.memos.splice(targetIndex, 1);
        //         });
        // },
        // updateMemo(payload) {
        //     const { id, content } = payload;
        //     const targetIndex = this.memos.findIndex(v => v.id === id);
        //     const targetMemo = this.memos[targetIndex];
        //     memoAPICore.put(`/${id}`, { content })
        //     .then(() => {
        //         this.memos.splice(targetIndex, 1, {...targetMemo, content});
        //     })
        // }
        ...mapActions([
            'fetchMemos',
            'addMemo',
            'deleteMemo',
            'updateMemo'
        ]),
        ...mapMutations([
            SET_EDITING_ID,
            RESET_EDITING_ID,
        ]),
    },
    components : {
        MemoForm,
        Memo,
    }
}
</script>

<style scoped>
    .memo-list {
        padding: 20px 0;
        margin: 0;
    }
</style>
