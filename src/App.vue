<template>
	<div id="app">
		<top-bar></top-bar>
		<router-view/>
	</div>
</template>

<script>
import TopBar from '@/components/TopBar'

export default {
	name: 'App',
	components: {
		TopBar
	}
}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
	body {
		margin: 0;
	}
	input {
		margin: 10px 0;
		width: 150px;
		padding: 15px;
	}
	button {
		/* margin-top: 20px;
		width: 10%;
		cursor: pointer; */
		padding: 10px 20px;
		background: #42b983;
		color: white;
		font-weight: bold;
		border: none;
		border-radius: 22px;
		outline: 0;
		cursor: pointer;
	}
	p {
		margin-top: 40px;
		font-size: 13px;
	}
	p a {
		text-decoration: none;
		cursor: pointer;
	}
</style>
