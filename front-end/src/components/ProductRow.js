import React, { Component } from 'react'
import Toast from 'react-bootstrap/Toast'
import axios from 'axios'

export default class ProductRow extends Component {
	constructor() {
		super()
		this.state = {
            editToggle: false,
			prodId: '',
			stateImg: '',
			stateName: '',
			statePrice: '',
			stateDesc: ''
		}
	}

	toggleEdit = () => {
		this.setState({ editToggle: !this.state.editToggle })
	}

	editState = e => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	putEdit = () => {
		const { prodId, stateImg, stateName, statePrice, stateDesc } = this.state

		axios
			.put(
				`/api/product/${prodId}?img=${stateImg}&name=${stateName}&price=${statePrice}&desc=${stateDesc}`
			)
			.then(() => {
				// Toast.call(`${stateName} successfully updated`)
				this.props.getProducts()
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
			editToggle: edit
		} = this.state
		return (
			<tr className='prod-row' onDoubleClick={this.toggleEdit}>
				<td className='img-cell'>
					{edit ? (
						<input
							type='text'
							id='stateImg'
							className='edit-prod-field'
							value={stateImg}
							placeholder={image_url}
							onChange={this.editState}
						/>
					) : (
						<img className='prod-img' src={image_url} alt={`${name}`} />
					)}
				</td>
				<td className='name-cell'>
					{edit ? (
						<input
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
						<input
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
						<input
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
				{edit ? (
					<td className='edit-btn-cont'>
						<button onClick={this.putEdit}>Submit</button>
						<button onClick={this.toggleEdit}>Cancel</button>
					</td>
				) : null}
			</tr>
		)
	}
}
