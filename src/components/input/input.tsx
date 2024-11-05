import styles from "./input.module.css";

export default function Input({
  type,
  placeholder,
  isRequired,
}: {
  type: string;
  placeholder: string;
  isRequired: boolean;
}) {
  function require() {
    if (isRequired) {
      return (
        <input
          className={styles.input}
          type={type}
          placeholder={placeholder}
          required
        />
      );
    } else {
      return (
        <input className={styles.input} type={type} placeholder={placeholder} />
      );
    }
  }

  return require();
}
