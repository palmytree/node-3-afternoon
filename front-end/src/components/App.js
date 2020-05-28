import React, { Component } from 'react'
import axios from 'axios'
import ProductRow from './ProductRow'
import { Table, Container, Navbar, Button } from 'react-bootstrap'
// import '../style/reset.css'
// import '../style/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class App extends Component {
	constructor() {
		super()
		this.state = {
			products: []
		}
	}

	getProducts = () => {
		axios
			.get('/api/products')
			.then(res => this.setState({ products: res.data }))
			.catch(err => console.log(err))
	}

	componentDidMount() {
		this.getProducts()
	}

	render() {
		const { products } = this.state
		return (
			<Container fluid className='App'>
				<Navbar bg='dark' variant='dark' className='App-header'>
					<Navbar.Brand>Palmy's Products</Navbar.Brand>
					<Button className='add-prod-btn'>Add</Button>
				</Navbar>

				<Table responsive className='prod-table'>
					<thead className='prod-table-header-row'>
						<tr>
							<th className='prod-img-header'>Image</th>
							<th className='prod-name-header'>Name</th>
							<th className='prod-price-header'>Price</th>
							<th className='prod-desc-header'>Desc</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product, i) => (
							<ProductRow
								getProducts={this.getProducts}
								product_id={product.product_id}
								image_url={product.image_url}
								name={product.name}
								price={product.price}
								description={product.description}
								key={i}
							/>
						))}
					</tbody>
				</Table>
			</Container>
		)
	}
}
