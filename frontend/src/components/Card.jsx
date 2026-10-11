import { Link } from 'react-router-dom'

// Cartão usado na página inicial para levar a cada área
export default function Card({ titulo, texto, link }) {
  return (
    <Link to={link} className="card">
      <h3>{titulo}</h3>
      <p>{texto}</p>
    </Link>
  )
}
