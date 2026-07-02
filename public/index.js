
const phrases = [
  "Frontend Developer",
  "React Engineer",
  "UI Builder",
  "Open to Intern Roles"
];

let phraseIndex = 0;   
let charIndex   = 0;   
let isDeleting  = false;

function typeLoop() {
  const el     = document.getElementById('typed');
  const phrase = phrases[phraseIndex];

  if (!isDeleting) {
    // Typing forward
    el.textContent = phrase.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === phrase.length) {
      // Finished typing — pause then start deleting
      isDeleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    // Deleting backward
    el.textContent = phrase.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      // Finished deleting — move to next phrase
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  // Speed: faster when deleting, slower when typing
  const speed = isDeleting ? 55 : 95;
  setTimeout(typeLoop, speed);
}

// Start typing after a short delay
setTimeout(typeLoop, 600);



const hamburger = document.getElementById('ham');
const navLinks  = document.getElementById('navlinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when any nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});



const fadeObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);

// Observe every element with .fade-in class
document.querySelectorAll('.fade-in').forEach(el => {
  fadeObserver.observe(el);
});



const barObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate each bar inside the visible skill card
        entry.target.querySelectorAll('.bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.w + '%';
        });
        // Stop observing once animated
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.skill-card').forEach(card => {
  barObserver.observe(card);
});



const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('fbtn');

contactForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  // Show loading state
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled    = true;

  try {
    const response = await fetch('https://formspree.io/f/xkolqldb', {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      // Success
      submitBtn.textContent      = 'Message sent! ✓';
      submitBtn.style.background = '#16a34a';
      contactForm.reset();

      setTimeout(() => {
        submitBtn.textContent      = 'Send message';
        submitBtn.style.background = '';
        submitBtn.disabled         = false;
      }, 3000);

    } else {
      // Formspree returned an error
      submitBtn.textContent      = 'Something went wrong';
      submitBtn.style.background = '#dc2626';
      submitBtn.disabled         = false;

      setTimeout(() => {
        submitBtn.textContent      = 'Send message';
        submitBtn.style.background = '';
      }, 3000);
    }

  } catch (error) {
    // Network error
    submitBtn.textContent      = 'Network error — try again';
    submitBtn.style.background = '#dc2626';
    submitBtn.disabled         = false;

    setTimeout(() => {
      submitBtn.textContent      = 'Send message';
      submitBtn.style.background = '';
    }, 3000);
  }
});

/* ─── 6. ACTIVE NAV LINK HIGHLIGHT ─────────────────────────── */
const sections    = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active from all links
        allNavLinks.forEach(a => a.style.color = '');

        // Highlight the matching nav link
        const activeLink = document.querySelector(
          `.nav-links a[href="#${entry.target.id}"]`
        );
        if (activeLink) {
          activeLink.style.color = 'var(--blue)';
        }
      }
    });
  },
  {
    rootMargin: '-40% 0px -55% 0px',  // trigger when section is ~middle of screen
    threshold: 0
  }
);

sections.forEach(section => sectionObserver.observe(section));


/* ─── 7. NAVBAR SHADOW ON SCROLL ────────────────────────────── */
const navbar = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.35)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});