import React from 'react'
import { Form, InputGroup, Button, Modal } from 'react-bootstrap'

export default props => {
	const { updateNewProd, submitNewProd, toggleForm } = props
	return (
		<>
			<InputGroup>
				<InputGroup.Prepend>
					<InputGroup.Text>Name</InputGroup.Text>
				</InputGroup.Prepend>
				<Form.Control id='newName' as='input' onChange={updateNewProd} />
			</InputGroup>
			<InputGroup>
				<InputGroup.Prepend>
					<InputGroup.Text>Price</InputGroup.Text>
					<InputGroup.Text>$</InputGroup.Text>
				</InputGroup.Prepend>
				<Form.Control
					id='newPrice'
					as='input'
					type='number'
					onChange={updateNewProd}
				/>
			</InputGroup>
			<InputGroup>
				<InputGroup.Prepend>
					<InputGroup.Text>Description</InputGroup.Text>
				</InputGroup.Prepend>
				<Form.Control id='newDesc' as='input' onChange={updateNewProd} />
			</InputGroup>
			<InputGroup>
				<InputGroup.Prepend>
					<InputGroup.Text>Image URL</InputGroup.Text>
				</InputGroup.Prepend>
				<Form.Control id='newImg' as='input' onChange={updateNewProd} />
			</InputGroup>
			<Modal.Footer className='edit-btn-cont'>
				<Button variant='success' onClick={submitNewProd}>
					Submit
				</Button>
				<Button variant='warning' onClick={toggleForm}>
					Cancel
				</Button>
			</Modal.Footer>
		</>
	)
}
