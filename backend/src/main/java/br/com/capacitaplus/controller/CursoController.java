package br.com.capacitaplus.controller;

import br.com.capacitaplus.model.Curso;
import br.com.capacitaplus.repository.CursoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Mesmo padrão do InstrutorController, agora para /api/cursos
@RestController
@RequestMapping("/api/cursos")
public class CursoController {

    private final CursoRepository repository;

    public CursoController(CursoRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Curso> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Curso> buscar(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // O JSON enviado leva o instrutor assim: "instrutor": { "id": 1 }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Curso criar(@RequestBody Curso curso) {
        curso.setId(null);
        return repository.save(curso);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Curso> atualizar(@PathVariable Long id, @RequestBody Curso dados) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        dados.setId(id);
        return ResponseEntity.ok(repository.save(dados));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        repository.flush();
        return ResponseEntity.noContent().build();
    }
}
