import React, { useState, useEffect } from "react";
//axios
import axios from "axios";
//styles
import styles from "./styles/app.scss";
//components
import Login from "./components/Login";
import Directory from "./components/Directory";
import Add from "./components/Add";

function App() {
  //login state
  const [loggedin, setLoggedIn] = useState(false);
  const [logerror, setLogError] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");

  //directory state (pop-up)
  const [addmember, setAddMember] = useState(false);
  const [editUser, setEditUser] = useState("");
  const [editLogIn, setEditLogIn] = useState(false);
  const [removeUser, setRemoveUser] = useState("");
  const [removePass, setRemovePass] = useState("");

  //directory state (member details)
  const id = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [last, setLast] = useState("");
  const [first, setFirst] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [uploadedPhoto, setUploadedPhoto] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [addUserErr, setAddUserErr] = useState(false);

  //directory state (all members)
  const [users, setUsers] = useState("");

  //on page load
  useEffect(() => {
    axios
      .get("https://cam-directory.herokuapp.com/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => (error ? console.log(error) : ""));
  }, []);

  //login
  const logIn = (e) => {
    e.preventDefault();
    if (
      username === process.env.REACT_APP_USER &&
      password === process.env.REACT_APP_PASS
    ) {
      setLoggedIn(true);
      console.log("You are logged in!");
    } else {
      setLogError(true);
    }
  };

  //add new pop-up
  const addNew = (e) => {
    e.preventDefault();
    setAddMember(true);
  };

  //close add new pop-up
  const closeWindow = (e) => {
    e.preventDefault();
    setAddMember(false);
    setAddUserErr(false);
    setEditUser(false);
    setEditLogIn(false);
    setLogError(false);
    setPhoto("");
    setUploadPercentage(0);
  };

  //add photo to db
  const upload = async () => {
    let formData = new FormData();
    formData.append("file", photo);
    formData.append("upload_preset", "mpc_direct");
    try {
      await axios
        .post(
          `https://api.cloudinary.com/v1_1/djv7ggshy/image/upload`,
          formData,
          {
            headers: { "content-type": "multipart/form-data" },
            onUploadProgress: (progressEvent) => {
              setUploadPercentage(
                parseInt(
                  Math.round((progressEvent.loaded * 100) / progressEvent.total)
                )
              );
            },
          }
        )
        .then((response) => {
          setUploadedPhoto(response.data.secure_url);
        });
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };

  //add user details to db
  const addUser = () => {
    axios
      .post("https://cam-directory.herokuapp.com/add", {
        user: user,
        pass: pass,
        last: last,
        first: first,
        address: address,
        phone: phone,
        email: email,
        photo: uploadedPhoto,
      })
      .then((error, result) => {
        if (error) {
          console.log(error);
        } else {
          console.log("User added.");
        }
      });
  };

  //get from db
  const getUsers = () => {
    axios.get("https://cam-directory.herokuapp.com/users").then((response) => {
      setUsers(response.data);
    });
  };

  //render new user to directory
  const addToDir = async (e) => {
    e.preventDefault();
    const checkUser = user !== "" && user !== process.env.REACT_APP_SHARED_USER;
    const checkPass = pass.length >= 6;
    const checkLast = last !== "";
    const checkFirst = first !== "";
    const checkOtherUser = [];
    //get users from db and check if user already exists
    try {
      await axios
        .get("https://cam-directory.herokuapp.com/users")
        .then((response) => {
          setUsers(response.data);
          response.data.map((el) =>
            el.user === user ? checkOtherUser.push(user) : ""
          );
          //creat account or alert error
          if (
            checkOtherUser.length === 0 &&
            checkUser &&
            checkPass &&
            checkLast &&
            checkFirst
          ) {
            addUser();
            getUsers();
            setAddMember(false);
            setAddUserErr(false);
            setPhoto("");
            setUploadPercentage(0);
            alert("Successfully added!");
            window.location.reload();
          } else {
            setAddUserErr(true);
          }
        });
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="App" styles={styles}>
      {!loggedin ? (
        <Login
          setUserName={setUserName}
          setPassWord={setPassWord}
          logIn={logIn}
          logerror={logerror}
        />
      ) : (
        ""
      )}
      {loggedin ? (
        <Directory
          addmember={addmember}
          addNew={addNew}
          id={id}
          users={users}
          user={user}
          pass={pass}
          last={last}
          first={first}
          address={address}
          phone={phone}
          email={email}
          photo={photo}
          uploadedPhoto={uploadedPhoto}
          editUser={editUser}
          setEditUser={setEditUser}
          editLogIn={editLogIn}
          setEditLogIn={setEditLogIn}
          removeUser={removeUser}
          setRemoveUser={setRemoveUser}
          removePass={removePass}
          setRemovePass={setRemovePass}
          logerror={logerror}
          setLogError={setLogError}
          getUsers={getUsers}
        />
      ) : (
        ""
      )}
      {addmember ? (
        <Add
          closeWindow={closeWindow}
          setUser={setUser}
          setPass={setPass}
          setLast={setLast}
          setFirst={setFirst}
          setAddress={setAddress}
          setPhone={setPhone}
          setEmail={setEmail}
          addToDir={addToDir}
          photo={photo}
          setPhoto={setPhoto}
          upload={upload}
          uploadPercentage={uploadPercentage}
          addUserErr={addUserErr}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
