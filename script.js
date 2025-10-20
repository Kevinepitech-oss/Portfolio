document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const data = new FormData(form);

    fetch("https://formspree.io/f/mgvnrlge", {
      method: "POST",
      body: data,
      headers: { "Accept": "application/json" }
    })
    .then((response) => {
      if (response.ok) {
        status.textContent = "✅ Message envoyé avec succès !";
        status.style.color = "var(--neon-2)";
        status.classList.add("visible");
        form.reset();
      } else {
        status.textContent = "⚠️ Une erreur est survenue. Réessaie plus tard.";
        status.style.color = "orange";
        status.classList.add("visible");
      }
    })
    .catch(() => {
      status.textContent = "❌ Erreur réseau. Vérifie ta connexion.";
      status.style.color = "red";
      status.classList.add("visible");
    });
  });
});

