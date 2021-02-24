import React, { Component } from "react";
import "./App.css";
import TaskForm from "./component/TaskForm";
import Control from "./component/Control";
import TaskList from "./component/TaskList";
import { findIndex, filter } from "lodash";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: "",
        status: -1,
      },
      keyword: "",
      sort: {
        by: "",
        status: 1,
      },
    };
  }
  componentDidMount() {
    // Kiểm tra localStorage có tồn tại hay không và nếu có thì nó có lấy được item task hay không
    if (localStorage && localStorage.getItem("tasks")) {
      var tasks = JSON.parse(localStorage.getItem("tasks"));
      // Lấy về parse xong đưa lại vào this.state.tasks
      this.setState({
        tasks: tasks,
      });
    }
    console.log("Component Did Mount");
  }
  /*  onGenerateData = () => {
    var tasks = [
      {
        id: this.generateId(),
        name: "Learn Programming",
        status: true,
      },
      {
        id: this.generateId(),
        name: "Go swimming",
        status: true,
      },
      {
        id: this.generateId(),
        name: "Playing",
        status: false,
      },
    ];
    this.setState({ tasks: tasks });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(tasks);
  }; */
  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  generateId() {
    return (
      this.s4() +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      this.s4() +
      this.s4()
    );
  }
  // For Form
  onToggleForm = () => {
    if (this.state.isDisplayForm && this.state.taskEditing !== null) {
      this.setState({
        taskEditing: null,
      });
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing: null,
      });
    }
  };

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
      taskEditing: null,
    });
  };
  onShowForm = () => {
    this.setState({
      isDisplayForm: true,
    });
  };
  onSubmitForm = (data) => {
    var { tasks } = this.state; // tasks = this.state.tasks;
    if (data.id === "") {
      data.id = this.generateId();
      tasks.push(data);
    } else {
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }
    this.setState({ tasks: tasks });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  // For TaskList and Task Item
  onUpdateStatus = (id) => {
    var { tasks } = this.state;
    var index = findIndex(id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
    }
    this.setState({
      tasks: tasks,
    });

    // Phải cập nhật cho local storage sau khi setState
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  onDelete = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.onCloseForm();
    }
    this.setState({
      tasks: tasks,
    });

    // Phải cập nhật cho local storage sau khi setState
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  onUpdate = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    var taskEditing = tasks[index];
    this.setState({
      // taskEditing: tasks[index]; // error ?
      taskEditing: taskEditing,
    });
    this.onShowForm();
  };
  findIndex = (id) => {
    var { tasks } = this.state;
    let result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  };

  onFilter = (filterName, filterStatus) => {
    console.log(filterName, " - ", filterStatus);
    // dùng parseInt  vì giá trị status khi truyền vào là String k phải number
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus,
      },
    });
  };

  onSearch = (keyword) => {
    this.setState({
      keyword: keyword,
    });
  };

  onSort = (sort) => {
    this.setState({
      sort: {
        by: sort.by,
        status: sort.status,
      },
    });
  };
  render() {
    var { tasks, isDisplayForm, filter, keyword, sort } = this.state; // var tasks = this.state.tasks
    console.log(sort);
    // FILTER
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }

      tasks = tasks.filter((task) => {
        if (filter.status === -1) {
          return true;
        }
        return task.status === (filter.status === 1 ? true : false);
      });
    }
    // SEARCH
    if (keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      });
    }

    // SORT
    if (sort.by) {
      if (sort.by === "name") {
        tasks.sort((a, b) => {
          if (a.name > b.name) {
            return -sort.status;
          }
          if (a.name < b.name) {
            return sort.status;
          }
          return 0;
        });
      } else {
        tasks.sort((a, b) => {
          if (a.status > b.status) {
            return -sort.status;
          }
          if (a.status < b.status) {
            return sort.status;
          }
          return 0;
        });
      }
    }

    var elmTaskFrom = isDisplayForm ? (
      <TaskForm
        onSubmitForm={this.onSubmitForm}
        onCloseForm={this.onCloseForm}
        taskEditing={this.state.taskEditing}
      />
    ) : (
      ""
    );
    return (
      <div className="container">
        <div className="text-center">
          <h1>Work Management</h1>
        </div>
        <div className="row">
          {/* Form */}
          <div
            className={
              isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""
            }
          >
            {elmTaskFrom}
          </div>

          <div
            // Tại sao this.isDisplayForm lại khác với isDisplayForm trong className => Tại vì this.isDisplayForm = undefined :)
            className={
              isDisplayForm
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onToggleForm}
            >
              <span className="fas fa-plus mr-5"></span>Add to-do list
            </button>
            {/*  <button
              type="button"
              className="btn btn-danger ml-5 "
              onClick={this.onGenerateData}
            >
              Generate data
            </button> */}

            {/* Control: Search - sort */}
            <div className="row mt-15">
              <Control onSearch={this.onSearch} onSort={this.onSort} />
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                {/* Data Table of to-do list */}
                <TaskList
                  tasks={tasks}
                  onUpdateStatus={this.onUpdateStatus}
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
                  onFilter={this.onFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
