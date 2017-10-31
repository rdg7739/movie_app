import React, {Component} from "react";
import {
  FormGroup,
  Radio,
  ControlLabel,
  HelpBlock,
  FormControl
} from "react-bootstrap";
import "./Movie.css";
// create classes
function SideBar() {
  return (
    <div>
      <SelectSort />
      <SelectPage />
      <SelectLimit />
      <SelectOrderBy />
      <SelectQuality />
      <SelectMinRate />
      <SelectSearch />
      <SelectGenre />
      <SelectRtRating />
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
class SelectSort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "download_count"
    };
    this._change = this._change.bind(this);
  }
  _change(event){
    this.setState({value: event.target.value});
  }
  render(){
    return (
      <FormGroup controlId="formControlsSelect">
        <ControlLabel sm={12}>Sort By</ControlLabel>
        <FormControl onChange={this._change} value={this.state.value} componentClass="select" placeholder="select">
          <option value="title">title</option>
          <option value="year">year</option>
          <option value="rating">rating</option>
          <option value="peers">peers</option>
          <option value="seeds">seeds</option>
          <option value="download_count">download_count</option>
          <option value="like_count">like_count</option>
          <option value="date_added">date_added</option>
        </FormControl>
      </FormGroup>
    );
  }
}
function SelectPage() {
  // page		Integer (Unsigned)	1	Used to see the next page of movies, eg limit=15 and page=2 will show you movies 15-30
  return (
    <FormGroup controlId="formControlsSelect">
      <ControlLabel sm={1}>Select Page</ControlLabel>
      <FormControl componentClass="select" placeholder="select" sm={2}>
        <option value="1">1 page</option>
      </FormControl>
    </FormGroup>
  );
}

function SelectLimit() {
  return (
    //limit		Integer between 1 - 50 (inclusive)	20	The limit of results per page that has been set
    <FormGroup controlId="formControlsSelect">
      <ControlLabel sm={1}>Display Limit</ControlLabel>
      <FieldGroup
        type="text"
        label="Text"
        placeholder="Amount of movie to display(1-50)"
      />
    </FormGroup>
  );
}

function SelectOrderBy() {
  return (
    // order_by		String (desc, asc)	desc	Orders the results by either Ascending or Descending order
    <FormGroup>
      <ControlLabel sm={12}>Order By</ControlLabel>
      <div>
        <Radio name="radioGroup" value="asc" inline>
          Ascending
        </Radio>{" "}
        <Radio name="radioGroup" value="desc" inline>
          Descending
        </Radio>
      </div>
    </FormGroup>
  );
}
function SelectQuality() {
  return (
    // quality		String (720p, 1080p, 3D)	All	Used to filter by a given quality
    <FormGroup>
      <ControlLabel sm={12}>Video Quality</ControlLabel>
      <div>
        <Radio name="radioGroup" value="720p" inline>
          720 pixel
        </Radio>{" "}
        <Radio name="radioGroup" value="1080p" inline>
          1080 pixel
        </Radio>{" "}
        <Radio name="radioGroup" value="3D" inline>
          3D
        </Radio>
      </div>
    </FormGroup>
  );
}
function SelectMinRate() {
  return (
    // minimum_rating		Integer between 0 - 9 (inclusive)	0	Used to filter movie by a given minimum IMDb rating
    <FormGroup controlId="formControlsSelect">
      <ControlLabel sm={1}>Minimum IMDb Rating</ControlLabel>
      <FormControl componentClass="select" placeholder="select" sm={2}>
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
function SelectSearch() {
  return (
    // query_term		String	0	Used for movie search, matching on: Movie Title/IMDb Code, Actor Name/IMDb Code, Director Name/IMDb Code
    <FieldGroup
      id="formControlsText"
      type="text"
      label="Search"
      placeholder="Enter text"
    />
  );
}
function SelectGenre() {
  return (
    // genre		String	All	Used to filter by a given genre (See http://www.imdb.com/genre/ for full list)
    <FieldGroup
      id="formControlsText"
      type="text"
      label="Genre"
      placeholder="Enter Genre"
    />
  );
}
function SelectRtRating() {
  return (
    // with_rt_ratings		Boolean     false	Returns the list with the Rotten Tomatoes rating included
    <FormGroup>
      <ControlLabel sm={12}>Rotten Tomato Rating</ControlLabel>
      <div sm={12}>
        <Radio name="radioGroup" value="true" inline>
          Yes
        </Radio>{" "}
        <Radio name="radioGroup" value="false" inline>
          No
        </Radio>
      </div>
    </FormGroup>
  );
}

export default SideBar;
