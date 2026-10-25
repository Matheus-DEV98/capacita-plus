import { NavLink, Link } from 'react-router-dom'
import Logo from './Logo.jsx'

// Barra de navegação exibida em todas as páginas
export default function Menu() {
  return (
    <header className="menu">
      <Link to="/" className="logo">
        <Logo />
        <span>Capacita<b>+</b></span>
      </Link>
      <nav>
        <NavLink to="/" end>Início</NavLink>
        <NavLink to="/instrutores">Instrutores</NavLink>
        <NavLink to="/cursos">Cursos</NavLink>
        <NavLink to="/inscricoes">Inscrições</NavLink>
        <a href="/#sobre">Sobre nós</a>
      </nav>
    </header>
  )
}
