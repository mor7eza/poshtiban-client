import React from "react";

import Sidebar from "../components/Sidebar";
import Titlebar from "../components/Titlebar";

const Dashboard = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Titlebar title={global.tr.dashboard} />
        <div className="dashboard">
          <div className="status status1">
            <h3>بررسی نشده</h3>
            <p>5</p>
          </div>
          <div className="status status2">status2</div>
          <div className="status status3">status3</div>
          <div className="status status4">status4</div>
          <div className="todo">
            <h2>لیست کارها(4)</h2>
            <form>
              <button type="submit">
                <img src={process.env.PUBLIC_URL + "/assets/img/todo-plus.svg"} alt="add todo" />
              </button>
              <input type="text" placeholder="افزودن کار" />
            </form>
            <ul>
              <li>
                <input type="checkbox" name="" id="" />
                <p>بررسی تیکت</p>
                <button>
                  <img src={process.env.PUBLIC_URL + "/assets/img/todo-edit.svg"} alt="edit todo" />
                </button>
                <button>
                  <img src={process.env.PUBLIC_URL + "/assets/img/todo-trash.svg"} alt="deletd todo" />
                </button>
              </li>
              <li>
                <input type="checkbox" name="" id="" />
                <p>بررسی تیکت</p>
                <button>
                  <img src={process.env.PUBLIC_URL + "/assets/img/todo-edit.svg"} alt="edit todo" />
                </button>
                <button>
                  <img src={process.env.PUBLIC_URL + "/assets/img/todo-trash.svg"} alt="deletd todo" />
                </button>
              </li>
              <li>
                <input type="checkbox" name="" id="" />
                <p>بررسی تیکت</p>
                <button>
                  <img src={process.env.PUBLIC_URL + "/assets/img/todo-edit.svg"} alt="edit todo" />
                </button>
                <button>
                  <img src={process.env.PUBLIC_URL + "/assets/img/todo-trash.svg"} alt="deletd todo" />
                </button>
              </li>
            </ul>
          </div>
          <div className="report">report</div>
          <div className="log">log</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
