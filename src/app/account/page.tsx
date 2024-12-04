
import styles from "@/app/account/account.module.css";
import ConstForm from "@/components/account/constform";
import UploadedPlaces from "@/components/account/uploadedPlaces";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ShowProfilePicture from "@/components/profilePicture/showPicture/getProfilePicture"

export default function Account(probs: any) {
  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.section} py-4 px-5`}>
          <h2>Account</h2>
        </div>
        <div className={`${styles.section} py-4 px-5`}>
          <h5>My Personal Information</h5>
        </div>
        <div className={`${styles.section} px-5`}>
          <div className={styles.left_selection}>
            <ShowProfilePicture width="150" height="150"/>
          </div>
          <div className={` ${styles.right_section} ${styles.flex}`}> 
          <div className={styles.left_section}>
            <p className="py-1 px-2">Name : </p>
            <p className="py-1 px-2">Surname : </p>
            <p className="py-1 px-2">Email : </p>
            <p className="py-1 px-2">Nationality : </p>
          </div>
          <div className={`${styles.right_section} mt-3`}>
            <ConstForm />
            <a
      className={`${styles.submit} py-2 px-2`}
      href="./account_update"
    >
      <i className="bi bi-pencil-square"></i> Edit your Personal Information
    </a>
          </div>
          </div>
        </div>
        <div className={`${styles.section} py-4 px-5`}>
          <h5>Uploaded Places</h5>
        </div>
        <UploadedPlaces></UploadedPlaces>
      </div>
    </>
  );
}