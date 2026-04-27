import { useState } from 'react'

export function useCalculadora(apiFn) {
  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState(null)
  const [loading, setLoading] = useState(false)

  async function calcular(...args) {
    setLoading(true)
    setErro(null)
    setResultado(null)
    try {
      const data = await apiFn(...args)
      setResultado(data)
    } catch (e) {
      setErro(e.message)
    } finally {
      setLoading(false)
    }
  }

  return { resultado, erro, loading, calcular }
}
