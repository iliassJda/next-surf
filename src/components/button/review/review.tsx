import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

export default function ReviewButton({
  title,
  city,
}: {
  title: String;
  city: String;
}) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/review?title=${title}&city=${city}`);
  };

  return (
    <Button onClick={handleClick} variant="contained">
      add a review
    </Button>
  );
}
