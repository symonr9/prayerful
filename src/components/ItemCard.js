/***********************************************************************
 * File Name: ItemCard.js
 * Description: Component for the ItemCard section. This component is
 * rendered on the Poetry, Prose, and Quotes page. Data is pulled from 
 * the server and the mongoDB. Depending on the data type, the rendering
 * of the ItemCard differs.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

/* Library Imports ****************************************************/
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

import { useHistory } from "react-router-dom"; 
import { useSelector } from "react-redux";

import { Grow, Grid, TextField, Snackbar, IconButton  } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

import { Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import AddBoxIcon from '@material-ui/icons/AddBox';

import ReactTimeAgo from 'react-time-ago';
/**********************************************************************/

/* Project Imports ****************************************************/
import { fonts, colors, useCommonStyles } from "../assets/common";

import { getData, putData } from "../services/api";

import { getServerURL } from "../config/config";
/**********************************************************************/

export const useStyles = makeStyles({
    text: {
      marginTop: '0.1em',
      fontSize: '1.1em',
      display: 'block',
      fontStyle: 'italic',
      whiteSpace: 'pre-wrap',
    },
    author: {
      fontSize: '1em',
      display: 'block',
      marginBottom: '1em',
    },
    itemDiv: {
        flex: '20%',
        padding: '10px',
        width: '100px',
        height: '300px',
        overflowY: 'scroll',
        marginRight: '1em',
        marginBottom: '1em',
        "& a": {
          textDecoration: 'none',
          color: colors[4],
          "& :hover": {
            color: colors[2]
          }
        }
      },
      mobileItemDiv: {
        flex: '100%',
        padding: '10px',
        width: '90%',
        marginLeft: '1em',
        marginRight: '1em',
        marginTop: '1em',
        marginBottom: '1em',
        "& a": {
          textDecoration: 'none',
          color: colors[4],
          "& :hover": {
            color: colors[2],
          }
        },
      },
});


/**********************************************************************
 * Function Name: ItemCard
 * Parameters: The expected parameters differ based on the "type"  
 * parameter that is passed into the component upon use. The types and 
 * parameters are as follows: 
 *      - prayers
 *          - key, isMobileView, link, title, createdBy, body, createdAt
 *      - quotes
 *          - key, isMobileView, link, text, author, createdAt
 *      - prose
 *          - key, isMobileView, link, title, createdBy, body, createdAt
 * 
 * Description: This component is rendered on the Poetry, Prose, and 
 * Quotes page. Data is pulled from the server and the mongoDB. 
 * Depending on the data type, the rendering of the ItemCard differs.
 * Notes: None
 **********************************************************************/
const ItemCard = params => {
    const classes = useStyles();
    const common = useCommonStyles();

    const type = params.type;

    const [isUserPrayer, setIsUserPrayer] = useState(params.isUserPrayer);  


    const titleSection = (
        <NavLink to={params.link}>
            <span className={common.title}>{params.title}</span>
        </NavLink>
    );

    const createdBySection = (
        <NavLink to={"/profile" + "/" + params.createdBy}>
            <span className={common.createdBy}>
                By {params.createdBy}
            </span>
        </NavLink>  
    );

    const bodySection = (
        <span className={common.body}>{params.body}</span>
    );

    const createdAtSection = (
        <span className={common.createdAt}>
            created <ReactTimeAgo date={params.createdAt} />
        </span>
    );

    const notesSection = (
      <span>{params.notes}</span>
    );

    const groupsSection = (
      <span>{params.groups}</span>
    );

    const typeSection = (
      <span>{params.type}</span>
    );

    const [isAddSnackbarOpen, setIsAddSnackbarOpen] = useState(false);
  
    const handleAddClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setIsAddSnackbarOpen(false);
    };

    const [isRemoveSnackbarOpen, setIsRemoveSnackbarOpen] = useState(false);
  
    const handleRemoveClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setIsRemoveSnackbarOpen(false);
    };

    const addPrayer = () => {
      if(params.isLoggedIn){
        //type is defined based on the initial Select input value.

        let data = {
          "id": params.id
        };
        let url = "users/add-prayer/" + params.userId;

        //Post Request to UPDATE on the server.
        putData(
          getServerURL(url),
          data,
          response => {
            console.log(response);
            setIsAddSnackbarOpen(true);
            setIsUserPrayer(true);
          }
        );
      }
      
    };

    const removePrayer = () => {
      if(params.isLoggedIn){
        //type is defined based on the initial Select input value.

        let data = {
          "id": params.id
        };
        let url = "users/remove-prayer/" + params.userId;

        //Post Request to UPDATE on the server.
        putData(
          getServerURL(url),
          data,
          response => {
            console.log(response);
            setIsRemoveSnackbarOpen(true);
            setIsUserPrayer(false);
          }
        );
      }
      
    };

    const addToPrayersBtn = (
      <Button onClick={addPrayer}
        variant="contained" 
        size="small"
        style={{ fontFamily: fonts[3] }}>
          <AddBoxIcon /> Add to Prayers
      </Button>
    );
    const removeFromPrayersBtn = (
      <Button onClick={removePrayer}
        variant="contained" 
        size="small"
        style={{ fontFamily: fonts[3] }}>
          <AddBoxIcon /> Remove from Prayers
      </Button>
    );

    //Different JSX elemnts are rendered based on ItemCard type.
    return (
        <Paper
        key={params.key}
        elevation={7}
        className={`${(!params.isMobileView && classes.itemDiv || (params.isMobileView && classes.mobileItemDiv))}`}>
            {titleSection}<br/>
            {createdBySection}<br/>
            {bodySection}<br/>
            {notesSection}<br/>
            {groupsSection}<br/>
            {typeSection}<br/>
            {createdAtSection}<br/>
            user id: {params.userId}<br/>
            type: {params.type}<br/>
            image: {params.image}<br/>
            isLoggedIn? {params.isLoggedIn}<br/><br/>

            { ( params.isLoggedIn && isUserPrayer ) ? addToPrayersBtn : removeFromPrayersBtn }

          <Snackbar open={isAddSnackbarOpen} autoHideDuration={3000} onClose={handleAddClose}>
            <MuiAlert elevation={6} variant="filled" onClose={handleAddClose} severity="success">
              Added to prayers!
            </MuiAlert>
          </Snackbar>
          <Snackbar open={isRemoveSnackbarOpen} autoHideDuration={3000} onClose={handleRemoveClose}>
            <MuiAlert elevation={6} variant="filled" onClose={handleRemoveClose} severity="success">
              Removed from prayers!
            </MuiAlert>
          </Snackbar>
        </Paper>
    );
}

export default ItemCard;