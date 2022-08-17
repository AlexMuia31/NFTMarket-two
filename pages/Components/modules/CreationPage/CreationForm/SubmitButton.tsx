import { Button } from "@mui/material";
import { useFormikContext } from "formik";

const SubmitButton = () => {
  const { isSubmitting, submitForm } = useFormikContext();

  return (
    <Button
      onClick={submitForm}
      type="submit"
      sx={{
        backgroundColor: "#000002",
        color: "white",
        width: "80%",
        mt: "4%",
        "&:hover,&:focus": {
          background: "#000002",
        },
      }}
    >
      Create an NFT
    </Button>
  );
};

export default SubmitButton;
