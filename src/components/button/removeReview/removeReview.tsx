import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import styles from "./remove.module.css";

export default function RemoveReview() {
  return (
    <>
      <button className={styles.removeButton}>
        <DeleteOutlineOutlinedIcon />
      </button>

      <DeleteOutlineOutlinedIcon />
    </>
  );
}
