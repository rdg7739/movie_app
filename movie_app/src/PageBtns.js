import React from "react";
import PropTypes from "prop-types";
import FlatButton from 'material-ui/FlatButton';
function PageBtns({totalMovies, currPage, onclick}) {
    var rows = [];
    var displayNum = 3;
    var start = 1, end = currPage + displayNum-1;
    var pageList = [];
    for (let j = 1; j < 11; j++ ) {
      pageList.push({j});
    }
    if(currPage > displayNum){
        start = currPage - displayNum;
    }
    if(end > totalMovies){
        end = totalMovies;
    }
    else if(end < displayNum*2){
        end = displayNum*2;
    }
    let styles = {
        pageButton: {
          cursor: 'pointer',
          width: 40,
          minWidth: 40,
        }
      };
    //console.log("currPage: " + currPage + " start: "+start+" end: "+ end)
    for (var i= start; i <= end; i++) {
        let page = i;
        if(page===currPage){
            rows.push(<FlatButton style={styles.pageButton} label={page} primary={true} disabled={true} onClick={()=>onclick({page})} key={page}/>);
        }
        else{
            rows.push(<FlatButton style={styles.pageButton} label={page} primary={true} onClick={()=>onclick({page})} key={page}/>);
        }
    }
    // page		Integer (Unsigned)	1	Used to see the next page of movies, eg limit=15 and page=2 will show you movies 15-30
    return (<div>{rows}</div>);
}
PageBtns.prototype={
    totalMovies: PropTypes.number.isRequired,
    currPage: PropTypes.number.isRequired,
    onclick: PropTypes.object.isRequired
}
export default PageBtns;