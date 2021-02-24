import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
    };
  }
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };
  onSearch = () => {
    this.props.onSearch(this.state.keyword);
  };
  render() {
    return (
      <div>
        {/* Search */}
        <div className="input-group ">
          <input
            name="keyword"
            type="text"
            className="form-control"
            placeholder="Enter keyword"
            value={this.state.keyword}
            onChange={this.onChange}
          />
          {/* Nếu k có className="input-group-btn", thì button sẽ ở dưới ô input */}
          <span className="input-group-btn">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onSearch}
            >
              <span className="fas fa-plus mr-5"></span>Search
            </button>
          </span>
        </div>
      </div>
    );
  }
}

export default Search;
