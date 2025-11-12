import Grid from "@mui/material/Grid";
import { linearProgressClasses } from "@mui/material/LinearProgress";
import { sliderClasses } from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import React from "react";

const StyledStack = styled(Stack)({
  flexWrap: "wrap",

  [`& .${linearProgressClasses.root}`]: {
    width: "100%",
  },
  [`& .${sliderClasses.root}`]: {
    display: "block",
  },
});

export function DemoListItem(props: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <React.Fragment>
      <Grid size={3}>{props.title}</Grid>
      <Grid size={9}>
        <StyledStack alignItems="center" direction="row" spacing={2} useFlexGap>
          {props.children}
        </StyledStack>
      </Grid>
    </React.Fragment>
  );
}

export function DemoList(props: { children: React.ReactNode }) {
  return (
    <Grid alignItems="center" container spacing={3}>
      {props.children}
    </Grid>
  );
}
