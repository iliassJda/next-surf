import styles from "@/app/account_update/account_update.module.css";



export default function Input(probs: any) {
    return (
        <input
            className={`${styles.input} py-3 px-2`}
            type={probs.type}
            defaultValue={probs.defaultValue}
            name={probs.name}
        />
    );
}
