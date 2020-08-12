const pagarme = require('pagarme') 
const express = require('express')  
const bodyParser = require('body-parser') 
var path = require('path')

app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', function(req, res){ res.render('index', {})  })
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, '/views')))
app.listen(3000)


let retornoGlobal

app.post('/card_transaction',async (req, res) => {
	
   
	var date = new Date()
	var purchaseDateStamp = date.setDate(date.getDate() + req.body.delivery_date)
	var d = new Date(purchaseDateStamp),
	month = `${(d.getMonth() + 1)}`,
	day =   `${(d.getDate() )}`,
	year =      d.getFullYear()

if (month.length < 2) month = '0' + month
if (day.length < 2) day = '0' + day

var delivery_date = [year, month, day].join('-')
		var card = {
			apikey: req.body.apikey,
			amount: req.body.amount,
			card_number: req.body.card_number,
			card_expiration_date: req.body.card_expiration_date,
			card_holder_name: req.body.card_holder_name,
			installments: req.body.installments,
			payment_method: req.body.payment_method,
			card_cvv: req.body.card_cvv,
			external_id: req.body.external_id,
			email: req.body.email,
			cpf: req.body.cpf,
			phone_numbers: req.body.phone_numbers,
			country: req.body.country,
			birthday: req.body.birthday,
			metadata: req.body.metadata,
			reference_key: req.body.reference_key,
		}
		var source_address = {
			store_name: req.body.store_name,
			country: req.body.country,
			state: req.body.state,
			city: req.body.city,
			neighborhood: req.body.neighborhood,
			street: req.body.street,
			street_number: req.body.street_number,
			zipcode: req.body.zipcode,
			complementary: req.body.complementary,
		}
		var delivery_address = {
			fee: req.body.delivery_fee,
			delivery_date: delivery_date,
			expedited: req.body.expedited,
			country: req.body.delivery_country,
			state: req.body.delivery_state,
			city: req.body.delivery_city,
			neighborhood: req.body.delivery_neighborhood,
			street: req.body.delivery_street,
			street_number: req.body.delivery_street_number,
			zipcode: req.body.delivery_zipcode,
			complementary: req.body.delivery_complementary,
		}
	let tempData = []
		for(var i = 0; i < req.body.items.length; i++) {
			var items = {
			id: req.body.items[i].id,
			title: req.body.items[i].title,
			unit_price: req.body.items[i].unit_price,
			quantity: req.body.items[i].quantity,
			category:  req.body.items[i].category,
			"tangible": true,
			}
			tempData.push(items)
		}

	return await pagarme.client.connect({ api_key: card.apikey })
		.then(client => {
			return client.security.encrypt({
				"card_number": card.card_number,
				"card_cvv": card.card_cvv,
				"card_expiration_date": card.card_expiration_date,
				"card_holder_name": card.card_holder_name,
			})
		})
		.then(card_hash => makeTransaction(card_hash) ) 		
		.catch(err => makeTransaction(err) )	
		

		async function makeTransaction(card_hash){	
			await pagarme.client.connect({ api_key: card.apikey })
			.then(client => client.transactions.create({
			  "amount": card.amount,
			  "payment_method": card.payment_method,
			  "card_hash":card_hash,
			  "installments": card.installments,
			  "capture":true,
			  "customer": {
				"external_id": card.external_id,
				"name": card.card_holder_name,
				"type": "individual",
				"country": card.country,
				"email": card.email,
				"documents": [
				  {
					"type": "cpf",
					"number": card.cpf
				  }
				],
				"phone_numbers": card.phone_numbers,
				"birthday": card.birthday
			  },
			  "billing": {
				"name": source_address.store_name,
				"address": {
				  "country": source_address.country,
				  "state": source_address.state,
				  "city": source_address.city,
				  "neighborhood": source_address.neighborhood,
				  "complementary": source_address.complementary,
				  "street": source_address.street,
				  "street_number": source_address.street_number,
				  "zipcode": source_address.zipcode
				}
			  },
	
			  "metadata":card.metadata,
			  "reference_key":`${card.reference_key}`,
	
			  "shipping": {
				"name": card.card_holder_name,
				"fee": delivery_address.fee,
				"delivery_date": delivery_address.delivery_date,
				"expedited": delivery_address.expedited,
				"address": {
				  "country": delivery_address.country,
				  "state": delivery_address.state,
				  "city": delivery_address.city,
				  "neighborhood": delivery_address.neighborhood,
				  "complementary": delivery_address.complementary,
				  "street": delivery_address.street,
				  "street_number": delivery_address.street_number,
				  "zipcode": delivery_address.zipcode,
				}
			  },
			  "items": tempData
			}))
			 .then(transaction => responseTransaction(transaction)) 		
		   .catch(err => responseTransaction(err))



		   async function responseTransaction(value){

			var Error = `${value}`.includes("Error")
			var ApiError = `${value}`.includes("ApiError")
			if(ApiError){
				//console.log("ApiError : ", `${value.response['errors'][0].message}`)
				retornoGlobal = ["error",`${value.response['errors'][0].message}`]
			 }else{
				if(Error){
					retornoGlobal = ["error",`${value}`]               
				 }else{
				  if(value.status === "refused"){
					  //console.log("refused : ", value)
					   retornoGlobal = ["error", value]
				   }else{
					retornoGlobal = ["ok",value,`${value.id}`]
				   }
				}
			}

			return retornoGlobal
		   }

		   res.send(retornoGlobal)
		}

		


})

 
app.post('/return_transaction', async(req, res) => {
	var card = {
	  apikey: req.body.apikey,
	  id: req.body.transaction_id,
	}
	return await pagarme.client.connect({ api_key: `${card.apikey}` })
	  .then(client => client.transactions.find({ id: `${card.id}` }))
	   .then(transaction => responseTransaction(transaction)) 		
	    .catch(err => responseTransaction(err))

		   async function responseTransaction(value){
			res.send( ["ok",value,`${value}`])
		   }
  })