import styles from "@/components/login/input/input.module.css";

export default function Input(probs: any) {
  return (
    <input
      className={styles.input}
      type={probs.type}
      placeholder={probs.placeholder}
      required
    />
  );
}
