// Mostra um aviso de sucesso ou de erro (tipo = 'sucesso' | 'erro')
export default function Mensagem({ mensagem }) {
  if (!mensagem) return null
  return <div className={`mensagem ${mensagem.tipo}`}>{mensagem.texto}</div>
}
