
import styles from "@/app/account/account.module.css";
import Form from "@/components/account/form";
import UpdateButton from "@/components/account/button";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import PlacesImg from "../../../public/johnPork.jpg";

export default function Account(probs: any) {

  return (
    <>
      <div className={`${styles.container} py-4 px-5`}>
        <div className={`${styles.section} py-4 px-5`}>
          <h2>Update your Personal Information</h2>
        </div>
        <div className={`${styles.section} px-5`}>
          <div className={styles.left_section}>
            <p className="py-1 px-2">Name : </p>
            <p className="py-1 px-2">Surname : </p>
            <p className="py-1 px-2">Nationality : </p>
            <p className="py-1 px-2">Password : </p>
            <p className="py-1 px-2">Verify Password : </p>
          </div>
          <div className={`${styles.right_section} mt-3`}>
            <Form />
          </div>
        </div>
      </div>
    </>
  );
}