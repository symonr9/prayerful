/***********************************************************************
 * File Name: Home.js
 * Description: Home page.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/


 /* Library Imports ****************************************************/
 import React, { useState, useEffect } from "react";
 import { Grow, Grid, Paper } from "@material-ui/core";
/**********************************************************************/

/* Project Imports ****************************************************/
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

  const body = (
    <Grid container>
      <Grid item xs={12}>
          <Paper className={`${classes.homePaper} ${(!isMobileView && classes.paperAnimation || (isMobileView && classes.mobilePaperAnimation))}`} elevation="12">
            <div className={classes.introTitle}><b>Prayerful</b></div>
          </Paper>
          <Paper className={`${classes.homePaper} ${(!isMobileView && classes.paperAnimation || (isMobileView && classes.mobilePaperAnimation))}`} elevation="12">
            <div className={classes.introText}>
              <h2>Prayer App</h2>
              This is a progressive web application built by me, Symon.<br/><br/>
            </div>
          </Paper>
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
