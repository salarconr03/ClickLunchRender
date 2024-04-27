import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  esCorreoElectronico,
  esContrasenaValida,
} from "../../../other/validation.js";
import axios from "axios";
import { ReCAPTCHA } from "react-google-recaptcha";
import logo from "../../../imagenes/logo-removebg-preview.png";
import { baseUrl } from "../../../other/extras.js";


const Login = () => {
  const [credentials, setCreadentials] = useState({
    email: "",
    password: "",
  });
  const [captcha, setCaptcha] = useState();
  const [error, setError] = useState("");
  const navigation = useNavigate();

  const handleChange = (e) => {
    setCreadentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!credentials.email || !credentials.password){
      return alert('Todos los campos son obligatorios');
    }
    if(!esCorreoElectronico(credentials.email)){
      return alert('El correo electronico es invalido');
    }
    if(!esContrasenaValida(credentials.password)){
      return alert('La contraseña es invalida');
    }
    if (/*captcha || */ true) {
      try {
        axios.post(`${baseUrl}/api/usuario/login`,{
          data: {
            email: credentials.email,
            password: credentials.password
          }
        }).then((res)=>{
          if(res.status === 200){
            console.log(res.data.id);
            window.localStorage.setItem("id",res.data.id)
            window.localStorage.setItem("rol",res.data.rol)
            window.localStorage.setItem("token",res.data.token)
            navigation("/client");
          } else {
            return setError('Invalid login');
          }
        }).catch((error) => {
          return setError('Invalid login');
        });
      } catch (error) {
        return setError('Invalid login');
      }
    } else {
      return alert("Ingresa el captcha");
    }
  };

  return (
    <div className="login-container">
      <div className="login-img-container">
        <img className="login-logo-img" src={logo} alt="Logo" />
      </div>
      <div className="IDK">
        <span className="login-text">Iniciar sesión</span>
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="login-error">{error.message}</div>}
          <div className="login-form-input-container">
            <input
              type="email"
              name="email"
              className="login-form-input-email"
              placeholder="correoprueba@xxxxx.xxx"
              required
              onChange={handleChange}
            />
          </div>
          <div className="login-form-input-container">
            <input
              type="password"
              name="password"
              className="login-form-input-password"
              placeholder="Contraseña123."
              required
              onChange={handleChange}
            />
          </div>
          <button className="login-button-submit">
            <div className="login-submit">Iniciar sesión</div>
          </button>
        </form>
        <p className="register-link">
          ¿No tienes cuenta?
          <NavLink to="/Auth/Register">Registrate</NavLink>
        </p>
        {/*
        <div className="">
          <p>ó</p>
        </div>

        <button
          onClick={() => {
            if (captcha) {
            } else {
              alert("Ingrese el captcha");
            }
          }}
          className="google-button"
        >
          <div className="google-container">
            <img
              className="google-img"
              src="https://i.ibb.co/xJRLWfJ/gugulnobg-removebg-preview.png"
              alt="google-logo, idk"
            />
            Iniciar sesión con Google
          </div>
        </button>
        <ReCAPTCHA
          sitekey="6LdfsbEpAAAAAIjUfDtKWVnjqnUlqBwg_ArAb5nz"
          onChange={setCaptcha}
        /> */}
      </div>
    </div>
  );
};

export default Login;
