package br.com.capacitaplus.controller;

import br.com.capacitaplus.model.Instrutor;
import br.com.capacitaplus.repository.InstrutorRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Todos os endpoints aqui começam com /api/instrutores
@RestController
@RequestMapping("/api/instrutores")
public class InstrutorController {

    private final InstrutorRepository repository;

    // O Spring entrega o repository pronto (injeção de dependência)
    public InstrutorController(InstrutorRepository repository) {
        this.repository = repository;
    }

    // R - Read: GET /api/instrutores
    @GetMapping
    public List<Instrutor> listar() {
        return repository.findAll();
    }

    // R - Read: GET /api/instrutores/1
    @GetMapping("/{id}")
    public ResponseEntity<Instrutor> buscar(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // C - Create: POST /api/instrutores (dados no corpo, em JSON)
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Instrutor criar(@RequestBody Instrutor instrutor) {
        instrutor.setId(null); // garante que é um registro novo
        return repository.save(instrutor);
    }

    // U - Update: PUT /api/instrutores/1
    @PutMapping("/{id}")
    public ResponseEntity<Instrutor> atualizar(@PathVariable Long id, @RequestBody Instrutor dados) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        dados.setId(id);
        return ResponseEntity.ok(repository.save(dados));
    }

    // D - Delete: DELETE /api/instrutores/1
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        repository.flush(); // executa o DELETE agora, para o erro de vínculo aparecer aqui
        return ResponseEntity.noContent().build();
    }
}
