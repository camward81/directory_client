import React from "react";
import User from "./User";
import { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";

const Directory = ({
  addmember,
  addNew,
  users,
  user,
  pass,
  last,
  first,
  address,
  phone,
  email,
  photo,
  editUser,
  setEditUser,
  editLogIn,
  setEditLogin,
  removeUser,
  setRemoveUser,
  removePass,
  setRemovePass,
  logerror,
  setLogError,
  getUsers,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const myRef = useRef();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    };

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting === false) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }, options);
    observer.observe(myRef.current);
  }, []);

  return (
    <div
      className="directory-container"
      id="directory-container"
      style={addmember ? { opacity: 0.5 } : { opacity: 1 }}
    >
      <div className="add">
        <button type="submit" onClick={addNew}>
          Add New
        </button>
      </div>
      <header ref={myRef}>Welcome to the Directory</header>
      <div className="users-container">
        <div className="users">
          {users
            ? users.map((user) => (
                <User
                  user={user.user}
                  pass={user.pass}
                  last={user.last}
                  first={user.first}
                  address={user.address}
                  phone={user.phone}
                  email={user.email}
                  key={user.id}
                  id={user.id}
                  photo={user.photo}
                  editUser={editUser}
                  setEditUser={setEditUser}
                  editLogin={editLogIn}
                  setEditLogin={setEditLogin}
                  removeUser={removeUser}
                  setRemoveUser={setRemoveUser}
                  removePass={removePass}
                  setRemovePass={setRemovePass}
                  logerror={logerror}
                  setLogError={setLogError}
                  getUsers={getUsers}
                />
              ))
            : ""}
        </div>
        {isVisible ? (
          <a href="#directory-container">
            <FontAwesomeIcon icon={faCircleArrowUp} className="arrow" />
          </a>
        ) : (
          ""
        )}
      </div>
      <footer>
        <p>Developed By Cameron Ward</p>
      </footer>
    </div>
  );
};

export default Directory;
