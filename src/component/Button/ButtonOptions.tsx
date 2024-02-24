import { ListButtonOptions } from "@/types/list";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

interface PropButton {
  listButton: ListButtonOptions[];
}

const ButtonOptions: React.FC<PropButton> = (props) => {
  const { listButton } = props;

  const ButtonItem = styled(Button)(() => ({
    border: "unset !important",
  }));

  return (
    <>
      <ButtonGroup variant="text" aria-label="Basic button group">
        {listButton.map((item: ListButtonOptions, index) => (
          <ButtonItem key={index}>
            <FontAwesomeIcon icon={item.icon} />
          </ButtonItem>
        ))}
      </ButtonGroup>
    </>
  );
};

export default ButtonOptions;
