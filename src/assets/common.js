/***********************************************************************
 * File Name: common.js
 * Description: Common stylings used throughout the entire application.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

import { makeStyles } from "@material-ui/core/styles";
import WebFont from 'webfontloader';

/* Color Schemes ****************************************************/
/* [white, primary, secondary, base, font, accent] 
 *
 * primary: light, will have the header
 * secondary: dark or matching
 * base: should be light
 * font: font color, should be dark. includes navbar buttons
 * accent: headers and titles, should be dark
 * 
 * bg1 = primary 25%, base 75%
 * bg2 = primary 15%, secondary 15%, base 70%
 * bg3 = base 100%
 */


//maximum blue green, wild orchard, beige, maastricht blue 
export const colors = ["white", 
"#3A332E", 
"#D0CCA6",  
"#F5F7DC", //good
"#3A332E", //good
"#231F1F"];

/**********************************************************************/

//0 is body, 1 is header, 2 is button
export const fonts = ["Open Sans", "Nothing You Could Do", "Open Sans", "Unica One"];
//export const fonts = ["Cutive Mono", "Ramabhadra", "Ramabhadra"];
//export const fonts = ["V323", "Ultra", "Bebas Neue"];
//export const fonts = ["Cutive Mono", "Permanent Marker", "Roboto"];

//Loads Google Fonts in a safe and efficent way.
WebFont.load({
  google: {
    families: [fonts[0], fonts[1], fonts[2], fonts[3]]
  }
});


export const useCommonStyles = makeStyles({
  /* Component Styles  ************************************************/
  bodyDiv: {
    height: "100%",
    width: "90vw",
    marginLeft: "1em",
    marginRight: "1em",
  },
  mobileBodyDiv: {
    height: "100%",
    width: "90vw",
    textAlign: "center",
    justifyContent: "center",
    marginLeft: "1em"
  },
  formDiv: {
    "& > *": {
      marginTop: "0.5em"
    }
  },
  spacingTop: {
    marginBottom: '6em'
  },
  pageHeader: {
    fontSize: '3em',
    fontFamily: fonts[1],
  },
  /* Item Card Styles  ************************************************/
  containerDiv: {
    display: 'flex',
    flexFlow: "row wrap",
  },
  title: {
    fontFamily: fonts[1],
    fontSize: '1.3em',
    display: 'block',
    fontWeight: 'bold',
    color: colors[5] + " !important",
    "& :hover": {
      color: colors[4] + " !important"
    }
  },
  body: {
    fontFamily: fonts[0],
    fontSize: '1em',
    display: 'block',
    marginTop: '0.75em',
    marginBottom: '0.75em',
    whiteSpace: 'pre-wrap',
  },
  createdBy: {
    fontFamily: fonts[1],
    fontSize: '1.2em',
    display: 'block',
    color: colors[5] + " !important",
  },
  smallText: {
    fontFamily: fonts[1],
    fontSize: '0.75em',
    display: 'block'
  },
  createdAt: {
    fontFamily: fonts[1],
    fontSize: '0.75em',
    display: 'block',
    position: 'relative',
    bottom: '0'
  },
});