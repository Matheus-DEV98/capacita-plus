package br.com.capacitaplus.repository;

import br.com.capacitaplus.model.Curso;
import org.springframework.data.jpa.repository.JpaRepository;

// Só de estender JpaRepository já ganhamos: findAll, findById, save, deleteById...
public interface CursoRepository extends JpaRepository<Curso, Long> {
}
