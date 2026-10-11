// Endereço da API Java (Spring Boot)
const API_URL = 'http://localhost:8080/api'

// Função única usada por todas as páginas para conversar com o backend.
// recurso: 'instrutores', 'cursos' ou 'inscricoes'
async function requisicao(caminho, metodo = 'GET', dados) {
  const resposta = await fetch(`${API_URL}/${caminho}`, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: dados ? JSON.stringify(dados) : undefined,
  })
  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => ({}))
    throw new Error(erro.mensagem || `Erro ${resposta.status} ao acessar a API`)
  }
  return resposta.status === 204 ? null : resposta.json()
}

// As 4 operações do CRUD, prontas para qualquer recurso
export const api = {
  listar: (recurso) => requisicao(recurso),
  criar: (recurso, dados) => requisicao(recurso, 'POST', dados),
  atualizar: (recurso, id, dados) => requisicao(`${recurso}/${id}`, 'PUT', dados),
  excluir: (recurso, id) => requisicao(`${recurso}/${id}`, 'DELETE'),
}
