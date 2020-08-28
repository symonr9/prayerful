/***********************************************************************
 * File Name: Browse.js
 * Description: Browse page. Component to browse prayers. Utilizes 
 * abstracted ItemCard and SortFilterBar components shared with the 
 * Prose and Quotes components.
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

/* Library Imports ****************************************************/
import React, { useEffect, useState } from "react";

import { Grow, Grid, CircularProgress } from "@material-ui/core";
/**********************************************************************/

/* Project Imports ****************************************************/
import { getData } from "../../services/api";
import { useCommonStyles } from "../../assets/common";
import { getServerURL } from "../../config/config";

import ItemCard from '../../components/ItemCard';
import SortFilterBar from '../../components/SortFilterBar';
import CoolPagination from '../../components/CoolPagination';

import { useStyles } from "./exports";
/**********************************************************************/


/**********************************************************************
 * Function Name: Browse
 * Parameters: None
 * Description: Component for the Browse section.
 * Notes: None
 **********************************************************************/
function Browse() {
  const classes = useStyles();
  const common = useCommonStyles();

  //Data type for these hooks are arrays.
  const [prayers, setPrayers] = useState(null);

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
    getData(getServerURL("prayers"), response => {
      if (isSubscribed) {
        const items = response.sort(() => {
          return 0.5 - Math.random();
        });
        setPrayers(items);
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
  const [sortTitle, setSortTitle] = useState(false);
  const [sortAuthor, setSortAuthor] = useState(false);
  const [sortDate, setSortDate] = useState(true);
  const [sortRandom, setSortRandom] = useState(false);

  const [sortDescTitle, setSortDescTitle] = useState(true);
  const [sortDescAuthor, setSortDescAuthor] = useState(true);
  const [sortDescDate, setSortDescDate] = useState(true);

  const [isFullText, setIsFullText] = useState(false);

  const [searchChange, setSearchChange] = useState("");

  //Runs whenever the second parameter hook is changed.
  //If the setter is passed into a child component and called, 
  //the useEffect() will still run.
  useEffect(() => {
    if(prayers != null){
      setPrayers(prayers.sort((a,b) => {
        let aItem = a.title.toUpperCase();
        let bItem = b.title.toUpperCase();

        let isDesc = sortDescTitle;
        setSortDescTitle(!sortDescTitle);
        if(isDesc){
          return (aItem > bItem) ? -1 : (aItem < bItem) ? 1 : 0;
        }
        return (aItem < bItem) ? -1 : (aItem > bItem) ? 1 : 0;
      }));
    }
  }, [sortTitle]);

  useEffect(() => {
    if(prayers != null){
      setPrayers(prayers.sort((a,b) => {
        let aItem = a.createdBy.toUpperCase();
        let bItem = b.createdBy.toUpperCase();

        let isDesc = sortDescAuthor;
        setSortDescAuthor(!sortDescAuthor);
        if(isDesc){
          return (aItem > bItem) ? -1 : (aItem < bItem) ? 1 : 0;
        }
        return (aItem < bItem) ? -1 : (aItem > bItem) ? 1 : 0;
      }));
    }
  }, [sortAuthor]);

  useEffect(() => {
    if(prayers != null){
      setPrayers(prayers.sort((a,b) => {
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
    if(prayers != null){
      setPrayers(prayers.sort(() => {
        return 0.5 - Math.random();
      }));
    }
  }, [sortRandom]);

  useEffect(() => {
    if(prayers != null){
      if(searchChange !== ""){  
        setPrayers(prayers.filter(item => item.title == searchChange));
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
      
      if(numOfItemsPerPage === prayers.length){
        setCurrentPage(prayers.slice(0, prayers.length));
        return;
      }
      setCurrentPage(prayers.slice(startIndex, startIndex + numOfItemsPerPage));
    }
  }, [page, sortTitle, sortAuthor, sortDate, sortRandom, searchChange, prayers, numOfItemsPerPage]);

  useEffect(() => {
    if(prayers !== null){
      setNumOfPages(Math.ceil(prayers.length / numOfItemsPerPage));
    }
  }, [numOfItemsPerPage]);
  /**********************************************************************/

  const body = (
    <Grid container>
      <Grid item xs={12}>
        <div className={common.spacingTop}></div>
        <h1 className={common.pageHeader}>Browse</h1>
        <SortFilterBar
          type={"prayers"} 
          items={prayers}
          isSortMenuOpen={isSortMenuOpen}
          setIsSortMenuOpen={setIsSortMenuOpen}
          sortTitle={sortTitle}
          setSortTitle={setSortTitle}
          sortAuthor={sortAuthor}
          setSortAuthor={setSortAuthor}
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
          type={"prayers"}
          location={"top"}
          items={prayers}
          page={page}
          setPage={setPage}
          setStartIndex={setStartIndex}
          numOfPages={numOfPages}
          numOfItemsPerPage={numOfItemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isMobileView={isMobileView}
        />
        <div className={common.containerDiv}>
          {(currentPage &&
            currentPage.map((prayer, index) => {
              if (prayer.isPublic) {
                return (
                  <ItemCard 
                    type={"prayers"}
                    key={prayer._id}
                    isMobileView={isMobileView}
                    link={`/prayers/${prayer.urlId}`}
                    title={prayer.title}
                    createdBy={prayer.createdBy}
                    body={(!isFullText && prayer.body.substring(0,200) + '...')
                    || (isFullText && prayer.text)}
                    createdAt={prayer.createdAt}
                  />
                );
              }
            })) ||
            (!prayers && (
              <div>
                <CircularProgress />
              </div>
            ))}
            <CoolPagination 
              type={"prayers"}
              location={"bottom"}
              items={prayers}
              page={page}
              setPage={setPage}
              setStartIndex={setStartIndex}
              numOfPages={numOfPages}
              numOfItemsPerPage={numOfItemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              isMobileView={isMobileView}
            />
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

export default Browse;
