import React, { Component } from 'react'
import axios from 'axios'
import AddForm from './AddForm'
import EditProducts from './EditProducts'
import ViewProducts from './ViewProducts'
import { Container, Navbar, Button, Modal } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

// import '../style/reset.css'
import '../style/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'

export default class App extends Component {
	constructor() {
		super()
		this.state = {
			products: [],
			mounted: false,
			addForm: false,
			viewProd: false,
			newName: '',
			newPrice: '',
			newDesc: '',
			newImg: ''
		}
	}

	toggleAddForm = () => {
		this.setState({ addForm: !this.state.addForm })
	}

	updateNewProd = e => {
		this.setState({ [e.target.id]: e.target.value })
	}

	toggleMount = () => {
		this.setState({ mounted: !this.state.mounted })
	}

	toggleView = () => {
		this.setState({ viewProd: !this.state.viewProd })
	}

	submitNewProd = () => {
		const { newName, newPrice, newDesc, newImg } = this.state,
			body = {
				name: newName,
				price: newPrice,
				description: newDesc,
				image_url: newImg
			}

		this.toggleAddForm()
		axios
			.post('/api/products', body)
			.then(() => {
				toast.success(`${newName} successfully added!`)
				this.getProducts()
			})
			.catch(err => toast.error(`Uh oh! Error: ${err}`))
	}

	getProducts = () => {
		axios
			.get('/api/products')
			.then(res => this.setState({ products: res.data, mounted: true }))
			.catch(err => console.log(err))
	}

	componentDidMount() {
		this.getProducts()
	}

	render() {
		const { products, mounted, addForm, viewProd } = this.state
		return (
			<Container fluid className='App'>
				<Navbar bg='dark' variant='dark' className='App-header'>
					<Navbar.Brand>Palmy's Products</Navbar.Brand>
					<Button
						className='add-prod-btn'
						onClick={this.toggleAddForm}
						aria-controls='add-prod-form'
						aria-expanded={addForm}>
						Add
					</Button>
					<Button onClick={this.toggleView}>Customer View</Button>
					<Modal show={addForm} onHide={this.toggleAddForm} size='lg' centered>
						<Modal.Header closeButton>
							<Modal.Title>Add New Product</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<AddForm
								id='add-prod-form'
								toggleForm={this.toggleAddForm}
								updateNewProd={this.updateNewProd}
								submitNewProd={this.submitNewProd}
							/>
						</Modal.Body>
					</Modal>
				</Navbar>
				<ToastContainer />
				{viewProd ? (
					<ViewProducts products={products}/>
				) : (
					<EditProducts
						products={products}
						mounted={mounted}
						getProducts={this.getProducts}
						toggleMount={this.toggleMount}
					/>
				)}
			</Container>
		)
	}
}
