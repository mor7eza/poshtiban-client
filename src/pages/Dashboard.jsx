import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import Sidebar from "../components/Sidebar";
import Titlebar from "../components/Titlebar";
import { GET_DASHBOARD } from "../graphql/queries";

const Dashboard = (props) => {
  const [statusCount, setStatusCount] = useState([0, 0, 0, 0]);
  useQuery(GET_DASHBOARD, {
    onCompleted(data) {
      setStatusCount(data.getDashboardStatus);
    }
  });

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Titlebar title={global.tr.dashboard} />
        <div className="dashboard">
          <div className="status status1">
            <h3>{global.tr.open_ticket}</h3>
            <p>{statusCount[0]}</p>
          </div>
          <div className="status status2">
            <h3>{global.tr.pending_ticket}</h3>
            <p>{statusCount[1]}</p>
          </div>
          <div className="status status3">
            <h3>{global.tr.resolved_ticket}</h3>
            <p>{statusCount[2]}</p>
          </div>
          <div className="status status4">
            <h3>{global.tr.closed_ticket}</h3>
            <p>{statusCount[3]}</p>
          </div>
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
          <div className="report">
            <h2>گزارش تیکت ها</h2>
            <table>
              <tr className="table-header">
                <th>دپارتمان</th>
                <th>بررسی نشده</th>
                <th>باز</th>
              </tr>
              <tr>
                <td>حسابداری</td>
                <td>15</td>
                <td>10</td>
              </tr>
              <tr>
                <td>حسابداری</td>
                <td>15</td>
                <td>10</td>
              </tr>
              <tr>
                <td>حسابداری</td>
                <td>15</td>
                <td>10</td>
              </tr>
              <tr>
                <td>حسابداری</td>
                <td>15</td>
                <td>10</td>
              </tr>
            </table>
          </div>
          <div className="log">log</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
