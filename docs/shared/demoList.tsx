import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import React from "react";

export function DemoListItem(props: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <React.Fragment>
      <Grid size={3}>{props.title}</Grid>
      <Grid size={9}>
        <Stack alignItems="center" direction="row" spacing={1}>
          {props.children}
        </Stack>
      </Grid>
    </React.Fragment>
  );
}

export function DemoList(props: { children: React.ReactNode }) {
  return (
    <Grid alignItems="center" container spacing={2}>
      {props.children}
    </Grid>
  );
}
