/* Library Imports ****************************************************/
import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
/**********************************************************************/

/* Project Imports ****************************************************/
import { fonts, colors, useCommonStyles } from "./assets/common";

import store from "./services/redux/store";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Redirect from "./pages/Redirect/Redirect";
import Comments from "./components/Comments";

import share from "./assets/share.jpg";
import homescreen from "./assets/homescreen.jpg";
import addhomescreen from "./assets/addhomescreen.jpg";

import { isIos, isInStandaloneMode } from './services/utils';
/**********************************************************************/


const routes = [
  { path: "/profile/:username", 
    name: "My Profile", 
    Component: Profile, 
    bgType: 1
  },
  { path: "/login", 
    name: "Login", 
    Component: Login, 
    bgType: 1 
  },
  { path: "/signup", 
    name: "Signup", 
    Component: Signup, 
    bgType: 1 
  },
  { path: "/redirect", 
    name: "Redirect", 
    Component: Redirect, 
    bgType: 1 
  },
  { path: "/", 
    name: "Home", 
    Component: Home, 
    bgType: 3
  }
];

const useStyles = makeStyles({
  //All base
  bg: {
    background: colors[3],
    fontFamily: fonts[0],
    "& h1, h2": {
      color: colors[5] + " !important",
      fontFamily: fonts[1]
    },
    "& span": {
      color: colors[4]
    }
  },
  //Three color, three striped
  bgMobile: {
    background: colors[3],
    fontFamily: fonts[0],
    "& h1, h2": {
      color: colors[5] + " !important",
      fontFamily: fonts[1]
    },
    "& span": {
      color: colors[4]
    },
    height: '100em'
  },

  logo: {
    width: '10em',
    height: '10em',
    marginLeft: '8em',
    marginRight: '8em',
    marginTop: '4em'
  },
  shareImg: {
    width: '8em',
    height: '5em'
  },
  homescreenImg: {
    width: '20em',
    height: '4em'
  },
  addhomescreenImg: {
    width: '16em',
    height: '12em'
  }

});


function App() {
  const classes = useStyles();
  const common = useCommonStyles();

  const isMobileBrowserRender = isIos() && !isInStandaloneMode();

  /* Mobile View Handler ************************************************/
  const [isMobileView, setIsMobileView] = useState(
    window.matchMedia("(max-width: 1125px)").matches
  );
  //Adds a listener to re-render the component when the window width changes.
  useEffect(() => {
    const handler = e => setIsMobileView(e.matches);
    window.matchMedia("(max-width: 1125px)").addListener(handler);
  }, []);
  /**********************************************************************/

  return (
    <BrowserRouter>
      <Provider store={store}>
        {
          isMobileBrowserRender 
          ? <div className={classes.bgMobile}>
              {<span>
                <center>
                  <p>Please follow these steps to install the app on your mobile device:</p>
                  <ul>
                    <li>Step 1: Click on your device's share button.
                      <br/><br/>
                      <img src={share} className={classes.shareImg} />
                    </li>
                    
                    <li>Step 2: Scroll down and select "Add to Home Screen".
                      <br/><br/>
                      <img src={homescreen} className={classes.homescreenImg} />
                    </li>

                    <li>Step 3: Click "Add" on the Top Right.
                      <br/><br/>
                      <img src={addhomescreen} className={classes.addhomescreenImg} />
                    </li>

                    <li>Step 4: Check the app out on your home page!
                    </li>
                  </ul>
                </center>
              </span>}
            </div> 
          : <span>
              <NavBar />
              <Switch>
                {routes.map(({ path, Component, bgType, name }) => (
                  <Route key={path} path={path}>
                    <div className={((!isMobileView ? classes.bg : classes.bgMobile)) }>    
                      <Component />
                    </div>
                    {name === "Single" && <div className={classes.bg}><Comments /></div>}
                  </Route>
                ))}
              </Switch>
              <Footer />
            </span>
        }
      </Provider>
    </BrowserRouter>
  );


}

export default App;
