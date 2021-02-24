import React, { Component } from "react";

class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: {
        by: "",
        status: -1,
      },
    };
  }
  onSort = (name, value) => {
    console.log(name, " - ", value);
    var sort = {
      by: name,
      status: value,
    };
    this.props.onSort(sort);
    this.setState({
      sort: {
        by: name,
        status: value,
      },
    });
  };

  render() {
    var { sort } = this.state;
    return (
      <div>
        {/* Sort */}

        <div className="dropdown">
          <button
            type="button"
            className="btn btn-primary dropdown-toggle"
            id="dropdownMenu1"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
          >
            Sort<span className="far fa-caret-square-down ml-5"></span>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li onClick={() => this.onSort("name", 1)}>
              <a role="button">
                <span className="fas fa-sort-alpha-up pr-5"></span>Name A-Z
                {sort.by === "name" && sort.status === 1 ? (
                  <span className="fas fa-check ml-5"></span>
                ) : (
                  ""
                )}
              </a>
            </li>
            <li onClick={() => this.onSort("name", -1)}>
              <a role="button">
                <span className="fas fa-sort-alpha-down pr-5"></span>
                Name Z-A
                {sort.by === "name" && sort.status === -1 ? (
                  <span className="fas fa-check ml-5"></span>
                ) : (
                  ""
                )}
              </a>
            </li>
            <li role="separator" className="divider"></li>
            <li onClick={() => this.onSort("status", 1)}>
              <a role="button">
                Active Status
                {sort.by === "status" && sort.status === 1 ? (
                  <span className="fas fa-check ml-5"></span>
                ) : (
                  ""
                )}
              </a>
            </li>
            <li onClick={() => this.onSort("status", -1)}>
              <a role="button">
                Hiding Status
                {sort.by === "status" && sort.status === -1 ? (
                  <span className="fas fa-check ml-5"></span>
                ) : (
                  ""
                )}
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sort;
