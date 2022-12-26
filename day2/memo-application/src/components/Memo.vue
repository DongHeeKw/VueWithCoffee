<template>
    <li class="memo-item">
        <strong>{{ memo.title }}</strong>
        <p @dblclick="handleDblClick">
            <template v-if="!isEditing">
                {{ memo.content }}
            </template>
            <input v-else
                   type="text"
                   ref="content"
                   :value="memo.content"
                   @blur="handleBlur"
                   @keydown.enter="updateMemo"/>
         </p>          
        <button type="button" @click="deleteMemo">
            <i class="fas fa-times"></i>
        </button>
    </li>
</template>

<script>
export default {
    name : "Memo",
    // data () {
    //     return {
    //         isEditing : false
    //     }
    // },
    props: {
        memo: {
            type: Object
        },
        editingID : {
            type : Number
        }
    },
    computed : {
        isEditing() {
            return this.memo.id === this.editingID;
        }
    },
    // 부모(MemoApp)에게서 내려받은 memo(memos)를 사용
    // $emit을 통해 memo를 다뤄야 함
    // 여기서 memo가 memos인 이유는 부모(MemoApp)의 return이 memos
    // 이기 떄문이다. 
    // ...질문 : return은 하나인데 과연 한 개의 데이터형식만 가능한가?
    
    // beforeUpdate () {
    //   console.log("beforeUpdate => ", this.$refs.content);  
    // },
    // updated () {
    //     console.log("updated => ", this.$refs.content);
    // },
    methods : {
        deleteMemo () {
            //console.log("test1");
            const id = this.memo.id;
            this.$emit('deleteMemo', id);
        },
        handleDblClick () {
            const { id } = this. memo;
            //console.log("test");
            //this.isEditing = true;
            // console.log("handleDblClick =>", this.$refs.content);
            // this.$refs.content.focus();
            this.$emit('setEditingId', id)
            this.$nextTick(() => {
                this.$refs.content.focus();
            })
        },
        updateMemo(e) {
            const id = this.memo.id;
            //trim() : 문자열 양쪽 끝의 공백문자 제거
            const content = e.target.value.trim();
            if (content.length <= 0) {
                return false;
            }
            this.$emit('updateMemo', { id, content });
            //this.isEditing = false;
            this.$refs.content.blur();
        },
        handleBlur () {
            console.log(this);
            // this.isEditing = false;
            this.$emit('resetEditingId');
        }
    }
}
</script>

<style scoped>
    .memo-item {
    overflow: hidden;
    position: relative;
    margin-bottom: 20px;
    padding: 24px;
    box-shadow: 0 4px 10px -4px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    list-style: none;
  }
  .memo-item button {
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 20px;
    color: #e5e5e5;
    border: 0;
  }
  .memo-item strong {
    display: block;
    margin-bottom: 12px;
    font-size: 18px;
    font-weight: normal;
    word-break: break-all;
  }
  .memo-item p {
    margin: 0;
    font-size: 14px;
    line-height: 22px;
    color: #666;
  }
  .memo-item p input[type="text"] {
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
    border: 1px solid #999;
  }
</style>
