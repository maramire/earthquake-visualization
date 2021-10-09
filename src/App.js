import "./App.css";
import Navbar from "./common/Navbar";
import { Switch, Route, Redirect } from "react-router-dom";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Footer from "./common/Footer";
import Login from "./pages/Login";
import AuthContext from "./store/auth-context";
import { useContext } from "react";

function App() {
  const authContext = useContext(AuthContext);
  return (
    <div className="container-grid">
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/events" />
        </Route>
        <Route path="/events" exact>
          {authContext.isLoggedIn && <Events />}
          {!authContext.isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="/events/:eventId">
          {authContext.isLoggedIn && <EventDetail />}
          {!authContext.isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          {!authContext.isLoggedIn && <Login />}
          {authContext.isLoggedIn && <Redirect to="/events" />}
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
