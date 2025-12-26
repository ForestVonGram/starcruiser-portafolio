// === DICCIONARIO DE TRADUCCIONES ===
// Puedes ampliar este objeto con más claves según lo necesites.
const translations = {
  es: {
    // Navbar
    nav_home: "Inicio",
    nav_about: "Acerca de",
    nav_services: "Servicios",
    nav_projects: "Proyectos",
    nav_contact: "Contacto",

    // Hero
    hero_title: "Bienvenido, esto es <span>Cruiserex</span>",
    hero_subtitle: "Soluciones de Software de cualquier tipo, enfocadas en lo mejor para los clientes.",
    hero_button: "Agendar cita",

    // Acerca de
    about_title: "Acerca de",
    about_text: "Cruiserex es una empresa unipersonal fundada por David G. R., dedicada al desarrollo de aplicaciones y software a la medida de las necesidades de cada cliente. Se enfoca en crear soluciones que combinan rendimiento, usabilidad y un diseño funcional.",

    // Servicios
    services_title: "Servicios",
    software_service: "Desarrollo de Software",
    software_service_text: "Aplicaciones web o de escritorio adaptadas a tus necesidades, con buenas prácticas y tecnologías modernas.",
    api_service: "Creación de APIs",
    api_service_text: "Diseño e implementación de APIs REST seguras y escalables para conectar tus servicios y aplicaciones.",
    maintenance_service: "Mantenimiento de Software",
    maintenance_service_text: "Mantenimiento preventivo y correctivo de aplicaciones y sistemas, para mantenerlos en funcionamiento y actualizados.",
    consultancy_service: "Consultoría técnica",
    consultancy_service_text: "Asesoramiento en arquitectura de software, bases de datos y optimización de procesos tecnológicos.",
    infrastructure_service: "Infraestructura de redes",
    infrastructure_service_text: "Montaje de sistemas de redes y comunicaciones, configuración de direcciones y asesoramiento.",

    // Proyectos
    projects_title: "Proyectos",
    hospedaya_text: "Plataforma de gestión de alojamientos, desarrollada con Spring Boot y Angular. Backend desplegado en Render y Frontend en Netlify.",
    cruiserex_portfolio: "Portafolio Cruiserex",
    cruiserex_portfolio_text: "Página web donde se observan los servicios que ofrece la empresa.",
    motorplus_workshop: "Taller automotriz Motorplus",
    motorplus_workshop_text: "Plataforma de gestión de usuarios, vehículos, mecánicos, repuestos, órdenes, facturas y generación de reportes.",
    computienda_text: "Tienda virtual de computadoras, con catálogo, compras en línea y contacto.",

    // Contacto
    contact_title: "Contacto",
    contact_text: "¿Requieres mayor información?",
    phone_number: "Teléfono de contacto: +57 301 7275512",

    // Appointment page
    appointment_title: "Agendar cita",
    appointment_intro: "Llena el siguiente formulario para solicitar una cita virtual con Cruiserex.",
    appointment_date_label: "Día",
    appointment_time_label: "Hora",
    appointment_requester_label: "Nombre del solicitante",
    appointment_company_label: "Nombre de la empresa",
    appointment_location_label: "Ubicación de la empresa",
    appointment_phone_label: "Teléfono",
    appointment_email_label: "Correo electrónico",
    appointment_reason_label: "Motivo de la cita",
    appointment_submit_button: "Confirmar cita",

    // Admin page
    admin_title: "Administración de citas",
    admin_intro: "Esta sección es solo para uso interno. Aquí puedes revisar y gestionar las citas agendadas.",
    admin_login_title: "Iniciar sesión como administrador",
    admin_login_text: "Ingresa la clave de administrador configurada en las variables de entorno (ADMIN_SECRET).",
    admin_login_label: "Clave de administrador",
    admin_login_button: "Ingresar",
    admin_panel_title: "Citas actuales",
    admin_logout_button: "Cerrar sesión",
    admin_th_date: "Fecha",
    admin_th_time: "Hora",
    admin_th_requester: "Solicitante",
    admin_th_company: "Empresa",
    admin_th_location: "Ubicación",
    admin_th_phone: "Teléfono",
    admin_th_email: "Correo",
    admin_th_status: "Estado",
    admin_th_actions: "Acciones",

    // Mensajes de la página de citas
    appointment_sending: "Enviando cita...",
    appointment_past_datetime_error: "La fecha y la hora deben ser posteriores al momento actual.",
    appointment_generic_error: "Ocurrió un error al enviar la cita. Inténtalo de nuevo más tarde.",
    appointment_backend_error: "No se pudo crear la cita",
    appointment_success_popup: "La cita se ha agendado correctamente. Recibirás un mensaje de confirmación a tu correo.",
  },
  en: {
    // Navbar
    nav_home: "Home",
    nav_about: "About",
    nav_services: "Services",
    nav_projects: "Projects",
    nav_contact: "Contact",

    // Hero
    hero_title: "Welcome, this is <span>Cruiserex</span>",
    hero_subtitle: "Software solutions of any kind, focused on what is best for our clients.",
    hero_button: "Book an appointment",

    // About
    about_title: "About",
    about_text: "Cruiserex is a sole proprietorship founded by David G. R., dedicated to developing custom applications and software tailored to each client's needs. It focuses on creating solutions that combine performance, usability, and functional design.",

    // Services
    services_title: "Services",
    software_service: "Software Development",
    software_service_text: "Web or desktop applications tailored to your needs, built with good practices and modern technologies.",
    api_service: "API Development",
    api_service_text: "Design and implementation of secure, scalable REST APIs to connect your services and applications.",
    maintenance_service: "Software Maintenance",
    maintenance_service_text: "Preventive and corrective maintenance for applications and systems to keep them running and up to date.",
    consultancy_service: "Technical Consulting",
    consultancy_service_text: "Advice on software architecture, databases and optimization of technological processes.",
    infrastructure_service: "Network Infrastructure",
    infrastructure_service_text: "Deployment of network and communication systems, address configuration and technical guidance.",

    // Projects
    projects_title: "Projects",
    hospedaya_text: "Accommodation management platform built with Spring Boot and Angular. Backend deployed on Render and frontend on Netlify.",
    cruiserex_portfolio: "Cruiserex Portfolio",
    cruiserex_portfolio_text: "Website where you can see the services offered by the company.",
    motorplus_workshop: "Motorplus Automotive Workshop",
    motorplus_workshop_text: "Management platform for users, vehicles, mechanics, spare parts, work orders, invoices and reporting.",
    computienda_text: "Online computer store with catalog, online purchases and contact.",

    // Contact
    contact_title: "Contact",
    contact_text: "Do you need more information?",
    phone_number: "Contact phone: +57 301 7275512",

    // Appointment page
    appointment_title: "Book an appointment",
    appointment_intro: "Fill out the following form to request a virtual appointment with Cruiserex.",
    appointment_date_label: "Day",
    appointment_time_label: "Time",
    appointment_requester_label: "Requester name",
    appointment_company_label: "Company name",
    appointment_location_label: "Company location",
    appointment_phone_label: "Phone",
    appointment_email_label: "Email",
    appointment_reason_label: "Appointment reason",
    appointment_submit_button: "Confirm appointment",

    // Admin page
    admin_title: "Appointment administration",
    admin_intro: "This section is for internal use only. Here you can review and manage scheduled appointments.",
    admin_login_title: "Admin sign in",
    admin_login_text: "Enter the administrator key configured in the environment variables (ADMIN_SECRET).",
    admin_login_label: "Administrator key",
    admin_login_button: "Sign in",
    admin_panel_title: "Current appointments",
    admin_logout_button: "Sign out",
    admin_th_date: "Date",
    admin_th_time: "Time",
    admin_th_requester: "Requester",
    admin_th_company: "Company",
    admin_th_location: "Location",
    admin_th_phone: "Phone",
    admin_th_email: "Email",
    admin_th_status: "Status",
    admin_th_actions: "Actions",

    // Appointment page messages
    appointment_sending: "Sending appointment...",
    appointment_past_datetime_error: "The date and time must be later than the current moment.",
    appointment_generic_error: "An error occurred while sending the appointment. Please try again later.",
    appointment_backend_error: "The appointment could not be created",
    appointment_success_popup: "The appointment has been scheduled successfully. You will receive a confirmation email shortly.",
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".scroll-anim");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    })
  }, {
    threshold: 0.5
  });

  sections.forEach(section => observer.observe(section))
});

const navToggle = document.querySelector('.nav-toggle');
const navClose = document.querySelector('.nav-close button');
const navLinks = document.querySelector('.nav-links');
const navOverlay = document.querySelector('.nav-overlay');
const langBtn = document.getElementById('langBtn');

function toggleMenu() {
  navLinks.classList.toggle('show');
  navOverlay.classList.toggle('show');
}
navToggle.addEventListener('click', toggleMenu);
navClose.addEventListener('click', toggleMenu);
navOverlay.addEventListener('click', toggleMenu);

const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('show');
    navOverlay.classList.remove('show');
  });
});

// === ANIMACIÓN DE CARGA ===
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  // Esperar 1.5 segundos y luego desvanecer
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 1500);
});

// === CAMBIO DE IDIOMA ===
function changeLang(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const translation = translations[lang] && translations[lang][key];

    if (translation) {
      el.innerHTML = translation;
    }
  });

  localStorage.setItem("lang", lang); // Guardar idioma
}

function applyLang(lang) {
  changeLang(lang);

  if (langBtn) {
    // Marcamos el idioma actual en un atributo de datos
    langBtn.dataset.currentLang = lang;
    // Mostramos el texto del otro idioma como "switch"
    langBtn.textContent = lang === 'es' ? 'EN' : 'ES';
  }
}

// Cargar idioma al iniciar y configurar el switch
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "es";
  applyLang(savedLang);

  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const current = langBtn.dataset.currentLang || 'es';
      const next = current === 'es' ? 'en' : 'es';
      applyLang(next);
    });
  }
});
