import { Link } from 'react-router-dom'
import Ilustracao from '../components/Ilustracao.jsx'
import SobreNos from '../components/SobreNos.jsx'

// Página inicial: apresenta o Capacita+ (só conteúdo visual, sem cadastros)
export default function Inicio() {
  return (
    <>
      {/* 1. CHAMADA PRINCIPAL (hero) */}
      <section className="hero">
        <div className="hero-texto">
          <span className="etiqueta">Capacitação profissional para maiores de 18 anos</span>
          {/* ✏️ EDITE AQUI: escreva a frase principal e o parágrafo com as suas palavras */}
          <h1>Sua próxima oportunidade começa com <span className="destaque">capacitação</span>.</h1>
          <p>
            O Capacita+ reúne em um só lugar os cursos de capacitação profissional, seus instrutores
            e as inscrições dos alunos. Menos informação espalhada, mais oportunidades organizadas.
          </p>
          <div className="hero-botoes">
            <Link to="/cursos" className="botao grande">Ver cursos</Link>
            <a href="#como-usar" className="botao grande contorno">Como funciona</a>
          </div>
        </div>
        <Ilustracao />
      </section>

      {/* 2. O PROBLEMA */}
      <section className="bloco">
        <h2>O problema</h2>
        <p className="subtitulo">Quem quer se qualificar para o mercado de trabalho enfrenta obstáculos antes mesmo de começar.</p>
        <div className="cards">
          <div className="card-info">
            <span className="icone">🔎</span>
            <h3>Informação espalhada</h3>
            <p>Os cursos ficam em sites e plataformas diferentes, difíceis de encontrar e comparar.</p>
          </div>
          <div className="card-info">
            <span className="icone">📋</span>
            <h3>Difícil acompanhar</h3>
            <p>Sem um lugar central, é fácil perder datas, inscrições e o andamento de cada curso.</p>
          </div>
          <div className="card-info">
            <span className="icone">🧑‍🏫</span>
            <h3>Pouca organização</h3>
            <p>Instituições e instrutores também precisam gerenciar cursos e alunos de forma simples.</p>
          </div>
        </div>
      </section>

      {/* 3. COMO USAR */}
      <section className="bloco fundo-claro" id="como-usar">
        <h2>Como usar o Capacita+</h2>
        <p className="subtitulo">Em três passos, tudo fica organizado.</p>
        <div className="passos">
          <Link to="/instrutores" className="passo">
            <span className="numero">1</span>
            <h3>Cadastre os instrutores</h3>
            <p>Registre nome, e-mail e especialidade de quem ministra os cursos.</p>
          </Link>
          <Link to="/cursos" className="passo">
            <span className="numero">2</span>
            <h3>Cadastre os cursos</h3>
            <p>Informe descrição, duração e o instrutor responsável por cada curso.</p>
          </Link>
          <Link to="/inscricoes" className="passo">
            <span className="numero">3</span>
            <h3>Registre as inscrições</h3>
            <p>Inscreva alunos nos cursos e acompanhe o status de cada inscrição.</p>
          </Link>
        </div>
      </section>

      {/* 4. ODS */}
      <section className="bloco fundo-claro">
        <h2>Nosso compromisso com as ODS</h2>
        <p className="subtitulo">Objetivos de Desenvolvimento Sustentável da ONU.</p>
        <div className="ods">
          <div className="ods-card ods4">
            <strong>ODS 4</strong>
            <h3>Educação de Qualidade</h3>
            <p>Facilita o acesso a informações sobre oportunidades de capacitação.</p>
          </div>
          <div className="ods-card ods8">
            <strong>ODS 8</strong>
            <h3>Trabalho Decente e Crescimento Econômico</h3>
            <p>A qualificação profissional ajuda pessoas a buscar melhores oportunidades de trabalho.</p>
          </div>
        </div>
      </section>

      {/* 5. SOBRE NÓS */}
      <SobreNos />

      {/* 6. CHAMADA FINAL */}
      <section className="chamada-final">
        <h2>Pronto para organizar as oportunidades de capacitação?</h2>
        <Link to="/inscricoes" className="botao grande destaque-botao">Fazer uma inscrição</Link>
      </section>
    </>
  )
}
