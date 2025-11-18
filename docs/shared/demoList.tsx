import Grid, { GridProps } from "@mui/material/Grid";
import { linearProgressClasses } from "@mui/material/LinearProgress";
import { sliderClasses } from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { adaptiveButtonStackClasses } from "adaptive-material-ui/components/buttonStack";
import React from "react";
import { getCustomMDXComponent } from "rspress/theme";

const StyledStack = styled(Stack)({
  flexWrap: "wrap",

  [`& .${linearProgressClasses.root}, & .${adaptiveButtonStackClasses.root}`]: {
    width: "100%",
  },
  [`& .${sliderClasses.root}`]: {
    display: "block",
  },
});

const components = getCustomMDXComponent();
const Link = components.a;

export function DemoListItem(props: {
  children: React.ReactNode;
  title: string;
  titleHref?: string;
}) {
  return (
    <React.Fragment>
      <Grid size={3}>
        {props.titleHref ? (
          <Link href={props.titleHref}>{props.title}</Link>
        ) : (
          props.title
        )}
      </Grid>
      <Grid size={9}>
        <StyledStack alignItems="center" direction="row" spacing={2} useFlexGap>
          {props.children}
        </StyledStack>
      </Grid>
    </React.Fragment>
  );
}

export function DemoList(props: GridProps) {
  return <Grid alignItems="center" container spacing={3} {...props} />;
}
