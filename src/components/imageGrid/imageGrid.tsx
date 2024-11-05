import Link from "next/link";
import styles from "./imageGrid.module.css";

interface Image {
  src: string;
  url: string;
}

interface ImageGridProps {
  images: Image[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  return (
    <div className={styles.grid}>
      {images.map((image, index) => (
        <Link href={image.url} key={index}>
          <img src={image.src} alt={`Image ${index + 1}`} className={styles.image} />
        </Link>
      ))}
    </div>
  );
};

export default ImageGrid;
