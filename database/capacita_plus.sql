-- =====================================================
-- Capacita+ | Script de criação do banco de dados
-- Como usar: abra no MySQL Workbench e execute tudo,
-- ou no terminal: mysql -u root -p < database/capacita_plus.sql
-- =====================================================

CREATE DATABASE IF NOT EXISTS capacita_plus
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE capacita_plus;

-- Garante que os acentos sejam gravados corretamente
SET NAMES utf8mb4;

-- Tabela 1: instrutores (não depende de ninguém, por isso é criada primeiro)
CREATE TABLE IF NOT EXISTS instrutores (
  id            BIGINT       NOT NULL AUTO_INCREMENT,
  nome          VARCHAR(100) NOT NULL,
  email         VARCHAR(100) NOT NULL,
  especialidade VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

-- Tabela 2: cursos (cada curso aponta para UM instrutor)
CREATE TABLE IF NOT EXISTS cursos (
  id           BIGINT       NOT NULL AUTO_INCREMENT,
  nome         VARCHAR(100) NOT NULL,
  descricao    VARCHAR(500),
  duracao      INT          NOT NULL,          -- duração em horas
  instrutor_id BIGINT       NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_curso_instrutor
    FOREIGN KEY (instrutor_id) REFERENCES instrutores (id)
);

-- Tabela 3: inscricoes (cada inscrição aponta para UM curso)
CREATE TABLE IF NOT EXISTS inscricoes (
  id             BIGINT       NOT NULL AUTO_INCREMENT,
  nome_aluno     VARCHAR(100) NOT NULL,
  email_aluno    VARCHAR(100) NOT NULL,
  curso_id       BIGINT       NOT NULL,
  data_inscricao DATE         NOT NULL,
  status         VARCHAR(20)  NOT NULL,        -- PENDENTE, CONFIRMADA, CONCLUIDA, CANCELADA
  PRIMARY KEY (id),
  CONSTRAINT fk_inscricao_curso
    FOREIGN KEY (curso_id) REFERENCES cursos (id)
);

-- Dados de exemplo (opcional, ajudam na apresentação)
INSERT INTO instrutores (nome, email, especialidade) VALUES
  ('Ana Souza',    'ana.souza@exemplo.com',    'Informática'),
  ('Carlos Lima',  'carlos.lima@exemplo.com',  'Administração');

INSERT INTO cursos (nome, descricao, duracao, instrutor_id) VALUES
  ('Excel para Trabalho', 'Planilhas, fórmulas e gráficos para o dia a dia profissional.', 20, 1),
  ('Atendimento ao Cliente', 'Comunicação e boas práticas de atendimento.', 12, 2);

INSERT INTO inscricoes (nome_aluno, email_aluno, curso_id, data_inscricao, status) VALUES
  ('João Pereira', 'joao@exemplo.com', 1, '2026-10-12', 'CONFIRMADA');
