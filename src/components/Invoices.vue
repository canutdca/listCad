<template>
	<div>
		<div class="">
			<h1>{{ msg }}</h1>
		</div>
		<section>
			<article v-for="(item, key) in list" :key="key">
				<div class="item">
					<div class="item--title">
						<div class="flex">
							{{ item.name }}
							<i class="material-icons" v-on:click="deleteItem(key)">delete</i>
						</div>
						<div>{{ item.amount }} €</div>
					</div>
					<div>{{ getDate(item.date) }}</div>
					<div v-if="item.notes">{{ item.notes }}</div>
				</div>
			</article>
			<article>
				<i
					v-if="!showAddItem"
					class="material-icons"
					v-on:click="showAdd()"
				>add</i>
				<div v-if="showAddItem" class="item newItem">
					<div>
						<label>Nombre:</label>
						<input type="text" v-model="newItem.name" :class="{'error': errorName}" @input="errorName = false">
					</div>
					<div>
						<label>Precio:</label>
						<input type="number" v-model="newItem.amount" :class="{'error': errorAmount}" @input="errorAmount = false">
					</div>
					<div>
						<label>Fecha:</label>
						<input type="date" v-model="newItem.date" :class="{'error': errorDate}" @input="errorDate = false">
					</div>
					<div>
						<label>Notas:</label>
						<input type="text" v-model="newItem.notes">
					</div>
					<div>
						<i class="material-icons" v-on:click="cancel()">cancel</i>
						<i class="material-icons" v-on:click="addItem()">add</i>
					</div>
				</div>
			</article>
		</section>
	</div>
</template>

<script>
import firebase from 'firebase'

export default {
	name: 'Invoices',

	data () {
		return {
			list: {},
			msg: 'Facturas',
			invoices: '',
			newItem: {},
			showAddItem: false,
			errorName: false,
			errorAmount: false,
			errorDate: false
		}
	},
	mounted () {
		this.getFirebase()
	},
	methods: {
		getFirebase () {
			const fire = firebase.database()
			const invoices = fire.ref('invoices')
			this.invoices = invoices
			invoices.on('value', (snapshot) => {
				this.list = snapshot.val()
			})
		},
		deleteItem (key) {
			delete this.list[key]
			this.invoices.set(this.list)
		},
		cancel () {
			this.showAddItem = false
			this.errorName = false
			this.errorAmount = false
			this.errorDate = false
		},
		showAdd () {
			this.showAddItem = !this.showAddItem
		},
		validateNewItem () {
			let bool = true
			if (!this.newItem.name) {
				this.errorName = true
				bool = false
			}
			if (!this.newItem.amount) {
				this.errorAmount = true
				bool = false
			}
			if (!this.newItem.date) {
				this.errorDate = true
				bool = false
			}
			return bool
		},
		addItem () {
			const isOk = this.validateNewItem()
			if (isOk) {
				const newPostKey = this.invoices.push().key
				let update = {}
				update[newPostKey] = this.newItem
				this.invoices.update(update)
				this.newItem = {}
				this.showAddItem = false
			}
		},
		getDate (dateString) {
			const date = dateString.split('-')
			return `${date[2]}/${date[1]}/${date[0]}`
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
section {
	display: flex;
	flex-direction: column;
	align-items: center;
}
article {
	width: 300px;
	margin-bottom: 2em;
}
label {
	margin-right: 1em;
}

.item {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}
.item--title {
	display: flex;
	font-size: 1.2em;
	font-weight: 600;
	justify-content: space-between;
	align-items: center;
	margin-bottom: .5em;
	width: 100%;
}

.newItem div {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
}
.flex {
	display: flex;
}
.item i {
	margin-left: .5em;
}
.error {
	border-color: red;
	border-style: solid;
}
</style>
