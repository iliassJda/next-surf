import styles from "@/app/account/account.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

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
          <div className={styles.left_section}>
            <p>Name : </p>
            <p>Surname : </p>
            <p>Email : </p>
            <p>Password : </p>
          </div>
          <div className={styles.right_section}>
            <input
              className={styles.input}
              type={probs.type}
              placeholder={probs.placeholder}
              required
            />
            <br></br>
            <input
              className={styles.input}
              type={probs.type}
              placeholder={probs.placeholder}
              required
            />
            <br></br>
            <input
              className={styles.input}
              type={probs.type}
              placeholder={probs.placeholder}
              required
            />
            <br></br>
            <input
              className={styles.input}
              type={probs.type}
              placeholder={probs.placeholder}
              required
            />
            <br></br>
            <input className={styles.submit} type="submit" value={"Update"} />
          </div>
        </div>
        <div className={styles.section}>
          <h5>Saved Places</h5>
        </div>
        <div className={styles.section}>
          <div>
            <a>Posto X</a>
          </div>
          <div>
            <a>Posto Y</a>
          </div>
          <div>
            <a>Posto Z</a>
          </div>
        </div>
      </div>
    </>
  );
}
