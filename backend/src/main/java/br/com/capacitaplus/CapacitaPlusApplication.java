package br.com.capacitaplus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// Ponto de partida da API. Rode esta classe para subir o servidor na porta 8080.
@SpringBootApplication
public class CapacitaPlusApplication {

    public static void main(String[] args) {
        SpringApplication.run(CapacitaPlusApplication.class, args);
    }
}
