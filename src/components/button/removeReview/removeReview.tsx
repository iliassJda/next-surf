"use client";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import styles from "./remove.module.css";
import { removeReview } from "@/action/review";
import { doToast } from "@/components/toast/toast";
import { useRouter, usePathname, redirect } from "next/navigation";

export default function RemoveReview({ reviewId }: { reviewId: number }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleFullReload = () => {
    // router.push("./");
    router.push(pathname);
  };

  const handleClick = async () => {
    const response = await removeReview(reviewId);
    doToast(response);
    // Have to implement the refresh here !!
  };

  return (
    <>
      <button className={styles.removeButton} onClick={handleClick}>
        <DeleteOutlineOutlinedIcon />
      </button>
    </>
  );
}
