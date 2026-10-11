package br.com.capacitaplus.repository;

import br.com.capacitaplus.model.Inscricao;
import org.springframework.data.jpa.repository.JpaRepository;

// Só de estender JpaRepository já ganhamos: findAll, findById, save, deleteById...
public interface InscricaoRepository extends JpaRepository<Inscricao, Long> {
}
