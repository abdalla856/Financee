
import { useState } from "react";
import { useTheme, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { FlexBetween } from "@/components/FlexBetween";
import PixIcon from "@mui/icons-material/Pix";
// type Props = {};

const Navbar = () => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashbaord");

  return (
    <FlexBetween mb="0.75rem" p=".5rem 0rem" color={palette.grey[300]}>
      {/* Left Side  */}
      <FlexBetween gap={".75rem"}>
        <PixIcon sx={{ fontSize: "28px" }} />
        <Typography variant="h4" fontSize={"16px"}>
          Freelacee
        </Typography>
      </FlexBetween>

      {/* Right Side  */}
      <FlexBetween gap={"2rem"}>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/"
            onClick={() => setSelected("dashbaord")}
            style={{
              color: selected === "dashbaord" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Dashboard
          </Link>
        </Box>
        <Box>
        <Link
            to="/predictions"
            onClick={() => setSelected("predictions")}
            style={{
              color: selected === "predictions" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Predictions
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};
export default Navbar;
