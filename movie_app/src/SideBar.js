import React from "react";
import "./Movie.css";
import PropTypes from "prop-types";
import {Col} from "react-bootstrap";
import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

const genres=['Action', 'Adventure', 'Animation', 'Biography', 
'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'Film-Noir', 
'Game-Show', 'History', 'Horror', 'Music', 'Musical', 'Mystery', 
'News', 'Reality-TV', 'Romance', 'Sci-Fi', 'Sitcom', 'Sport', 
'Talk-Show', 'Thriller', 'War', 'Western'];

// create classes
function SideBar({
  sortType, onChangeSortType,
  limit, onChangeLimit,
  orderBy, onChangeOrderBy,
  quality, onChangeQuality,
  minRate, onChangeMinRate,
  search, onChangeSearch,
  genre, onChangeGenre,
  RtRate, onChangeRtRate
}) {
  return (
    <Col xs={12}>
      <SelectOrderBy orderBy = {orderBy} onChange={onChangeOrderBy} />
      <SelectSort sortType = {sortType} onChange={onChangeSortType} />
      <SelectSearch search = {search} onChange={onChangeSearch} />
      <SelectGenre genre = {genre} onChange={onChangeGenre} />
      <SelectLimit limit = {limit} onChange={onChangeLimit} />
      {/* <SelectQuality quality = {quality} onChange={onChangeQuality} /> */}
      <SelectMinRate minRate = {minRate} onChange={onChangeMinRate} />
      {/* <SelectRtRating RtRate = {RtRate} onChange={onChangeRtRate} /> */}
    </Col>
  );
}

function SelectSort({sortType, onChange}) {
  return (
    <SelectField
      value={sortType}
      floatingLabelText="Sort By"
      onChange={onChange}>
      <MenuItem value="" primaryText="" />
      <MenuItem value="title" primaryText="title" />
      <MenuItem value="year" primaryText="year" />
      <MenuItem value="rating" primaryText="rating" />
      <MenuItem value="peers" primaryText="peers" />
      <MenuItem value="seeds" primaryText="seeds" />
      <MenuItem value="download_count" primaryText="download_count" />
      <MenuItem value="like_count" primaryText="like_count" />
      <MenuItem value="date_added" primaryText="date_added" />
    </SelectField>
  );
}
SelectSort.prototype={
  sortType: PropTypes.string.isRequired,
  onChange: PropTypes.object.isRequired
}

var limitList = [];
for (let j = 1; j < 51; j++ ) {
  limitList.push(<MenuItem value={j} key={j} primaryText={`${j} items`} />);
}
function SelectLimit({limit, onChange}) {
  return (
    //limit		Integer between 1 - 50 (inclusive)	20	The limit of results per page that has been set
    <SelectField
      floatingLabelText="Number of Movies"
      value={limit}
      onChange={onChange}>
      {limitList}
    </SelectField>
  );
}
SelectLimit.prototype={
  sortType: PropTypes.string.isRequired,
  onChange: PropTypes.object.isRequired
}

function SelectOrderBy({orderBy, onChange}) {
  return (
    // order_by		String (desc, asc)	desc	Orders the results by either Ascending or Descending order
    <SelectField
      floatingLabelText="Asc or Desc?"
      value={orderBy}
      onChange={onChange}>
      <MenuItem value="" primaryText="" />
      <MenuItem value="asc"primaryText="Ascending" />
      <MenuItem value="desc" primaryText="descending" />
    </SelectField>
  );
}
SelectOrderBy.prototype={
  sortType: PropTypes.string.isRequired,
  onChange: PropTypes.object.isRequired
}

function SelectQuality({quality, onChange}) {
  return (
    // quality		String (720p, 1080p, 3D)	All	Used to filter by a given quality
    <SelectField
      floatingLabelText="Video Quality"
      value={quality}
      onChange={onChange}>
      <MenuItem value="" primaryText="" />
      <MenuItem value="720p"primaryText="720 pixel" />
      <MenuItem value="1080p" primaryText="1080 pixel" />
      <MenuItem value="3D" primaryText="3D" />
    </SelectField>
  );
}
SelectQuality.prototype={
  sortType: PropTypes.string.isRequired,
  onChange: PropTypes.object.isRequired
}
var minRateList = [];
for (let j = 1; j < 6; j++ ) {
  minRateList.push(<MenuItem value={j*2} key={j} primaryText={`${j}`} />);
}
function SelectMinRate({minRate, onChange}) {
  return (
    <SelectField
      floatingLabelText="Select Min Rating"
      value={minRate}
      onChange={onChange}>
      {minRateList}
    </SelectField>
  );
}
SelectMinRate.prototype={
  sortType: PropTypes.string.isRequired,
  onChange: PropTypes.object.isRequired
}

function SelectSearch({search, onChange}) {
  return (
    // query_term		String	0	Used for movie search, matching on: Movie Title/IMDb Code, Actor Name/IMDb Code, Director Name/IMDb Code
    <TextField
      hintText="Titanic..."
      floatingLabelText="Title Search"
      onChange = {onChange}
    />
  );
}
SelectSearch.prototype={
  sortType: PropTypes.string.isRequired,
  onChange: PropTypes.object.isRequired
}
function SelectGenre({genre, onChange}) {
  return (
    // genre		String	All	Used to filter by a given genre (See http://www.imdb.com/genre/ for full list)
    <AutoComplete
      floatingLabelText="Search by genre"
      filter={AutoComplete.fuzzyFilter}
      searchText={genre}
      openOnFocus={true}
      dataSource={genres}
      onNewRequest = {onChange}
    />
  );
}
SelectGenre.prototype={
  sortType: PropTypes.string.isRequired,
  onChange: PropTypes.object.isRequired
}
function SelectRtRating({rtRating, onChange}) {
  return (
    // with_rt_ratings		Boolean     false	Returns the list with the Rotten Tomatoes rating included
    <SelectField
      floatingLabelText="Rotten Tomato Rating?"
      value={rtRating}
      onChange={onChange}>
      <MenuItem value="" primaryText="" />
      <MenuItem value="true" primaryText="Yes" />
      <MenuItem value="false" primaryText="No" />
    </SelectField>
  );
}
SelectRtRating.prototype={
  sortType: PropTypes.string.isRequired,
  onChange: PropTypes.object.isRequired
}

export default SideBar;

SideBar.propTyps={
  sortType: PropTypes.string.isRequired,
   onChangeSortType: PropTypes.object.isRequired,
  limit: PropTypes.number.isRequired,
   onChangeLimit: PropTypes.object.isRequired,
  orderBy: PropTypes.string.isRequired,
   onChangeOrderBy: PropTypes.object.isRequired,
  quality: PropTypes.string.isRequired,
   onChangeQuality: PropTypes.object.isRequired,
  minRate: PropTypes.number.isRequired,
   onChangeMinRate: PropTypes.object.isRequired,
  search: PropTypes.string.isRequired,
   onChangeSearch: PropTypes.object.isRequired,
  genre: PropTypes.string.isRequired,
   onChangeGenre: PropTypes.object.isRequired,
  RtRate: PropTypes.string.isRequired,
   onChangeRtRate: PropTypes.object.isRequired
}