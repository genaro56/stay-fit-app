import React, { CSSProperties, useState, useEffect } from "react"
import { Button } from "react-bootstrap"

import { useForm } from 'react-hook-form'
import { Redirect, useHistory } from "react-router"
// import { signup, login } from '../../services'
import './styles/registerView.css'
// import { useAuth } from "../../context/auth";

// import { authServiceInstance } from '../services/AuthService'


// const Button = styled.button``;

// type formValues = {
//   name: string,
//   email: string,
//   password: string
// }

export function Register() {
  const { register, handleSubmit } = useForm()
  const [showError, setShowError] = useState(false)
  const [isLoggedIn, setLoggedIn] = useState(false);
  let history = useHistory();

  // const onRegister = ({ name, email, password }: formValues) => {
  //   signup(name, email, password).then((res: any) => {
  //     console.log('user logged');
  //   }).catch((err) => {
  //     console.log('%c err', 'background: #332167; color: #B3D1F6; font-size: 16px', err)
  //     setShowError(true)
  //   }).then(() => {
  //     login(email, password).then((token: string) => {
  //       // NAVEGAR A LA OTRA PANTALLA
  //       history.push('/assessment');
  //       setLoggedIn(true);
  //       setAuthTokens(token);
  //       console.log('%asdfadsfc err', 'background: #332167; color: #B3D1F6; font-size: 16px')
  //     }).catch((err) => {
  //       console.log('%c err', 'background: #332167; color: #B3D1F6; font-size: 16px', err)
  //       setShowError(true)
  //     })

  //     history.push('/dashboard')
  //   })
  // }

  function redirectToSignup(e: any) {
    console.log(e.target)
    history.push('/login')
  }

  console.log('%c isLoggedIn', 'background: #332167; color: #B3D1F6; font-size: 16px', isLoggedIn)
  return (
    <div>
      <div className="container">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h3>Sign In</h3>
              <div className="d-flex justify-content-end social_icon">
                <span><i className="fab fa-facebook-square"></i></span>
                <span><i className="fab fa-google-plus-square"></i></span>
                <span><i className="fab fa-twitter-square"></i></span>
              </div>
            </div>
            <div className="card-body">
              <form 
                // onSubmit={handleSubmit(onRegister as any)}
                >
                <label>
                  Name
          <input name="name" ref={register({ required: true })} />
                </label>
                <label>
                  E-mail
          <input name="email" ref={register({ required: true })} />
                </label>
                <label >
                  Password
          <input name="password" type="password" ref={register({ required: true })} />
                </label>
                <button type="submit">
                  Register
        </button>
                {showError && <span>Credenciales inválidas</span>}
              </form>
              <div className="card-footer">
                <div className="d-flex justify-content-center links">
                  <Button onClick={(e: any) => redirectToSignup(e)}>Switch to login</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

