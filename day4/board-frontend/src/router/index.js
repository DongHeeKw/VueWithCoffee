import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import PostListPage from '@/pages/PostListPage'
import PostViewPage from '@/pages/PostViewPage'
import SignUp from '@/pages/SignUp'
import SignIn from '@/pages/SignIn'
import AppHeader from '@/components/AppHeader'
import PostCreatePage from '@/pages/PostCreatePage'
import PostEditPage from '@/pages/PostEditPage'

Vue.use(Router)

export default new Router({
  mode : 'history',
  routes: [
    {
      path: '/',
      name: 'PostListPage',
      component: PostListPage
    },
    {
      path : '/post/create',
      name : 'PostCreatePage',
      components : {
        header : AppHeader,
        //default : PostEditPage
        default : PostCreatePage
      },
      // beforeEnter 가드 훅을 추가
      beforeEnter (to, from, next) {
        const { isAuthorized } = store.getters
        if (!isAuthorized) {
          alert('로그인이 필요합니다.')
          //로그인이 되어있지 않다면 로그인 페이지로 이동시킨다.
          next({ name : 'SignIn' })
        }
        next()
      }
    },
    {
      path : '/post/:postId',
      name : 'PostViewPage',
      components : {
        default: PostViewPage,
        header: AppHeader,
      },
      props : {
        default : true
      }
    },
    {
      path : '/post/:postId/edit',
      name : 'PostEditPage',
      components : {
        header : AppHeader,
        default : PostEditPage
      },
      props : {
        default : true
      },
      beforeEnter (to, from, next) {
        const { isAuthorized } = store.getters
        if (!isAuthorized) {
          alert('로그인이 필요합니다.')
          next({ name : 'SignIn' })
          return false;
        }
        store.dispatch('fetchPost', to.params.postId)
          .then(res => {
            console.log(res)
            const post = store.state.post
            const isAuthor = post.user.id === store.state.me.id
            if (isAuthor) {
              next()
            } else {
              alert('게시글의 작성자만 게시물을 수정할 수 있습니다.')
              next(false)
            }
          })
          .catch(err => {
            alert(err.response.data.msg)
            next(false)
          })
      }
    },
    {
      path : '/signup',
      name : 'SignUp',
      components : { 
        header : AppHeader,
        default : SignUp,
      }
    },
    {
      path : '/signin',
      name : 'SignIn',
      component : SignIn
    },
  ]
})
