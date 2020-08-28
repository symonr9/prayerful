/***********************************************************************
 * File Name: Edit.js
 * Description: Edit page. This component has the form dynamically defined
 * based on the data type (prayers, prose, quotes). Similar to the Create page.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/


/* Library Imports ****************************************************/
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useHistory } from "react-router-dom"; 
import { useSelector } from "react-redux";

import { Button, Grow, Grid, TextField, Snackbar, CircularProgress, IconButton  } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

import ViewColumnRoundedIcon from '@material-ui/icons/ViewColumnRounded';
import ViewStreamRoundedIcon from '@material-ui/icons/ViewStreamRounded';

import ReactTimeAgo from "react-time-ago";
/**********************************************************************/

/* Project Imports ****************************************************/
import { getData, postData, putData } from "../../services/api";
import { useCommonStyles } from "../../assets/common";
import { getServerURL } from "../../config/config";

import {
  textFieldStyle,
  submitBtn,
  basicTextField,
  editTextField,
  selectTextField
} from "../../components/FormElements";

import { useStyles, kinds } from "./exports";
/**********************************************************************/


/**********************************************************************
 * Function Name: Edit
 * Parameters: URL parameters include type and urlId. The URL route is 
 * /:type/:urlId/edit.
 * Description: Component for the Edit page.
 * Notes: None
 **********************************************************************/
function Edit() {  
  /* Authentication Handling ********************************************/
  const sessionUsername = useSelector(state => state.username);

  //!! checks for undefined, null, and empty values
  const isLoggedIn = !!sessionUsername;

  const history = useHistory();

  if(!isLoggedIn){
    history.push("/redirect");
  }
  /**********************************************************************/

  const { type, urlId } = useParams();

  const classes = useStyles();
  const common = useCommonStyles();

  //Data type for these hooks are arrays.
  //data can be prayers, quotes, or prose depending on the type.
  const [data, setData] = useState(null);

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

  
  /* Hooks and Handlers for Side View ******************** */
  const [isSideView, setIsSideView] = useState(false);

  const handleSwitchView = event => {
    setIsSideView(!isSideView);
  };
  /******************************************************* */

  /* Hooks and Handlers For Forms ************************ */
  const [_id, setId] = useState("");
  const [isPublic, setIsPublic] = useState(true);

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
  /******************************************************* */


/**********************************************************************
 * Function Name: fetchData
 * Parameters: isSubscribed variable ensures that the component isn't
 * loaded until after the fetch request is completed.
 * Description: Fetches the data of the item being looked at. 
 * Notes: None
 **********************************************************************/
  const fetchData = isSubscribed => {
    //GETs the data from the server. URI determined by url params.
    getData(getServerURL(type + "/" + urlId), response => {
      if (isSubscribed) {
        setData(response);
        setId(response._id);
        setIsPublic(response.isPublic);

        if(response.createdBy !== sessionUsername){
          history.push("/redirect");
        }

        //Get data and assign them to the appropriate forms.
        if(type === "prayers"){
          setPrayerTitle(response.title);
          setPrayerBody(response.body);
          setPrayerType(response.type);
          setPrayerNotes(response.notes);
        }
        else if(type === "quotes"){
          setQuoteText(response.text);
          setQuoteAuthor(response.author);
        }
        else if(type === "prose"){
          setProseTitle(response.title);
          setProseBody(response.body);
        }
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

  /* Hooks and Handlers for Submit Form ****************** */
  const { handleSubmit } = useForm();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  };

 /**********************************************************************
 * Function Name: onSubmit
 * Parameters: None (uses hooks)
 * Description: Creates a put request with the forms as dynamically 
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
            "isPublic": isPublic,
            "createdBy": sessionUsername,
          };
          url = "prayers/edit/" + _id;

          break;
        case "quotes":
          data = {
            "text": quoteText,
            "author": quoteAuthor,
            "isPublic": isPublic,
            "createdBy": sessionUsername,
          }; 
          url = "quotes/edit/" + _id;
        
          break;
        case "prose":
          data = {
            "title": proseTitle,
            "body": proseBody,
            "isPublic": isPublic,
            "createdBy": sessionUsername,
          };
          url = "prose/edit/" + _id;

          break;
        default:
          console.log("Something went wrong..."); 
          return 0;
      }

      //Put Request to UPDATE on the server.
      putData(
        getServerURL(url),
        data,
        response => {
          console.log(response);
          setIsSnackbarOpen(true);
          history.push("/");
        }
      );
    }

  };

  /******************************************************* */

  //Dynamically determine the body content for the form.
  const bodyContent = (
    <div>
      {
      (data 
        && ( type === "prayers" && 
              (<div>
                {editTextField("prayerTitle", data.title, "Title", handlePrayerTitleChange)}
                {editTextField("prayerBody", data.body, "Body", handlePrayerBodyChange, 8)}
                {editTextField("prayerType", data.type, "Type of your prayer", handlePrayerTypeChange)}
                {editTextField("prayerNotes", data.notes, "Notes", handlePrayerNotesChange, 2)}
                {submitBtn("Save")}
                <br/><br/>
                by {data.createdBy}
                <br/><br/>
                created <ReactTimeAgo date={data.createdAt} />
                <br/><br/><br/>
              </div>)
              ||
              type === "quotes" &&
              (<div>
                {editTextField("quoteText", data.text, "A quote to remember", handleQuoteTextChange, 3)}
                {editTextField("quoteAuthor", data.author, "Who said it?", handleQuoteAuthorChange)}
                {submitBtn("Save")}
                <br/><br/>
                by {data.createdBy}
                <br/><br/>
                created <ReactTimeAgo date={data.createdAt} />
                <br/><br/><br/>        
              </div>)
              ||
              type === "prose" && 
              (<div>
                {editTextField("proseTitle", data.title, "Title", handleProseTitleChange)}
                {editTextField("proseBody", data.body, "Body", handleProseBodyChange, 12)}
                {submitBtn("Save")}
                <br/><br/>
                by {data.createdBy}
                <br/><br/>
                created <ReactTimeAgo date={data.createdAt} />
                <br/><br/><br/>
              </div>)
              ||
              (<div>Sorry, this does not exist.</div>)
            )
      )
      }
      <br/>
    </div>
  );

  const body = (
    <Grid container>
      <Grid item xs={12}>
        <div className={common.spacingTop}></div>
        <h1 className={common.pageHeader}>Edit</h1>
        <div className={classes.editContainerDiv}>
          {(data && 
          <form onSubmit={handleSubmit(onSubmit)}>
            {bodyContent}
          </form>) ||
            (!data && (
              <div>
                <CircularProgress />
              </div>
            ))}
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

export default Edit;
