import React, { Component } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Image, Button, ButtonGroup, Form } from 'react-bootstrap'

export default class ProductRow extends Component {
	constructor() {
		super()
		this.state = {
			toggleBtn: false,
			editToggle: false,
			prodId: '',
			stateImg: '',
			stateName: '',
			statePrice: '',
			stateDesc: ''
		}
	}

	toggleEdit = () => {
		this.setState({ editToggle: !this.state.editToggle, toggleBtn: false })
	}

	editBtnOn = () => {
		this.setState({ toggleBtn: true })
	}

	editBtnOff = () => {
		this.setState({ toggleBtn: false })
	}

	editState = e => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	delete = () => {
		this.props.toggleMount()
		const { prodId, stateName } = this.state
		axios
			.delete(`/api/products/${prodId}`)
			.then(() => {
				toast.success(`${stateName} has been deleted`)
				this.props.getProducts()
				this.props.daddyRefresh()
			})
			.catch(err => toast.error(`Uh oh! Error: ${err}`))

		this.toggleEdit()
	}

	putEdit = () => {
		this.props.toggleMount()
		const { prodId, stateImg, stateName, statePrice, stateDesc } = this.state

		axios
			.put(
				`/api/product/${prodId}?img=${stateImg}&name=${stateName}&price=${statePrice}&desc=${stateDesc}`
			)
			.then(() => {
				toast.success(`${stateName} successfully updated`)
				this.props.getProducts()
				this.props.daddyRefresh()
			})
			.catch(err => console.log(err))

		this.toggleEdit()
	}

	componentDidMount() {
		const { product_id, image_url, name, price, description } = this.props
		this.setState({
			prodId: product_id,
			stateImg: image_url,
			stateName: name,
			statePrice: price,
			stateDesc: description
		})
	}

	render() {
		const { image_url, name, price, description } = this.props
		const {
			stateImg,
			stateName,
			statePrice,
			stateDesc,
			editToggle: edit,
			toggleBtn: btn
		} = this.state
		return (
			<tr
				className='prod-row'
				onMouseLeave={this.editBtnOff}
				onMouseEnter={this.editBtnOn}>
				<td className='btn-cell'>
					{btn && !edit ? (
						<ButtonGroup vertical className='edit-btn-cont'>
							<Button variant='dark' onClick={this.toggleEdit}>
								Edit
							</Button>
						</ButtonGroup>
					) : null}
					{edit ? (
						<ButtonGroup vertical className='edit-btn-cont'>
							<Button variant='success' onClick={this.putEdit}>
								Submit
							</Button>
							<Button variant='warning' onClick={this.toggleEdit}>
								Cancel
							</Button>
							<Button variant='danger' onClick={this.delete}>
								Delete
							</Button>
						</ButtonGroup>
					) : null}
				</td>
				<td className='img-cell'>
					<div className='img-cell-form'>
						{edit ? (
							<Form.Control
								type='text'
								id='stateImg'
								className='edit-prod-field'
								value={stateImg}
								placeholder={image_url}
								onChange={this.editState}
							/>
						) : (
							<Image
								className='prod-img'
								src={image_url}
								alt={`${name}`}
								thumbnail
							/>
						)}
					</div>
				</td>
				<td className='name-cell'>
					{edit ? (
						<Form.Control
							type='text'
							id='stateName'
							className='edit-prod-field'
							value={stateName}
							placeholder={name}
							onChange={this.editState}
						/>
					) : (
						name
					)}
				</td>
				<td className='price-cell'>
					{edit ? (
						<Form.Control
							type='text'
							id='statePrice'
							className='edit-prod-field'
							value={statePrice}
							onChange={this.editState}
						/>
					) : (
						price
					)}
				</td>
				<td className='desc-cell'>
					{edit ? (
						<Form.Control
							type='text'
							id='stateDesc'
							className='edit-prod-field'
							value={stateDesc}
							placeholder={description}
							onChange={this.editState}
						/>
					) : (
						description
					)}
				</td>
			</tr>
		)
	}
}
