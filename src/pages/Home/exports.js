/***********************************************************************
 * File Name: exports.js
 * Description: Has exports for accompanying component file.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

import { makeStyles } from "@material-ui/core/styles";
import { fonts, colors } from "../../assets/common";

export const useStyles = makeStyles({
    logo: {
        width: '70vw',
        height: '75vh',
        margin: '0 !important',
        marginTop: '10em !important',
        marginBottom: '0em !important',
        textAlign: 'center',
    },
    mobileLogo: {
        marginTop: '5em !important'
    },
    introTitle: {
        fontFamily: fonts[1],
        fontSize: '3em',
        color: colors[4],
        fontWeight: 'bold',
        marginBottom: '0.25em',
        marginTop: '2em'
    },
    introText: {
        fontFamily: fonts[2],
        fontSize: '1.5em',
        marginLeft: '1.5em'
    },
    homeBtn: {
        fontFamily: fonts[3],
        fontSize: '1.5em',
        border: 'solid 0.1em' + colors[1],
        backgroundColor: colors[3],
        borderRadius: '0.25em',
        margin: '0.5em',
        boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
    },
    homeSpacingDiv: {
        marginTop: '20em'
    },
    homePaper: {
        marginTop: '10em'
    },
    endPaper: {
        marginBottom: '10em'
    },
    paperSmall: {
        fontSize: '0.8em',
        borderRadius: '0.4em',
        margin: '1em',
        border: 'solid 0.2em ' + colors[1],
        backgroundColor: colors[2],
        padding: '1em'
    },
});