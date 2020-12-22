import React, { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { DateTime } from "luxon";

import Sidebar from "../components/Sidebar";
import Titlebar from "../components/Titlebar";
import { GET_TICKET } from "../graphql/queries";
import { ADD_COMMENT } from "../graphql/mutations";
import { CHANGE_TICKET_PRIORITY } from "../graphql/mutations";
import { CHANGE_TICKET_STATUS } from "../graphql/mutations";
import { AuthContext } from "../context/auth";

const Ticket = (props) => {
  const context = useContext(AuthContext);
  const [ticket, setTicket] = useState({ subject: "" });
  const [replyShown, setReplyShown] = useState(false);
  const [replyBody, setReplyBody] = useState("");
  useQuery(GET_TICKET, {
    variables: { ticketId: props.match.params.id },
    onCompleted({ getTicket }) {
      setTicket({ ...ticket, ...getTicket });
    }
  });
  const [addComment] = useMutation(ADD_COMMENT, {
    variables: { body: replyBody, ticketId: props.match.params.id, userId: context.id },
    refetchQueries: [{ query: GET_TICKET, variables: { ticketId: props.match.params.id } }],
    onCompleted() {
      setReplyShown(false);
      setReplyBody("");
      window.location.reload();
    }
  });
  const [changePriority] = useMutation(CHANGE_TICKET_PRIORITY);
  const [changeStatus] = useMutation(CHANGE_TICKET_STATUS);

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Titlebar title={`${ticket.subject}`} />
        <div className="toolbar">
          {ticket.status !== "CLOSED" ? (
            <>
              <button
                onClick={() => {
                  changeStatus({
                    variables: { ticketId: props.match.params.id, status: "CLOSED" }
                  });
                  setTicket({ ...ticket, status: "CLOSED" });
                  window.location.reload();
                }}
              >
                <img src={process.env.PUBLIC_URL + "/assets/img/icon-close.svg"} alt="close ticket" />
                {global.tr.close_ticket}
              </button>{" "}
            </>
          ) : null}
          {ticket.status === "PENDING" ? (
            <>
              <button
                onClick={() => {
                  changeStatus({
                    variables: { ticketId: props.match.params.id, status: "RESOLVED" }
                  });
                  setTicket({ ...ticket, status: "RESOLVED" });
                  window.location.reload();
                }}
              >
                <img src={process.env.PUBLIC_URL + "/assets/img/icon-resolved.svg"} alt="resolved" />
                {global.tr.change_to_resolved}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  changeStatus({
                    variables: { ticketId: props.match.params.id, status: "PENDING" }
                  });
                  setTicket({ ...ticket, status: "PENDING" });
                  window.location.reload();
                }}
              >
                <img src={process.env.PUBLIC_URL + "/assets/img/icon-pending.svg"} alt="pending" />
                {global.tr.change_to_pending}
              </button>{" "}
            </>
          )}
        </div>
        <div className="users">
          <div className="page-content">
            {"body" in ticket ? (
              <>
                <div className="title">
                  <h2 style={{ display: "flex", alignItems: "center" }}>
                    <img src={process.env.PUBLIC_URL + "/assets/img/icon-earth.svg"} alt="earth icon" />
                    {ticket.subject}
                  </h2>
                  <select
                    className={`fa-font ${ticket.priority}-text`}
                    name="priority"
                    onChange={(e) => {
                      setTicket({ ...ticket, priority: e.target.value });
                      changePriority({
                        variables: {
                          ticketId: props.match.params.id,
                          priority: e.target.value
                        }
                      });
                    }}
                  >
                    <option
                      className="URGENT-text"
                      value="URGENT"
                      selected={ticket.priority === "URGENT" ? true : false}
                    >
                      ■ {global.tr.urgent}
                    </option>
                    <option className="HIGH-text" value="HIGH" selected={ticket.priority === "HIGH" ? true : false}>
                      ■ {global.tr.high}
                    </option>
                    <option
                      className="NORMAL-text"
                      value="NORMAL"
                      selected={ticket.priority === "NORMAL" ? true : false}
                    >
                      ■ {global.tr.normal}
                    </option>
                    <option className="LOW-text" value="LOW" selected={ticket.priority === "LOW" ? true : false}>
                      ■ {global.tr.low}
                    </option>
                  </select>
                </div>

                {ticket.client.osName ? (
                  <div className="client-spec">
                    <img src={process.env.PUBLIC_URL + "/assets/img/chrome.svg"} />
                    <p>{`${ticket.client.browserName} ${ticket.client.browserVersion}`}</p>
                    <p style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}>|</p>
                    <img src={process.env.PUBLIC_URL + "/assets/img/windows.svg"} />
                    <p>{`${ticket.client.osName} ${ticket.client.osVersion}`}</p>
                  </div>
                ) : null}
                <div className="comments">
                  <div className="comment">
                    <div style={{ display: "flex", alignItems: "flex-start" }}>
                      <img src={`https://avatars.dicebear.com/api/jdenticon/${ticket.user.id}.svg`} alt="avatar" />
                      <div className="comment-details">
                        <h4>{`${ticket.user.first_name} ${ticket.user.last_name}`}</h4>
                        <p className="date-time">{DateTime.fromMillis(parseInt(ticket.createdAt)).toFormat("T D")}</p>
                        <p className="body">{ticket.body}</p>
                      </div>
                    </div>
                  </div>
                  {ticket.comments.map((comment) => {
                    return (
                      <div className="comment">
                        <div style={{ display: "flex", alignItems: "flex-start" }}>
                          <img src={`https://avatars.dicebear.com/api/jdenticon/${comment.user.id}.svg`} alt="avatar" />
                          <div className="comment-details">
                            <h4>{`${comment.user.first_name} ${comment.user.last_name}`}</h4>
                            <p className="date-time">
                              {DateTime.fromMillis(parseInt(comment.createdAt)).toFormat("T D")}
                            </p>
                            <p className="body">{comment.body}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className={"ticket-reply " + (replyShown ? "" : "hidden")}>
                  <textarea
                    className="fa-font"
                    id="body"
                    name="body"
                    maxLength="500"
                    value={replyBody}
                    onChange={(e) => {
                      setReplyBody(e.target.value);
                    }}
                  ></textarea>
                  <div className="input-group">
                    <button
                      type="button"
                      onClick={() => {
                        addComment();
                      }}
                    >
                      {global.tr.submit_ticket}
                    </button>
                    <button
                      type="button"
                      className="grey"
                      onClick={() => {
                        setReplyShown(false);
                      }}
                    >
                      {global.tr.cancel}
                    </button>
                  </div>
                </div>
                <div className={"toolbar " + (replyShown ? "hidden" : "")} style={{ marginTop: "2rem" }}>
                  <button
                    onClick={() => {
                      setReplyShown(true);
                    }}
                  >
                    <img src={process.env.PUBLIC_URL + "/assets/img/icon-reply.svg"} />
                    {global.tr.reply}
                  </button>
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
