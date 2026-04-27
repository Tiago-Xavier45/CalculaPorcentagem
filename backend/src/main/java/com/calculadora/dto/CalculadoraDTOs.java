package com.calculadora.dto;

import jakarta.validation.constraints.NotNull;

// ─── Requests ────────────────────────────────────────────────────────────────

public class CalculadoraDTOs {

    /** Calcula X% de um valor: (porcentagem / 100) * valor */
    public record PorcentagemDeValorRequest(
        @NotNull Double porcentagem,
        @NotNull Double valor
    ) {}

    /** Calcula quanto % uma parte representa do total: (parte / total) * 100 */
    public record QuantoPorcentoRequest(
        @NotNull Double parte,
        @NotNull Double total
    ) {}

    /** Calcula variação percentual entre dois valores: ((final - inicial) / inicial) * 100 */
    public record VariacaoRequest(
        @NotNull Double valorInicial,
        @NotNull Double valorFinal
    ) {}

    /** Aplica acréscimo ou desconto percentual sobre um valor */
    public record AplicarPorcentagemRequest(
        @NotNull Double valor,
        @NotNull Double porcentagem
    ) {}

    // ─── Responses ───────────────────────────────────────────────────────────

    public record ResultadoSimples(
        double resultado,
        String descricao
    ) {}

    public record ResultadoVariacao(
        double variacao,
        String tipo,
        String descricao
    ) {}

    public record ResultadoAcrescimoDesconto(
        double valorOriginal,
        double porcentagem,
        double valorAcrescido,
        double valorComDesconto,
        double valorDoPorcentagem
    ) {}
}
