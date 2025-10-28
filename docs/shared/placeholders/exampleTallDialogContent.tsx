import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

<>
  <DialogTitle>Subscribe</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Cras mattis
      {Array.from(Array(10).keys())
        .map(() => `metus felis, varius ut elit eu, convallis`)
        .join(" ")}
    </DialogContentText>
  </DialogContent>
</>;
