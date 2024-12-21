import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import SurfingIcon from "@mui/icons-material/Surfing";
import { styled } from "@mui/material/styles";

// All the diferent values that can be given for a review
const labels: { [index: string]: string } = {
  0.5: "Just stay home",
  1: "Flat",
  1.5: "Very Poor",
  2: "Poor",
  2.5: "Poor to Fair",
  3: "Fair",
  3.5: "Good",
  4: "Good to Excellent",
  4.5: "Excellent",
  5: "We Surfing or what??",
};

// styling for when hovering and when not
const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "cornflowerblue",
  },
  "& .MuiRating-iconHover": {
    color: "rgb(131, 190, 202)",
  },
});

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

// This was based on MUI library for rating. https://mui.com/material-ui/react-rating/
export default function HoverRating() {
  const [value, setValue] = React.useState<number | null>(2);
  const [hover, setHover] = React.useState(-1);

  return (
    <Box
      sx={{
        width: 500,
        display: "flex",
        alignItems: "center",
        color: "cornflowerblue",
      }}
    >
      <StyledRating
        size="large"
        name="rating"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        icon={<SurfingIcon fontSize="inherit" />}
        emptyIcon={<SurfingIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 1 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}
