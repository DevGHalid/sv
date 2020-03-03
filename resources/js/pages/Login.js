import React, { useState, useContext, useEffect } from "react";
import { Formik, Form } from "formik";
import AuthContext from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import classNames from "classnames";

export default function Login() {
 const history = useHistory();
 const { auth, login } = useContext(AuthContext);

 useEffect(() => {
  if (auth.loggedIn) {
   history.push("/");
  }
 }, [auth.loggedIn]);

 return (
  <div className="page">
   <div className="page-main">
    <div className="container">
     <div className="card card-login">
      <div className="card-header pt-0 pb-0 border-bottom-0">
       <div className="card-title">Войти аккаунт</div>
      </div>
      <div className="card-body">
       <Formik initialValues={{ email: "", password: "" }} onSubmit={login}>
        {({ values, handleChange, handleBlur }) => (
         <Form>
          <div className="form-group">
           <label className="form-label">Введите почту</label>
           <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Почта"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
           />
           {auth.error && auth.error.email && (
            <small className="text-danger">{auth.error.email[0]}</small>
           )}
          </div>
          <div className="form-group">
           <label className="form-label">Введите пароль</label>
           <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Пароль"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
           />
           {auth.error && auth.error.password && (
            <small className="text-danger">{auth.error.password[0]}</small>
           )}
          </div>
          <div className="form-footer">
           <button
            className={classNames("btn btn-block btn-cyan", {
             "btn-loading": auth.loading
            })}
           >
            Войти
           </button>
           {auth.error && auth.error.message && (
            <small className="text-danger">{auth.error.message[0]}</small>
           )}
          </div>
         </Form>
        )}
       </Formik>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
