export async function login(username, password) {
    try {
        const response = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("jwt", data.token);
            alert("Login exitoso");
        } else {
            alert("Error en el login");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function createUser(username, email, password) {
    try {
        const response = await fetch("http://localhost:5000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        if (response.ok) {
            alert("Registro exitoso");
        } else {
            alert("Error en el registro");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
