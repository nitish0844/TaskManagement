import React, { useEffect, useState } from "react";
import { auth } from "../Database/Firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { MdOutlineAddCircle } from "react-icons/md";
import AddTaskModal from "../Task Management/AddTaskModal";

const NavBar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const history = useHistory();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // Add a listener to check the authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // If the user is not authenticated, redirect to the login page
        history.push("/");
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [history]);

  return (
    <div className="flex justify-between p-10 items-center">
      <h1 className="text-4xl font-bitter font-bold">Task Management</h1>
      <div className="flex gap-5">
        <button onClick={() => setModalIsOpen(true)}>
          <MdOutlineAddCircle className="text-4xl" />
        </button>
        <button onClick={handleLogout}>
          <TbLogout className="text-4xl" />
        </button>
      </div>
      <AddTaskModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      />
    </div>
  );
};

export default NavBar;
