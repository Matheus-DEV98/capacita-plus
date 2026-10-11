import { Routes, Route } from 'react-router-dom'
import Menu from './components/Menu.jsx'
import Inicio from './pages/Inicio.jsx'
import Instrutores from './pages/Instrutores.jsx'
import Cursos from './pages/Cursos.jsx'
import Inscricoes from './pages/Inscricoes.jsx'

// Define qual página aparece para cada endereço (rota)
export default function App() {
  return (
    <>
      <Menu />
      <main className="conteudo">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/instrutores" element={<Instrutores />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/inscricoes" element={<Inscricoes />} />
        </Routes>
      </main>
    </>
  )
}
