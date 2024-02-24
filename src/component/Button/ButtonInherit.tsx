import { LoadingButton } from "@mui/lab";
import React from "react";

interface PropsButton {
  title: React.ReactNode | string;
  loading: boolean;
  disabled: boolean;
  style?: React.CSSProperties;
  action?: () => void;
}

const ButtonInherit: React.FC<PropsButton> = (props) => {
  const { title: TitleAction, loading, disabled, style, action } = props;
  return (
    <>
      <LoadingButton
        variant="outlined"
        loading={loading}
        disabled={disabled}
        sx={{ ...style }}
        onClick={action}
      >
        {TitleAction}
      </LoadingButton>
    </>
  );
};

export default ButtonInherit;
