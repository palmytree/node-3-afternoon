require('dotenv').config()

const express = require('express'),
	massive = require('massive'),
	ctrl = require('./product_controller'),
	{ SERVER_PORT, CONNECTION_STRING } = process.env,
	app = express()

app.use(express.json())

massive({
	connectionString: CONNECTION_STRING,
	ssl: {
		rejectUnauthorized: false
	}
})
	.then(db => {
		app.set('db', db)
		console.log('database connected')
	})
	.catch(err => console.log(err))

app.get('/api/products', ctrl.getAll)
app.get('/api/products/:id', ctrl.getOne)
app.put('/api/products/:id', ctrl.update)
app.post('/api/products', ctrl.create)
app.delete('/api/products/:id', ctrl.delete)

app.listen(SERVER_PORT, () =>
	console.log(`Server listening on port ${SERVER_PORT}`)
)
