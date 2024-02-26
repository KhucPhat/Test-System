import { LoadingButton } from "@mui/lab";
import React from "react";

interface PropsButton {
  title: React.ReactNode | string;
  loading: boolean;
  disabled: boolean;
  style?: React.CSSProperties;
  action?: () => void;
  backgroundColor?: string;
}

const ButtonInherit: React.FC<PropsButton> = (props) => {
  const {
    title: TitleAction,
    loading,
    disabled,
    style,
    action,
    backgroundColor,
  } = props;
  return (
    <>
      <LoadingButton
        variant="outlined"
        loading={loading}
        disabled={disabled}
        sx={{
          ...style,
          "&:hover": {
            backgroundColor: backgroundColor,
            color: "#fff",
            border: "unset",
          },
        }}
        onClick={action}
      >
        {TitleAction}
      </LoadingButton>
    </>
  );
};

export default ButtonInherit;
