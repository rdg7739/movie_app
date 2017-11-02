import React from "react";
import {
  FormGroup,
  Radio,
  ControlLabel,
  HelpBlock,
  FormControl
} from "react-bootstrap";
import "./Movie.css";
import PropTypes from "prop-types";
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
    <div>
      <SelectSort sortType = {sortType} onChange={onChangeSortType} />
      <SelectLimit limit = {limit} onChange={onChangeLimit} />
      <SelectOrderBy orderBy = {orderBy} onChange={onChangeOrderBy} />
      <SelectQuality quality = {quality} onChange={onChangeQuality} />
      <SelectMinRate minRate = {minRate} onChange={onChangeMinRate} />
      <SelectSearch search = {search} onChange={onChangeSearch} />
      <SelectGenre genre = {genre} onChange={onChangeGenre} />
      <SelectRtRating RtRate = {RtRate} onChange={onChangeRtRate} />
    </div>
  );
}
function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}
function SelectSort({sortType, onChange}) {
  return (
    <FormGroup controlId="formControlsSelectSort">
      <ControlLabel sm={12}>Sort By</ControlLabel>
      <FormControl onChange={onChange} value={sortType} componentClass="select" placeholder="Select Sort Method">
        <option value="">Select Sort</option>
        <option value="title">title</option>
        <option value="year">year</option>
        <option value="rating">rating</option>
        <option value="peers">peers</option>
        <option value="seeds">seeds</option>
        <option value="download_count" >download_count</option>
        <option value="like_count">like_count</option>
        <option value="date_added">date_added</option>
      </FormControl>
    </FormGroup>
  );
}
SelectSort.prototype={
  sortType: PropTypes.string.isRequired,
  onChange: PropTypes.object.isRequired
}

function SelectLimit({limit, onChange}) {
  return (
    //limit		Integer between 1 - 50 (inclusive)	20	The limit of results per page that has been set
    <FormGroup controlId="formControlsSetLimit">
      <FieldGroup
        type="text"
        label="Display Limit"
        value={limit}
        onInput = {onChange}
        onChange = {onChange}
        placeholder="Amount of movie to display(1-50)"
      />
    </FormGroup>
  );
}
SelectLimit.prototype={
  sortType: PropTypes.string.isRequired,
  onChange: PropTypes.object.isRequired
}

function SelectOrderBy({orderBy, onChange}) {
  return (
    // order_by		String (desc, asc)	desc	Orders the results by either Ascending or Descending order
    <FormGroup>
      <ControlLabel sm={12}>Order By</ControlLabel>
      <div>
        <Radio name="setOrderBy" onChange={onChange} value="asc" inline >
          Ascending
        </Radio>{" "}
        <Radio name="setOrderBy" onChange={onChange} value="desc" inline>
          Descending
        </Radio>
      </div>
    </FormGroup>
  );
}
SelectOrderBy.prototype={
  sortType: PropTypes.string.isRequired,
  onChange: PropTypes.object.isRequired
}

function SelectQuality({quality, onChange}) {
  return (
    // quality		String (720p, 1080p, 3D)	All	Used to filter by a given quality
    <FormGroup >
      <ControlLabel sm={12}>Video Quality</ControlLabel>
      <div>
        <Radio name="setQuality" onChange={onChange} value="720p" inline >
          720 pixel
        </Radio>{" "}
        <Radio name="setQuality" onChange={onChange} value="1080p" inline>
          1080 pixel
        </Radio>{" "}
        <Radio name="setQuality" onChange={onChange} value="3D" inline>
          3D
        </Radio>
      </div>
    </FormGroup>
  );
}
SelectQuality.prototype={
  sortType: PropTypes.string.isRequired,
  onChange: PropTypes.object.isRequired
}
function SelectMinRate({minRate, onChange}) {
  return (
    // minimum_rating		Integer between 0 - 9 (inclusive)	0	Used to filter movie by a given minimum IMDb rating
    <FormGroup controlId="formControlsSetMinRate">
      <ControlLabel sm={1}>Minimum IMDb Rating</ControlLabel>
      <FormControl componentClass="select" onChange = {onChange} placeholder="Select Min Rate" sm={2}>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
      </FormControl>
    </FormGroup>
  );
}
SelectMinRate.prototype={
  sortType: PropTypes.string.isRequired,
  onChange: PropTypes.object.isRequired
}

function SelectSearch({search, onChange}) {
  return (
    // query_term		String	0	Used for movie search, matching on: Movie Title/IMDb Code, Actor Name/IMDb Code, Director Name/IMDb Code
    <FieldGroup
      id="formControlsSearch"
      type="text"
      label="Search"
      onChange = {onChange}
      onInput = {onChange}
      placeholder="Enter text"
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
    <FieldGroup
      id="formControlsGenre"
      type="text"
      label="Genre"
    onChange = {onChange}
      onInput = {onChange}
      placeholder="Enter Genre"
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
    <FormGroup>
      <ControlLabel sm={12}>Rotten Tomato Rating</ControlLabel>
      <div sm={12}>
        <Radio name="getRtRate" onChange = {onChange} value="true" inline >
          Yes
        </Radio>{" "}
        <Radio name="getRtRate" onChange = {onChange} value="false" inline>
          No
        </Radio>
      </div>
    </FormGroup>
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
  minRate: PropTypes.string.isRequired,
   onChangeMinRate: PropTypes.object.isRequired,
  search: PropTypes.string.isRequired,
   onChangeSearch: PropTypes.object.isRequired,
  genre: PropTypes.string.isRequired,
   onChangeGenre: PropTypes.object.isRequired,
  RtRate: PropTypes.string.isRequired,
   onChangeRtRate: PropTypes.object.isRequired
}