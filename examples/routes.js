import Router from './pages/Router.vue'
import Test from './pages/test/test.vue'
import Editor from './pages/editor/editor.vue'
import CommentEditor from './pages/comment-editor/comment-editor.vue'
export default [{
		path: '/',
		redirect: '/router'
	},
  {
    path: '/router',
    component: Router
  },
  {
    path: '/test',
    component: Test
  },
  {
    path: '/editor',
    component: Editor
  },
  {
    path: '/comment-editor',
    component: CommentEditor
  }
]
