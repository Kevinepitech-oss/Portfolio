document.addEventListener("DOMContentLoaded", () => {
  let currentLang = localStorage.getItem('lang') || 'fr'; 
  const langBtn = document.getElementById('lang-btn');
  const langText = document.getElementById('lang-toggle-text');
  if(langBtn && langText) {
    const updateLangText = () => {
        const displayTxt = currentLang === 'fr' ? 'EN' : 'FR';
        langText.textContent = displayTxt;
        langText.setAttribute('data-text', displayTxt); 
    };
    updateLangText(); 
    langBtn.addEventListener('click', (e) => {
      e.preventDefault(); currentLang = currentLang === 'fr' ? 'en' : 'fr';
      localStorage.setItem('lang', currentLang); updateLangText(); renderContent(); 
    });
  }
  function renderContent() {
    if (typeof portfolioData === 'undefined') return;
    const data = portfolioData[currentLang]; const config = portfolioData.config;    
    document.querySelectorAll('.nav-links > a').forEach(link => {
      const href = link.getAttribute('href');
      if(href === 'index.html') link.textContent = data.nav.home;
      if(href === 'profil.html') link.textContent = data.nav.profile;
      if(href === 'skills.html') link.textContent = data.nav.skills;
      if(href === 'projects.html') link.textContent = data.nav.projects;
      if(href === 'contact.html') link.textContent = data.nav.contact;
    });
    const footer = document.querySelector('.footer p');
    if(footer) footer.textContent = data.footer;
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
      heroTitle.textContent = data.hero.title;
      document.getElementById('hero-subtitle').innerHTML = data.hero.subtitle;
      document.getElementById('hero-btn-profile').innerHTML = `${data.hero.btnProfile} <i class="fa-solid fa-arrow-right" style="margin-left: 8px;"></i>`;
      const cvBtn = document.getElementById('hero-btn-cv');
      cvBtn.innerHTML = `<i class="fa-solid fa-file-pdf" style="margin-right: 8px;"></i> ${data.hero.btnCv}`;
      cvBtn.setAttribute('href', config.cvUrl); 
      document.getElementById('features-title').textContent = data.features.title;
      document.getElementById('features-subtitle').textContent = data.features.subtitle;
      const featuresContainer = document.getElementById('dynamic-features');
      featuresContainer.innerHTML = ''; 
      data.features.items.forEach((item, index) => {
        featuresContainer.innerHTML += `<div class="expertise-card reveal active" style="transition-delay: 0.${index+1}s;"><i class="fa-solid ${item.icon}"></i><h3>${item.title}</h3><p>${item.text}</p></div>`;
      });
    }
    const profileHeader = document.getElementById('profile-header-title');
    if (profileHeader) {
      profileHeader.textContent = data.profilePage.headerTitle;
      document.getElementById('profile-header-subtitle').textContent = data.profilePage.headerSubtitle;
      const expTitle = document.getElementById('timeline-exp-title');
      if(expTitle) {
        expTitle.textContent = data.experience.title;
        document.getElementById('timeline-exp-subtitle').textContent = data.experience.subtitle;
        const expContainer = document.getElementById('dynamic-timeline-exp');
        expContainer.innerHTML = '';
        data.experience.items.forEach((item, index) => {
          expContainer.innerHTML += `
            <div class="timeline-item reveal active" style="transition-delay: 0.${index+1}s;">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <span class="timeline-date">${item.date}</span>
                <h3>${item.title}</h3>
                <h4>${item.subtitle}</h4>
                <p>${item.description}</p>
              </div>
            </div>`;
        });
      }
      const eduTitle = document.getElementById('timeline-edu-title');
      if(eduTitle) {
        eduTitle.textContent = data.education.title;
        document.getElementById('timeline-edu-subtitle').textContent = data.education.subtitle;
        const eduContainer = document.getElementById('dynamic-timeline-edu');
        eduContainer.innerHTML = '';
        data.education.items.forEach((item, index) => {
          eduContainer.innerHTML += `
            <div class="timeline-item reveal active" style="transition-delay: 0.${index+1}s;">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <span class="timeline-date">${item.date}</span>
                <h3>${item.title}</h3>
                <h4>${item.subtitle}</h4>
                <p>${item.description}</p>
              </div>
            </div>`;
        });
      }
      const passionsTitle = document.getElementById('passions-title');
      if(passionsTitle) {
        passionsTitle.textContent = data.passions.title;
        document.getElementById('passions-subtitle').textContent = data.passions.subtitle;
        const passionsContainer = document.getElementById('dynamic-passions');
        passionsContainer.innerHTML = '';
        data.passions.items.forEach((item, index) => {
          const imgTag = `<img src="${item.imageSrc}" alt="${item.title}" class="passion-img"><div class="passion-overlay"></div>`;
          passionsContainer.innerHTML += `
            <div class="passion-card reveal active" style="transition-delay: 0.${index+1}s;" onclick="this.classList.toggle('is-open')">
              ${imgTag}
              <div class="passion-info">
                <div class="passion-header">
                  <h3><i class="fa-solid ${item.icon}"></i> ${item.title}</h3>
                  <i class="fa-solid fa-chevron-down passion-toggle-icon"></i>
                </div>
                <div class="passion-desc">
                  <p>${item.description}</p>
                </div>
              </div>
            </div>`;
        });
      }
    }
    const skillsHeader = document.getElementById('skills-header-title');
    if (skillsHeader) {
      skillsHeader.textContent = data.skillsPage.headerTitle;
      document.getElementById('skills-header-subtitle').textContent = data.skillsPage.headerSubtitle;
      document.getElementById('skills-section-subtitle').textContent = data.skillsPage.sectionSubtitle;
      document.getElementById('skills-btn-projects').innerHTML = `${data.skillsPage.btnProjects} <i class="fa-solid fa-arrow-right" style="margin-left: 8px;"></i>`;
      const skillsContainer = document.getElementById('dynamic-skills');
      skillsContainer.innerHTML = ''; 
      const generateCategoryHTML = (title, iconClass, delay, skillsArray, isSpecial = false) => {
        let tagsHTML = ''; skillsArray.forEach(skill => { tagsHTML += `<span style="--hover-color: ${skill.color};"><i class="fa-brands ${skill.icon} fa-solid"></i> ${skill.name}</span>`; });
        const specialClass = isSpecial ? 'skill-card-special' : '';
        const subtitle = isSpecial ? `<p style="font-size: 0.85rem; margin-bottom: 15px;" class="info-item-p">${data.skillsPage.categories.cyberSubtitle}</p>` : '';
        return `<div class="skill-card ${specialClass} reveal active" style="transition-delay: ${delay}s;"><div class="skill-card-header"><i class="fa-solid ${iconClass}" style="color: var(--accent-primary);"></i> ${title}</div>${subtitle}<div class="stack-icons">${tagsHTML}</div></div>`;
      };
      skillsContainer.innerHTML += generateCategoryHTML(data.skillsPage.categories.frontend, "fa-desktop", 0.1, data.skills.frontend);
      skillsContainer.innerHTML += generateCategoryHTML(data.skillsPage.categories.backend, "fa-server", 0.2, data.skills.backend);
      skillsContainer.innerHTML += generateCategoryHTML(data.skillsPage.categories.devops, "fa-gears", 0.3, data.skills.devops);
      skillsContainer.innerHTML += generateCategoryHTML(data.skillsPage.categories.cyber, "fa-crosshairs", 0.4, data.skills.cybersecurity, true);
    }
    const projectsHeader = document.getElementById('projects-header-title');
    if (projectsHeader) {
      projectsHeader.textContent = data.projectsPage.headerTitle; document.getElementById('projects-header-subtitle').textContent = data.projectsPage.headerSubtitle; document.getElementById('major-title').textContent = data.projectsPage.majorTitle; document.getElementById('major-subtitle').textContent = data.projectsPage.majorSubtitle; document.getElementById('minor-title').textContent = data.projectsPage.minorTitle; document.getElementById('minor-subtitle').textContent = data.projectsPage.minorSubtitle;
      const majorContainer = document.getElementById('dynamic-major-projects'); majorContainer.innerHTML = '';
      data.projects.major.forEach(project => {
        const reverseClass = project.reverse ? 'reverse' : '';
        majorContainer.innerHTML += `<div class="case-study ${reverseClass} reveal active"><div class="case-text"><span class="badge">${project.badge}</span><h3>${project.title}</h3><p>${project.description}</p><a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-secondary"><i class="fa-brands fa-github" style="margin-right: 8px;"></i> ${data.projectsPage.btnCode}</a></div><div class="case-image"><div class="placeholder-img"><i class="fa-solid ${project.icon}"></i></div></div></div>`;
      });
      const minorContainer = document.getElementById('dynamic-minor-projects'); minorContainer.innerHTML = '';
      data.projects.minor.forEach((project, index) => {
        const delay = (index + 1) * 0.1;
        const mediaHTML = project.image ? `<img src="${project.image}" alt="${project.title}">` : `<i class="fa-solid ${project.icon}"></i>`;
        minorContainer.innerHTML += `
          <div class="work-card reveal active" style="transition-delay: ${delay}s;" onclick="window.open('${project.githubUrl}', '_blank')">
            <div class="card-img">${mediaHTML}</div>
            <div class="card-content">
              <h4>${project.title}</h4>
              <p>${project.description}</p>
              <small class="info-item-p" style="display: block; margin-bottom: 10px;">${data.projectsPage.techLabel} ${project.tech}</small>
              <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="text-link"><i class="fa-brands fa-github"></i> ${data.projectsPage.btnRepo}</a>
            </div>
          </div>`;
      });
    }
    const contactHeader = document.getElementById('contact-header-title');
    if (contactHeader) {
      contactHeader.textContent = data.contactPage.headerTitle; document.getElementById('contact-header-subtitle').textContent = data.contactPage.headerSubtitle;
      document.getElementById('form-title').textContent = data.contactPage.formTitle; document.getElementById('label-email').textContent = data.contactPage.formEmailLabel; document.getElementById('input-email').setAttribute('placeholder', data.contactPage.formEmailPlaceholder); document.getElementById('label-message').textContent = data.contactPage.formMessageLabel; document.getElementById('input-message').setAttribute('placeholder', data.contactPage.formMessagePlaceholder); document.getElementById('btn-submit').textContent = data.contactPage.formBtn;
      const infoIntro = document.getElementById('info-intro');
      if (infoIntro) infoIntro.textContent = data.contactPage.introText;
      const gridContainer = document.getElementById('dynamic-contact-info');
      if (gridContainer) {
        gridContainer.innerHTML = ''; 
        data.contactPage.cards.forEach((card, index) => {
          const iconPrefix = card.type === 'brand' ? 'fa-brands' : 'fa-solid';
          gridContainer.innerHTML += `
            <a href="${card.link}" class="contact-card-link reveal active" style="transition-delay: 0.${index+1}s;" target="_blank" rel="noopener noreferrer">
              <i class="${iconPrefix} ${card.icon} contact-card-icon"></i>
              <div class="contact-card-info">
                <span class="contact-card-label">${card.label}</span>
                <span class="contact-card-value">${card.value}</span>
              </div>
              <i class="fa-solid fa-arrow-up-right-from-square contact-card-arrow"></i>
            </a>`;
        });
      }
    }
  }
  renderContent();
  const scrollIndicator = document.getElementById('scroll-indicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.visibility = 'hidden';
      } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.visibility = 'visible';
      }
    });
  }
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if(entry.isIntersecting) { entry.target.classList.add('active'); } }); }, { threshold: 0.15 }); 
  reveals.forEach(reveal => observer.observe(reveal));
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinksList = document.querySelectorAll('.nav-links > a');
  navLinksList.forEach(link => { if (link.getAttribute('href') === currentPath) { link.classList.add('active-link'); } });
  const hamburger = document.getElementById('hamburger'); const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) { hamburger.addEventListener('click', () => { navLinks.classList.toggle('active'); const icon = hamburger.querySelector('i'); if(navLinks.classList.contains('active')) { icon.classList.remove('fa-bars'); icon.classList.add('fa-xmark'); } else { icon.classList.remove('fa-xmark'); icon.classList.add('fa-bars'); } }); }
  const form = document.getElementById("contact-form"); const status = document.getElementById("form-status");
  if (form) { form.addEventListener("submit", (event) => { event.preventDefault(); const formData = new FormData(form); status.textContent = "Envoi en cours..."; fetch("https://formspree.io/f/mgvnrlge", { method: "POST", body: formData, headers: { "Accept": "application/json" } }).then((response) => { if (response.ok) { status.textContent = "✅ Message envoyé avec succès !"; form.reset(); } else { status.textContent = "⚠️ Une erreur est survenue."; } }).catch(() => { status.textContent = "❌ Erreur réseau."; }); }); }
  if (localStorage.getItem('theme') === 'light') { document.body.classList.add('light-mode'); }
  const logoLinks = document.querySelectorAll('.logo');
  logoLinks.forEach(logo => {
    const letters = logo.querySelector('.logo-letters'); const dot = logo.querySelector('.logo-dot');
    if (letters) { if (!logo.id.includes('lang')) { letters.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); document.body.classList.toggle('light-mode'); if (document.body.classList.contains('light-mode')) { localStorage.setItem('theme', 'light'); } else { localStorage.setItem('theme', 'dark'); } }); } }
    if (dot) { dot.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); dot.classList.remove('dot-jump'); void dot.offsetWidth; dot.classList.add('dot-jump'); }); }
  });
  const glow = document.createElement('div'); glow.classList.add('mouse-glow'); document.body.appendChild(glow);
  let isMouseMoving = false;
  document.addEventListener('mousemove', (e) => { if (!isMouseMoving) { glow.style.opacity = '1'; isMouseMoving = true; } requestAnimationFrame(() => { glow.style.transform = `translate(${e.clientX - 125}px, ${e.clientY - 125}px)`; }); });
  document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; isMouseMoving = false; });
});