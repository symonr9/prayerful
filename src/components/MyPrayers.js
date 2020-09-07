/***********************************************************************
 * File Name: MyPrayers.js
 * Description: Component for the MyPrayers section.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

 /* Library Imports ****************************************************/
 import React from "react";
 import { makeStyles } from '@material-ui/core/styles';
 /**********************************************************************/
 
 import { colors } from "../assets/common";
 
 const useStyles = makeStyles({
     myPrayersDiv: {

     }
 });
 
 /**********************************************************************
  * Function Name: MyPrayers
  * Parameters: None
  * Description: Component for MyPrayers.
  * Notes: None
  **********************************************************************/
 function MyPrayers() {
     const classes = useStyles();
     
     return (
         <div className={classes.myPrayersDiv}>
 
         </div>
     );
 }
 
 export default MyPrayers;
 