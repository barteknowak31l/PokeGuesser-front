import React from "react";

import Header from "./Header";
import Generations from "./Generations";
import Page from "./Page";
import Settings from "./Settings";

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div className="flex basis-auto items-center justify-center items-stretch">
          <div className="basis-1/4 bg-gray-800 mr-2">
            <Generations />
          </div>
          <div className="basis-2/4 bg-green-800 mr-2">
            <Page />
          </div>
          <div className="basis-1/4 bg-purple-900">
            <Settings />
          </div>
        </div>
        <div className="bg-black mt-1">Footer</div>
      </>
    );
  }
}

export default App;
