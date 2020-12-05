import React from "react";

import Sidebar from "../components/Sidebar";
import Titlebar from "../components/Titlebar";

const User = (props) => {
  const id = props.match.params.id;
  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Titlebar title={global.tr.users} />
        <div className="users">
          <div className="page-content">
            <div className="profile">
              <img src={`https://avatars.dicebear.com/api/jdenticon/${id}.svg`} alt="avatar" />
              <h3>مرتضی علی یاری</h3>
              <p>مدیر</p>
              <p>عضویت از 20 روز قبل</p>
              <form>
                <div className="input-group">
                  <label htmlFor="first_name">{global.tr.first_name}</label>
                  <input type="text" id="first_name" name="first_name" />
                </div>
                <div className="input-group">
                  <label htmlFor="last_name">{global.tr.last_name}</label>
                  <input type="text" id="last_name" name="last_name" />
                </div>
                <div className="input-group">
                  <label htmlFor="email">{global.tr.email}</label>
                  <input type="text" id="email" name="email" />
                </div>
                <div className="input-group">
                  <label htmlFor="">{global.tr.role}</label>
                  <div className="radio-group">
                    <div className="radio-item">
                      <input type="radio" id="user" name="role" value="user" />
                      <label htmlFor="user">{global.tr.user}</label>
                    </div>
                    <div className="radio-item">
                      <input type="radio" id="agent" name="role" value="agent" />
                      <label htmlFor="agent">{global.tr.agent}</label>
                    </div>
                    <div className="radio-item">
                      <input type="radio" id="admin" name="role" value="admin" />
                      <label htmlFor="admin">{global.tr.admin}</label>
                    </div>
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="">{global.tr.gender}</label>
                  <div className="radio-group">
                    <div className="radio-item">
                      <input type="radio" id="male" name="gender" value="male" />
                      <label htmlFor="male">{global.tr.male}</label>
                    </div>
                    <div className="radio-item">
                      <input type="radio" id="female" name="gender" value="female" />
                      <label htmlFor="female">{global.tr.female}</label>
                    </div>
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="birthday">{global.tr.birthday}</label>
                  <input type="text" id="birthday" name="birthday" />
                </div>
                <div className="input-group">
                  <label htmlFor="mobile">{global.tr.mobile}</label>
                  <input type="text" id="mobile" name="mobile" />
                </div>
                <div className="input-group" style={{ marginRight: "7rem", marginTop: "1.5rem" }}>
                  <button type="button">{`${global.tr.edit} ${global.tr.user}`}</button>
                  <button type="button" className="red">{`${global.tr.delete} ${global.tr.user}`}</button>
                  <button type="button">{global.tr.submit_changes}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
