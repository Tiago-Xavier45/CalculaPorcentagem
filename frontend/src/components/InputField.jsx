import styles from './InputField.module.css'

export function InputField({ label, value, onChange, placeholder, suffix }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputRow}>
        <input
          type="number"
          className={styles.input}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          step="any"
        />
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>
    </div>
  )
}
