import { Component } from "react";
let { postData } = require("../util/http");

function List(props) {
  return (
    <div>
      <p>Total : {props.items.length} record(s)</p>
      <table align="center">
        <thead>
          <tr>
            <th>No</th>
            <th>Start</th>
            <th>End</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.items.map((item, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{item.start}</td>
              <td>{item.end}</td>
              <td align="left">{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NotificationResult(props) {
  if (props.isSuccess === null) {
    return "";
  } else {
    return props.isSuccess ? (
      <span style={{ color: "green" }}>Successfully inserted new record!</span>
    ) : (
      <span style={{ color: "red" }}>Mandatory fields are required!</span>
    );
  }
}

class Timelogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: "",
      end: "",
      description: "",
      isSuccess: null,
      listTimeLogs: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/timelogs")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          listTimeLogs: data,
        });
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (
      this.state.start === "" ||
      this.state.end === "" ||
      this.state.description === ""
    ) {
      this.setState({
        isSuccess: false,
      });
      return;
    }

    postData("http://localhost:3001/timelogs", {
      start: this.state.start,
      end: this.state.end,
      description: this.state.description,
    }).then((resultdatapost) => {
      fetch("http://localhost:3001/timelogs")
        .then((resultdataget) => resultdataget.json())
        .then((data) => {
          this.setState({
            listTimeLogs: data,
            isSuccess: true,
            start: "",
            end: "",
            description: "",
          });
        });
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <NotificationResult isSuccess={this.state.isSuccess} />
        <br />
        <br />
        <form onSubmit={this.handleSubmit}>
          Start :{" "}
          <input
            type="datetime-local"
            value={this.state.start}
            onChange={this.handleChange}
            name="start"
          />
          &nbsp; End :{" "}
          <input
            type="datetime-local"
            value={this.state.end}
            onChange={this.handleChange}
            name="end"
          />
          &nbsp; Description :{" "}
          <input
            type="textarea"
            value={this.state.description}
            name="description"
            onChange={this.handleChange}
          />
          &nbsp;
          <button>add</button>
        </form>
        <br />
        <br />
        <b>Your Time Logs</b>
        <br />
        <br />

        <List items={this.state.listTimeLogs} />
      </div>
    );
  }
}

export default Timelogs;
