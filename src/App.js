import React from "react";
import axios from "axios";
import User from "./Components/User";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./Components/User.css"
export default class App extends React.Component {
  state = {
    id: 0,
    first_name:"",
    last_name: "",
    email: "",
    avatar: "",
    errorMsg: "",
    length: 0,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    axios
      .get("https://reqres.in/api/users?page=2")
      .then((data) => {
        console.log(data.data.data);
        this.setState({
          id: 0,
          first_name: data.data.data.first_name,
          last_name: data.data.data.last_name,
          email: data.data.data.email,
          avatar: data.data.data.avatar,
          errorMsg: "",
          length: data.data.data.length,
        });
      })
      .catch((error) =>
        this.setState({
          errorMsg: "Error while loading data. Try again later.",
        })
      )
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const {
      id,
      first_name,
      last_name,
      email,
      avatar,
      isLoading,
      errorMsg,
      length,
    } = this.state;

    const handlePageChange = (page) => {
      console.log(page);
      const fetchUserDetails = async () => {
        this.setState({ isLoading: true });
        axios
          .get(`https://reqres.in/api/users/${page}`)
          .then((data) => {
            console.log(data.data.data);
            this.setState({
              id: data.data.data.id,
              first_name: data.data.data.first_name,
              last_name: data.data.data.last_name,
              email: data.data.data.email,
              avatar: data.data.data.avatar,
              errorMsg: "",
            });
          })
          .catch((error) =>
            this.setState({
              errorMsg: `"Error while loading data. Try again later." ${error}`,
            })
          )
          .finally(() => {
            this.setState({ isLoading: false });
          });
      };
      fetchUserDetails();
    };
    return (
      <div className="main-section">
        {isLoading && <p className="loading">Loading...</p>}
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <User
          id={id}
          first_name={first_name}
          last_name={last_name}
          email={email}
          avatar={avatar}
        />
        <Stack spacing={2}>
          <Pagination
            count={length}
            hidePrevButton
            hideNextButton
            onChange={(e) => handlePageChange(e.target.textContent)}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </div>
    );
  }
}
