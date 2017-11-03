
import Router from './pages/Router.vue'
import Test from './pages/test/test.vue'
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
]
