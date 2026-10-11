import { useEffect, useState } from 'react'
import { api } from '../api.js'
import Campo from '../components/Campo.jsx'
import Tabela from '../components/Tabela.jsx'
import Mensagem from '../components/Mensagem.jsx'

const FORM_VAZIO = { nome: '', descricao: '', duracao: '', instrutorId: '' }

export default function Cursos() {
  const [cursos, setCursos] = useState([])
  const [instrutores, setInstrutores] = useState([]) // para preencher o select de instrutor
  const [form, setForm] = useState(FORM_VAZIO)
  const [editandoId, setEditandoId] = useState(null)
  const [mensagem, setMensagem] = useState(null)

  async function carregar() {
    try {
      setCursos(await api.listar('cursos'))
      setInstrutores(await api.listar('instrutores'))
    } catch (e) {
      setMensagem({ tipo: 'erro', texto: e.message })
    }
  }

  useEffect(() => { carregar() }, [])

  function aoMudar(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function salvar(e) {
    e.preventDefault()
    // Formato que a API Java espera: o instrutor vai como objeto com o id
    const dados = {
      nome: form.nome,
      descricao: form.descricao,
      duracao: Number(form.duracao),
      instrutor: { id: Number(form.instrutorId) },
    }
    try {
      if (editandoId) {
        await api.atualizar('cursos', editandoId, dados)
        setMensagem({ tipo: 'sucesso', texto: 'Curso atualizado!' })
      } else {
        await api.criar('cursos', dados)
        setMensagem({ tipo: 'sucesso', texto: 'Curso cadastrado!' })
      }
      cancelar()
      carregar()
    } catch (e) {
      setMensagem({ tipo: 'erro', texto: e.message })
    }
  }

  function editar(curso) {
    setEditandoId(curso.id)
    setForm({
      nome: curso.nome,
      descricao: curso.descricao || '',
      duracao: curso.duracao,
      instrutorId: curso.instrutor.id,
    })
  }

  function cancelar() {
    setEditandoId(null)
    setForm(FORM_VAZIO)
  }

  async function excluir(curso) {
    if (!confirm(`Excluir o curso ${curso.nome}?`)) return
    try {
      await api.excluir('cursos', curso.id)
      setMensagem({ tipo: 'sucesso', texto: 'Curso excluído!' })
      carregar()
    } catch (e) {
      setMensagem({ tipo: 'erro', texto: e.message })
    }
  }

  return (
    <section>
      <h1>Cursos</h1>
      <Mensagem mensagem={mensagem} />

      <form className="formulario" onSubmit={salvar}>
        <Campo rotulo="Nome" nome="nome" valor={form.nome} aoMudar={aoMudar} />
        <Campo rotulo="Descrição" nome="descricao" valor={form.descricao} aoMudar={aoMudar} obrigatorio={false} />
        <Campo rotulo="Duração (horas)" nome="duracao" tipo="number" valor={form.duracao} aoMudar={aoMudar} />
        <Campo
          rotulo="Instrutor"
          nome="instrutorId"
          valor={form.instrutorId}
          aoMudar={aoMudar}
          opcoes={instrutores.map((i) => ({ valor: i.id, texto: i.nome }))}
        />
        <div className="botoes">
          <button className="botao" type="submit">{editandoId ? 'Salvar alterações' : 'Cadastrar'}</button>
          {editandoId && <button className="botao secundario" type="button" onClick={cancelar}>Cancelar</button>}
        </div>
      </form>

      <Tabela
        colunas={[
          { titulo: 'ID', valor: (c) => c.id },
          { titulo: 'Nome', valor: (c) => c.nome },
          { titulo: 'Descrição', valor: (c) => c.descricao },
          { titulo: 'Duração', valor: (c) => `${c.duracao}h` },
          { titulo: 'Instrutor', valor: (c) => c.instrutor?.nome },
        ]}
        itens={cursos}
        aoEditar={editar}
        aoExcluir={excluir}
      />
    </section>
  )
}
