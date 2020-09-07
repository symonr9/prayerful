/***********************************************************************
 * File Name: Home.js
 * Description: Home page.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/


 /* Library Imports ****************************************************/
 import React, { useState, useEffect } from "react";
 import { Button, Grow, Grid, Paper, CircularProgress } from "@material-ui/core";
/**********************************************************************/

/* Project Imports ****************************************************/
import { getData } from "../../services/api";
import { getServerURL } from "../../config/config";

import { useCommonStyles } from "../../assets/common";
import { useStyles } from "./exports";
/**********************************************************************/

/**********************************************************************
 * Function Name: Home
 * Parameters: None
 * Description: Component for the Home page.
 * Notes: None
 **********************************************************************/
const Home = () => {
  const classes = useStyles();
  const common = useCommonStyles();

    //Data type for these hooks are arrays.
    const [prayers, setPrayers] = useState(null);

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

  /**********************************************************************
   * Function Name: fetchData
   * Parameters: isSubscribed variable ensures that the component isn't
   * loaded until after the fetch request is completed.
   * Description: Fetches the data of the items being looked at. 
   * Notes: None
   **********************************************************************/
  const fetchData = isSubscribed => {
    getData(getServerURL("prayers"), response => {
      console.log("Response: " + response);
      if (isSubscribed) {
        const items = response;
        setPrayers(items);
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
          <div className={classes.introTitle}><b>Prayerful</b></div>
        
            <div className={classes.introText}>
              <h2>a little app to organize your prayers :)</h2>
              
              <h2>What would you like to do??</h2>


              <Button className={classes.homeBtn} variant="filled">Join a group</Button>
              <Button className={classes.homeBtn} variant="filled">Ask for prayer</Button>
              <Button className={classes.homeBtn} variant="filled">Pray for someone</Button>

              <br/><br/><br/><br/>
              
              <br/><br/><br/><br/>
            </div>
      </Grid>
    </Grid>
  );

  return (
    <Grow in={true}>
      {<div className={!isMobileView ? common.bodyDiv : common.mobileBodyDiv}>{body}</div>}
    </Grow>
  );
};

export default Home;
