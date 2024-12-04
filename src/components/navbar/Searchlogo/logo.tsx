import styles from "./logo.module.css"

export default function Logo() {
    return (
        <div
          className={styles.icon}
          >
            <a>
              <i className="bi bi-search p-2"></i>
            </a>
          </div>
    )
}