import Card from '../components/Card.jsx'

export default function Inicio() {
  return (
    <section>
      <h1>Bem-vindo ao Capacita+</h1>
      <p className="subtitulo">
        Plataforma para organizar cursos de capacitação profissional, instrutores e inscrições
        de pessoas maiores de 18 anos. Alinhada à ODS 4 (Educação de Qualidade) e à ODS 8
        (Trabalho Decente e Crescimento Econômico).
      </p>
      <div className="cards">
        <Card titulo="Instrutores" texto="Cadastre os profissionais responsáveis pelos cursos." link="/instrutores" />
        <Card titulo="Cursos" texto="Gerencie cursos, duração e instrutor responsável." link="/cursos" />
        <Card titulo="Inscrições" texto="Registre e acompanhe as inscrições dos alunos." link="/inscricoes" />
      </div>
    </section>
  )
}
