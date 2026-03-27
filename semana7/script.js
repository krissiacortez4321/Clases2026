document.addEventListener("DOMContentLoaded", () => {
    const obtenerusuarios = () => JSON.parse(localStorage.getItem("usuarios")) || [];
    const guardarUsuario = (usuarios) => localStorage.setItem("usuarios", JSON.stringify(usuarios));
    const setsession = (email) => localStorage.setItem("usuario-email", email);
    const getSession = () => localStorage.getItem("usuario-email");
    const cerrarsesion = () => {
        localStorage.removeItem("usuario-email");
        window.location.href = "index.html";
    };
    const path = window.location.pathname;

    
    if(path.includes("indexedDB.html") || path === "/"){
        document.getElementById("login-form").addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            const error = document.getElementById("error-message");

            const usuario = obtenerusuarios().find(u => u.email === email && u.password === password);

            if (usuario) {
                setsession(email);
                window.location.href = "bienvenida.html";
            } else {
                error.innerHTML = "Correo o contraseña incorrectos";
            }
        });
    }

    
    if (path.includes("registro.html")) {
        document.getElementById("registro-form").addEventListener("submit", (e) => {
            e.preventDefault();
            const nombre = document.getElementById("nombre").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            const error = document.getElementById("error-message");

            if(!nombre || !email || !password) {
                error.innerHTML = "Todos los campos son obligatorios";
                return;
            }
            let usuarios = obtenerusuarios();
            if (usuarios.some(u => u.email === email)) {
                error.innerHTML = "El correo ya está registrado";
                return;
            }
            usuarios.push({ nombre, email, password });
            guardarUsuario(usuarios);
            setsession(email);
            window.location.href = "bienvenida.html";
        });
    }

   
    if (path.includes("bienvenida.html")) {
        const email = getSession();
        if (!email) {
            window.location.href = "index.html";
        }
        const usuario = obtenerusuarios().find(u => u.email === email);
        if (usuario) {
            document.getElementById("nombre-usuario").textContent = usuario.nombre;
        }
        document.getElementById("logout").addEventListener("click", cerrarsesion);
    }
});