import { useState } from 'react'

// Seção "Sobre nós" da página inicial.
// As imagens ficam em frontend/public/imagens/ (foto.jpg e qrcode.png).
// Enquanto uma imagem não existir, aparece um espaço reservado no lugar dela.
export default function SobreNos() {
  const [semFoto, setSemFoto] = useState(false)
  const [semQr, setSemQr] = useState(false)

  return (
    <section className="bloco fundo-claro" id="sobre">
      <h2>Sobre nós</h2>
      <div className="sobre">
        {semFoto ? (
          <div className="foto-reservada">Coloque sua foto em<br />public/imagens/foto.jpg</div>
        ) : (
          <img src="/imagens/foto.jpg" alt="Foto de Matheus, criador do Capacita+" className="foto" onError={() => setSemFoto(true)} />
        )}

        <div className="sobre-texto">
          {/* ✏️ EDITE AQUI: escreva com as suas palavras quem você é e por que criou o projeto */}
          <h3>Oi, eu sou o Matheus!</h3>
          <p>
            Criei o Capacita+ como Projeto Final do Programa Transforma Futuros. A ideia nasceu de uma
            dificuldade real: encontrar e acompanhar os cursos de capacitação profissional, com
            informações espalhadas em vários lugares.
          </p>
          <p>
            Minha missão com o projeto é mostrar como a tecnologia pode ajudar e aproximar e as pessoas das
            oportunidades de qualificação e, com isso, de melhores oportunidades de trabalho.
          </p>
        </div>

        <div className="qrcode">
          {semQr ? (
            <div className="qr-reservado">QR code<br />public/imagens/qrcode.png</div>
          ) : (
            <img src="/imagens/qrcode.png" alt="QR code para o repositório do projeto no GitHub" onError={() => setSemQr(true)} />
          )}
          <span>Aponte a câmera e conheça o código do projeto</span>
        </div>
      </div>
    </section>
  )
}
