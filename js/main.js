

// ========================================
// SCRIPT PRINCIPAL
// Menú Hamburguesa + Formulario EmailJS
// ========================================

console.log("🚀 SCRIPT CARGADO");

document.addEventListener("DOMContentLoaded", () => {
  console.log("📄 DOM CARGADO");

  // ============================
  // 1️⃣ MENÚ HAMBURGUESA
  // ============================
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("menu-principal");

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", () => {
      hamburgerBtn.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    document.querySelectorAll("#menu-principal a").forEach(link => {
      link.addEventListener("click", () => {
        hamburgerBtn.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  } else {
    console.error("❌ Menú no encontrado");
  }

  // ============================
  // 2️⃣ FORMULARIO EMAILJS
  // ============================

  const PUBLIC_KEY = "VqXCrDnYSCZpB1QxD";
  const SERVICE_ID = "service_naokga1";
  const TEMPLATE_ID = "template_sozuj1u";

  if (typeof emailjs === "undefined") {
    console.error("❌ EmailJS no cargado");
    return;
  }

  emailjs.init(PUBLIC_KEY);
  console.log("✅ EmailJS listo");

  const form = document.querySelector(".contacto-form");

  if (!form) {
    console.error("❌ Formulario no encontrado");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // ✅ Validación HTML nativa
    if (!form.checkValidity()) {
      alert("❌ Revisa los campos del formulario");
      return;
    }

    // ✅ Captura automática de datos
    const formData = new FormData(form);
    const datos = Object.fromEntries(formData.entries());

    console.log("📨 Datos enviados:", datos);

    const btn = form.querySelector("button[type='submit']");
    const textoOriginal = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Enviando...";

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, datos);
      alert("✅ Mensaje enviado correctamente");
      form.reset();
    } catch (error) {
      console.error("❌ Error al enviar:", error);
      alert("❌ No se pudo enviar el mensaje");
    } finally {
      btn.disabled = false;
      btn.textContent = textoOriginal;
    }
  });
});
