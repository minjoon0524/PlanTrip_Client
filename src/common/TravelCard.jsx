import React from 'react'
import './TravelCard.style.css'
import Card from 'react-bootstrap/Card';

const TravelCard = () => {
  return (


<div>
<Card className='card-area hover:scale-105' style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://image.zdnet.co.kr/2023/07/26/f7981bfffc284d23d6335b1223bd554c.jpg" />
      <Card.Body>
        <Card.Title className='text-center font-Montserrat'>JEJU</Card.Title>
        <Card.Text>

        </Card.Text>
      </Card.Body>
    </Card>
</div>

  )
}

export default TravelCard