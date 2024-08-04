import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TaskManagementScreen from "./Screens/TaskManagementScreen";
import Login from "./Components/Login/Login";
import Lottie from "lottie-react";
import NoInternetJson from "./Assets/NoInternet/NoInternet.json";
import Trail from "./Components/Trail";

const NoInternetMessage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Lottie
        animationData={NoInternetJson}
        loop={true}
        height={200}
        width={200}
      />
      <div className="text-center p-4 text-red-700 font-extrabold font-LoginFont">
        Please connect to the internet.
      </div>
    </div>
  );
};

const DesktopMessage = () => (
  <div className="h-screen flex flex-col justify-center items-center">
    <div className="text-center p-4 text-red-700 font-extrabold font-bitter">
      Please open the site in a desktop-sized screen.
    </div>
  </div>
);

const NotFound = () => (
  <div className="h-screen flex flex-col justify-center items-center">
    <h1 className="text-center text-4xl font-extrabold">
      404 - Page Not Found
    </h1>
  </div>
);

const App = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1220);
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1220);
    };

    const handleOnlineStatusChange = () => {
      setIsOnline(window.navigator.onLine);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    // Cleanup the event listeners when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);
  return (
    <Router>
      {!isOnline ? (
        <NoInternetMessage />
      ) : isDesktop ? (
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/task" exact component={TaskManagementScreen} />
          <Route path="/1" exact component={Trail} />
          <Route component={NotFound} />
        </Switch>
      ) : (
        <DesktopMessage />
      )}
    </Router>
  );
};

export default App;
