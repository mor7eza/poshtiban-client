import React from "react";
import { useQuery } from "@apollo/client";

import Sidebar from "../components/Sidebar";
import Titlebar from "../components/Titlebar";
import { GET_USERS } from "../graphql/queries";

const Users = () => {
  const { data } = useQuery(GET_USERS);
  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Titlebar title={global.tr.users} />
        <div className="users">
          <div className="page-search">
            <form>
              <img src={process.env.PUBLIC_URL + "/assets/img/icon-magnifier.svg"} alt="magnifier" />
              <input type="text" placeholder={global.tr.search + " ..."} />
            </form>
          </div>
          <div className="page-content">
            {data ? (
              <table className="page-table">
                <colgroup>
                  <col style={{ width: "5%" }} />
                  <col style={{ width: "15%" }} />
                  <col style={{ width: "15%" }} />
                  <col style={{ width: "25%" }} />
                  <col style={{ width: "40%" }} />
                </colgroup>
                <thead>
                  <th></th>
                  <th>{global.tr.first_name}</th>
                  <th>{global.tr.last_name}</th>
                  <th>{global.tr.email}</th>
                  <th>{global.tr.role}</th>
                </thead>
                <tbody>
                  {data.getUsers.map((user) => {
                    return (
                      <tr>
                        <td className="avatar"></td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              "No data"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
