// Account Component (Server Component)
import styles from "@/app/account/account.module.css";
import ConstForm from "@/components/account/constform";
import Form from "@/components/account/form";
import LoginButton from "@/components/account/button";
import Image from "next/image";
import PlacesImg from "../../../public/johnPork.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Account({ showForm, toggleForm }: { showForm: boolean; toggleForm: () => void }) {
  return (
    <div className={styles.container}>
      <div className={`${styles.section} py-4 px-5`}>
        <h2>Account</h2>
      </div>
      <div className={`${styles.section} py-4 px-5`}>
          <h5>My Personal Information</h5>
        </div>
        <div className={`${styles.section} px-5`}>
          <div className={styles.left_section}>
            <p className="py-1 px-2">Name : </p>
            <p className="py-1 px-2">Surname : </p>
            <p className="py-1 px-2">Email : </p>
            <p className="py-1 px-2">Nationality : </p>
          </div>
          <div className={`${styles.right_section} mt-3`}>
            <ConstForm />
            <LoginButton
              value="Edit your Personal Information"
              onClick={toggleForm}
            />
          </div>
        </div>
        <div className={`${styles.section} py-4 px-5`}>
          <h5>Saved Places</h5>
        </div>
        <div className={`${styles.scrollable} ${styles.places}`}>
          <div className={`${styles.place} ${styles.section}`}>
            <div className={styles.left_section}>
              <Image
                src={PlacesImg}
                className={styles.img_places}
                alt="User"
                height={100}
              />
            </div>
            <div className={styles.right_section}>
              <h4>Name of the place</h4>
              <p>
                {" "}
                <i className="bi bi-geo-alt"></i>Oostende, Belgium
              </p>
              <div className={styles.star}>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-half text-warning"></i>
                <i className="bi bi-star text-warning"></i>
              </div>
            </div>
          </div>
          <div className={`${styles.place} ${styles.section}`}>
            <a>Posto X</a>
          </div>
          <div className={`${styles.place} ${styles.section}`}>
            <a>Posto X</a>
          </div>
          <div className={`${styles.place} ${styles.section}`}>
            <a>Posto X</a>
          </div>
          <div className={`${styles.place} ${styles.section}`}>
            <a>Posto X</a>
          </div>
        </div>
      {showForm && (
        <div className={styles.overlay}>
          <div className={styles.new_review}>
            <h4>Edit your personal Information</h4>
            <Form />
          </div>
        </div>
      )}
    </div>
  );
}
