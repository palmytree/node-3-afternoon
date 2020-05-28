import React from 'react'
import { Card, CardColumns } from 'react-bootstrap'

export default function ViewProducts(props) {
	return (
		<CardColumns>
			{props.products.map(product => {
				return (
					<Card style={{ width: '18rem' }}>
						<Card.Img variant='top' src={product.image_url} />
						<Card.Body>
							<Card.Title>{product.name}</Card.Title>
							<Card.Subtitle>${product.price}</Card.Subtitle>
						</Card.Body>
						<Card.Body>
							<Card.Text>{product.description}</Card.Text>
						</Card.Body>
					</Card>
				)
			})}
		</CardColumns>
	)
}
