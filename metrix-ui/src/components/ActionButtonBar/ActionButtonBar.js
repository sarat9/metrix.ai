import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const actionButtons = [
  // { name: "Dashboard", variant: "outlined", path: "/dashboard" },
  { name: "Metrics", variant: "outlined", path: "/metrics/" },
  { name: "Create Metric", variant: "outlined", path: "/metric/" },
];

const styles = {
  buttonOutlined: {
    color: "#FF6F20",
    border: "1px solid #FF6F20",
  },
  buttonContained: {
    background: "#FF6F20",
  },
};

export default function ActionButtonBar() {
  const navigate = useNavigate();

  const handleActionClick = (action) => {
    console.log("action", action);
    if(action.name == "Create Template"){
    }
    navigate(action.path)
  };

  return (
    <Stack spacing={2} direction="row-reverse" style={{ padding: "0px 20px" }}>
      {actionButtons.map((action) => {
        return (
          <Button
            variant={action.variant}
            style={{
              ...(action.variant == "contained"
                ? styles.buttonContained
                : styles.buttonOutlined),
            }}
            onClick={() => handleActionClick(action)}
          >
            {action.name}
          </Button>
        );
      })}
    </Stack>
  );
}
