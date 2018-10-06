<template>
	<div>
		<div class="">
			<h1>{{ msg }}</h1>
		</div>
		<section>
			<article v-for="(item, key) in list" :key="key">
				<div class="item">
					{{ item }}
					<i class="material-icons" v-on:click="deleteItem(key)">delete</i>
				</div>
			</article>
		</section>
		<div class="item">
			<input type="text" v-model="newItem" placeholder="Nuevo item">
			<i class="material-icons" v-on:click="addItem()">add</i>
		</div>
	</div>
</template>

<script>
import firebase from 'firebase'

export default {
	name: 'Purchases',

	data () {
		return {
			list: {},
			msg: 'Compras',
			refPurchases: firebase.database().ref('purchases'),
			newItem: ''
		}
	},
	mounted () {
		this.getFirebase()
		console.log(this.list)
	},
	methods: {
		getFirebase () {
			this.refPurchases.on('value', (snapshot) => {
				this.list = snapshot.val()
			})
		},
		deleteItem (key) {
			delete this.list[key]
			this.refPurchases.set(this.list)
		},
		addItem () {
			console.log(this.list)
			const newPostKey = this.refPurchases.push().key
			let update = {}
			update[newPostKey] = this.newItem
			this.refPurchases.update(update)
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
	font-weight: normal;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	margin: .5em 10px;
}
a {
	color: #42b983;
}
.item {
	display: flex;
	justify-content: center;
	align-items: center;
}
.item i {
	margin-left: .5em;
}
</style>
