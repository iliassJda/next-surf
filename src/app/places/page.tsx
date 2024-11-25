import styles from "@/app/places/places.module.css";
import Image from "next/image";
import PlacesImg from "../../../public/images/surf.jpg";

export default function Places() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.left_section}>
            <Image
              src={PlacesImg}
              className={styles.img_places}
              alt="User"
              height={300}
            />
          </div>
          <div className={styles.right_section}>
            <h2>Name of the Place</h2>
            <p>
              <i className="bi bi-geo-alt"></i>Oostende, Belgium
            </p>
            <p>Description of the place</p>
            <p>Wind, Difficulty, ...</p>
            <a className={styles.button}>
              <i className="bi bi-heart"></i> Add to my Favourite
            </a>
          </div>
        </div>
        <div className={`${styles.section} px-4`}>
          <h2>Reviews</h2>
        </div>
        <div className={styles.section}>
          <div className={`${styles.left_section} ${styles.review}`}>
            <h4>Average Valuation</h4>
            <p>3.78 / 5</p>
            <div className={styles.star}>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-half text-warning"></i>
              <i className="bi bi-star text-warning"></i>
            </div>
            <a className={styles.button}>Add a Review</a>
          </div>
          <div className={`${styles.right_section} ${styles.scrollable}`}>
            <div className={styles.review}>
              <p>
                <i className="bi bi-person-fill"></i> Username
              </p>
              <p>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star text-warning"></i>
                <i className="bi bi-star text-warning"></i>
              </p>
              <p>Funny but very touristic and loud</p>
            </div>
            <div className={styles.review}>
              <p>
                <i className="bi bi-person-fill"></i> Username
              </p>
              <p>Valuation</p>
              <p>Description</p>
            </div>
            <div className={styles.review}>
              <p>
                <i className="bi bi-person-fill"></i> Username
              </p>
              <p>Valuation</p>
              <p>Description</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
