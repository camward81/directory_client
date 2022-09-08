import React from "react";
import Progress from "./Progress";

const Add = ({
  closeWindow,
  setUser,
  setPass,
  setLast,
  setFirst,
  setAddress,
  setPhone,
  setEmail,
  addToDir,
  photo,
  setPhoto,
  upload,
  uploadPercentage,
  addUserErr,
}) => {
  return (
    <div className="add-container">
      <p className="close" onClick={closeWindow}>
        X
      </p>
      <header>Add Your Details</header>
      <form>
        <div className="details">
          <label htmlFor="username">
            Username<span className="required">*</span>
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Choose Username"
            onChange={(e) => setUser(e.target.value)}
          ></input>
          <label htmlFor="password">
            Password<span className="required">*</span>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Choose Password"
            onChange={(e) => setPass(e.target.value)}
          ></input>
          <label htmlFor="last">
            Last Name<span className="required">*</span>
          </label>
          <input
            type="text"
            name="last"
            id="last"
            placeholder="Enter Last Name"
            onChange={(e) => setLast(e.target.value)}
          ></input>
          <label htmlFor="first">
            First Name<span className="required">*</span>
          </label>
          <input
            type="text"
            name="first"
            id="first"
            placeholder="Enter First Name"
            onChange={(e) => setFirst(e.target.value)}
          ></input>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Enter Address"
            onChange={(e) => setAddress(e.target.value)}
          ></input>
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="000-000-0000"
            onChange={(e) => setPhone(e.target.value)}
          ></input>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <div className="upload">
            <label htmlFor="photo">Upload Photo</label>
            <div className="choose-file">
              <input
                type="file"
                name="file"
                onChange={(e) => setPhoto(e.target.files[0])}
              ></input>
              {photo ? (
                <button
                  type="submit"
                  value="upload"
                  onClick={(e) => {
                    e.preventDefault();
                    upload();
                  }}
                >
                  Upload
                </button>
              ) : (
                ""
              )}
            </div>
            {photo ? <Progress uploadPercentage={uploadPercentage} /> : ""}
          </div>
          <button type="submit" onClick={addToDir} className="submit">
            Submit
          </button>
        </div>
      </form>
      {addUserErr ? (
        <p className="user-err">
          *Complete all required fields. Username must be unique and password
          must have at least six characters.
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default Add;
