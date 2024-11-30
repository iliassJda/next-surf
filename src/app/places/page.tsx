"use client";

import styles from "@/app/places/places.module.css";
import Image from "next/image";
import { useState } from "react"; // Import useState
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import PlacesImg from "../../../public/johnPork.jpg";

export default function Places() {
  const [showForm, setShowForm] = useState(false); // State for toggling the modal

  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    setShowForm(false); // Hide the modal after submission
  };

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
              <i className="bi bi-geo-alt"></i> Oostende, Belgium
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
            <a
              className={styles.button}
              onClick={() => setShowForm(true)} // Show the modal
            >
              Add a Review
            </a>
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
          </div>
        </div>

        {/* Modal for Adding a Review */}
        {showForm && (
          <div className={styles.overlay}>
            <div className={styles.new_review}>
              <h4>Add Your Review</h4>
              <form onSubmit={handleFormSubmit}>
                <div className={`${styles.review_form} my-3`}>
                  <label className={styles.label}>Rating: </label>
                  <select className={`${styles.input} `}>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </div>
                <div className={`${styles.review_form} my-3`}>
                  <label className={styles.label}>Review: </label>
                  <input className={`${styles.input} `}></input>
                </div>

                <div>
                  <button type="submit" className={styles.submit}>
                    Submit
                  </button>
                  <button
                    type="button"
                    className={styles.exit}
                    onClick={() => setShowForm(false)}
                  >
                    <i className="bi bi-x-circle"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}