/***********************************************************************
 * File Name: GroupCard.js
 * Description: Component for the GroupCard section. This component is
 * rendered on the Poetry, Prose, and Quotes page. Data is pulled from 
 * the server and the mongoDB. Depending on the data type, the rendering
 * of the GroupCard differs.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

/* Library Imports ****************************************************/
import React from "react";
import { NavLink } from "react-router-dom";

import { Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ReactTimeAgo from 'react-time-ago';
/**********************************************************************/

/* Project Imports ****************************************************/
import { fonts, colors, useCommonStyles } from "../assets/common";

/**********************************************************************/

export const useStyles = makeStyles({
    name: {
        fontFamily: fonts[1],
        fontSize: '3em',
        fontWeight: 'bold',
        color: colors[3] + " !important",
        textAlign: 'center',
        "& :hover": {
          color: colors[1] + " !important"
        },
      },
      about: {
        fontFamily: fonts[3],
        fontSize: '1.3em',
        color: colors[3] + " !important",
      },
      leaderName: {
        fontFamily: fonts[1],
        fontSize: '1.3em',
        color: colors[3] + " !important",
      },
      smallText: {
        fontFamily: fonts[1],
        fontSize: '0.75em',
        display: 'block'
      },
    addImage: {
        background: "url('https://images.unsplash.com/photo-1518176258769-f227c798150e') center",
        backgroundSize: 'cover',
    },
    groupDiv: {
        position: 'relative',
        width: '400px',
        height: '300px',
        marginRight: '1em',
        marginBottom: '1em',
        "& a": {
          textDecoration: 'none',
          color: colors[4],
          "& :hover": {
            color: colors[2]
          }
        },
        paddingLeft: '0.3em',
        marginTop: '1em'
    },
    mobileGroupDiv: {
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
    button: {
        position: 'absolute',
        bottom: '1em',
        right: '1em',
        backgroundColor: colors[2],
        fontFamily: fonts[2],
    }
});



const GroupCard = params => {
    const classes = useStyles();
    const common = useCommonStyles();

    const nameSection = (
        <NavLink to={params.link}>
            <span className={classes.name}>{params.name}</span>
        </NavLink>
    );

    const leaderNameSection = (
        <NavLink to={"/profile" + "/" + params.leaderUsername}>
            <span className={classes.leaderName}>
                Led By {params.leaderName}
            </span>
        </NavLink>  
    );

    const aboutSection = (
        <span className={classes.about}>{params.about}</span>
    );
  
    //var url = 'https://images.unsplash.com/photo-1474367658825-e5858839e99d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80';
    var url = params.image;
    const imageStyle = {
      //  background: "url(" + url + "), linear-gradient(to bottom, #4ac425, #4ac425) center",
        background: "linear-gradient(180deg, rgba(0,0,1,1) 0%, rgba(139,139,168,0) 90%), url(" + url + ") no-repeat center",
        backgroundSize: 'cover',

    };

    const button = (
      <NavLink to={params.link}>
        <Button className={classes.button} variant="outlined">Learn More</Button>
      </NavLink>
    );

    console.log("image: " + params.image);

    //Different JSX elemnts are rendered based on GroupCard type.
    return (
        <Paper
        key={params.key}
        elevation={7}
        style={ imageStyle }
        className={ `${(!params.isMobileView ? classes.groupDiv : classes.mobileGroupDiv)}`}>
            {nameSection}<br/>
            {leaderNameSection}<br/><br/>
            {aboutSection}
            {button}
        </Paper>
    );
}

export default GroupCard;