//Header
function renderizarHeader(basePath = "") {

    const header = document.getElementById("header-placeholder");
    header.classList.add("header");

    // 1. logoContendor
    const logoContendor = document.createElement("div");
    logoContendor.classList.add("logo-contenedor");

    // 2. Logo
    const logo = document.createElement("img");
    logo.classList.add("logo-header");
    logo.src = basePath + "../img/logo/logo-header-blanco.png";
    logo.alt = "logo-header";
    logoContendor.appendChild(logo);


    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "menu-toggle";
    checkbox.classList.add("menu-toggle");

    const label = document.createElement("label");
    label.setAttribute("for", "menu-toggle");
    label.classList.add("btn-hamburguesa");

    const icono = document.createElement("i");
    icono.classList.add("fa-solid", "fa-bars");
    label.appendChild(icono);


    const nav = document.createElement("nav");
    nav.classList.add("nav-header");

    const ul = document.createElement("ul");

    const enlaces = [
        { texto: "Inicio", href: basePath + "../index.html" },
        { texto: "Equipos", href: basePath + "equipo/equipo.html" },
        {texto: "Jugadores", href: basePath + "#"},
        { texto: "Ingresar", href: basePath + "auth.html" },
        { texto: "Perfil", href: basePath + "perfil/perfil.html" }
    ]

    enlaces.forEach(link => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = link.href;
        a.innerText = link.texto;
        a.classList.add(link.clase);


        li.appendChild(a);
        ul.appendChild(li);
    });


    nav.appendChild(ul);

    header.appendChild(logoContendor);
    header.appendChild(checkbox);
    header.appendChild(label);
    header.appendChild(nav);
}

// Footer
function renderizarFooter(basePath = "") {
    const footer = document.getElementById("footer-placeholder");


    const contenedorFooter = document.createElement("div");
    contenedorFooter.classList.add("contenedor-footer");


    const contenedorLogo = document.createElement("div");
    contenedorLogo.classList.add("contenedor-logo");

    const logo = document.createElement("img");
    logo.classList.add("logo-footer");
    logo.src = basePath + "../img/logo/logo-footer.png";
    logo.alt = "logo-footer";

    const contenedorRedes = document.createElement("div");
    contenedorRedes.classList.add("contenedor-redes");

    const tituloRedes = document.createElement("h4");
    tituloRedes.innerHTML = "Nuestra Redes:";
    contenedorRedes.appendChild(tituloRedes);

    const redesSociales = [
        { icono: "fa-instagram", href: "#" },
        { icono: "fa-twitter", href: "#" },
        { icono: "fa-facebook", href: "#" }
    ]

    redesSociales.forEach(red => {
        const a = document.createElement("a");
        a.href = red.href;

        const icono = document.createElement("i");
        icono.classList.add("fa-brands", red.icono);

        a.appendChild(icono);
        contenedorRedes.appendChild(a);
    })


    contenedorLogo.appendChild(logo);
    contenedorLogo.appendChild(contenedorRedes);
    contenedorFooter.appendChild(contenedorLogo);


    const seccionFooter = [
        {
            titulo: "Menu",

            enlaces: [
                { texto: "Principal", href: "../index.html" },
                { texto: "Equipo", href: "../equipo/equipo.html" },
                {texot: "Jugadores", href: "#"}
            ]
        },

        {
            titulo: "Contacto",

            enlaces: [
                { texto: "Email", href: "#" },
                { texto: "WhatsApp", href: "#" }
            ]


        },

        {
            titulo: "Ayuda",
            enlaces: [
                { texto: "Preguntas Frecuentes", href: "#" },
                { texto: "Soporte", href: "#" }
            ]
        }
    ];

    seccionFooter.forEach(tit => {
        const seccion = document.createElement("section");
        seccion.classList.add("footer-seccion");

        const h3 = document.createElement("h3");
        h3.innerText = tit.titulo;

        const nav = document.createElement("nav");
        const ul = document.createElement("ul");

        tit.enlaces.forEach(link => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = link.href;
            a.innerText = link.texto;
            li.appendChild(a);
            ul.appendChild(li);
        });

        nav.appendChild(ul);
        seccion.appendChild(h3);
        seccion.appendChild(nav);
        contenedorFooter.appendChild(seccion);
    });

    const copy = document.createElement("p");
    copy.classList.add("footer-copy");
    copy.innerText = "© 2026 FutCore. Todos los derechos reservados";

    footer.appendChild(contenedorFooter);
    footer.appendChild(copy);

}

