import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import Sidebar from "../components/Sidebar";
import Titlebar from "../components/Titlebar";
import { GET_USERS } from "../graphql/queries";
import { useHistory } from "react-router-dom";

const Users = () => {
  const history = useHistory();
  const { data, loading } = useQuery(GET_USERS);
  const [search, setSearch] = useState("");
  let users;

  if (data && search.length > 0) {
    const filteredData = data.getUsers.filter((user) => {
      if (user.first_name.includes(search) || user.last_name.includes(search) || user.email.includes(search)) {
        return user;
      }
      return false;
    });
    if (filteredData.length > 0) users = filteredData;
  } else if (data && !loading) users = data.getUsers;

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Titlebar title={global.tr.users} />
        <div className="users">
          <div className="page-search">
            <form>
              <img src={process.env.PUBLIC_URL + "/assets/img/icon-magnifier.svg"} alt="magnifier" />
              <input
                type="text"
                placeholder={global.tr.search + " ..."}
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
              />
            </form>
          </div>
          <div className="page-content">
            {users ? (
              <table className="page-table">
                <colgroup>
                  <col style={{ width: "5%" }} />
                  <col style={{ width: "15%" }} />
                  <col style={{ width: "15%" }} />
                  <col style={{ width: "25%" }} />
                  <col style={{ width: "40%" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th></th>
                    <th>{global.tr.first_name}</th>
                    <th>{global.tr.last_name}</th>
                    <th>{global.tr.email}</th>
                    <th>{global.tr.role}</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    return (
                      <tr key={user.id} onClick={(e) => history.push(`/users/${user.id}`)}>
                        <td className="avatar">
                          <img src={`https://avatars.dicebear.com/api/jdenticon/${user.id}.svg`} alt="avatar" />
                        </td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td>
                          {user.role === "USER"
                            ? global.tr.user
                            : user.role === "AGENT"
                            ? global.tr.agent
                            : global.tr.admin}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <img className="empty-placeholder" src={process.env.PUBLIC_URL + "/assets/img/empty.svg"} alt="no data" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
