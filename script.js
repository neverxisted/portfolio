/**
 * Abdul Rahman — Developer Portfolio
 * Interactive Functionality & Real Form Submit Dispatcher
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------
  // 1. Theme Switcher (Persistent via localStorage)
  // -------------------------------------------------------------
  const themeButtons = document.querySelectorAll('.theme-btn');
  const savedTheme = localStorage.getItem('portfolio-theme') || 'cyan';

  function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    themeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-theme-choice') === theme);
    });
  }

  applyTheme(savedTheme);

  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const chosenTheme = btn.getAttribute('data-theme-choice');
      if (chosenTheme) applyTheme(chosenTheme);
    });
  });

  // -------------------------------------------------------------
  // 2. Toast Notification System
  // -------------------------------------------------------------
  const toastShelf = document.getElementById('toastShelf');

  function showToast(message, icon = '✓') {
    if (!toastShelf) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
    toastShelf.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  // -------------------------------------------------------------
  // 3. Scroll Progress Bar & SVG Back-to-Top Indicator
  // -------------------------------------------------------------
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const progressRingCircle = document.getElementById('progressRingCircle');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const circumference = 2 * Math.PI * 16; // r = 16 => ~100.53

  if (progressRingCircle) {
    progressRingCircle.style.strokeDasharray = `${circumference}`;
  }

  function handleScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) : 0;

    // Top progress bar
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrollPercent * 100}%`;
    }

    // Circular ring in footer
    if (progressRingCircle) {
      const offset = circumference - (scrollPercent * circumference);
      progressRingCircle.style.strokeDashoffset = offset;
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // -------------------------------------------------------------
  // 4. Dynamic Cursor Spotlight & Card Mouse Tracking
  // -------------------------------------------------------------
  const cursorSpotlight = document.getElementById('cursorSpotlight');
  const spotlightCards = document.querySelectorAll('.spotlight-card');

  window.addEventListener('mousemove', (e) => {
    // Ambient spotlight follows cursor
    if (cursorSpotlight) {
      cursorSpotlight.style.opacity = '1';
      cursorSpotlight.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }

    // Update relative mouse coordinates on cards for CSS radial glow
    spotlightCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  window.addEventListener('mouseleave', () => {
    if (cursorSpotlight) cursorSpotlight.style.opacity = '0';
  });

  // -------------------------------------------------------------
  // 5. 3D Card Tilt Effect on Project Cards
  // -------------------------------------------------------------
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  // -------------------------------------------------------------
  // 6. Interactive Hero Canvas (Constellation / Particles)
  // -------------------------------------------------------------
  const heroCanvas = document.getElementById('heroCanvas');
  if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    let width, height;
    let particles = [];

    function resizeCanvas() {
      width = heroCanvas.width = heroCanvas.parentElement.offsetWidth;
      height = heroCanvas.height = heroCanvas.parentElement.offsetHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const particleCount = Math.min(Math.floor(width / 22), 45);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 1.5 + 0.8;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(129, 140, 248, 0.45)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(100, 116, 139, ${0.18 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  // -------------------------------------------------------------
  // 7. Interactive Hero Code Window & Terminal Sandbox
  // -------------------------------------------------------------
  const windowTabs = document.querySelectorAll('.window-tab');
  const tabPanels = document.querySelectorAll('.tab-panel');

  windowTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabTarget = tab.getAttribute('data-tab');
      windowTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      tabPanels.forEach(panel => {
        panel.classList.toggle('active', panel.id === `tab-${tabTarget}`);
      });
    });
  });

  // Run Code snippet simulation
  const runProfileBtn = document.getElementById('runProfileBtn');
  const miniConsole = document.getElementById('miniConsole');
  if (runProfileBtn && miniConsole) {
    runProfileBtn.addEventListener('click', () => {
      runProfileBtn.innerHTML = '<span>⚡ Running...</span>';
      setTimeout(() => {
        miniConsole.classList.add('open');
        runProfileBtn.innerHTML = '<span>✓ Executed!</span>';
        setTimeout(() => {
          runProfileBtn.innerHTML = '<span>▶ Execute Snippet</span>';
        }, 2500);
      }, 400);
    });
  }

  // Copy snippet button
  const copyCodeBtn = document.getElementById('copyCodeBtn');
  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', () => {
      const codeText = `const developer = {
  name: 'Abdul Rahman',
  role: 'Web & AI/ML Developer',
  education: 'B.E. AI & Machine Learning',
  seeking: 'Internships 2025/2026',
  email: 'rahman2006notfound@gmail.com'
};`;
      navigator.clipboard.writeText(codeText).then(() => {
        showToast('Developer snippet copied to clipboard! 📋', '✓');
      }).catch(() => {
        showToast('Failed to copy code', '✕');
      });
    });
  }

  // Interactive Live Terminal
  const terminalForm = document.getElementById('terminalForm');
  const terminalInput = document.getElementById('terminalInput');
  const terminalHistory = document.getElementById('terminalHistory');

  const terminalCommands = {
    help: () => 'Available commands: <span class="c-type">about</span>, <span class="c-type">skills</span>, <span class="c-type">projects</span>, <span class="c-type">contact</span>, <span class="c-type">hire</span>, <span class="c-type">clear</span>',
    about: () => 'Abdul Rahman is a 3rd year AI & ML engineering student building modern web apps with React, Python, FastAPI, and intelligent network graphs.',
    skills: () => 'Frontend: HTML5, CSS3, React, JS | Backend: Python, FastAPI, SQL | AI: Pandas, NetworkX, TF.js',
    projects: () => '1. Money Muling Detection (Graph AI) <br>2. Inclusive Learning (EdTech) <br>3. In-Browser Object Detector <br>4. Modern Portfolio',
    contact: () => 'Email: <a href="mailto:rahman2006notfound@gmail.com" class="c-type">rahman2006notfound@gmail.com</a> | Phone: +91 76763 95290',
    hire: () => {
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
      }, 500);
      return '🎉 Fantastic! Scrolling to the contact form so we can discuss internship details...';
    },
    clear: () => {
      if (terminalHistory) terminalHistory.innerHTML = '';
      return '';
    }
  };

  function executeTerminalCommand(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      terminalCommands.clear();
      return;
    }

    const commandEntry = document.createElement('p');
    commandEntry.innerHTML = `<span class="terminal-prompt">visitor@abdul-dev:~$</span> ${cmd}`;
    terminalHistory.appendChild(commandEntry);

    const outputEntry = document.createElement('p');
    outputEntry.style.color = '#cbd5e1';
    outputEntry.style.marginBottom = '8px';

    if (terminalCommands[cmd]) {
      outputEntry.innerHTML = terminalCommands[cmd]();
    } else {
      outputEntry.innerHTML = `command not found: "${cmd}". Type <span class="c-type">help</span> for a list of commands.`;
    }

    terminalHistory.appendChild(outputEntry);
    terminalHistory.scrollTop = terminalHistory.scrollHeight;
  }

  if (terminalForm && terminalInput) {
    terminalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      executeTerminalCommand(terminalInput.value);
      terminalInput.value = '';
    });
  }

  // Suggestion pill buttons in terminal
  document.querySelectorAll('.cmd-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const cmd = pill.getAttribute('data-cmd');
      if (cmd) executeTerminalCommand(cmd);
    });
  });

  // -------------------------------------------------------------
  // 8. Filter Bars (Skills & Projects)
  // -------------------------------------------------------------
  // Skills filter
  const skillFilterButtons = document.querySelectorAll('#skillFilterBar .filter-pill');
  const skillCards = document.querySelectorAll('#skillsGrid .skill-card');

  skillFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      skillCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (filter === 'all' || cardCat === filter) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  // Projects filter
  const projectFilterButtons = document.querySelectorAll('#projectFilterBar .filter-pill');
  const projectCards = document.querySelectorAll('#projectsGrid .project-card');

  projectFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-pfilter');
      projectCards.forEach(card => {
        const cardCat = card.getAttribute('data-pcategory');
        if (filter === 'all' || cardCat === filter) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  // -------------------------------------------------------------
  // 9. Project Details Modal (Comprehensive Specs)
  // -------------------------------------------------------------
  const projectData = {
    'money-muling': {
      category: 'FINTECH + DATA SCIENCE',
      title: 'Money Muling Detection Graph',
      status: 'IN DEVELOPMENT',
      desc: 'A fraud analytics prototype engineered to identify suspected money muling networks and illegal transaction layering. By modelling bank accounts as network graph nodes and transfers as weighted directional edges, the platform runs clustering algorithms to detect sudden transaction surges and circular routing.',
      highlights: [
        'Built with React for interactive graph exploration and visual node inspections.',
        'Python FastAPI backend running NetworkX graph analysis algorithms.',
        'Detects high-fanout money distribution and layered cyclic transaction flows.',
        'Data preprocessing and synthetic banking telemetry modeled with Pandas.'
      ],
      tags: ['React', 'FastAPI', 'NetworkX', 'Pandas', 'Graph Algorithms', 'Python']
    },
    'inclusive-learning': {
      category: 'ACCESSIBILITY & EDTECH',
      title: 'Inclusive Learning Platform',
      status: 'IN DEVELOPMENT',
      desc: 'An adaptive web platform conceived to make fundamental educational concepts accessible for children with learning differences and attention variations. Prioritizes sensory-friendly typography, low visual clutter, tactile progression checkpoints, and intuitive micro-lessons.',
      highlights: [
        'Adheres to strict WCAG 2.1 AA accessibility guidelines for contrast and focus.',
        'High-legibility typography modes, calm pastel colorways, and reduced stimuli options.',
        'Adaptive micro-lesson pacing that celebrates incremental mastery.',
        'Built with React and Python supporting customizable student profiles.'
      ],
      tags: ['React', 'Python', 'WCAG AA', 'Accessible UI', 'Adaptive Learning']
    },
    'object-detector': {
      category: 'IN-BROWSER COMPUTER VISION',
      title: 'Browser Object Detector',
      status: 'EXPERIMENT',
      desc: 'A high-performance computer vision demo executing directly within client browsers utilizing TensorFlow.js and the pre-trained COCO-SSD neural network. Delivers real-time camera object labeling with zero backend server roundtrips, ensuring 100% user privacy.',
      highlights: [
        'Real-time webcam inference running on client hardware via WebGL acceleration.',
        'Bounding box drawing with dynamic class prediction and confidence percentage.',
        'Zero video upload latency and zero server-side storage of personal video feeds.',
        'Written in pure modern JavaScript for ultra-lightweight execution.'
      ],
      tags: ['JavaScript', 'TensorFlow.js', 'COCO-SSD', 'Computer Vision', 'WebRTC']
    },
    'portfolio-site': {
      category: 'MODERN WEB ENGINEERING',
      title: 'Modern Developer Portfolio',
      status: 'ACTIVE / LIVE',
      desc: 'A showcase of modern web design standards crafted with semantic HTML5, high-fidelity CSS glassmorphism, interactive terminal emulation, and working email API dispatch — built with zero heavy frameworks for sub-second load times.',
      highlights: [
        'Dynamic accent glow theming with real-time CSS custom property swaps.',
        'Full working email dispatch via FormSubmit AJAX directly to Gmail inbox.',
        'Custom interactive shell emulator, 3D card tilts, and particle background canvas.',
        'Fully responsive and mobile accessible with zero layout shifts.'
      ],
      tags: ['HTML5', 'Modern CSS', 'Vanilla JavaScript', 'FormSubmit API', 'UI/UX']
    }
  };

  const projectModal = document.getElementById('projectModal');
  const closeProjectModal = document.getElementById('closeProjectModal');
  const modalDismissBtn = document.getElementById('modalDismissBtn');

  function openModalForProject(projectId) {
    const data = projectData[projectId];
    if (!data || !projectModal) return;

    document.getElementById('modalProjectCategory').textContent = data.category;
    document.getElementById('modalProjectTitle').textContent = data.title;
    document.getElementById('modalProjectStatus').textContent = data.status;
    document.getElementById('modalProjectDesc').textContent = data.desc;

    const highlightsList = document.getElementById('modalProjectHighlights');
    highlightsList.innerHTML = data.highlights.map(h => `<li>${h}</li>`).join('');

    const tagsContainer = document.getElementById('modalProjectTags');
    tagsContainer.innerHTML = data.tags.map(t => `<span>${t}</span>`).join('');

    projectModal.showModal();
  }

  // Trigger buttons on project cards
  document.querySelectorAll('.project-card').forEach(card => {
    const projectId = card.getAttribute('data-project-id');
    const viewBtn = card.querySelector('.project-view-btn');
    if (viewBtn && projectId) {
      viewBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openModalForProject(projectId);
      });
    }
    // Clicking card itself also opens modal
    card.addEventListener('click', () => {
      if (projectId) openModalForProject(projectId);
    });
  });

  if (closeProjectModal && projectModal) {
    closeProjectModal.addEventListener('click', () => projectModal.close());
  }
  if (modalDismissBtn && projectModal) {
    modalDismissBtn.addEventListener('click', () => projectModal.close());
  }

  // Close dialog on backdrop click
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      const rect = projectModal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) projectModal.close();
    });
  }

  // Modal contact button scrolls to contact form
  const modalContactBtn = document.getElementById('modalContactBtn');
  if (modalContactBtn && projectModal) {
    modalContactBtn.addEventListener('click', () => {
      projectModal.close();
    });
  }

  // -------------------------------------------------------------
  // 10. Quick Resume Preview Modal
  // -------------------------------------------------------------
  const resumeModal = document.getElementById('resumeModal');
  const closeResumeModal = document.getElementById('closeResumeModal');
  const closeResumeBtn = document.getElementById('closeResumeBtn');

  document.querySelectorAll('.cv-trigger-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (resumeModal) resumeModal.showModal();
    });
  });

  if (closeResumeModal && resumeModal) {
    closeResumeModal.addEventListener('click', () => resumeModal.close());
  }
  if (closeResumeBtn && resumeModal) {
    closeResumeBtn.addEventListener('click', () => resumeModal.close());
  }
  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      const rect = resumeModal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) resumeModal.close();
    });
  }

  // -------------------------------------------------------------
  // 11. REAL WORKING CONTACT FORM (FormSubmit.co Dispatcher)
  // -------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const submitFormBtn = document.getElementById('submitFormBtn');
  const formAlert = document.getElementById('formAlert');
  const mailtoFallbackBtn = document.getElementById('mailtoFallbackBtn');
  const senderMessage = document.getElementById('senderMessage');
  const charCount = document.getElementById('charCount');
  const msgSubject = document.getElementById('msgSubject');
  const hiddenSubject = document.getElementById('hiddenSubject');
  const topicPills = document.querySelectorAll('.topic-pill');

  // Topic pills update subject input
  topicPills.forEach(pill => {
    pill.addEventListener('click', () => {
      topicPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const topic = pill.getAttribute('data-topic');
      if (topic && msgSubject) {
        msgSubject.value = topic;
        if (hiddenSubject) hiddenSubject.value = `Portfolio Message: ${topic}`;
      }
    });
  });

  // Message live character counter
  if (senderMessage && charCount) {
    senderMessage.addEventListener('input', () => {
      charCount.textContent = `${senderMessage.value.length} / 1000`;
    });
  }

  // Direct Fallback Button (Opens client email app)
  if (mailtoFallbackBtn) {
    mailtoFallbackBtn.addEventListener('click', () => {
      const name = document.getElementById('senderName')?.value || 'Visitor';
      const email = document.getElementById('senderEmail')?.value || '';
      const subject = msgSubject?.value || 'Portfolio Inquiry';
      const message = senderMessage?.value || 'Hi Abdul,\n\nI wanted to reach out regarding...';

      const mailtoUrl = `mailto:rahman2006notfound@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
      window.location.href = mailtoUrl;
    });
  }

  // Real Form Submission Handler
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Reset error states
      const nameInput = document.getElementById('senderName');
      const emailInput = document.getElementById('senderEmail');
      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const messageError = document.getElementById('messageError');

      if (nameError) nameError.textContent = '';
      if (emailError) emailError.textContent = '';
      if (messageError) messageError.textContent = '';
      if (formAlert) {
        formAlert.className = 'form-alert';
        formAlert.style.display = 'none';
      }

      let isValid = true;
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const subject = msgSubject.value.trim() || 'Portfolio Contact Inquiry';
      const message = senderMessage.value.trim();

      // Validate Name
      if (!name) {
        if (nameError) nameError.textContent = 'Please enter your name.';
        isValid = false;
      }

      // Validate Email format
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        if (emailError) emailError.textContent = 'Please enter your email address.';
        isValid = false;
      } else if (!emailPattern.test(email)) {
        if (emailError) emailError.textContent = 'Please provide a valid email format (e.g. name@domain.com).';
        isValid = false;
      }

      // Validate Message length
      if (!message) {
        if (messageError) messageError.textContent = 'Please include a message.';
        isValid = false;
      } else if (message.length < 10) {
        if (messageError) messageError.textContent = 'Message should be at least 10 characters.';
        isValid = false;
      }

      if (!isValid) return;

      // Loading state
      submitFormBtn.classList.add('loading');
      submitFormBtn.disabled = true;

      try {
        // Send actual real email via FormSubmit AJAX endpoint to Abdul's Gmail!
        const response = await fetch('https://formsubmit.co/ajax/rahman2006notfound@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            subject: subject,
            message: message,
            _subject: `New Portfolio Message from ${name}: ${subject}`,
            _template: 'table'
          })
        });

        const data = await response.json();

        if (response.ok && (data.success === 'true' || data.success === true || data.message)) {
          // Success Feedback
          formAlert.className = 'form-alert success';
          formAlert.innerHTML = `<strong>🎉 Message Sent Successfully!</strong><br>Thank you, ${name}! Your email was dispatched straight to Abdul's Gmail inbox. You'll receive a response within 24 hours.`;
          formAlert.style.display = 'block';

          showToast('Email sent to Abdul successfully! 🚀', '✓');
          contactForm.reset();
          if (charCount) charCount.textContent = '0 / 1000';
        } else {
          throw new Error(data.message || 'Submission failed');
        }
      } catch (err) {
        console.warn('FormSubmit AJAX attempt:', err);
        // Fallback info with mailto trigger
        formAlert.className = 'form-alert error';
        formAlert.innerHTML = `<strong>Notice:</strong> We encountered a network hiccup sending via the API server. <a href="mailto:rahman2006notfound@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}" style="color:#ffffff;text-decoration:underline;">Click here to send directly via your Mail app ↗</a>`;
        formAlert.style.display = 'block';
        showToast('Offline or API issue. Use the Mail app button!', 'ℹ');
      } finally {
        submitFormBtn.classList.remove('loading');
        submitFormBtn.disabled = false;
      }
    });
  }

  // -------------------------------------------------------------
  // 12. 1-Click Copy Buttons (Email & Phone)
  // -------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'rahman2006notfound@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Email copied: ${email} 📋`, '✓');
      }).catch(() => {
        showToast('Could not copy email', '✕');
      });
    });
  }

  const copyPhoneBtn = document.getElementById('copyPhoneBtn');
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      const phone = '+91 76763 95290';
      navigator.clipboard.writeText(phone).then(() => {
        showToast(`Phone number copied: ${phone} 📋`, '✓');
      }).catch(() => {
        showToast('Could not copy phone number', '✕');
      });
    });
  }

  // -------------------------------------------------------------
  // 13. Mobile Drawer Navigation Toggle
  // -------------------------------------------------------------
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
      mobileDrawer.setAttribute('aria-hidden', String(!isOpen));
    });

    // Close mobile drawer on link click
    document.querySelectorAll('.mobile-nav-link, .mobile-drawer .button').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // -------------------------------------------------------------
  // 14. Scroll Reveal Intersection Observer
  // -------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));

  // -------------------------------------------------------------
  // 15. Active Navigation Link ScrollSpy
  // -------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', () => {
    let currentSection = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = sec.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      const href = item.getAttribute('href');
      item.classList.toggle('active', href === `#${currentSection}`);
    });
  }, { passive: true });

  // -------------------------------------------------------------
  // 16. Dynamic Copyright Year
  // -------------------------------------------------------------
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
