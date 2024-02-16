import React from "react";
class ProfilePage extends React.Component {
  callAPI = () => {
    const api = "http://127.0.0.1:8000/api/pokemon/all/1";

    // const credentials = {
    //   credentials: {
    //     login: "robb@stark.com",
    //     password: "123456",
    //   },
    // };

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      // body: JSON.stringify(credentials),
    };

    fetch(api, request)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  componentDidMount() {
    this.callAPI();
    return;
  }

  render() {
    return <>ProfilePage</>;
  }
}

export default ProfilePage;
