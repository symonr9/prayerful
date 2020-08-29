/***********************************************************************
 * File Name: Groups.js
 * Description: Groups page. Component to browse groups. Utilizes 
 * abstracted ItemCard and SortFilterBar components shared with the 
 * Prose and Quotes components.
 * LeaderName: Symon Ramos symonr12@gmail.com
 **********************************************************************/

/* Library Imports ****************************************************/
import React, { useEffect, useState } from "react";

import { Grow, Grid, CircularProgress } from "@material-ui/core";
/**********************************************************************/

/* Project Imports ****************************************************/
import { getData } from "../../services/api";
import { useCommonStyles } from "../../assets/common";
import { getServerURL } from "../../config/config";

import GroupCard from '../../components/GroupCard';
import SortFilterBar from '../../components/SortFilterBar';
import CoolPagination from '../../components/CoolPagination';

import { useStyles } from "./exports";
/**********************************************************************/


/**********************************************************************
 * Function Name: Groups
 * Parameters: None
 * Description: Component for the Groups section.
 * Notes: None
 **********************************************************************/
function Groups() {
  const classes = useStyles();
  const common = useCommonStyles();

  //Data type for these hooks are arrays.
  const [groups, setGroups] = useState(null);

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
    getData(getServerURL("groups"), response => {
      if (isSubscribed) {
        const items = response.sort(() => {
          return 0.5 - Math.random();
        });
        setGroups(items);
        setCurrentPage(items.slice(0, numOfItemsPerPage));
        setNumOfPages(Math.ceil(items.length / numOfItemsPerPage));
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


  //SORT FILTER BAR EFFECTS **************************************
  //These hooks are passed into the SortFilterBar component and used
  //there. They have to be defined in the parent component in order to 
  //perform operations on the parent component data hooks to render 
  //other parts of the page.
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [sortName, setSortName] = useState(false);
  const [sortLeaderName, setSortLeaderName] = useState(false);
  const [sortDate, setSortDate] = useState(true);
  const [sortRandom, setSortRandom] = useState(false);

  const [sortDescTitle, setSortDescTitle] = useState(true);
  const [sortDescLeaderName, setSortDescLeaderName] = useState(true);
  const [sortDescDate, setSortDescDate] = useState(true);

  const [isFullText, setIsFullText] = useState(false);

  const [searchChange, setSearchChange] = useState("");

  //Runs whenever the second parameter hook is changed.
  //If the setter is passed into a child component and called, 
  //the useEffect() will still run.
  useEffect(() => {
    if(groups != null){
      setGroups(groups.sort((a,b) => {
        let aItem = a.name.toUpperCase();
        let bItem = b.name.toUpperCase();

        let isDesc = sortDescTitle;
        setSortDescTitle(!sortDescTitle);
        if(isDesc){
          return (aItem > bItem) ? -1 : (aItem < bItem) ? 1 : 0;
        }
        return (aItem < bItem) ? -1 : (aItem > bItem) ? 1 : 0;
      }));
    }
  }, [sortName]);

  useEffect(() => {
    if(groups != null){
      setGroups(groups.sort((a,b) => {
        let aItem = a.leaderName.toUpperCase();
        let bItem = b.leaderName.toUpperCase();

        let isDesc = sortDescLeaderName;
        setSortDescLeaderName(!sortDescLeaderName);
        if(isDesc){
          return (aItem > bItem) ? -1 : (aItem < bItem) ? 1 : 0;
        }
        return (aItem < bItem) ? -1 : (aItem > bItem) ? 1 : 0;
      }));
    }
  }, [sortLeaderName]);

  useEffect(() => {
    if(groups != null){
      setGroups(groups.sort((a,b) => {
        let aItem = new Date(a.createdAt).getTime();
        let bItem = new Date(b.createdAt).getTime();

        let isDesc = sortDescDate;
        setSortDescDate(!sortDescDate);
        
        if(isDesc){
          return (aItem > bItem) ? -1 : (aItem < bItem) ? 1 : 0;
        }
        return (aItem < bItem) ? -1 : (aItem > bItem) ? 1 : 0;
      }));
    }
  }, [sortDate]);

  useEffect(() => {
    if(groups != null){
      setGroups(groups.sort(() => {
        return 0.5 - Math.random();
      }));
    }
  }, [sortRandom]);

  useEffect(() => {
    if(groups != null){
      if(searchChange !== ""){  
        setGroups(groups.filter(item => item.name == searchChange));
      }
    }
  }, [searchChange]);
  


  /* PAGINATION *********************************************************/
  const [page, setPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [numOfPages, setNumOfPages] = useState(1);
  const [numOfItemsPerPage, setNumOfItemsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(null);

  //Executes whenever page changes.
  useEffect(() => {
    if(currentPage !== null){
      
      if(numOfItemsPerPage === groups.length){
        setCurrentPage(groups.slice(0, groups.length));
        return;
      }
      setCurrentPage(groups.slice(startIndex, startIndex + numOfItemsPerPage));
    }
  }, [page, sortName, sortLeaderName, sortDate, sortRandom, searchChange, groups, numOfItemsPerPage]);

  useEffect(() => {
    if(groups !== null){
      setNumOfPages(Math.ceil(groups.length / numOfItemsPerPage));
    }
  }, [numOfItemsPerPage]);
  /**********************************************************************/


  const body = (
    <Grid container>
      <Grid item xs={12}>
        <div className={common.spacingTop}></div>
        <h1 className={common.pageHeader}>Groups</h1>
        <SortFilterBar
          type={"groups"} 
          items={groups}
          isSortMenuOpen={isSortMenuOpen}
          setIsSortMenuOpen={setIsSortMenuOpen}
          sortTitle={sortName}
          setSortTitle={setSortName}
          sortAuthor={sortLeaderName}
          setSortAuthor={setSortLeaderName}
          sortDate={sortDate}
          setSortDate={setSortDate}
          sortRandom={sortRandom}
          setSortRandom={setSortRandom}
          isFullText={isFullText}
          setIsFullText={setIsFullText}
          searchChange={searchChange}
          setSearchChange={setSearchChange}
          numOfItemsPerPage={numOfItemsPerPage}
          setNumOfItemsPerPage={setNumOfItemsPerPage}
          isMobileView={isMobileView}
        />
        <CoolPagination 
          type={"groups"}
          location={"top"}
          items={groups}
          page={page}
          setPage={setPage}
          setStartIndex={setStartIndex}
          numOfPages={numOfPages}
          numOfItemsPerPage={numOfItemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isMobileView={isMobileView}
        />
        <div className={classes.containerDiv}>
          {(currentPage &&
            currentPage.map((group, index) => {
              //if (group.isPublic) {
                return (
                  <GroupCard 
                    key={group._id}
                    isMobileView={isMobileView}
                    link={`/groups/${group.urlId}`}
                    name={group.name}
                    leaderName={group.leaderName}
                    about={group.about}
                    leaderName={group.leaderName}
                    image={group.image}
                    createdAt={group.createdAt}
                  />
                );
              //}
            })) ||
            (!groups && (
              <div>
                <CircularProgress />
              </div>
            ))}
        </div>
      </Grid>
    </Grid>
  );
  
  return (
    <Grow in={true}>
      {<div className={!isMobileView ? common.bodyDiv : common.mobileBodyDiv}>{body}</div>}
    </Grow>
  );
}

export default Groups;
