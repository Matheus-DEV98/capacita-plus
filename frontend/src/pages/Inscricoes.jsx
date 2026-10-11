import { useEffect, useState } from 'react'
import { api } from '../api.js'
import Campo from '../components/Campo.jsx'
import Tabela from '../components/Tabela.jsx'
import Mensagem from '../components/Mensagem.jsx'

const STATUS = ['PENDENTE', 'CONFIRMADA', 'CONCLUIDA', 'CANCELADA']
// Data de hoje no formato AAAA-MM-DD (usando o fuso do computador)
const hoje = () => new Date().toLocaleDateString('sv-SE')
const formVazio = () => ({ nomeAluno: '', emailAluno: '', cursoId: '', dataInscricao: hoje(), status: 'PENDENTE' })

export default function Inscricoes() {
  const [inscricoes, setInscricoes] = useState([])
  const [cursos, setCursos] = useState([]) // para preencher o select de curso
  const [form, setForm] = useState(formVazio())
  const [editandoId, setEditandoId] = useState(null)
  const [mensagem, setMensagem] = useState(null)

  async function carregar() {
    try {
      setInscricoes(await api.listar('inscricoes'))
      setCursos(await api.listar('cursos'))
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
    const dados = {
      nomeAluno: form.nomeAluno,
      emailAluno: form.emailAluno,
      curso: { id: Number(form.cursoId) },
      dataInscricao: form.dataInscricao,
      status: form.status,
    }
    try {
      if (editandoId) {
        await api.atualizar('inscricoes', editandoId, dados)
        setMensagem({ tipo: 'sucesso', texto: 'Inscrição atualizada!' })
      } else {
        await api.criar('inscricoes', dados)
        setMensagem({ tipo: 'sucesso', texto: 'Inscrição registrada!' })
      }
      cancelar()
      carregar()
    } catch (e) {
      setMensagem({ tipo: 'erro', texto: e.message })
    }
  }

  function editar(inscricao) {
    setEditandoId(inscricao.id)
    setForm({
      nomeAluno: inscricao.nomeAluno,
      emailAluno: inscricao.emailAluno,
      cursoId: inscricao.curso.id,
      dataInscricao: inscricao.dataInscricao,
      status: inscricao.status,
    })
  }

  function cancelar() {
    setEditandoId(null)
    setForm(formVazio())
  }

  async function excluir(inscricao) {
    if (!confirm(`Excluir a inscrição de ${inscricao.nomeAluno}?`)) return
    try {
      await api.excluir('inscricoes', inscricao.id)
      setMensagem({ tipo: 'sucesso', texto: 'Inscrição excluída!' })
      carregar()
    } catch (e) {
      setMensagem({ tipo: 'erro', texto: e.message })
    }
  }

  return (
    <section>
      <h1>Inscrições</h1>
      <Mensagem mensagem={mensagem} />

      <form className="formulario" onSubmit={salvar}>
        <Campo rotulo="Nome do aluno" nome="nomeAluno" valor={form.nomeAluno} aoMudar={aoMudar} />
        <Campo rotulo="E-mail do aluno" nome="emailAluno" tipo="email" valor={form.emailAluno} aoMudar={aoMudar} />
        <Campo
          rotulo="Curso"
          nome="cursoId"
          valor={form.cursoId}
          aoMudar={aoMudar}
          opcoes={cursos.map((c) => ({ valor: c.id, texto: c.nome }))}
        />
        <Campo rotulo="Data da inscrição" nome="dataInscricao" tipo="date" valor={form.dataInscricao} aoMudar={aoMudar} />
        <Campo
          rotulo="Status"
          nome="status"
          valor={form.status}
          aoMudar={aoMudar}
          opcoes={STATUS.map((s) => ({ valor: s, texto: s }))}
        />
        <div className="botoes">
          <button className="botao" type="submit">{editandoId ? 'Salvar alterações' : 'Registrar'}</button>
          {editandoId && <button className="botao secundario" type="button" onClick={cancelar}>Cancelar</button>}
        </div>
      </form>

      <Tabela
        colunas={[
          { titulo: 'ID', valor: (i) => i.id },
          { titulo: 'Aluno', valor: (i) => i.nomeAluno },
          { titulo: 'E-mail', valor: (i) => i.emailAluno },
          { titulo: 'Curso', valor: (i) => i.curso?.nome },
          { titulo: 'Data', valor: (i) => i.dataInscricao.split('-').reverse().join('/') },
          { titulo: 'Status', valor: (i) => <span className={`status ${i.status}`}>{i.status}</span> },
        ]}
        itens={inscricoes}
        aoEditar={editar}
        aoExcluir={excluir}
      />
    </section>
  )
}
