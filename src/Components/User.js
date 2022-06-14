import React from "react";
import "./User.css";
const User = ({ id, first_name, last_name, email, avatar }) => {
  if (id === 0)
    return (
      <div className="random-user">
        <div>
          <strong>Name: </strong>
        </div>
        <div>
          <strong>Image: </strong>
        </div>
        <div>
          <strong>Id: </strong>
        </div>
        <div>
          <strong>Email: </strong>
        </div>
      </div>
    );
  else
    return (
      <div className="random-user">
        <div className="user-name">
          <strong>First Name: </strong>
          {first_name}
          <div></div>
          <strong>Last Name: </strong>
          {last_name}
        </div>
        <div>
          <img className="user-image" src={avatar} alt={first_name} />
        </div>
        <div className="user-details">
          <strong>Id :</strong> {id}
          <div></div>
            <strong>Email:</strong> {email}
        </div>
      </div>
    );
};

export default User;
