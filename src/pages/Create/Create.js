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
import { postData } from "../../services/api";
import { useStyles } from "./exports";
import { colors, useCommonStyles } from "../../assets/common";
import { getServerURL } from "../../config/config";

import {
  textFieldStyle,
  submitBtn,
  basicTextField,
  selectTextField
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

  /* Hooks and Handlers For Forms ************************ */
  const [type, setType] = useState("");
  const [formInput, setFormInput] = useState(
    <div></div>
  );
  
  const handleTypeChange = event => {
    setType(event.target.value);

    types.map(({ value, formInput }) => {
      if (value === event.target.value) {
        setFormInput(formInput);
      }
    });
  };

  const [prayerTitle, setPrayerTitle] = useState("");
  const [prayerBody, setPrayerBody] = useState("");
  const [prayerType, setPrayerType] = useState("");
  const [prayerNotes, setPrayerNotes] = useState("");

  const [quoteText, setQuoteText] = useState("");
  const [quoteAuthor, setQuoteAuthor] = useState("");

  const [proseTitle, setProseTitle] = useState("");
  const [proseBody, setProseBody] = useState("");

  
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

  const handleQuoteTextChange = event => {
    setQuoteText(event.target.value);
  };

  const handleQuoteAuthorChange = event => {
    setQuoteAuthor(event.target.value);
  };

  const handleProseTitleChange = event => {
    setProseTitle(event.target.value);
  };

  const handleProseBodyChange = event => {
    setProseBody(event.target.value);
  };


  //Defines the options for the dropdown and the form that is dynamically rendered.
  const types = [
    {
      value: "prayers",
      label: "compose a prayer",
      formInput: (
        <div>
          {basicTextField("prayerTitle", "Title", handlePrayerTitleChange)}
          {basicTextField("prayerBody", "Body", handlePrayerBodyChange, 8)}
          {basicTextField("prayerType", "Type of your prayer", handlePrayerTypeChange)}
          {basicTextField("prayerNotes", "Notes", handlePrayerNotesChange, 2)}
          {submitBtn("Publish")}
        </div>
      )
    },
    {
      value: "quotes",
      label: "remember a quote",
      formInput: (
        <div>
          {basicTextField("quoteText", "A quote to remember", handleQuoteTextChange, 3)}
          {basicTextField("quoteAuthor", "Who said it?", handleQuoteAuthorChange)}
          {submitBtn("Publish")}
        </div>
      )
    },
    {
      value: "prose",
      label: "write some prose",
      formInput: (
        <div>
          {basicTextField("proseTitle", "Title", handleProseTitleChange)}
          {basicTextField("proseBody", "Body", handleProseBodyChange, 12)}
          {submitBtn("Publish")}
        </div>
      )
    },
  ];
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
    
    setQuoteText("");
    setQuoteAuthor("");

    setProseTitle("");
    setProseBody("");
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
            "isPublic": true
          };
          url = "prayers/create";

          break;
        case "quotes":
          data = {
            "text": quoteText,
            "author": quoteAuthor,
            "createdBy": sessionUsername,
            "isPublic": true
          }; 
          url = "quotes/create";
        
          break;
        case "prose":
          data = {
            "title": proseTitle,
            "body": proseBody,
            "createdBy": sessionUsername,
            "isPublic": true
          };
          url = "prose/create";

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
            "prayerType",
            "What would you like to do?",
            type,
            handleTypeChange,
            types))
            ||
            (isMobileView && (
              selectTextField(
                "prayerType",
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