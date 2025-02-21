import { useState } from "react";
import "../assets/index.css";

/* eslint-disable react/prop-types */
const Login = ({ toggleForm }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if (response.ok) {
                setMessage(data.msg);
                window.location.href = data.redirectUrl;
                // Aquí podrías guardar el token en localStorage o en el estado global
            } else {
                setMessage(data.msg);
            }
        } catch (error) {
            console.error(error);
            setMessage("Error al iniciar sesión");
        }
    };

    return (
        <div className="container">
            <h2>Iniciar Sesión</h2>
            <form
                onSubmit={handleSubmit}
                className="form-container2"
                id="loginForm"
            >
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Iniciar sesión</button>
            </form>
            {message && <p>{message}</p>}
            <p>
                No tienes cuenta?{" "}
                <button id="showSignup" onClick={toggleForm}>
                    Regístrate
                </button>
            </p>
        </div>
    );
};

export default Login;
