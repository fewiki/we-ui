
import Router from './pages/Router.vue'

export default [{
		path: '/',
		redirect: '/router'
	},
  
  {
    path: '/router',
    component: Router
  },
]
