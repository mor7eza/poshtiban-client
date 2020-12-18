import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import Sidebar from "../components/Sidebar";
import Titlebar from "../components/Titlebar";
import { GET_TICKET } from "../graphql/queries";

const Ticket = (props) => {
  const [ticket, setTicket] = useState({ subject: "" });
  const { data, loading } = useQuery(GET_TICKET, {
    variables: { ticketId: props.match.params.id },
    onCompleted({ getTicket }) {
      setTicket({ ...ticket, ...getTicket });
    }
  });
  console.log(ticket);
  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Titlebar title={`${ticket.subject}`} />
        <div className="toolbar">
          <button>
            <img src={process.env.PUBLIC_URL + "/assets/img/icon-close.svg"} />
            بستن
          </button>
        </div>
        <div className="users">
          <div className="page-content">
            {"body" in ticket ? (
              <>
                <h2>
                  <img src={process.env.PUBLIC_URL + "/assets/img/icon-earth.svg"} />
                  {ticket.subject}
                </h2>
                {ticket.client.osName ? (
                  <div className="client-spec">
                    <img src={process.env.PUBLIC_URL + "/assets/img/chrome.svg"} />
                    <p>{`${ticket.client.browserName} ${ticket.client.browserVersion}`}</p>
                    <p style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}>|</p>
                    <img src={process.env.PUBLIC_URL + "/assets/img/windows.svg"} />
                    <p>{`${ticket.client.osName} ${ticket.client.osVersion}`}</p>
                  </div>
                ) : null}
                <div className="comment">
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <img src={`https://avatars.dicebear.com/api/jdenticon/${ticket.user.id}.svg`} alt="avatar" />
                    <div className="comment-details">
                      <h4>{`${ticket.user.first_name} ${ticket.user.last_name}`}</h4>
                      <p className="date-time">{`12 days ago`}</p>
                      <p className="body">{ticket.body}</p>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
