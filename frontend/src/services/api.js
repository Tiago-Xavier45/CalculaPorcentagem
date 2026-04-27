const BASE_URL = import.meta.env.VITE_API_URL + 'porcentagem';

async function post(endpoint, body) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.erro || 'Erro na requisição')
  }

  return data
}

export const api = {
  /** Calcula X% de um valor */
  porcentagemDeValor: (porcentagem, valor) =>
    post('/de-valor', { porcentagem, valor }),

  /** Calcula quanto % a parte representa do total */
  quantoPorcento: (parte, total) =>
    post('/quanto-porcento', { parte, total }),

  /** Calcula variação percentual entre dois valores */
  variacao: (valorInicial, valorFinal) =>
    post('/variacao', { valorInicial, valorFinal }),

  /** Aplica acréscimo e desconto percentual */
  acrescimoDesconto: (valor, porcentagem) =>
    post('/acrescimo-desconto', { valor, porcentagem }),
}
