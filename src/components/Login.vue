<template>
<div class="login">
	<h3>Sign In</h3>
	<input type="text" v-model="email" placeholder="Email"><br>
	<input type="password" v-model="password" placeholder="Password"><br>
	<button v-on:click="signIn">Connection</button>
	<!-- <p>You dont have an account? You can <router-link to="/sign-up">create one</router-link></p> -->
	<p>You dont have an account? Contact with site admin</p>
</div>
</template>

<script>
import firebase from 'firebase'

export default {
	name: 'login',
	data: function () {
		return {
			email: '',
			password: ''
		}
	},
	methods: {
		signIn: function () {
			firebase.auth().signInWithEmailAndPassword(this.email, this.password)
				.then(
					(user) => this.$router.replace('home'),
					(err) => alert('Oops. ' + err.message)
				)
		}
	}
}
</script>

<style scoped>
.login {
	margin-top: 40px;
}

</style>
