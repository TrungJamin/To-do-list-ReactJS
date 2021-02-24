import React, { Component } from "react";

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      status: false,
    };
  }
  // Mỗi lần component TaskForm đc nhúng vào trong file App, hay nói cách khác là "xuất hiện" thì
  // componentDidMount đc gọi.
  componentDidMount() {
    console.log("componentDidMount-Form");
    if (this.props.taskEditing) {
      this.setState({
        id: this.props.taskEditing.id,
        name: this.props.taskEditing.name,
        status: this.props.taskEditing.status,
      });
    }
  }
  // Hàm *UNSAFE_componentWillReceiveProps* chỉ được gọi khi bản thân nó đã đc xuất hiện và sau đó
  // *có sự kiện* khiến cho dữ liệu truyền mà  props nhận vào bị thay đổi
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log("Receive props!");
    if (nextProps && nextProps.taskEditing) {
      // Cho trường hợp đang hiện form Update và click vào list update khác
      this.setState({
        id: nextProps.taskEditing.id,
        name: nextProps.taskEditing.name,
        status: nextProps.taskEditing.status,
      });
    } else if (!nextProps.taskEditing) {
      // Nếu taskEditing không tồn tại
      // Cho trường hợp đang hiện *form update* thì nhấn vào *Add to-do list* button thì form chuyển sang *form add*
      this.setState({
        id: "",
        name: "",
        status: true,
      });
    }
  }
  onCloseForm = () => {
    this.props.onCloseForm();
  };
  onHandleChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: name === "status" ? (value === "true" ? true : false) : value,
    });
  };
  onClear = () => {
    this.setState({
      name: "",
      status: false,
    });
    this.onCloseForm();
  };
  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmitForm(this.state);
    // Clear and Close Form
    this.onClear();
    this.onCloseForm();
    console.log(this.state);
  };

  render() {
    var { id } = this.state;
    return (
      <div>
        {/* Form */}
        <div className="panel panel-warning">
          <div className="panel-heading">
            <h3 className="panel-title">
              {id === "" ? "Add to-do list" : "Update to-do list"}
              <span
                className="far fa-times-circle text-right"
                onClick={this.onCloseForm}
              />
            </h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>To-Do's name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Input field"
                  onChange={this.onHandleChange}
                  value={this.state.name}
                />
              </div>
              <label>Status</label>

              <select
                name="status"
                className="form-control"
                value={this.state.status}
                onChange={this.onHandleChange}
                required="required"
              >
                <option value={true}>Active</option>
                <option value={false}>Hide</option>
              </select>
              <br />

              <div className="text-center">
                <button type="submit" className="btn btn-warning">
                  <span className="fas fa-plus mr-5"></span>
                  Save
                </button>
                &nbsp;
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.onClear}
                >
                  <span className="far fa-times-circle mr-5"></span>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskForm;
