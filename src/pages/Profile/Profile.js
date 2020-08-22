/***********************************************************************
 * File Name: Profile.js
 * Description: Profile page. 
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

/* Library Imports ****************************************************/
import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { Grow, Grid, CircularProgress, Paper } from "@material-ui/core";
/**********************************************************************/

/* Project Imports ****************************************************/
import { getData } from "../../services/api";
import { useCommonStyles } from "../../assets/common";
import { getServerURL } from "../../config/config";

import { useStyles } from "./exports";

import {
  textFieldStyle,
  submitBtn,
  basicTextField,
  selectTextField
} from "../../components/FormElements";
/**********************************************************************/

/**********************************************************************
 * Function Name: Profile
 * Parameters: None
 * Description: Component for the Profile page.
 * Notes: None
 **********************************************************************/
function Profile() {
  /* Authentication Handling ********************************************/
  const sessionUsername = useSelector(state => state.username);

  //!! checks for undefined, null, and empty values
  const isLoggedIn = !!sessionUsername;

  const history = useHistory();
  /**********************************************************************/
  
  const classes = useStyles();
  const common = useCommonStyles();

  const { username } = useParams();

  const isOwnProfile = sessionUsername === username;

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

  const [user, setUser] = useState(null);

    /**********************************************************************
 * Function Name: fetchData
 * Parameters: isSubscribed variable ensures that the component isn't
 * loaded until after the fetch request is completed.
 * Description: Fetches the data of the items being looked at. 
 * Notes: None
 **********************************************************************/
const fetchData = isSubscribed => {
  getData(getServerURL("users/" + username), response => {
    if (isSubscribed) {
      setUser(response);
    }
  });
};

  //Run fetchData on the first render. When the second parameter is an 
  //empty array, the useEffect function will only be executed on page load.
  useEffect(() => {
    let isSubscribed = true;
    isSubscribed && fetchData(isSubscribed);
    return () => (isSubscribed = false);
  }, []);

  const body = (
    <Grid container>
      <Grid item xs={12}>
        <div className={common.spacingTop}></div>
          <h1 className={common.pageHeader}>{username}'s Profile</h1>
          {user && (<Paper className={classes.userDiv}>
            <div className={classes.bio}>Bio: {user[0].bio}</div>
            <div className={classes.email}>Email: {user[0].email}</div>
          </Paper>)}
          <br/>
      </Grid>
    </Grid>
  );
  return (
    <Grow in={true}>
      {<div className={!isMobileView ? common.bodyDiv : common.mobileBodyDiv}>{body}</div>}
    </Grow>
  );
}

export default Profile;
