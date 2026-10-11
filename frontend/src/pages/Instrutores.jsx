import { useEffect, useState } from 'react'
import { api } from '../api.js'
import Campo from '../components/Campo.jsx'
import Tabela from '../components/Tabela.jsx'
import Mensagem from '../components/Mensagem.jsx'

const FORM_VAZIO = { nome: '', email: '', especialidade: '' }

export default function Instrutores() {
  const [instrutores, setInstrutores] = useState([]) // lista vinda da API
  const [form, setForm] = useState(FORM_VAZIO)       // dados digitados no formulário
  const [editandoId, setEditandoId] = useState(null) // null = cadastrando; número = editando
  const [mensagem, setMensagem] = useState(null)

  // R - Read: busca a lista na API
  async function carregar() {
    try {
      setInstrutores(await api.listar('instrutores'))
    } catch (e) {
      setMensagem({ tipo: 'erro', texto: e.message })
    }
  }

  // useEffect com [] roda uma única vez, quando a página abre
  useEffect(() => { carregar() }, [])

  // Atualiza o campo digitado dentro do objeto "form"
  function aoMudar(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // C - Create ou U - Update, dependendo se estamos editando
  async function salvar(e) {
    e.preventDefault() // impede o navegador de recarregar a página
    try {
      if (editandoId) {
        await api.atualizar('instrutores', editandoId, form)
        setMensagem({ tipo: 'sucesso', texto: 'Instrutor atualizado!' })
      } else {
        await api.criar('instrutores', form)
        setMensagem({ tipo: 'sucesso', texto: 'Instrutor cadastrado!' })
      }
      cancelar()
      carregar()
    } catch (e) {
      setMensagem({ tipo: 'erro', texto: e.message })
    }
  }

  // Preenche o formulário com os dados do registro escolhido
  function editar(instrutor) {
    setEditandoId(instrutor.id)
    setForm({ nome: instrutor.nome, email: instrutor.email, especialidade: instrutor.especialidade })
  }

  function cancelar() {
    setEditandoId(null)
    setForm(FORM_VAZIO)
  }

  // D - Delete
  async function excluir(instrutor) {
    if (!confirm(`Excluir o instrutor ${instrutor.nome}?`)) return
    try {
      await api.excluir('instrutores', instrutor.id)
      setMensagem({ tipo: 'sucesso', texto: 'Instrutor excluído!' })
      carregar()
    } catch (e) {
      setMensagem({ tipo: 'erro', texto: e.message })
    }
  }

  return (
    <section>
      <h1>Instrutores</h1>
      <Mensagem mensagem={mensagem} />

      <form className="formulario" onSubmit={salvar}>
        <Campo rotulo="Nome" nome="nome" valor={form.nome} aoMudar={aoMudar} />
        <Campo rotulo="E-mail" nome="email" tipo="email" valor={form.email} aoMudar={aoMudar} />
        <Campo rotulo="Especialidade" nome="especialidade" valor={form.especialidade} aoMudar={aoMudar} />
        <div className="botoes">
          <button className="botao" type="submit">{editandoId ? 'Salvar alterações' : 'Cadastrar'}</button>
          {editandoId && <button className="botao secundario" type="button" onClick={cancelar}>Cancelar</button>}
        </div>
      </form>

      <Tabela
        colunas={[
          { titulo: 'ID', valor: (i) => i.id },
          { titulo: 'Nome', valor: (i) => i.nome },
          { titulo: 'E-mail', valor: (i) => i.email },
          { titulo: 'Especialidade', valor: (i) => i.especialidade },
        ]}
        itens={instrutores}
        aoEditar={editar}
        aoExcluir={excluir}
      />
    </section>
  )
}
