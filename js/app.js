/**
 * CYBERPUNK TAROT - Main Application
 * ═══════════════════════════════════════════════════════════════
 */

class CyberpunkTarot {
  constructor() {
    this.cards = [];
    this.currentPage = 'landing';
    this.currentCard = null;
    this.modal = null;
    this.init();
  }

  async init() {
    await this.loadCards();
    this.setupNavigation();
    this.setupDrawButton();
    this.setupModal();
    this.renderGallery();
  }

  async loadCards() {
    try {
      const response = await fetch('cards.json');
      const data = await response.json();
      this.cards = data.majorArcana;
    } catch (error) {
      console.error('Error loading cards:', error);
    }
  }

  // ═══ NAVIGATION ═══
  setupNavigation() {
    const nav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('[data-page]');

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.dataset.page;
        this.navigateTo(page);
      });
    });
  }

  navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('.page-section').forEach(section => {
      section.classList.remove('active');
    });

    // Show target page
    const targetPage = document.getElementById(`${page}-page`);
    if (targetPage) {
      targetPage.classList.add('active');
    }

    // Show/hide nav
    const nav = document.getElementById('main-nav');
    if (page === 'landing') {
      nav.classList.add('hidden');
    } else {
      nav.classList.remove('hidden');
    }

    // Update active nav link
    document.querySelectorAll('nav a').forEach(link => {
      link.classList.remove('active');
      if (link.dataset.page === page) {
        link.classList.add('active');
      }
    });

    // Reset card flip if going to reading page fresh
    if (page === 'reading' && !this.currentCard) {
      this.drawCard();
    }

    this.currentPage = page;
  }

  // ═══ CARD DRAWING ═══
  setupDrawButton() {
    const drawBtn = document.getElementById('draw-card-btn');
    const drawAnotherBtn = document.getElementById('draw-another-btn');

    drawBtn?.addEventListener('click', () => {
      this.drawCard(false);
      this.navigateTo('reading');
    });

    drawAnotherBtn?.addEventListener('click', () => {
      this.drawCard(true);
    });
  }

  drawCard(isRedraw = false) {
    const cardFlip = document.getElementById('card-flip');
    const readingImage = document.getElementById('reading-image');

    // Pick random card
    const randomIndex = Math.floor(Math.random() * this.cards.length);
    this.currentCard = this.cards[randomIndex];

    // Clear previous text immediately
    document.getElementById('reading-title').textContent = '';
    document.getElementById('reading-number').textContent = '';
    document.getElementById('reading-text').textContent = '';

    if (isRedraw && cardFlip.classList.contains('flipped')) {
      // Card is already showing - flip back first
      cardFlip.classList.remove('flipped');

      // Wait for flip-back animation, then change image and flip again
      setTimeout(() => {
        readingImage.src = `images/major-arcana/${this.currentCard.image}`;
        readingImage.alt = this.currentCard.title;

        setTimeout(() => {
          cardFlip.classList.add('flipped');

          setTimeout(() => {
            this.revealReading();
          }, 1000);
        }, 100);
      }, 1000);
    } else {
      // First draw - just flip
      cardFlip.classList.remove('flipped');
      readingImage.src = `images/major-arcana/${this.currentCard.image}`;
      readingImage.alt = this.currentCard.title;

      setTimeout(() => {
        cardFlip.classList.add('flipped');

        setTimeout(() => {
          this.revealReading();
        }, 1000);
      }, 300);
    }
  }

  revealReading() {
    if (!this.currentCard) return;

    document.getElementById('reading-title').textContent = this.currentCard.title;
    document.getElementById('reading-number').textContent =
      `${this.formatNumber(this.currentCard.id)} / Major Arcana`;
    document.getElementById('reading-text').textContent = this.currentCard.reading;
  }

  // ═══ GALLERY ═══
  renderGallery() {
    const grid = document.getElementById('card-grid');
    if (!grid) return;

    if (this.cards.length === 0) {
      grid.innerHTML = '<p class="loading">No cards found. Check cards.json</p>';
      return;
    }

    grid.innerHTML = this.cards.map(card => this.createCardHTML(card)).join('');

    // Add click handlers
    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.tarot-card');
      if (card) {
        const cardId = parseInt(card.dataset.cardId);
        this.openModal(cardId);
      }
    });
  }

  createCardHTML(card) {
    return `
      <article class="tarot-card" data-card-id="${card.id}">
        <div class="card-inner">
          <div class="card-image-container">
            <span class="card-number">${this.formatNumber(card.id)}</span>
            <img
              src="images/major-arcana/${card.image}"
              alt="${card.title}"
              class="card-image"
              onerror="this.parentElement.innerHTML = '<div class=\\'card-image-placeholder\\'><span>${this.formatNumber(card.id)}</span></div>'"
            >
          </div>
          <div class="card-content">
            <h2 class="card-title">${card.title}</h2>
            <p class="card-subtitle">${this.truncateText(card.description, 80)}</p>
          </div>
        </div>
      </article>
    `;
  }

  // ═══ MODAL ═══
  setupModal() {
    this.modal = document.getElementById('card-modal');

    // Close button
    document.querySelector('.modal-close')?.addEventListener('click', () => {
      this.closeModal();
    });

    // Backdrop click
    this.modal?.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal?.classList.contains('active')) {
        this.closeModal();
      }
    });
  }

  openModal(cardId) {
    const card = this.cards.find(c => c.id === cardId);
    if (!card || !this.modal) return;

    const modalImage = this.modal.querySelector('.modal-image');
    const modalTitle = this.modal.querySelector('.modal-title');
    const modalNumber = this.modal.querySelector('.modal-number');
    const modalDescription = this.modal.querySelector('.modal-description');

    if (modalImage) {
      modalImage.src = `images/major-arcana/${card.image}`;
      modalImage.alt = card.title;
      modalImage.style.display = 'block';
      modalImage.onerror = function() {
        this.style.display = 'none';
      };
    }
    if (modalTitle) modalTitle.textContent = card.title;
    if (modalNumber) modalNumber.textContent = `${this.formatNumber(card.id)} / Major Arcana`;
    if (modalDescription) modalDescription.textContent = card.description;

    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ═══ UTILITIES ═══
  formatNumber(num) {
    return num.toString().padStart(2, '0');
  }

  truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new CyberpunkTarot();
});
