// ===== SECTION VISIBILITY CONTROL =====
// All sections except landing are hidden via CSS .section (display:none)
// We'll manage active section by toggling class 'active-section'

const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link[data-section]');
const dropdownProjectLinks = document.querySelectorAll('.dropdown-menu a');
const logoHome = document.getElementById('logoHome');

// Function to show a specific section by ID
function showSection(sectionId) {
  // Remove active class from all sections
  sections.forEach(section => {
    section.classList.remove('active-section');
  });
  // Add active class to target section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active-section');
  } else {
    // fallback to landing if section not found
    document.getElementById('landing').classList.add('active-section');
  }

  // Update active state on main nav links
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.section === sectionId) {
      link.classList.add('active');
    }
  });
  // Also handle dropdown items separately (no need to mark them as active on main nav)
  // Close mobile menu if open
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
}

// ===== MENU CLICK EVENTS =====
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = link.dataset.section;
    showSection(sectionId);
    // smooth scroll to top of section (optional)
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Dropdown project links (ongoing/completed)
dropdownProjectLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute('data-section'); // ongoing or completed
    showSection(sectionId);
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  });
});

// Logo click returns to landing
logoHome.addEventListener('click', () => {
  showSection('landing');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Explore button on landing -> show about section
document.getElementById('exploreBtn').addEventListener('click', () => {
  showSection('about');
  document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when any nav link is clicked (already done inside showSection)

// ===== FORM VALIDATION =====
// Career form
const careerForm = document.getElementById('careerForm');
const careerMsg = document.getElementById('careerMsg');

careerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('careerName').value.trim();
  const email = document.getElementById('careerEmail').value.trim();
  const phone = document.getElementById('careerPhone').value.trim();
  const qual = document.getElementById('careerQual').value;
  const resume = document.getElementById('resume').files[0];

  if (!name || !email || !phone || !qual || !resume) {
    careerMsg.style.color = 'red';
    careerMsg.textContent = 'All fields are required.';
    return;
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    careerMsg.style.color = 'red';
    careerMsg.textContent = 'Invalid email format.';
    return;
  }
  if (!/^\d{10}$/.test(phone)) {
    careerMsg.style.color = 'red';
    careerMsg.textContent = 'Phone must be 10 digits.';
    return;
  }
  const fileExt = resume.name.split('.').pop().toLowerCase();
  if (!['pdf', 'doc', 'docx'].includes(fileExt)) {
    careerMsg.style.color = 'red';
    careerMsg.textContent = 'Only PDF/DOC/DOCX allowed.';
    return;
  }
  careerMsg.style.color = '#0a1f44';
  careerMsg.textContent = 'Application received (demo).';
  careerForm.reset();
});

// Contact form
const contactForm = document.getElementById('contactForm');
const contactMsg = document.getElementById('contactMsg');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const message = document.getElementById('contactMessage').value.trim();

  if (!name || !email || !message) {
    contactMsg.style.color = 'red';
    contactMsg.textContent = 'Name, email and message are required.';
    return;
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    contactMsg.style.color = 'red';
    contactMsg.textContent = 'Invalid email.';
    return;
  }
  contactMsg.style.color = '#0a1f44';
  contactMsg.textContent = 'Message sent (demo).';
  contactForm.reset();
});

// ===== FADE-IN ANIMATION (already via CSS, but we ensure landing active on load) =====
// Initially only landing is active (others hidden). But we set it explicitly.
document.addEventListener('DOMContentLoaded', () => {
  // Ensure only landing is visible (in case any other section accidentally active)
  showSection('landing');
  // Add small animation for landing items (optional)
});

// ===== DROPDOWN MOBILE HELPER (touch) =====
// If on mobile, clicking dropdown parent toggles submenu
if (window.innerWidth <= 768) {
  const dropdowns = document.querySelectorAll('.dropdown > a');
  dropdowns.forEach(parent => {
    parent.addEventListener('click', (e) => {
      e.preventDefault();
      const submenu = parent.nextElementSibling;
      if (submenu.style.display === 'block') {
        submenu.style.display = 'none';
      } else {
        submenu.style.display = 'block';
      }
    });
  });
}