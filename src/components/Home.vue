<template>
	<div>
		<purchases class="m-b-3"></purchases>
		<invoices></invoices>
	</div>
</template>

<script>
import firebase from 'firebase'
import TopBar from '@/components/TopBar'
import Purchases from '@/components/Purchases'
import Invoices from '@/components/Invoices'

export default {
	name: 'Home',
	components: {
		TopBar,
		Purchases,
		Invoices
	},
	data () {
		return {
			list: {},
			msg: 'Home',
			compras: '',
			newItem: ''
		}
	},
	mounted () {
		this.getFirebase()
	},
	methods: {
		getFirebase () {
			const fire = firebase.database()
			const compras = fire.ref('compras')
			this.compras = compras
			compras.on('value', (snapshot) => {
				this.list = snapshot.val()
			})
		},
		deleteItem (key) {
			delete this.list[key]
			this.compras.set(this.list)
		},
		addItem () {
			const newPostKey = this.compras.push().key
			let update = {}
			update[newPostKey] = this.newItem
			this.compras.update(update)
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-b-3 { margin-bottom: 3em; }
</style>
