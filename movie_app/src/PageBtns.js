import React from "react";
import {
  Button
} from "react-bootstrap";
import PropTypes from "prop-types";

function PageBtns({totalMovies, currPage, onclick}) {
    const totalPage = Math.ceil(totalMovies/20);
    var rows = [];
    for (var i=1; i <= totalPage; i++) {
        let page= i;
        rows.push( <Button bsSize="small" onClick={()=>onclick({page})} key={i}>{i}</Button>);
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