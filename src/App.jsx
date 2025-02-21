import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./components/Login.jsx";
import Signup from "./components/Register.jsx";

function App() {
    const [showLogin, setShowLogin] = useState(true);

    const toggleForm = () => {
        setShowLogin(!showLogin);
    };

    return (
        <div className={`form-container ${showLogin ? "active" : ""}`}>
            <AnimatePresence mode="wait">
                {showLogin ? (
                    <motion.div
                        key="login"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Login toggleForm={toggleForm} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="signup"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Signup toggleForm={toggleForm} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;
