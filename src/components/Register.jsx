import { useState } from "react";
import "../assets/index.css";

/* eslint-disable react/prop-types */
const Register = ({ toggleForm }) => {
    const [formData, setFormData] = useState({
        username: "",
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
                "http://localhost:5000/api/auth/register",
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
            } else {
                setMessage(data.msg);
            }
        } catch (error) {
            console.error(error);
            setMessage("Error al registrar el usuario");
        }
    };

    return (
        <div className="container">
            <h2>Registrar Usuario</h2>
            <form
                onSubmit={handleSubmit}
                className="form-container2"
                id="signupForm"
            >
                <div>
                    <label>Nombre de usuario:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
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
                <button type="submit">Registrar</button>
            </form>
            {message && <p>{message}</p>}
            <p>
                ¿Ya tienes cuenta?{" "}
                <button id="showLogin" onClick={toggleForm}>
                    Iniciar sesión
                </button>
            </p>
        </div>
    );
};

export default Register;
