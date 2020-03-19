import React, { useContext, useEffect } from "react";
import Master from "../../layouts/Master";
import Loader from "../../layouts/Loader";
import UsersContext from "../../contexts/UsersContext";

export default function Users() {
  const { users, fetchAllUsersFormApi } = useContext(UsersContext);

  useEffect(() => {
    fetchAllUsersFormApi();
  }, []);

  return (
    <Master>
      <div className="container">
        <div className="card">
          <div className="card-header justify-content-between">
            <h4 className="card-title">Сотрудники</h4>
            <div className="form-btn-action">
              <button className="btn btn-sm btn-outline-cyan">
                <i className="fe fe-user-plus mr-1"></i>
                <span>Добавить сотрудника</span>
              </button>
            </div>
          </div>
          <div className="card-body">
            {users.loading ? (
              <Loader className="m-auto" />
            ) : (
              <table className="table table-light table-hover">
                <thead>
                  <tr>
                    <th scope="col">ИМФ</th>
                    <th scope="col">E-Mail</th>
                    <th scope="col">Должность</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="form-lists">
                  {users.allUsers.map(user => (
                    <tr key={user.id}>
                      <td>
                        <div className="nav-link p-0 leading-none">
                          <span className="avatar avatar-lg mr-2"></span>
                          <span className="ml-2 d-none d-lg-block"></span>
                          <span className="text-default">{user.name}</span>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>Администратор</td>
                      <td>
                        <div className="d-flex justify-content-end">
                          <div className="user-action">
                            <i className="fe fe-trash-2 mr-1"></i>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </Master>
  );
}
