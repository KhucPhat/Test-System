import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Autocomplete, Avatar, TextField } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function HeaderContainer() {
  const optionsLang = [
    {
      id: 1,
      label: "Tiếng Việt",
    },
    {
      id: 2,
      label: "English",
    },
  ];
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: "#1d1d1d",
        }}
      >
        <Toolbar>
          <img
            src="/public/assets/images/logo.png"
            alt="logo"
            style={{ width: "150px", height: "100px", objectFit: "cover" }}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontSize: "20px",
              color: "#fff",
              textTransform: "uppercase",
            }}
          >
            Test System
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <Avatar
                alt="Remy Sharp"
                src="/public/assets/images/1avatar.jpg"
              />
            </IconButton>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              defaultValue={optionsLang[0]}
              options={optionsLang}
              sx={{ width: "150px", marginLeft: "12px" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    "& .MuiInputBase-root": {
                      border: "1px solid #fff",
                      color: "#fff",
                    },
                  }}
                />
              )}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
