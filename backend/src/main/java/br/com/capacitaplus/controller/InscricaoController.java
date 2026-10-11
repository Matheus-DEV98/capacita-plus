package br.com.capacitaplus.controller;

import br.com.capacitaplus.model.Inscricao;
import br.com.capacitaplus.repository.InscricaoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

// Mesmo padrão, agora para /api/inscricoes
@RestController
@RequestMapping("/api/inscricoes")
public class InscricaoController {

    private final InscricaoRepository repository;

    public InscricaoController(InscricaoRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Inscricao> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Inscricao> buscar(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // O JSON enviado leva o curso assim: "curso": { "id": 1 }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Inscricao criar(@RequestBody Inscricao inscricao) {
        inscricao.setId(null);
        // Valores padrão caso o formulário não envie
        if (inscricao.getDataInscricao() == null) inscricao.setDataInscricao(LocalDate.now());
        if (inscricao.getStatus() == null) inscricao.setStatus("PENDENTE");
        return repository.save(inscricao);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Inscricao> atualizar(@PathVariable Long id, @RequestBody Inscricao dados) {
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
        return ResponseEntity.noContent().build();
    }
}
