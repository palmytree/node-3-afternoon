import React, { Component } from 'react'
import ProductRow from './ProductRow'
import { Table, Container, Spinner } from 'react-bootstrap'

// import '../style/reset.css'
import '../style/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'

export default class App extends Component {
	constructor() {
		super()
		this.state = {}
    }
    
    daddyRefresh = () => {
        this.forceUpdate()
    }

	render() {
		const { products, mounted, toggleMount} = this.props
		return (
			<Container fluid className='App'>
				{mounted ? (
					<Table responsive='lg' className='prod-table' striped hover bordered>
						<thead className='prod-table-header-row'>
							<tr>
								<th className='btn-cell'></th>
								<th className='prod-img-header'>Image</th>
								<th className='prod-name-header'>Name</th>
								<th className='prod-price-header'>Price</th>
								<th className='prod-desc-header'>Desc</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product, i) => (
								<ProductRow
									getProducts={this.props.getProducts}
									product_id={product.product_id}
									image_url={product.image_url}
									name={product.name}
									price={product.price}
                                    description={product.description}
                                    daddyRefresh={this.daddyRefresh}
                                    toggleMount={toggleMount}
									key={i}
								/>
							))}
						</tbody>
					</Table>
				) : (
					<Spinner animation='border' variant='primary' />
				)}
			</Container>
		)
	}
}
