import React, { useState } from "react";
import { DateTime } from "luxon";
import { useMutation, useQuery } from "@apollo/client";
import _ from "lodash";

import Sidebar from "../components/Sidebar";
import Titlebar from "../components/Titlebar";
import { GET_USER, GET_USERS } from "../graphql/queries";
import { DELETE_USER, EDIT_USER } from "../graphql/mutations";
import { useHistory } from "react-router-dom";

const User = (props) => {
  const history = useHistory();
  const user_id = props.match.params.id;
  const [edit, setEdit] = useState(false);
  const [regDiff, setRegDiff] = useState();
  const [initial, setInitial] = useState({
    first_name: "",
    last_name: "",
    role: ""
  });
  const [user, setUser] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    role: "",
    gender: null,
    birthday: "",
    mobile: ""
  });
  useQuery(GET_USER, {
    onCompleted({ getUser }) {
      setUser({ ...user, ...getUser });
      setInitial({ ...initial, ...getUser });
      let created = DateTime.fromMillis(parseInt(getUser.createdAt));
      const diff = created.diffNow(["years", "months", "days"]);
      setRegDiff(diff);
    },
    variables: { id: user_id }
  });
  let year, month, day;
  if (regDiff) {
    const { years, months, days } = regDiff.values;
    year = Math.abs(parseInt(years));
    month = Math.abs(parseInt(months));
    day = Math.abs(parseInt(days));
  }

  const [deleteUser] = useMutation(DELETE_USER);
  const [editUser] = useMutation(EDIT_USER);

  const deleteUserHandler = () => {
    deleteUser({
      variables: { id: user_id },
      refetchQueries: [{ query: GET_USERS }]
    });
    history.push("/users");
  };

  const onChangeHandler = (e) => {
    if (e.target.name === "gender") {
      e.target.value === "male" ? setUser({ ...user, gender: true }) : setUser({ ...user, gender: false });
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const onSubmitChanges = () => {
    editUser({
      variables: _.pick(user, ["id", "first_name", "last_name", "role", "gender", "birthday", "mobile"]),
      refetchQueries: [{ query: GET_USERS }, { query: GET_USER, variables: { id: user_id } }]
    });
    history.push("/users");
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Titlebar title={`${initial.first_name} ${initial.last_name}`} />
        <div className="users">
          <div className="page-content">
            <div className="profile">
              <img src={`https://avatars.dicebear.com/api/jdenticon/${user_id}.svg`} alt="avatar" />
              <h3>{`${initial.first_name} ${initial.last_name}`}</h3>
              <p>
                {initial.role === "USER"
                  ? global.tr.user
                  : initial.role === "AGENT"
                  ? global.tr.agent
                  : global.tr.admin}
              </p>
              <span>
                {regDiff
                  ? `${global.tr.registration_from} ${year > 0 ? `${year} ${global.tr.year}` : ""} ${
                      month > 0 ? `${month} ${global.tr.month}` : ""
                    } ${day > 0 ? `${day} ${global.tr.day}` : ""} ${
                      day > 0 || month > 0 || year > 0 ? global.tr.ago : global.tr.today
                    }`
                  : ""}
              </span>
              <form>
                <div className="input-group">
                  <label htmlFor="first_name">{global.tr.first_name}</label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={user.first_name}
                    disabled={!edit}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="last_name">{global.tr.last_name}</label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={user.last_name}
                    disabled={!edit}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="email">{global.tr.email}</label>
                  <input type="text" id="email" name="email" value={user.email} disabled />
                </div>
                <div className="input-group">
                  <label htmlFor="">{global.tr.role}</label>
                  <div className="radio-group">
                    <div className="radio-item">
                      <input
                        type="radio"
                        id="user"
                        name="role"
                        value="USER"
                        checked={user.role === "USER"}
                        disabled={!edit}
                        onChange={onChangeHandler}
                      />
                      <label htmlFor="user">{global.tr.user}</label>
                    </div>
                    <div className="radio-item">
                      <input
                        type="radio"
                        id="agent"
                        name="role"
                        value="AGENT"
                        checked={user.role === "AGENT"}
                        disabled={!edit}
                        onChange={onChangeHandler}
                      />
                      <label htmlFor="agent">{global.tr.agent}</label>
                    </div>
                    <div className="radio-item">
                      <input
                        type="radio"
                        id="admin"
                        name="role"
                        value="ADMIN"
                        checked={user.role === "ADMIN"}
                        disabled={!edit}
                        onChange={onChangeHandler}
                      />
                      <label htmlFor="admin">{global.tr.admin}</label>
                    </div>
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="">{global.tr.gender}</label>
                  <div className="radio-group">
                    <div className="radio-item">
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="male"
                        checked={user.gender === true}
                        disabled={!edit}
                        onChange={onChangeHandler}
                      />
                      <label htmlFor="male">{global.tr.male}</label>
                    </div>
                    <div className="radio-item">
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="female"
                        checked={user.gender === false}
                        disabled={!edit}
                        onChange={onChangeHandler}
                      />
                      <label htmlFor="female">{global.tr.female}</label>
                    </div>
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="birthday">{global.tr.birthday}</label>
                  <input
                    type="text"
                    id="birthday"
                    name="birthday"
                    placeholder="--/--/---"
                    value={user.birthday}
                    disabled={!edit}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="mobile">{global.tr.mobile}</label>
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    placeholder="xxxxxxxxxx"
                    value={user.mobile}
                    disabled={!edit}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="input-group" style={{ marginRight: "7rem", marginTop: "1.5rem" }}>
                  {edit ? (
                    <>
                      <button type="button" onClick={onSubmitChanges}>
                        {global.tr.submit_changes}
                      </button>
                      <button type="button" className="grey" onClick={(e) => setEdit(false)}>
                        {global.tr.cancel}
                      </button>
                      <button
                        type="button"
                        className="red"
                        onClick={deleteUserHandler}
                      >{`${global.tr.delete} ${global.tr.user}`}</button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => setEdit(true)}
                    >{`${global.tr.edit} ${global.tr.user}`}</button>
                  )}
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
