import styles from './ResultCard.module.css'

export function ResultCard({ loading, erro, children }) {
  if (loading) return <div className={styles.card}><span className={styles.loading}>Calculando...</span></div>
  if (erro)    return <div className={`${styles.card} ${styles.erro}`}>{erro}</div>
  if (!children) return null

  return <div className={styles.card}>{children}</div>
}
