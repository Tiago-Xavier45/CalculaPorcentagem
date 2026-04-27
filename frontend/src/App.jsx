import { useState } from 'react'
import { api } from './services/api'
import { useCalculadora } from './hooks/useCalculadora'
import { InputField } from './components/InputField'
import { ResultCard } from './components/ResultCard'
import styles from './App.module.css'

// ─── Aba 1: X% de um valor ────────────────────────────────────────────────────
function PorcentagemDeValor() {
  const [pct, setPct] = useState('')
  const [val, setVal] = useState('')
  const { resultado, erro, loading, calcular } = useCalculadora(api.porcentagemDeValor)

  const handleSubmit = e => {
    e.preventDefault()
    calcular(Number(pct), Number(val))
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputField label="Porcentagem" value={pct} onChange={setPct} placeholder="ex: 15" suffix="%" />
      <InputField label="Valor" value={val} onChange={setVal} placeholder="ex: 200" />
      <button type="submit" className={styles.btn}>Calcular</button>
      <ResultCard loading={loading} erro={erro}>
        {resultado && (
          <>
            <p className={styles.resLabel}>Resultado</p>
            <p className={styles.resValue}>{resultado.resultado.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</p>
            <p className={styles.resDesc}>{resultado.descricao}</p>
          </>
        )}
      </ResultCard>
    </form>
  )
}

// ─── Aba 2: Quanto % é? ───────────────────────────────────────────────────────
function QuantoPorcento() {
  const [parte, setParte] = useState('')
  const [total, setTotal] = useState('')
  const { resultado, erro, loading, calcular } = useCalculadora(api.quantoPorcento)

  const handleSubmit = e => {
    e.preventDefault()
    calcular(Number(parte), Number(total))
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputField label="Valor parcial" value={parte} onChange={setParte} placeholder="ex: 30" />
      <InputField label="Total" value={total} onChange={setTotal} placeholder="ex: 200" />
      <button type="submit" className={styles.btn}>Calcular</button>
      <ResultCard loading={loading} erro={erro}>
        {resultado && (
          <>
            <p className={styles.resLabel}>Representa</p>
            <p className={styles.resValue}>{resultado.resultado.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}%</p>
            <p className={styles.resDesc}>{resultado.descricao}</p>
          </>
        )}
      </ResultCard>
    </form>
  )
}

// ─── Aba 3: Variação % ────────────────────────────────────────────────────────
function Variacao() {
  const [de, setDe] = useState('')
  const [para, setPara] = useState('')
  const { resultado, erro, loading, calcular } = useCalculadora(api.variacao)

  const handleSubmit = e => {
    e.preventDefault()
    calcular(Number(de), Number(para))
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputField label="Valor inicial" value={de} onChange={setDe} placeholder="ex: 100" />
      <InputField label="Valor final" value={para} onChange={setPara} placeholder="ex: 135" />
      <button type="submit" className={styles.btn}>Calcular</button>
      <ResultCard loading={loading} erro={erro}>
        {resultado && (
          <>
            <p className={styles.resLabel}>Variação</p>
            <p className={styles.resValue} style={{ color: resultado.variacao >= 0 ? '#16a34a' : '#dc2626' }}>
              {resultado.variacao >= 0 ? '+' : ''}{resultado.variacao.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}%
            </p>
            <p className={styles.resDesc}>{resultado.descricao}</p>
          </>
        )}
      </ResultCard>
    </form>
  )
}

// ─── Aba 4: Acréscimo / Desconto ─────────────────────────────────────────────
function AcrescimoDesconto() {
  const [val, setVal] = useState('')
  const [pct, setPct] = useState('')
  const { resultado, erro, loading, calcular } = useCalculadora(api.acrescimoDesconto)

  const handleSubmit = e => {
    e.preventDefault()
    calcular(Number(val), Number(pct))
  }

  const fmt = n => n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <form onSubmit={handleSubmit}>
      <InputField label="Valor base" value={val} onChange={setVal} placeholder="ex: 500" />
      <InputField label="Porcentagem" value={pct} onChange={setPct} placeholder="ex: 10" suffix="%" />
      <button type="submit" className={styles.btn}>Calcular</button>
      <ResultCard loading={loading} erro={erro}>
        {resultado && (
          <div className={styles.dualResult}>
            <div>
              <p className={styles.resLabel}>Com acréscimo (+{fmt(resultado.porcentagem)}%)</p>
              <p className={styles.resValue} style={{ color: '#16a34a' }}>{fmt(resultado.valorAcrescido)}</p>
            </div>
            <div className={styles.divider} />
            <div>
              <p className={styles.resLabel}>Com desconto (-{fmt(resultado.porcentagem)}%)</p>
              <p className={styles.resValue} style={{ color: '#dc2626' }}>{fmt(resultado.valorComDesconto)}</p>
            </div>
            <p className={styles.resDesc}>
              {fmt(resultado.porcentagem)}% de {fmt(resultado.valorOriginal)} = {fmt(resultado.valorDoPorcentagem)}
            </p>
          </div>
        )}
      </ResultCard>
    </form>
  )
}

// ─── App principal ────────────────────────────────────────────────────────────
const ABAS = [
  { label: '% de um valor', component: PorcentagemDeValor },
  { label: 'Quanto % é?',   component: QuantoPorcento },
  { label: 'Variação %',    component: Variacao },
  { label: 'Acréscimo / Desconto', component: AcrescimoDesconto },
]

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState(0)
  const Componente = ABAS[abaAtiva].component

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Calculadora de %</h1>
        <p className={styles.subtitle}>Backend Java · Spring Boot</p>
      </header>

      <main className={styles.main}>
        <nav className={styles.tabs}>
          {ABAS.map((aba, i) => (
            <button
              key={i}
              className={`${styles.tab} ${i === abaAtiva ? styles.tabActive : ''}`}
              onClick={() => setAbaAtiva(i)}
              type="button"
            >
              {aba.label}
            </button>
          ))}
        </nav>

        <div className={styles.card}>
          <Componente />
        </div>
      </main>
    </div>
  )
}
