import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { DateTime } from "luxon";

import Sidebar from "../components/Sidebar";
import Titlebar from "../components/Titlebar";
import { GET_TICKETS } from "../graphql/queries";
import { parseInt } from "lodash";

const Tickets = () => {
  const history = useHistory();
  const { data, loading } = useQuery(GET_TICKETS);
  const [search, setSearch] = useState("");
  let tickets;

  if (data && search.length > 0) {
    const filteredData = data.getTickets.filter((ticket) => {
      if (
        ticket.subject.includes(search) ||
        ticket.priority.includes(search) ||
        ticket.status.includes(search) ||
        ticket.department.includes(search) ||
        ticket.user.first_name.includes(search) ||
        ticket.user.last_name.includes(search)
      ) {
        return ticket;
      }
      return false;
    });
    if (filteredData.length > 0) tickets = filteredData;
  } else if (data && data.getTickets.length > 0 && !loading) tickets = data.getTickets;

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Titlebar title={global.tr.tickets} />
        <div className="users">
          {tickets || search !== "" ? (
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
          ) : null}
          <div className="page-content">
            <button
              type="button"
              className="btn"
              style={{ marginBottom: "1rem" }}
              onClick={(e) => history.push("/tickets/new")}
            >
              {global.tr.create_ticket}
            </button>
            {tickets ? (
              <table className="page-table">
                <colgroup>
                  <col style={{ width: "5%" }} />
                  <col style={{ width: "30%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "15%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th></th>
                    <th>{global.tr.subject}</th>
                    <th>{global.tr.department}</th>
                    <th>{global.tr.created_user}</th>
                    <th>{global.tr.status}</th>
                    <th>{global.tr.priority}</th>
                    <th>{global.tr.created_at}</th>
                    <th>{global.tr.updated_at}</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => {
                    return (
                      <tr key={ticket.id} onClick={(e) => history.push(`/tickets/ticket/${ticket.id}`)}>
                        <td className="avatar">
                          <img src={`https://avatars.dicebear.com/api/jdenticon/${ticket.user.id}.svg`} alt="avatar" />
                        </td>
                        <td>{ticket.subject}</td>
                        <td>{ticket.department}</td>
                        <td>{`${ticket.user.first_name} ${ticket.user.last_name}`}</td>
                        <td>
                          {(() => {
                            switch (ticket.status) {
                              case "OPEN":
                                return global.tr.open;
                              case "PENDING":
                                return global.tr.pending;
                              case "RESOLVED":
                                return global.tr.resolved;
                              case "CLOSED":
                                return global.tr.closed;
                              default:
                                return "";
                            }
                          })()}
                        </td>
                        <td>
                          <span className={ticket.priority}>
                            {(() => {
                              switch (ticket.priority) {
                                case "URGENT":
                                  return global.tr.urgent;
                                case "HIGH":
                                  return global.tr.high;
                                case "NORMAL":
                                  return global.tr.normal;
                                case "LOW":
                                  return global.tr.low;
                                default:
                                  return "";
                              }
                            })()}
                          </span>
                        </td>
                        <td>{DateTime.fromMillis(parseInt(ticket.createdAt)).toISODate()}</td>
                        <td>{DateTime.fromMillis(parseInt(ticket.updatedAt)).toISODate()}</td>
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

export default Tickets;
