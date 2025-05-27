// Sticky header hide on scroll
let lastScroll = 0;
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > 80) {
        header.style.transform = 'translateY(-130px)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});

// Carrusel de imágenes de vapers
const imagenesCarrusel = [
    "Carrusel1.png", // Nueva imagen para VS STORE
    "Basito.png",
    "Priv.png",
    "Phone.png",
    "Snoopy.png",
    "Solars.png"
];
let idxCarrusel = 0;
const imgCarrusel = document.getElementById('img-carrusel');
const prevBtn = document.getElementById('prev-carrusel');
const nextBtn = document.getElementById('next-carrusel');
const dotsCarrusel = document.getElementById('dots-carrusel');

function mostrarImagenCarrusel(idx) {
    imgCarrusel.src = imagenesCarrusel[idx];
    dotsCarrusel.innerHTML = "";
    imagenesCarrusel.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.style = `display:inline-block;width:10px;height:10px;border-radius:50%;background:${i === idx ? '#fff' : '#555'};cursor:pointer;`;
        dot.onclick = () => { idxCarrusel = i; mostrarImagenCarrusel(idxCarrusel); };
        dotsCarrusel.appendChild(dot);
    });
}
prevBtn.onclick = () => {
    idxCarrusel = (idxCarrusel - 1 + imagenesCarrusel.length) % imagenesCarrusel.length;
    mostrarImagenCarrusel(idxCarrusel);
};
nextBtn.onclick = () => {
    idxCarrusel = (idxCarrusel + 1) % imagenesCarrusel.length;
    mostrarImagenCarrusel(idxCarrusel);
};
setInterval(() => {
    idxCarrusel = (idxCarrusel + 1) % imagenesCarrusel.length;
    mostrarImagenCarrusel(idxCarrusel);
}, 5000);
mostrarImagenCarrusel(idxCarrusel);

// Productos de ejemplo
const productos = [
    {
        id: 1,
        nombre: "Vaper Basito (EASE)",
        precio: 35,
        img: "Basito.png",
        descripcion: "Vaper Basito EASE: compacto, fácil de usar y recargable. Ideal para quienes buscan practicidad y buen sabor.",
        detalles: "Batería de 650mAh, recargable por USB, 2ml de capacidad, sistema de pods intercambiables."
    },
    {
        id: 2,
        nombre: "Vape Priv Var",
        precio: 50,
        img: "Priv.png",
        descripcion: "Vape Priv Var: potencia ajustable y diseño robusto. Perfecto para quienes buscan personalización.",
        detalles: "Batería de 1600mAh, potencia variable, pantalla LED, tanque de 3ml."
    },
    {
        id: 3,
        nombre: "Vape Hello Sinix",
        precio: 45,
        img: "Phone.png",
        descripcion: "Vape Hello Sinix: moderno, seguro y con gran producción de vapor. Experiencia premium.",
        detalles: "Batería de 1200mAh, protección múltiple, carga rápida, tanque de 2.5ml."
    },
    {
        id: 4,
        nombre: "Snoopy Smoke",
        precio: 35,
        img: "Snoopy.png",
        descripcion: "Snoopy Smoke: edición especial con diseño único y divertido. Ideal para coleccionistas.",
        detalles: "Batería de 1500mAh, 800 caladas, edición limitada Snoopy, recargable."
    },
    {
        id: 5,
        nombre: "Vape Solars",
        precio: 120,
        img: "Solars.png",
        descripcion: "Vape Solars: innovador, elegante y eficiente. Batería de larga duración, diseño solar y tecnología avanzada.",
        detalles: "Batería de 3000mAh, carga solar, pantalla táctil, 2000 caladas."
    },
    {
        id: 6,
        nombre: "Vaper Classic",
        precio: 25,
        img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
        descripcion: "Vaper Classic: sabor clásico, elegante y sencillo. Perfecto para quienes inician en el vapeo.",
        detalles: "Batería de 1000mAh, recargable, 500 caladas."
    }
];

let carrito = [];

function mostrarProductos(filtro = "") {
    const cont = document.getElementById('productos');
    cont.innerHTML = "";
    const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(filtro.toLowerCase()));
    if (filtrados.length === 0) {
        cont.innerHTML = "<p style='color:#888;text-align:center;'>No se encontraron productos.</p>";
        return;
    }
    filtrados.forEach(prod => {
        const div = document.createElement('div');
        div.className = 'producto';
        div.onclick = () => mostrarModal(prod);
        div.innerHTML = `
            <img src="${prod.img}" alt="${prod.nombre}">
            <div class="producto-info">
                <h3>${prod.nombre}</h3>
                <p>${prod.descripcion}</p>
                <div class="precio">$${prod.precio}</div>
                <button onclick="event.stopPropagation(); agregarAlCarrito(${prod.id})">Añadir</button>
            </div>
        `;
        cont.appendChild(div);
    });
}

function agregarAlCarrito(id) {
    const prod = productos.find(p => p.id === id);
    const item = carrito.find(i => i.id === id);
    if (item) {
        item.cantidad++;
    } else {
        carrito.push({ ...prod, cantidad: 1 });
    }
    actualizarCarrito();
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(i => i.id !== id);
    actualizarCarrito();
}

function actualizarCarrito() {
    const ul = document.getElementById('carrito-lista');
    ul.innerHTML = '';
    let total = 0;
    carrito.forEach(item => {
        const li = document.createElement('li');
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        li.innerHTML = `
            <span>${item.nombre} x${item.cantidad} - $${subtotal}</span>
            <button style="background:none;border:none;color:#fff;font-size:1.2em;cursor:pointer;" onclick="eliminarDelCarrito(${item.id})">&times;</button>
        `;
        ul.appendChild(li);
    });
    document.getElementById('total').innerText = `Total: $${total}`;
}

document.getElementById('pagar').onclick = function () {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    guardarCompraEnUsuario(carrito);
    alert("Compra realizada con éxito.");
    carrito = [];
    actualizarCarrito();
    window.open("https://www.pse.com.co/persona", "_blank");
};

document.getElementById('stripe-pagar').onclick = function () {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    window.open("https://buy.stripe.com/test_00g6qQ4gQ1lQ1kA4gg", "_blank");
};

// Barra de búsqueda
document.getElementById('busqueda').addEventListener('input', function () {
    mostrarProductos(this.value);
});

// Modal de detalles
function mostrarModal(prod) {
    const modal = document.createElement('div');
    modal.id = "modal";
    modal.style = `
        position:fixed;top:0;left:0;width:100vw;height:100vh;background:#000a;display:flex;align-items:center;justify-content:center;z-index:1000;
    `;
    modal.innerHTML = `
        <div style="background:#222;padding:2em;border-radius:18px;max-width:350px;text-align:center;position:relative;">
            <button onclick="document.body.removeChild(document.getElementById('modal'))" style="position:absolute;top:10px;right:15px;background:none;border:none;color:#fff;font-size:1.5em;cursor:pointer;">&times;</button>
            <img src="${prod.img}" alt="${prod.nombre}" style="width:120px;height:120px;object-fit:cover;border-radius:14px;border:2px solid #333;background:#222;">
            <h2 style="color:#fff;margin:0.7em 0 0.2em 0;">${prod.nombre}</h2>
            <div style="color:#bbb;margin-bottom:0.7em;">${prod.descripcion}</div>
            <div style="color:#aaa;font-size:0.95em;margin-bottom:1em;">${prod.detalles}</div>
            <div style="color:#fff;font-weight:bold;font-size:1.2em;">$${prod.precio}</div>
            <button onclick="agregarAlCarrito(${prod.id});document.body.removeChild(document.getElementById('modal'))" style="margin-top:1em;background:#fff;color:#111;border:none;padding:0.6em 1.5em;border-radius:20px;font-size:1em;font-weight:bold;cursor:pointer;">Añadir al carrito</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// --- Usuario y registro (solo frontend, simulado en localStorage) ---
const userModal = document.getElementById('user-modal');
const userForm = document.getElementById('user-form');
const userModalTitle = document.getElementById('user-modal-title');
const userModalSwitch = document.getElementById('user-modal-switch');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfo = document.getElementById('user-info');
let usuarioActual = localStorage.getItem('vsc_user') || null;
let modoRegistro = false;

function abrirUserModal(registro = false) {
    modoRegistro = registro;
    userModal.style.display = "flex";
    userModalTitle.textContent = registro ? "Registrarse" : "Iniciar sesión";
    userForm.reset();
    userModalSwitch.innerHTML = registro
        ? '¿Ya tienes cuenta? <a href="#" id="switch-to-login">Inicia sesión</a>'
        : '¿No tienes cuenta? <a href="#" id="switch-to-register">Regístrate</a>';
    setTimeout(() => {
        document.getElementById(registro ? 'switch-to-login' : 'switch-to-register')
            .onclick = () => abrirUserModal(!registro);
    }, 50);
}
function cerrarUserModal() {
    userModal.style.display = "none";
}
document.getElementById('close-user-modal').onclick = cerrarUserModal;
loginBtn.onclick = () => abrirUserModal(false);
registerBtn.onclick = () => abrirUserModal(true);

userForm.onsubmit = function (e) {
    e.preventDefault();
    const u = document.getElementById('user-username').value.trim();
    const p = document.getElementById('user-password').value.trim();
    let users = JSON.parse(localStorage.getItem('vsc_users') || "{}");
    if (modoRegistro) {
        if (users[u]) {
            alert("Ese usuario ya existe.");
            return;
        }
        users[u] = { pass: p, compras: [] };
        localStorage.setItem('vsc_users', JSON.stringify(users));
        alert("¡Usuario registrado! Ahora puedes iniciar sesión.");
        abrirUserModal(false);
    } else {
        if (users[u] && users[u].pass === p) {
            usuarioActual = u;
            localStorage.setItem('vsc_user', u);
            cerrarUserModal();
            actualizarMenuUsuario();
            alert("¡Bienvenido " + u + "!");
        } else {
            alert("Usuario o contraseña incorrectos.");
        }
    }
};

logoutBtn.onclick = () => {
    usuarioActual = null;
    localStorage.removeItem('vsc_user');
    actualizarMenuUsuario();
};

document.getElementById('google-login-btn').onclick = function () {
    // Simulación de login con Google
    setTimeout(() => {
        usuarioActual = "UsuarioGoogle";
        localStorage.setItem('vsc_user', usuarioActual);
        cerrarUserModal();
        actualizarMenuUsuario();
        alert("¡Has iniciado sesión con Google!");
    }, 800);
};

// FAQ
const faqBtn = document.getElementById('faq-btn');
const faqModal = document.getElementById('faq-modal');
const faqBody = document.getElementById('faq-modal-body');
faqBtn.onclick = () => {
    faqBody.innerHTML = `
        <b>¿Cómo compro?</b><br>Puedes añadir productos al carrito y pagar con PSE o Stripe.<br><br>
        <b>¿Hacen envíos?</b><br>Sí, a todo el país.<br><br>
        <b>¿Cómo contacto soporte?</b><br>Usa el botón de WhatsApp o el asistente IA.<br><br>
        <b>¿Necesito cuenta?</b><br>No, pero si te registras puedes ver tus compras.
    `;
    faqModal.classList.add('show');
};
function cerrarFaqModal() { faqModal.classList.remove('show'); }

// --- IA Assistant Chatbot ---
const iaBtn = document.getElementById('ia-assistant-btn');
const iaBox = document.getElementById('ia-chatbox');
const iaInput = document.getElementById('ia-input');
const iaSend = document.getElementById('ia-send');
const iaMsgs = document.getElementById('ia-chatbox-messages');

const preguntasFrecuentes = [
    {
        pregunta: "¿Cómo compro?",
        respuesta: "Puedes añadir productos al carrito y pagar con PSE o Stripe."
    },
    {
        pregunta: "¿Hacen envíos?",
        respuesta: "Sí, realizamos envíos a todo el país."
    },
    {
        pregunta: "¿Cómo contacto soporte?",
        respuesta: "Puedes usar el botón de WhatsApp o este asistente para contactarnos."
    },
    {
        pregunta: "¿Necesito cuenta?",
        respuesta: "No es obligatorio, pero si te registras puedes ver tus compras."
    },
    {
        pregunta: "¿Qué métodos de pago aceptan?",
        respuesta: "Aceptamos pagos por PSE y Stripe (tarjeta de crédito/débito)."
    }
];

// Mostrar preguntas frecuentes como botones en el chat
function mostrarPreguntasChat() {
    iaMsgs.innerHTML += `<div style="margin:8px 0;color:#fff;">Selecciona una pregunta frecuente:</div>`;
    preguntasFrecuentes.forEach((item, idx) => {
        const btn = document.createElement('button');
        btn.textContent = item.pregunta;
        btn.style = "margin:4px 0;padding:0.5em 1em;border-radius:12px;border:none;background:#635bff;color:#fff;cursor:pointer;display:block;width:100%;text-align:left;";
        btn.onclick = () => responderPreguntaFrecuente(idx);
        iaMsgs.appendChild(btn);
    });
    iaMsgs.scrollTop = iaMsgs.scrollHeight;
}

function responderPreguntaFrecuente(idx) {
    const item = preguntasFrecuentes[idx];
    iaMsgs.innerHTML += `<div style="color:#fff;margin:6px 0;">Tú: ${item.pregunta}</div>`;
    iaMsgs.innerHTML += `<div style="color:#8ef;margin:6px 0;">VSC IA: ${item.respuesta}</div>`;
    mostrarPreguntasChat();
    iaMsgs.scrollTop = iaMsgs.scrollHeight;
}

// Modifica el botón del robot para mostrar preguntas frecuentes al abrir
iaBtn.onclick = () => {
    iaBox.style.display = iaBox.style.display === "flex" ? "none" : "flex";
    if (iaBox.style.display === "flex") {
        iaMsgs.innerHTML = "";
        mostrarPreguntasChat();
    }
    iaMsgs.scrollTop = iaMsgs.scrollHeight;
};

// Si quieres mantener la opción de escribir preguntas libres, puedes dejar el input y botón activos,
// pero ahora el flujo principal será por preguntas frecuentes.

// Inicializa productos y carrito
mostrarProductos();
actualizarCarrito();

