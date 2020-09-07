/***********************************************************************
 * File Name: Create.js
 * Description: Create page. The ability to create prayers, prose, and 
 * quotes is here. A word-finder widget is also included in order to 
 * allow the user to search for rhymes, synonyms, and more.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/


/* Library Imports ****************************************************/
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useHistory } from "react-router-dom"; 
import { useSelector } from "react-redux";

import { Grow, Grid, TextField, Snackbar, IconButton  } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

import ViewColumnRoundedIcon from '@material-ui/icons/ViewColumnRounded';
import ViewStreamRoundedIcon from '@material-ui/icons/ViewStreamRounded';

/**********************************************************************/

/* Project Imports ****************************************************/
import { getData, postData } from "../../services/api";
import { useStyles } from "./exports";
import { colors, useCommonStyles } from "../../assets/common";
import { getServerURL } from "../../config/config";

import {
  textFieldStyle,
  submitBtn,
  basicTextField,
  selectTextField,
  checkboxField,
  TransferList
} from "../../components/FormElements";
/**********************************************************************/



/**********************************************************************
 * Function Name: Create
 * Parameters: None
 * Description: Component for the Create page.
 * Notes: None
 **********************************************************************/
function Create() {
  /* Authentication Handling ********************************************/
  const sessionUsername = useSelector(state => state.username);

  //!! checks for undefined, null, and empty values
  const isLoggedIn = !!sessionUsername;

  const history = useHistory();

  if(!isLoggedIn){
    history.push("/redirect");
  }
  /**********************************************************************/

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

  //Data type for these hooks are arrays.
  const [groups, setGroups] = useState(null);


  const fetchData = isSubscribed => {
    getData(getServerURL("groups"), response => {
      if (isSubscribed) {
        setGroups(response);
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



  /* Hooks and Handlers For Forms ************************ */

  const [prayerTitle, setPrayerTitle] = useState("");
  const [prayerBody, setPrayerBody] = useState("");
  const [prayerType, setPrayerType] = useState("");
  const [prayerNotes, setPrayerNotes] = useState("");
  const [prayerGroups, setPrayerGroups] = useState([]);
  const [prayerImage, setPrayerImage] = useState("");
  const [prayerIsPublic, setPrayerIsPublic] = useState(true);

  const [groupName, setGroupName] = useState("");
  const [groupAbout, setGroupAbout] = useState("");
  const [groupNotes, setGroupNotes] = useState("");
  const [groupLeaderName, setGroupLeaderName] = useState("");
  const [groupImage, setGroupImage] = useState("");
  const [groupType, setGroupType] = useState("");
  const [groupIsPublic, setGroupIsPublic] = useState(true);

  const handlePrayerTitleChange = event => {
    setPrayerTitle(event.target.value);
  };

  const handlePrayerBodyChange = event => {
    setPrayerBody(event.target.value);
  };

  const handlePrayerTypeChange = event => {
    setPrayerType(event.target.value);
  };

  const handlePrayerNotesChange = event => {
    setPrayerNotes(event.target.value);
  };

  const handlePrayerGroupsChange = event => {
    setPrayerGroups(event.target.value);
  };

  const handlePrayerImageChange = event => {
    setPrayerImage(event.target.value);
  };

  const handlePrayerIsPublicChange = event => {
    setPrayerIsPublic(event.target.value);
  };

  const handleGroupNameChange = event => {
    setGroupName(event.target.value);
  };

  const handleGroupAboutChange = event => {
    setGroupAbout(event.target.value);
  };

  const handleGroupNotesChange = event => {
    setGroupNotes(event.target.value);
  };

  const handleGroupLeaderNameChange = event => {
    setGroupLeaderName(event.target.value);
  };

  const handleGroupImageChange = event => {
    setGroupImage(event.target.value);
  };

  const handleGroupTypeChange = event => {
    setGroupType(event.target.value);
  };

  const handleGroupIsPublicChange = event => {
    setGroupIsPublic(event.target.value);
  };


  //Defines the options for the dropdown and the form that is dynamically rendered.
  const types = [
    {
      value: "prayers",
      label: "create a prayer",
      formInput: (
        <div>
          {basicTextField("prayerTitle", "Title", handlePrayerTitleChange)}
          {basicTextField("prayerBody", "Body", handlePrayerBodyChange, 8)}
          {basicTextField("prayerType", "Type", handlePrayerTypeChange)}
          {basicTextField("prayerNotes", "Notes", handlePrayerNotesChange, 2)}
          {basicTextField("prayerGroups", "Groups", handlePrayerGroupsChange, 2)}
          {TransferList()}
          
          {basicTextField("prayerImage", "Image", handlePrayerImageChange)}
          Is Public: {checkboxField("prayerIsPublic", prayerIsPublic, "Is Public", handlePrayerIsPublicChange)}
          <br/>
          {submitBtn("Create")}
        </div>
      )
    },
    {
      value: "groups",
      label: "add a group",
      formInput: (
        <div>
          {basicTextField("groupName", "Name", handleGroupNameChange)}
          {basicTextField("groupAbout", "About", handleGroupAboutChange, 1)}
          {basicTextField("groupNotes", "Description", handleGroupNotesChange, 4)}
          {basicTextField("groupLeaderName", "Leader Name", handleGroupLeaderNameChange, 1)}
          {basicTextField("groupImage", "Image", handleGroupImageChange)}
          {basicTextField("groupType", "Type", handleGroupTypeChange)}
          Is Public: {checkboxField("groupIsPublic", groupIsPublic, "Is Public", handleGroupIsPublicChange)}
          <br/>
          {submitBtn("Create")}
        </div>
      )
    },
  ];

  const [type, setType] = useState(types[0].value);
  const [formInput, setFormInput] = useState(
    types[0].formInput
  );
  
  const handleTypeChange = event => {
    setType(event.target.value);

    types.map(({ value, formInput }) => {
      if (value === event.target.value) {
        setFormInput(formInput);
      }
    });
  };
  /******************************************************* */

  /* Hooks and Handlers for Submit Form ****************** */
  const { handleSubmit } = useForm();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  };

  const clearForm = () => {
    document.getElementById("createForm").reset();


    setPrayerTitle("");
    setPrayerBody("");
    setPrayerType("");
    setPrayerNotes("");
    
    setPrayerGroups([]);
    setPrayerImage("");
    setPrayerIsPublic(true);
    
    setGroupName("");
    setGroupAbout("");
    setGroupNotes("");
    setGroupLeaderName("");
    setGroupImage("");
    setGroupType("");
    setGroupIsPublic("");
    
  };

 /**********************************************************************
 * Function Name: onSubmit
 * Parameters: None (uses hooks)
 * Description: Creates a post request with the forms as dynamically 
 * defined based on the type of data being submitted.
 * Notes: None
 **********************************************************************/
  const onSubmit = () => {
    let data = {};
    let url = "";

    if(isLoggedIn){
      //type is defined based on the initial Select input value.
      switch(type){
        case "prayers":
          data = {
            "title": prayerTitle,
            "body": prayerBody, 
            "type": prayerType,
            "notes": prayerNotes,
            "createdBy": sessionUsername,
            "isPublic": prayerIsPublic,
            "groups": prayerGroups,
            "image": prayerImage
          };
          url = "prayers/create";

          break;
        case "groups":
          data = {
            "name": groupName,
            "about": groupAbout,
            "notes": groupNotes,
            "leaderName": groupLeaderName,
            "image": groupImage,
            "type": groupType,
            "isPublic": groupIsPublic
          }; 
          url = "groups/create";
        
          break;
        default:
          console.log("Something went wrong..."); 
          return 0;
      }

      //Post Request to CREATE on the server.
      postData(
        getServerURL(url),
        data,
        response => {
          console.log(response);
          clearForm();
          setIsSnackbarOpen(true);
        }
      );
    }
    
  };
  /******************************************************* */


  //Define the body.
  const body = (
    <Grid container>
      <Grid item xs={12} className={(classes.bodyDiv)}>
        <br/>
        <h1 className={common.pageHeader}>Create</h1>
        <div className={`${(classes.formDiv)} ${common.formAnimation}`}>
        <form id="createForm" onSubmit={handleSubmit(onSubmit)}>
          {!isMobileView && (selectTextField(
            "type",
            "What would you like to do?",
            type,
            handleTypeChange,
            types))
            ||
            (isMobileView && (
              selectTextField(
                "type",
                "Select type",
                type,
                handleTypeChange,
                types)
            ))
          }
          {formInput}
        </form>
        </div>
        <br/><br/><br/>
      <Snackbar open={isSnackbarOpen} autoHideDuration={3000} onClose={handleClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
          Successfully published!
        </MuiAlert>
      </Snackbar>
        </Grid>
    </Grid>
  );

  return (
    <Grow in={true}>
      {<div className={!isMobileView ? common.bodyDiv : common.mobileBodyDiv}>{body}</div>}
    </Grow>
  );
}

export default Create;