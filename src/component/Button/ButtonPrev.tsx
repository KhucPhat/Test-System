import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { styled } from "@mui/system";

const ButtonPrev = () => {
  const ButtonCustom = styled(Button)(() => ({
    minWidth: "40px !important",
    height: "40px !important",
    borderRadius: "50% !important",
    backgroundColor: "#ff0000bf !important",
  }));

  return (
    <ButtonCustom variant="contained">
      <FontAwesomeIcon icon={faArrowLeft} />
    </ButtonCustom>
  );
};

export default ButtonPrev;
