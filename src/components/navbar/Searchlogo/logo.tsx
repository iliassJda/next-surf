import styles from "./logo.module.css"

export default function Logo(probs: any) {
    return (
        <div
          className={styles.icon}
          >
            <a onClick={probs.onClick}>
              <i className="bi bi-search p-2"></i>
            </a>
          </div>
    )
}