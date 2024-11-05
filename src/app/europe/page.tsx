import styles from "./europe.module.css"
import ImageGrid from '../../components/imageGrid/imageGrid';

const euroImages = [
  { src: "continents/Biarritz.jpg", url: "/places" },
  { src: "continents/peniche.jpg", url: "/login" },
  { src: "continents/mundaka.jpg", url: "/places" },
  { src: "continents/Biarritz.jpg", url: "/places" },
  { src: "continents/peniche.jpg", url: "/login" },
  { src: "continents/mundaka.jpg", url: "/places" },
  { src: "continents/Biarritz.jpg", url: "/places" },
  { src: "continents/peniche.jpg", url: "/login" },
  { src: "continents/mundaka.jpg", url: "/places" },
  { src: "continents/Biarritz.jpg", url: "/places" },
  { src: "continents/peniche.jpg", url: "/login" },
  { src: "continents/mundaka.jpg", url: "/places" },
  { src: "continents/Biarritz.jpg", url: "/places" },
  { src: "continents/peniche.jpg", url: "/login" },
  { src: "continents/mundaka.jpg", url: "/places" },
  // Add more images and URLs as needed
];

export default function Europe() {
    return (
      <>
        <div className={styles.background}></div>
        <div className={styles.page}>
            <div>
                <h1>Explore Europe</h1>
                <ImageGrid images={euroImages} />
            </div>
        </div>
      </>
    );
  }

