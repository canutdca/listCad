<template>
<div class="sign-up">
	<h3>Let's create a new account</h3>
	<input type="text" v-model="email" placeholder="Email"><br>
	<input type="password" v-model="password" placeholder="Password"><br>
	<button v-on:click="signUp">Sign Up</button>
	<p>or go back to <router-link to="/login">login</router-link>.</p>
</div>
</template>

<script>
import firebase from 'firebase'
export default {
	name: 'signUp',
	data: function () {
		return {
			email: '',
			password: ''
		}
	},
	methods: {
		signUp: function () {
			firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
				.then(
					(user) => this.$router.replace('home'),
					(err) => alert('Oops. ' + err.message)
				)
		}
	}
}
</script>

<style scoped>
.signUp {
	margin-top: 40px;
}

</style>
