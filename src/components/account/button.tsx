import styles from "@/app/account/account.module.css";

export default function Button(probs: any) {
  return (
    <input
      className={`${styles.submit} py-1 px-2`}
      type="submit"
      value={probs.value}
    />
  );
}
