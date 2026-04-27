package com.calculadora.controller;

import com.calculadora.dto.CalculadoraDTOs.*;
import com.calculadora.service.CalculadoraService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/porcentagem")
@CrossOrigin(origins = "*") // Permite qualquer origem (localhost + Vercel em produção)
public class CalculadoraController {

    private final CalculadoraService service;

    public CalculadoraController(CalculadoraService service) {
        this.service = service;
    }

    /**
     * POST /api/porcentagem/de-valor
     * Calcula X% de um valor. Ex: 15% de 200 = 30
     */
    @PostMapping("/de-valor")
    public ResponseEntity<ResultadoSimples> porcentagemDeValor(
            @Valid @RequestBody PorcentagemDeValorRequest req) {
        return ResponseEntity.ok(
            service.calcularPorcentagemDeValor(req.porcentagem(), req.valor())
        );
    }

    /**
     * POST /api/porcentagem/quanto-porcento
     * Calcula quanto % uma parte representa do total.
     */
    @PostMapping("/quanto-porcento")
    public ResponseEntity<ResultadoSimples> quantoPorcento(
            @Valid @RequestBody QuantoPorcentoRequest req) {
        return ResponseEntity.ok(
            service.calcularQuantoPorcento(req.parte(), req.total())
        );
    }

    /**
     * POST /api/porcentagem/variacao
     * Calcula a variação percentual entre dois valores.
     */
    @PostMapping("/variacao")
    public ResponseEntity<ResultadoVariacao> variacao(
            @Valid @RequestBody VariacaoRequest req) {
        return ResponseEntity.ok(
            service.calcularVariacao(req.valorInicial(), req.valorFinal())
        );
    }

    /**
     * POST /api/porcentagem/acrescimo-desconto
     * Aplica acréscimo e desconto percentual sobre um valor.
     */
    @PostMapping("/acrescimo-desconto")
    public ResponseEntity<ResultadoAcrescimoDesconto> acrescimoDesconto(
            @Valid @RequestBody AplicarPorcentagemRequest req) {
        return ResponseEntity.ok(
            service.calcularAcrescimoDesconto(req.valor(), req.porcentagem())
        );
    }
}
