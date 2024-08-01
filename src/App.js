import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TaskManagementScreen from "./Screens/TaskManagementScreen";
import Login from "./Components/Login/Login";

const App = () => {
  return (
    <Router>
      <Route>
        <Route path="/" exact component={Login} />
        <Route path="/task" exact component={TaskManagementScreen} />
      </Route>
    </Router>
  );
};

export default App;
