import Footer from "@/Footer/Footer";
import HeaderContainer from "@/Header/HeaderContainer";
import { Sidebar } from "@/component";
import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <header>
        <HeaderContainer />
      </header>
      <section style={{ width: "100%", height: "calc(100vh - 110px)" }}>
        <Grid container spacing={2} sx={{ height: "100%" }}>
          <Grid item xs={1}>
            <Sidebar />
          </Grid>
          <Grid item xs={11}>
            <Outlet />
          </Grid>
        </Grid>
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
