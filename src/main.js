import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

let app
// Initialize Firebase
const config = {
	apiKey: 'AIzaSyATpxhGpUKH1WgeLqK0cL2Q7Ea0H1xwDJM',
	authDomain: 'app-card-piso.firebaseapp.com',
	databaseURL: 'https://app-card-piso.firebaseio.com',
	projectId: 'app-card-piso',
	storageBucket: 'app-card-piso.appspot.com',
	messagingSenderId: '952118161789'
}

firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(user => {
	if (!app) {
		app = new Vue({
			el: '#app',
			router,
			template: '<App/>',
			components: { App },
			render: h => h(App)
		})
	}
})
