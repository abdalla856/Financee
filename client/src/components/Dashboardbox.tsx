import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const DashbaordBox = styled(Box)(({ theme }) => ({
  background: theme.palette.background.light,
  borderRadius : "1rem" , 
  
  boxShadow :".15rem .2rem .15rem .1rem rgb(0,0,0,.8)"
}));
