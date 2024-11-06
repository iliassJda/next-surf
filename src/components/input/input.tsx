import styles from "./input.module.css";
import { Dispatch, SetStateAction } from "react";

export default function Input({
  type,
  placeholder,
  isRequired,
  handler,
}: {
  type: string;
  placeholder: string;
  isRequired: boolean;
  handler: Dispatch<SetStateAction<string>>;
}) {
  function require() {
    if (isRequired) {
      return (
        <input
          className={styles.input}
          type={type}
          placeholder={placeholder}
          required
          onChange={(event) => handler(event.target.value)}
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
