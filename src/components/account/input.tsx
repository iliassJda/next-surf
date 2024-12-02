import styles from "@/app/account/account.module.css";

interface InputProps {
    onChange?: (e) => void
}


export default function Input(probs: any) {
    return (
        <input
            className={`${styles.input} py-3 px-2`}
            type={probs.type}
            value={probs.value}
            name={probs.name}
            required
            onChange={(e) => {}}
        />
    );
}
