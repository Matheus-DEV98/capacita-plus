import { Routes, Route } from 'react-router-dom'
import Menu from './components/Menu.jsx'
import Logo from './components/Logo.jsx'
import Inicio from './pages/Inicio.jsx'
import Instrutores from './pages/Instrutores.jsx'
import Cursos from './pages/Cursos.jsx'
import Inscricoes from './pages/Inscricoes.jsx'

// Define qual página aparece para cada endereço (rota).
// A página inicial ocupa a largura toda; as páginas de cadastro ficam dentro de "conteudo".
export default function App() {
  return (
    <>
      <Menu />
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/instrutores" element={<div className="conteudo"><Instrutores /></div>} />
          <Route path="/cursos" element={<div className="conteudo"><Cursos /></div>} />
          <Route path="/inscricoes" element={<div className="conteudo"><Inscricoes /></div>} />
        </Routes>
      </main>
      <footer className="rodape">
        <div className="rodape-marca"><Logo tamanho={28} /> <span>Capacita<b>+</b></span></div>
        <p>Projeto Final do Programa Transforma Futuros · Desenvolvido por Matheus</p>
      </footer>
    </>
  )
}
