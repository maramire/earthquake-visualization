import "./App.css";
import Navbar from "./common/Navbar";
import { Switch, Route, Redirect } from "react-router-dom";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Footer from "./common/Footer";
import { Box } from "@mui/material";

function App() {
  return (
    <>
    <Navbar />
    <Box>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/events" />
        </Route>
        <Route path="/events" exact>
          <Events />
        </Route>
        <Route path="/events/:eventId">
          <EventDetail />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Box>
    <Footer />
    </>
  );
}

export default App;
