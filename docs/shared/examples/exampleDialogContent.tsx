import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { ReactNode } from "react";
import { Fragment } from "react/jsx-runtime";

interface Props {
  children?: ReactNode;
  onClose: () => void;
  variant: "short" | "tall";
}

export default function ExampleDialogContent(props: Props) {
  if (props.variant === "short") {
    return (
      <Fragment>
        <DialogTitle id="alert-dialog-title">
          Use Google's location service?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {props.children ?? (
            <Fragment>
              <Button onClick={props.onClose}>Disagree</Button>
              <Button onClick={props.onClose}>Agree</Button>
            </Fragment>
          )}
        </DialogActions>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {Array.from(Array(3).keys())
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            )
            .join("\n")}
        </DialogContentText>
        <TextField
          margin="dense"
          label="Email Address"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        {props.children ?? (
          <Fragment>
            <Button onClick={props.onClose}>Cancel</Button>
            <Button onClick={props.onClose}>Subscribe</Button>
          </Fragment>
        )}
      </DialogActions>
    </Fragment>
  );
}
