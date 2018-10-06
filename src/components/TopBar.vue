<template>
	<div class="top-bar">
		<ul>
			<li><router-link to="/home"><h3>Home</h3></router-link></li>
			<li><router-link to="/purchases"><h3>Compras</h3></router-link></li>
			<li><router-link to="/invoices"><h3>Facturas</h3></router-link></li>
			<li><i class="material-icons" v-on:click="logout">exit_to_app</i></li>
		</ul>
	</div>
</template>

<script>

import firebase from 'firebase'
// import { OptionNavigate } from './../models/optionNavigate.enum'

export default {
	name: 'top-bar',
	data () {
		return {
		}
	},
	methods: {
		logout: function () {
			firebase.auth().signOut().then(() => this.$router.replace('login'))
		}
	}
}
</script>

<style scoped>
	.top-bar {
		background-color: #42b983;
	}
	ul {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 2em;
		padding: 0;
	}
	li {
		list-style: none;
		cursor: pointer;
	}
	h3 {
		padding: 1em 2em;
		margin: 0;
	}
	a {
		text-decoration: none;
		color: black;
	}
	a:visited {
		color: black
	}

</style>
