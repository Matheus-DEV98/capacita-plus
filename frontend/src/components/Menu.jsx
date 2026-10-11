import { NavLink } from 'react-router-dom'

// Barra de navegação exibida em todas as páginas
export default function Menu() {
  return (
    <header className="menu">
      <span className="logo">Capacita+</span>
      <nav>
        <NavLink to="/" end>Início</NavLink>
        <NavLink to="/instrutores">Instrutores</NavLink>
        <NavLink to="/cursos">Cursos</NavLink>
        <NavLink to="/inscricoes">Inscrições</NavLink>
      </nav>
    </header>
  )
}
