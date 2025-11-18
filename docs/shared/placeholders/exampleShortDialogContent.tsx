import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function () {
  return (
    <>
      <DialogTitle>Use Google's location service?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
    </>
  );
}
