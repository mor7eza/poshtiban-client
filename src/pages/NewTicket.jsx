import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Titlebar from "../components/Titlebar";
import { AuthContext } from "../context/auth";
import { osName, osVersion, browserName, browserVersion } from "react-device-detect";

import { GET_TICKETS } from "../graphql/queries";
import { CREATE_TICKET } from "../graphql/mutations";

const NewTicket = () => {
  const history = useHistory();
  const context = useContext(AuthContext);
  const [values, setValues] = useState({ subject: "", department: "", priority: "LOW", body: "", status: "OPEN" });
  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [createTicket] = useMutation(CREATE_TICKET);

  const onSubmitHandler = (e) => {
    createTicket({
      variables: { ...values, userId: context.id, osName, osVersion, browserName, browserVersion },
      refetchQueries: [{ query: GET_TICKETS }]
    });
    history.push("/tickets");
  };
  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Titlebar title={global.tr.create_ticket} />
        <div className="users">
          <div className="page-content">
            <div className="profile">
              <form>
                <div className="input-group">
                  <label htmlFor="subject">{global.tr.subject}</label>
                  <input type="text" id="subject" name="subject" value={values.subject} onChange={onChangeHandler} />
                </div>
                <div className="input-group">
                  <label htmlFor="department">{global.tr.department}</label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={values.department}
                    onChange={onChangeHandler}
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="">{global.tr.priority}</label>
                  <div className="radio-group">
                    <div className="radio-item">
                      <input
                        type="radio"
                        id="low"
                        name="priority"
                        value="LOW"
                        onChange={onChangeHandler}
                        checked={values.priority === "LOW" ? true : false}
                      />
                      <label htmlFor="low">{global.tr.low}</label>
                    </div>
                    <div className="radio-item">
                      <input type="radio" id="normal" name="priority" value="NORMAL" onChange={onChangeHandler} />
                      <label htmlFor="normal">{global.tr.normal}</label>
                    </div>
                    <div className="radio-item">
                      <input type="radio" id="high" name="priority" value="HIGH" onChange={onChangeHandler} />
                      <label htmlFor="high">{global.tr.high}</label>
                    </div>
                    <div className="radio-item">
                      <input type="radio" id="urgent" name="priority" value="URGENT" onChange={onChangeHandler} />
                      <label htmlFor="urgent">{global.tr.urgent}</label>
                    </div>
                  </div>
                </div>

                <div className="input-group" style={{ alignItems: "start" }}>
                  <label htmlFor="body">{global.tr.body}</label>
                  <textarea
                    className="fa-font"
                    id="body"
                    name="body"
                    maxLength="500"
                    value={values.body}
                    onChange={onChangeHandler}
                  ></textarea>
                </div>

                <div className="input-group" style={{ marginRight: "7rem", marginTop: "1.5rem" }}>
                  <button type="button" onClick={onSubmitHandler}>
                    {global.tr.submit_ticket}
                  </button>
                  <button
                    type="button"
                    className="grey"
                    onClick={(e) => {
                      history.push("/tickets");
                    }}
                  >
                    {global.tr.cancel}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTicket;
