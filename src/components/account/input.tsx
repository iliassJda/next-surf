import styles from "@/app/account/account.module.css";

export default function Input(probs: any) {
  return (
    <input
      className={`${styles.input} py-3 px-2`}
      type={probs.type}
      placeholder={probs.placeholder}
      required
    />
  );
}
