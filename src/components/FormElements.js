/***********************************************************************
 * File Name: FormElement.js
 * Description: Component for different form elements that are used on
 * the Create page and the Edit page.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

/* Library Imports ****************************************************/
import React from "react";

import { Paper, Checkbox, Button, TextField, MenuItem, InputProps } from "@material-ui/core";
import PublishRoundedIcon from "@material-ui/icons/PublishRounded";
/**********************************************************************/

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';

import { fonts, colors } from "../assets/common";


//Custom stylings.
export const textFieldStyle = {
  marginTop: "1em",
  marginBottom: "1em",
  backgroundColor: "white",
  color: colors[5],
  fontFamily: fonts[0],
  borderRadius: '5px'
};

export const submitBtnStyle = {
  color: colors[5],
  backgroundColor: colors[2],
  marginTop: "2em",
  marginBottom: "2em",
};

const inputStyle = {
  color: colors[5],
  fontFamily: fonts[0]
};

const labelStyle = {
  color: 'gray',
  fontFamily: fonts[0]
};

//SubmitBtn JSX element. Assumes that it is wrapped within a form.
export const submitBtn = (value) => {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<PublishRoundedIcon />}
      type="submit"
      style={submitBtnStyle}
    >
      {value}
    </Button>
  );
};


export const checkboxField = (name, value, label, onChangeFun) => {
  return (
    <Checkbox
    name={name}
    checked={value}
    label={label}
    onChange={onChangeFun}
    inputProps={{ 'aria-label': 'primary checkbox' }}
  />
  );
};

//Fixme: Remove all calls of basicTextField and use editTextField instead. 
//The reason that there are two elements for TextField is because editTextField
//is being used in Edit.js to edit fields that already exist. The value is set
//as defaultValue, and so it works for existing data. But the TextFields for 
//Create.js don't have pre-existing values, and in order to add a value element,
//a function would need to be passed in and additional hooks would need to be 
//implemented.

export const basicTextField = (name, label, onChangeFun, numOfLines = 1) => {
  return (
    <TextField
      id={name + "TextField"}
      name={name}
      label={label}
      placeholder="Start writing..."
      variant="outlined"
      multiline={!(numOfLines === 1)}
      rows={numOfLines}
      fullWidth
      style={textFieldStyle}
      InputProps={{
        style: inputStyle
      }}
      InputLabelProps={{
        style: labelStyle
      }}
      onChange={onChangeFun}
    ></TextField>
  );
};

export const passwordTextField = (name, label, onChangeFun, numOfLines = 1) => {
  return (
    <TextField
      id={name + "TextField"}
      name={name}
      type="password"
      label={label}
      placeholder="Start writing..."
      variant="outlined"
      multiline={!(numOfLines === 1)}
      rows={numOfLines}
      fullWidth
      style={textFieldStyle}
      InputProps={{
        style: inputStyle
      }}
      InputLabelProps={{
        style: labelStyle
      }}
      onChange={onChangeFun}
    ></TextField>
  );
};

export const editTextField = (
  name,
  value,
  label,
  onChangeFun,
  numOfLines = 1
) => {
  return (
    <TextField
      id={name + "TextField"}
      name={name}
      defaultValue={value}
      label={label}
      placeholder="Start writing..."
      variant="outlined"
      multiline={!(numOfLines === 1)}
      rows={numOfLines}
      fullWidth
      style={textFieldStyle}
      InputProps={{
        style: inputStyle
      }}
      InputLabelProps={{
        style: labelStyle
      }}
      onChange={onChangeFun}
    ></TextField>
  );
};

export const selectTextField = (name, label, value, onChangeFun, options) => {
  return (
    <TextField
      id={name + "Select"}
      name={name}
      label={label}
      placeholder="Start writing..."
      variant="outlined"
      value={value}
      select
      onChange={onChangeFun}
      fullWidth
      style={textFieldStyle}
      InputProps={{
        style: inputStyle
      }}
      InputLabelProps={{
        style: labelStyle
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value} style={textFieldStyle}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};


const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 200,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export function TransferList() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(["test1", "test2", "test3"]);
  const [right, setRight] = React.useState(["test1"]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
    </Grid>
  );
}
