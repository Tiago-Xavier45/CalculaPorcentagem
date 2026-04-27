package com.calculadora.service;

import com.calculadora.dto.CalculadoraDTOs.*;
import org.springframework.stereotype.Service;

@Service
public class CalculadoraService {

    /**
     * Calcula X% de um valor.
     * Ex: 15% de 200 = 30
     */
    public ResultadoSimples calcularPorcentagemDeValor(double porcentagem, double valor) {
        double resultado = (porcentagem / 100.0) * valor;
        String descricao = String.format("%.2f%% de %.2f = %.2f", porcentagem, valor, resultado);
        return new ResultadoSimples(resultado, descricao);
    }

    /**
     * Calcula quanto % a parte representa do total.
     * Ex: 30 é 15% de 200
     */
    public ResultadoSimples calcularQuantoPorcento(double parte, double total) {
        if (total == 0) throw new IllegalArgumentException("O total não pode ser zero.");
        double resultado = (parte / total) * 100.0;
        String descricao = String.format("%.2f é %.2f%% de %.2f", parte, resultado, total);
        return new ResultadoSimples(resultado, descricao);
    }

    /**
     * Calcula a variação percentual entre dois valores.
     * Ex: de 100 para 135 = +35%
     */
    public ResultadoVariacao calcularVariacao(double valorInicial, double valorFinal) {
        if (valorInicial == 0) throw new IllegalArgumentException("O valor inicial não pode ser zero.");
        double variacao = ((valorFinal - valorInicial) / valorInicial) * 100.0;
        String tipo = variacao >= 0 ? "aumento" : "redução";
        String descricao = String.format(
            "De %.2f para %.2f: %s de %.2f%%", valorInicial, valorFinal, tipo, Math.abs(variacao)
        );
        return new ResultadoVariacao(variacao, tipo, descricao);
    }

    /**
     * Aplica acréscimo e desconto de uma porcentagem sobre um valor.
     * Ex: 500 com 10% → acrescido: 550, com desconto: 450
     */
    public ResultadoAcrescimoDesconto calcularAcrescimoDesconto(double valor, double porcentagem) {
        double valorDoPorcentagem = (porcentagem / 100.0) * valor;
        double valorAcrescido    = valor + valorDoPorcentagem;
        double valorComDesconto  = valor - valorDoPorcentagem;
        return new ResultadoAcrescimoDesconto(
            valor, porcentagem, valorAcrescido, valorComDesconto, valorDoPorcentagem
        );
    }
}
