import { Router } from "express";
import { genSalt, hash, compare } from "bcryptjs";
import User from "../models/User.js"; // Importación del modelo de usuario

const router = Router();

// Registro de usuario
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Verificar si el usuario ya existe
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "El usuario ya existe" });

        // Encriptar la contraseña
        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ msg: "Usuario registrado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
});

// Inicio de sesión
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ msg: "Usuario no encontrado" });

        const isMatch = await compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: "Contraseña incorrecta" });

        res.json({
            msg: "Inicio de sesión exitoso",
            redirectUrl: "../../src/pages/pagina.html",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
});

export default router;
