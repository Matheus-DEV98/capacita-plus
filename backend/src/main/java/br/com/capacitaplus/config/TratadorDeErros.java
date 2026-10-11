package br.com.capacitaplus.config;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

// Transforma erros do banco em mensagens amigáveis para o frontend.
@RestControllerAdvice
public class TratadorDeErros {

    // Ex.: excluir um instrutor que ainda tem cursos, ou salvar sem um campo obrigatório
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, String>> integridade(DataIntegrityViolationException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("mensagem",
                "Operação não permitida: verifique os campos obrigatórios ou se o registro está vinculado a outro (ex.: instrutor com cursos)."));
    }
}
