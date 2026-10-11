// Tabela reutilizável: recebe as colunas, a lista de registros e as ações de editar/excluir.
// colunas = [{ titulo: 'Nome', valor: (item) => item.nome }, ...]
export default function Tabela({ colunas, itens, aoEditar, aoExcluir }) {
  if (itens.length === 0) {
    return <p className="vazio">Nenhum registro cadastrado.</p>
  }
  return (
    <table className="tabela">
      <thead>
        <tr>
          {colunas.map((c) => <th key={c.titulo}>{c.titulo}</th>)}
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {itens.map((item) => (
          <tr key={item.id}>
            {colunas.map((c) => <td key={c.titulo}>{c.valor(item)}</td>)}
            <td className="acoes">
              <button className="botao secundario" onClick={() => aoEditar(item)}>Editar</button>
              <button className="botao perigo" onClick={() => aoExcluir(item)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
