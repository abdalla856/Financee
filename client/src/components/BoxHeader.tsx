import { Box, Typography, useTheme } from "@mui/material";
import { FlexBetween } from "./FlexBetween";
import React from "react";

type Props = {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  sidetext: string;
};

const BoxHeader = ({ icon, title, subtitle, sidetext }: Props) => {
  const { palette } = useTheme();
  return (
    <FlexBetween color={palette.grey[400]} margin={"1rem 1.5rem 0 1rem "}>
      <FlexBetween>
        {icon}
        <Box width={"100%"}>
          <Typography variant="h4" mb="-0.1rem">
            {title}
          </Typography>
          <Typography variant="h6">{subtitle}</Typography>
        </Box>
      </FlexBetween>
      <Typography variant="h5" color={palette.secondary[400]}>
        {sidetext}
      </Typography>
    </FlexBetween>
  );
};
export default BoxHeader;
