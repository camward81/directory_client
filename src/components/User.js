import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import bcrypt from "bcryptjs";

const User = ({
  user,
  setUser,
  pass,
  setPass,
  last,
  setLast,
  first,
  setFirst,
  address,
  setAddress,
  phone,
  setPhone,
  email,
  setEmail,
  id,
  closeWindow,
  photo,
  setPhoto,
  editUser,
  setEditUser,
  upload,
  uploadPercentage,
  addUserErr,
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
  //remove from DB
  const removeFromDB = async ({ id }) => {
    const compare = await bcrypt.compare(removePass, pass);
    if (removeUser === user && compare === true) {
      try {
        await axios
          .delete(`https://cam-directory.herokuapp.com/delete/${id}`)
          .then(() => {
            alert("Entry successfully removed.");
            setLogError(false);
            window.location.reload();
          });
      } catch (error) {
        if (error) {
          console.log(error);
        }
      }
    } else {
      setLogError(true);
    }
  };

  //toggle editUser
  const closeEdit = (e) => {
    e.preventDefault();
    setEditUser("");
    setLogError(false);
  };

  return (
    <div className="user" id={id}>
      <div className="user-container" onClick={() => setEditUser(id)}>
        {photo ? (
          <img height="120" width="120" src={photo} alt="" />
        ) : (
          <div className="photo-default">
            <FontAwesomeIcon icon={faUser} className="icon" />
          </div>
        )}
        <div className="user-details">
          <p className="name">
            {last}, {first}
          </p>
          <p className="address">{address}</p>
          <p className="phone">{phone}</p>
          <p className="email">{email}</p>
          {/* <FontAwesomeIcon icon={faArrowCircleDown} className="down" /> */}
        </div>
      </div>
      {editUser === id ? (
        <div className="edit">
          <p>To remove entry, please enter your username and password.</p>
          <form>
            <div className="username">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Enter personal username"
                onChange={(e) => setRemoveUser(e.target.value)}
              ></input>
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter personal password"
                onChange={(e) => setRemovePass(e.target.value)}
              ></input>
            </div>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                removeFromDB({ id });
              }}
            >
              Remove
            </button>
            <button onClick={closeEdit}>Cancel</button>
          </form>
          {logerror ? (
            <p className="logerror">Invalid username/password</p>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default User;
