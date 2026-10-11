package br.com.capacitaplus.model;

import jakarta.persistence.*;

// @Entity diz que esta classe representa a tabela "instrutores"
@Entity
@Table(name = "instrutores")
public class Instrutor {

    @Id                                                 // chave primária
    @GeneratedValue(strategy = GenerationType.IDENTITY) // AUTO_INCREMENT do MySQL
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(nullable = false, length = 100)
    private String especialidade;

    // Getters e setters: o Spring usa para ler/escrever os campos e gerar o JSON
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getEspecialidade() { return especialidade; }
    public void setEspecialidade(String especialidade) { this.especialidade = especialidade; }
}
