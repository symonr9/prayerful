/***********************************************************************
 * File Name: Hub.js
 * Description: Hub page. Component to browse prayers. Utilizes 
 * abstracted ItemCard and SortFilterBar components shared with the 
 * Prose and Quotes components.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

/* Library Imports ****************************************************/
import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { Grow, Grid, CircularProgress } from "@material-ui/core";
/**********************************************************************/

/* Project Imports ****************************************************/
import { getData } from "../../services/api";
import { useCommonStyles } from "../../assets/common";
import { getServerURL } from "../../config/config";

import {
  selectTextField,
} from "../../components/FormElements";

import ItemCard from '../../components/ItemCard';

import { useStyles } from "./exports";
/**********************************************************************/

/**********************************************************************
 * Function Name: Hub
 * Parameters: None
 * Description: Component for the Hub section.
 * Notes: None
 **********************************************************************/
function Hub() {
  /* Authentication Handling ********************************************/
  const sessionUsername = useSelector(state => state.username);

  //!! checks for undefined, null, and empty values
  const isLoggedIn = !!sessionUsername;

  const history = useHistory();
  /**********************************************************************/
    
  const classes = useStyles();
  const common = useCommonStyles();

  //Data type for these hooks are arrays.
  const [ownPrayers, setOwnPrayers] = useState(null);
  const [savedPrayers, setSavedPrayers] = useState(null);
  const [user, setUser] = useState(null);

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
    if (isLoggedIn) {
      getData(getServerURL("users/" + sessionUsername), response => {
        if (isSubscribed) {
          setUser(response[0]);
        }
      });
    }

    getData(getServerURL("prayers/user/" + sessionUsername), response => {
      if (isSubscribed) {
        console.log("response: " + JSON.stringify(response));

        let items = (response.own.sort((a,b) => {
          let aItem = new Date(a.createdAt).getTime();
          let bItem = new Date(b.createdAt).getTime();
  
          return (aItem > bItem) ? -1 : (aItem < bItem) ? 1 : 0;
         //return (aItem < bItem) ? -1 : (aItem > bItem) ? 1 : 0;
        }));
        setOwnPrayers(items);

        items = (response.saved.sort((a,b) => {
          let aItem = new Date(a.createdAt).getTime();
          let bItem = new Date(b.createdAt).getTime();
  
          return (aItem > bItem) ? -1 : (aItem < bItem) ? 1 : 0;
          //return (aItem < bItem) ? -1 : (aItem > bItem) ? 1 : 0;
        }));
        setSavedPrayers(items);

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

  const handlePrayersChange = (index, id, shouldAdd)=> {
    let newUser = {...user};

    if (shouldAdd) {
      newUser.prayers.push(id);
    } else {
      let index = newUser.prayers.indexOf(id);
      newUser.prayers.splice(index, 1);
    }

    setUser(newUser);
  }

  const ownPrayersDiv = (
    <span>
      <h1>Own Prayers</h1>
      <div className={classes.containerDiv}>
      {(ownPrayers &&
        ownPrayers.map((prayer, index) => {
          return (
            <ItemCard 
              type={"prayers"}
              key={prayer._id}
              id={prayer._id}
              index={index}
              isMobileView={isMobileView}
              link={`/prayers/${prayer.urlId}`}
              title={prayer.title}
              createdBy={prayer.createdBy}
              body={prayer.body}
              createdAt={prayer.createdAt}
              notes = {prayer.notes}
              image={prayer.image}
              type={prayer.type}
              groups={prayer.groups}
              isLoggedIn={isLoggedIn}
              userId={user && user._id}
              isUserPrayer={user && user.prayers.includes(prayer._id)}
              handlePrayersChange={handlePrayersChange}
            />
          );
        })) ||
        (!ownPrayers && (
          <div>
            <CircularProgress />
          </div>
        ))}
      </div>
    </span>
  );

  const savedPrayersDiv = (
    <span>
      <h1>Saved Prayers</h1>
      <div className={classes.containerDiv}>
      {(savedPrayers &&
        savedPrayers.map((prayer, index) => {
          return (
            <ItemCard 
              type={"prayers"}
              key={prayer._id}
              id={prayer._id}
              index={index}
              isMobileView={isMobileView}
              link={`/prayers/${prayer.urlId}`}
              title={prayer.title}
              createdBy={prayer.createdBy}
              body={prayer.body}
              createdAt={prayer.createdAt}
              notes = {prayer.notes}
              image={prayer.image}
              type={prayer.type}
              groups={prayer.groups}
              isLoggedIn={isLoggedIn}
              userId={user && user._id}
              isUserPrayer={user && user.prayers.includes(prayer._id)}
              handlePrayersChange={handlePrayersChange}
            />
          );
        })) ||
        (!savedPrayers && (
          <div>
            <CircularProgress />
          </div>
        ))}
      </div>
    </span>
  );

  const groupsDiv = (
    <div>
      Groups div
    </div>
  );

  const friendsDiv = (
    <div>
      Friends div
    </div>
  );

  const landingDiv = (
    <div>
      {savedPrayersDiv}
    </div>
  );
 
  const viewTypes = [

    {
      value: 'landing',
      label: 'Central Hub',
      view: (groupsDiv)
    },
    {
      value: 'saved',
      label: 'Saved Prayers',
      view: (savedPrayersDiv)
    },
    {
      value: 'own',
      label: 'Own Prayers',
      view: (ownPrayersDiv)
    },
    {
      value: 'groups',
      label: 'Groups',
      view: (groupsDiv)
    },
    {
      value: 'friends',
      label: 'Friends',
      view: (friendsDiv)
    },
  ];
  
  const [viewType, setViewType] = useState(viewTypes[0].value);
  const [view, setView] = useState(
    viewTypes[0].view
  );

  const handleViewTypeChange = event => {
    setViewType(event.target.value);

    viewTypes.map(({ value, view }) => {
      if (value === event.target.value) {
        setView(view);
      }
    });
  };

  const body = (
    <Grid container>
      <Grid item xs={12}>
        <div className={common.spacingTop}></div>
        <h1 className={common.pageHeader}>Hub</h1>
        <Grid item xs={4}>
        {selectTextField(
            "type",
            "View:",
            viewType,
            handleViewTypeChange,
            viewTypes
          )}
        </Grid>
        <Grid item xs={8}>
        </Grid>
        <Grid item xs={12}>
        {view}
        {viewType == "landing" && (landingDiv)}
        </Grid>
      </Grid>
    </Grid>
  );
  
  return (
    <Grow in={true}>
      {<div className={!isMobileView ? common.bodyDiv : common.mobileBodyDiv}>{body}</div>}
    </Grow>
  );
}

export default Hub;
