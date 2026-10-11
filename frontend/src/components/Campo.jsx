// Campo de formulário reutilizável (rótulo + input).
// Se receber "opcoes", vira uma caixa de seleção (select).
export default function Campo({ rotulo, nome, valor, aoMudar, tipo = 'text', opcoes, obrigatorio = true }) {
  return (
    <label className="campo">
      {rotulo}
      {opcoes ? (
        <select name={nome} value={valor} onChange={aoMudar} required={obrigatorio}>
          <option value="">Selecione...</option>
          {opcoes.map((o) => (
            <option key={o.valor} value={o.valor}>{o.texto}</option>
          ))}
        </select>
      ) : (
        <input name={nome} type={tipo} value={valor} onChange={aoMudar} required={obrigatorio} />
      )}
    </label>
  )
}
