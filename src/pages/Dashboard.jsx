import React, { useContext, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import Sidebar from "../components/Sidebar";
import Titlebar from "../components/Titlebar";
import { GET_DASHBOARD } from "../graphql/queries";
import { ADD_TODO, COMPLETE_TODO } from "../graphql/mutations";
import { AuthContext } from "../context/auth";

const Dashboard = (props) => {
  const context = useContext(AuthContext);
  const [statusCount, setStatusCount] = useState([0, 0, 0, 0]);
  const [todos, setTodos] = useState([]);
  const [todoBody, setTodoBody] = useState("");
  const [departmentsStatus, setDepartmentsStatus] = useState([]);
  useQuery(GET_DASHBOARD, {
    variables: { userId: context.id },
    onCompleted(data) {
      setStatusCount(data.getDashboardStatus);
      setTodos(data.getTodos);
      setDepartmentsStatus(data.getDepartmentsStatus);
    }
  });
  const [addTodo] = useMutation(ADD_TODO);
  const [completeTodo] = useMutation(COMPLETE_TODO);

  const onTodoSubmitHandler = (e) => {
    e.preventDefault();
    addTodo({
      variables: { userId: context.id, body: todoBody },
      refetchQueries: [{ query: GET_DASHBOARD, variables: { userId: context.id } }]
    });
    setTodoBody("");
    window.location.reload();
  };

  const onCompleteTodoHandler = (e) => {
    completeTodo({ variables: { todoId: e.target.name } });
    let newTodos = [];
    todos.map((todo) => {
      if (todo.id === e.target.name) {
        newTodos = [...newTodos, { __typename: "TODO", id: todo.id, body: todo.body, completed: !todo.completed }];
      } else {
        newTodos = [...newTodos, todo];
      }
    });
    setTodos(newTodos);
  };

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
            <h2>{global.tr.todo_lists}</h2>
            <form onSubmit={onTodoSubmitHandler}>
              <button type="submit">
                <img src={process.env.PUBLIC_URL + "/assets/img/todo-plus.svg"} alt="add todo" />
              </button>
              <input
                type="text"
                placeholder={global.tr.add_todo}
                value={todoBody}
                onChange={(e) => setTodoBody(e.target.value)}
              />
            </form>
            {todos.length ? (
              <ul>
                {todos.map((todo) => {
                  return (
                    <li key={todo.id}>
                      <input type="checkbox" name={todo.id} onChange={onCompleteTodoHandler} />
                      <p className={todo.completed ? "linethrough" : ""}>{todo.body}</p>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
          <div className="report">
            <h2>گزارش تیکت ها</h2>
            <table>
              <tr className="table-header">
                <th>{global.tr.department}</th>
                <th>{global.tr.new}</th>
                <th>{global.tr.pending}</th>
              </tr>
              {departmentsStatus.length
                ? departmentsStatus.map((dep) => {
                    return (
                      <tr>
                        <td>{dep.name}</td>
                        <td>{dep.open}</td>
                        <td>{dep.pending}</td>
                      </tr>
                    );
                  })
                : null}
            </table>
          </div>
          <div className="log">log</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
