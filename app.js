// Enhanced OSINT Investigation Report - Interactive Navigation
class PresentationApp {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = 13; // Updated for new slides
    this.slides = document.querySelectorAll(".slide");
    this.navButtons = document.querySelectorAll(".nav__btn");
    this.prevButton = document.getElementById("prevBtn");
    this.nextButton = document.getElementById("nextBtn");
    this.topPrevButton = document.getElementById("topPrevBtn");
    this.topNextButton = document.getElementById("topNextBtn");
    this.currentSlideElement = document.getElementById("currentSlide");
    this.totalSlidesElement = document.getElementById("totalSlides");
    this.topCurrentSlideElement = document.getElementById("topCurrentSlide");
    this.topTotalSlidesElement = document.getElementById("topTotalSlides");
    this.searchActive = false;
    this.searchResults = [];
    this.currentSearchIndex = 0;

    this.init();
  }

  init() {
    // Set up event listeners
    this.setupNavigation();
    this.setupKeyboardNavigation();
    this.initContactCards();
    this.initSearchFunctionality();
    this.initDocumentViewer();

    // Initialize display
    this.updateDisplay();
    this.updateSlideCounter();

    // Set total slides count
    this.totalSlidesElement.textContent = this.totalSlides;
    this.topTotalSlidesElement.textContent = this.totalSlides;

    console.log("Enhanced OSINT Investigation Report initialized");
  }

  setupNavigation() {
    // Navigation buttons
    this.navButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        this.goToSlide(index);
      });
    });

    // Previous/Next buttons
    this.prevButton.addEventListener("click", () => {
      this.previousSlide();
    });

    this.nextButton.addEventListener("click", () => {
      this.nextSlide();
    });

    // Top navigation buttons
    this.topPrevButton.addEventListener("click", () => {
      this.previousSlide();
    });

    this.topNextButton.addEventListener("click", () => {
      this.nextSlide();
    });
  }

  setupKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          this.previousSlide();
          break;
        case "ArrowRight":
        case "ArrowDown":
        case " ": // Spacebar
          e.preventDefault();
          this.nextSlide();
          break;
        case "Home":
          e.preventDefault();
          this.goToSlide(0);
          break;
        case "End":
          e.preventDefault();
          this.goToSlide(this.totalSlides - 1);
          break;
        default:
          // Check for number keys 1-8
          if (e.key >= "1" && e.key <= "8") {
            e.preventDefault();
            const slideIndex = parseInt(e.key) - 1;
            this.goToSlide(slideIndex);
          }
          break;
      }
    });
  }

  goToSlide(slideIndex) {
    if (slideIndex < 0 || slideIndex >= this.totalSlides) {
      return;
    }

    // Hide current slide
    this.slides[this.currentSlide].classList.remove("active");
    this.navButtons[this.currentSlide].classList.remove("active");

    // Show new slide
    this.currentSlide = slideIndex;
    this.slides[this.currentSlide].classList.add("active");
    this.navButtons[this.currentSlide].classList.add("active");

    // Update display
    this.updateDisplay();
    this.updateSlideCounter();

    // Scroll to top of slide
    this.scrollToTop();

    // Add smooth transition effect
    this.addTransitionEffect();
  }

  nextSlide() {
    if (this.currentSlide < this.totalSlides - 1) {
      this.goToSlide(this.currentSlide + 1);
    }
  }

  previousSlide() {
    if (this.currentSlide > 0) {
      this.goToSlide(this.currentSlide - 1);
    }
  }

  updateDisplay() {
    // Update button states
    this.prevButton.disabled = this.currentSlide === 0;
    this.nextButton.disabled = this.currentSlide === this.totalSlides - 1;
    this.topPrevButton.disabled = this.currentSlide === 0;
    this.topNextButton.disabled = this.currentSlide === this.totalSlides - 1;

    // Update button text for context
    if (this.currentSlide === 0) {
      this.nextButton.textContent = "Start Report →";
      this.topNextButton.textContent = "Start Report →";
    } else if (this.currentSlide === this.totalSlides - 1) {
      this.prevButton.textContent = "← Back to Timeline";
      this.nextButton.textContent = "Report Complete";
      this.topPrevButton.textContent = "← Back to Timeline";
      this.topNextButton.textContent = "Report Complete";
    } else {
      this.prevButton.textContent = "← Previous";
      this.nextButton.textContent = "Next →";
      this.topPrevButton.textContent = "← Previous";
      this.topNextButton.textContent = "Next →";
    }
  }

  updateSlideCounter() {
    this.currentSlideElement.textContent = this.currentSlide + 1;
    this.topCurrentSlideElement.textContent = this.currentSlide + 1;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  addTransitionEffect() {
    const currentSlideElement = this.slides[this.currentSlide];

    // Add fade-in effect
    currentSlideElement.style.opacity = "0";
    currentSlideElement.style.transform = "translateY(20px)";

    // Force reflow
    currentSlideElement.offsetHeight;

    // Animate in
    currentSlideElement.style.transition =
      "opacity 0.3s ease, transform 0.3s ease";
    currentSlideElement.style.opacity = "1";
    currentSlideElement.style.transform = "translateY(0)";

    // Clean up transition
    setTimeout(() => {
      currentSlideElement.style.transition = "";
    }, 300);
  }

  // Public method to get current slide info
  getCurrentSlideInfo() {
    const slideNames = [
      "Title Slide",
      "Executive Summary",
      "Subject Profiles",
      "Property Details",
      "Blevins Connection",
      "Contact Information",
      "Timeline & Analysis",
      "Conclusion",
    ];

    return {
      index: this.currentSlide,
      name: slideNames[this.currentSlide],
      total: this.totalSlides,
    };
  }

  // Contact Cards Enhancement
  initContactCards() {
    const contactCards = document.querySelectorAll(".contact-card");

    contactCards.forEach((card) => {
      const expandBtn = card.querySelector(".contact-card__expand");
      const details = card.querySelector(".contact-card__details");
      const header = card.querySelector(".contact-card__header");

      if (expandBtn && details) {
        // Click handler for expand button
        expandBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.toggleContactCard(card, expandBtn, details);
        });

        // Click handler for entire header
        header.addEventListener("click", () => {
          this.toggleContactCard(card, expandBtn, details);
        });

        // Initialize contact links
        this.initContactLinks(card);
      }
    });
  }

  toggleContactCard(card, expandBtn, details) {
    const isExpanded = expandBtn.getAttribute("data-expanded") === "true";

    if (isExpanded) {
      // Collapse
      details.classList.remove("expanded");
      expandBtn.setAttribute("data-expanded", "false");
      expandBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
    } else {
      // Expand
      details.classList.add("expanded");
      expandBtn.setAttribute("data-expanded", "true");
      expandBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    }
  }

  initContactLinks(card) {
    const contactLinks = card.querySelectorAll(".contact-link");

    contactLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        // Add visual feedback for contact interactions
        link.style.transform = "scale(0.95)";
        setTimeout(() => {
          link.style.transform = "";
        }, 150);
      });
    });
  }

  // Search Functionality
  initSearchFunctionality() {
    const searchContainer = document.querySelector(".search-container");
    const searchInput = document.getElementById("searchInput");
    const clearSearch = document.getElementById("clearSearch");

    // Toggle search with Ctrl+F or Cmd+F
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "f") {
        e.preventDefault();
        this.toggleSearch();
      }

      // Escape to close search
      if (e.key === "Escape" && this.searchActive) {
        this.closeSearch();
      }
    });

    // Search input handling
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.performSearch(e.target.value);
      });

      searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          this.findNextSearchResult();
        }
      });
    }

    // Clear search
    if (clearSearch) {
      clearSearch.addEventListener("click", () => {
        this.clearSearch();
      });
    }

    // Search trigger removed per user request
  }

  addSearchTrigger() {
    const header = document.querySelector(".header .container");
    const searchTrigger = document.createElement("button");
    searchTrigger.className = "search-trigger btn btn--secondary";
    searchTrigger.innerHTML = '<i class="fas fa-search"></i> Search';
    searchTrigger.style.position = "absolute";
    searchTrigger.style.top = "20px";
    searchTrigger.style.right = "20px";

    searchTrigger.addEventListener("click", () => {
      this.toggleSearch();
    });

    header.style.position = "relative";
    header.appendChild(searchTrigger);
  }

  toggleSearch() {
    const searchContainer = document.querySelector(".search-container");
    const searchInput = document.getElementById("searchInput");

    if (this.searchActive) {
      this.closeSearch();
    } else {
      searchContainer.classList.add("active");
      this.searchActive = true;
      setTimeout(() => {
        searchInput.focus();
      }, 300);
    }
  }

  closeSearch() {
    const searchContainer = document.querySelector(".search-container");
    const searchInput = document.getElementById("searchInput");

    searchContainer.classList.remove("active");
    this.searchActive = false;
    this.clearSearch();
    searchInput.value = "";
  }

  performSearch(query) {
    this.clearSearchHighlights();

    if (!query || query.length < 2) return;

    const slides = document.querySelectorAll(".slide");
    const searchResults = [];

    slides.forEach((slide, slideIndex) => {
      const textNodes = this.getTextNodes(slide);
      textNodes.forEach((node) => {
        const text = node.textContent;
        const regex = new RegExp(`(${this.escapeRegex(query)})`, "gi");

        if (regex.test(text)) {
          searchResults.push({ slideIndex, node });

          // Highlight matches
          const highlightedText = text.replace(
            regex,
            '<span class="search-highlight">$1</span>'
          );
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = highlightedText;

          // Replace text node with highlighted content
          const parent = node.parentNode;
          while (tempDiv.firstChild) {
            parent.insertBefore(tempDiv.firstChild, node);
          }
          parent.removeChild(node);
        }
      });
    });

    this.searchResults = searchResults;
    this.currentSearchIndex = 0;

    if (searchResults.length > 0) {
      this.showSearchResult(0);
    }
  }

  getTextNodes(element) {
    const textNodes = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        // Skip script and style elements
        const parent = node.parentNode;
        if (parent.tagName === "SCRIPT" || parent.tagName === "STYLE") {
          return NodeFilter.FILTER_REJECT;
        }
        // Only include nodes with meaningful text
        if (node.textContent.trim().length > 0) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_REJECT;
      },
    });

    let node;
    while ((node = walker.nextNode())) {
      textNodes.push(node);
    }

    return textNodes;
  }

  clearSearchHighlights() {
    const highlights = document.querySelectorAll(".search-highlight");
    highlights.forEach((highlight) => {
      const parent = highlight.parentNode;
      parent.replaceChild(
        document.createTextNode(highlight.textContent),
        highlight
      );
      parent.normalize();
    });
  }

  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  findNextSearchResult() {
    if (!this.searchResults || this.searchResults.length === 0) return;

    this.currentSearchIndex =
      (this.currentSearchIndex + 1) % this.searchResults.length;
    this.showSearchResult(this.currentSearchIndex);
  }

  showSearchResult(index) {
    if (!this.searchResults || !this.searchResults[index]) return;

    const result = this.searchResults[index];
    this.goToSlide(result.slideIndex);

    // Scroll to highlight
    setTimeout(() => {
      const highlight = document.querySelector(".search-highlight");
      if (highlight) {
        highlight.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 300);
  }

  clearSearch() {
    this.clearSearchHighlights();
    this.searchResults = [];
    this.currentSearchIndex = 0;
  }

  // Document Viewer Controls
  initDocumentViewer() {
    // Create fullscreen modal
    this.createFullscreenModal();
  }

  createFullscreenModal() {
    const modal = document.createElement("div");
    modal.className = "fullscreen-modal";
    modal.innerHTML = `
            <div class="fullscreen-content">
                <button class="fullscreen-close">
                    <i class="fas fa-times"></i>
                </button>
                <iframe id="fullscreen-frame" width="100%" height="100%"></iframe>
            </div>
        `;

    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector(".fullscreen-close");
    closeBtn.addEventListener("click", () => {
      this.closeFullscreen();
    });

    // Close on backdrop click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        this.closeFullscreen();
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        this.closeFullscreen();
      }
    });
  }

  closeFullscreen() {
    const modal = document.querySelector(".fullscreen-modal");
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Enhanced features for better user experience
class PresentationEnhancements {
  constructor(app) {
    this.app = app;
    this.init();
  }

  init() {
    this.setupProgressIndicator();
    this.setupAutoSave();
    this.setupPrintMode();
    this.setupFullscreenToggle();
  }

  setupProgressIndicator() {
    // Create progress bar
    const progressBar = document.createElement("div");
    progressBar.className = "progress-bar";
    progressBar.innerHTML = '<div class="progress-fill"></div>';

    // Add styles
    const style = document.createElement("style");
    style.textContent = `
            .progress-bar {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                height: 3px;
                background-color: rgba(64, 64, 64, 0.5);
                z-index: 1000;
            }
            .progress-fill {
                height: 100%;
                background-color: var(--color-primary);
                transition: width 0.3s ease;
                width: 0%;
            }
        `;

    document.head.appendChild(style);
    document.body.appendChild(progressBar);

    // Update progress on slide change
    const updateProgress = () => {
      const progress =
        ((this.app.currentSlide + 1) / this.app.totalSlides) * 100;
      progressBar.querySelector(".progress-fill").style.width = `${progress}%`;
    };

    // Override app's goToSlide method to include progress update
    const originalGoToSlide = this.app.goToSlide.bind(this.app);
    this.app.goToSlide = function (slideIndex) {
      originalGoToSlide(slideIndex);
      updateProgress();
    };

    // Initial progress
    updateProgress();
  }

  setupAutoSave() {
    // Save current slide position
    const savePosition = () => {
      sessionStorage.setItem("osint-report-slide", this.app.currentSlide);
    };

    // Load saved position
    const loadPosition = () => {
      const saved = sessionStorage.getItem("osint-report-slide");
      if (saved !== null) {
        const slideIndex = parseInt(saved);
        if (slideIndex >= 0 && slideIndex < this.app.totalSlides) {
          this.app.goToSlide(slideIndex);
        }
      }
    };

    // Override app's goToSlide method to include auto-save
    const originalGoToSlide = this.app.goToSlide.bind(this.app);
    this.app.goToSlide = function (slideIndex) {
      originalGoToSlide(slideIndex);
      savePosition();
    };

    // Load position on page load
    setTimeout(loadPosition, 100);
  }

  setupPrintMode() {
    // Add print styles
    const printStyle = document.createElement("style");
    printStyle.textContent = `
            @media print {
                .header, .footer, .nav, .navigation-controls {
                    display: none !important;
                }
                .slide {
                    display: block !important;
                    page-break-after: always;
                    min-height: auto;
                }
                .slide:last-child {
                    page-break-after: auto;
                }
                body {
                    background: white !important;
                    color: black !important;
                }
                .card {
                    border: 1px solid #000 !important;
                    background: white !important;
                }
            }
        `;
    document.head.appendChild(printStyle);
  }

  setupFullscreenToggle() {
    // Add fullscreen toggle button
    const fullscreenBtn = document.createElement("button");
    fullscreenBtn.className = "btn btn--secondary fullscreen-btn";
    fullscreenBtn.textContent = "⛶ Fullscreen";
    fullscreenBtn.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            padding: 8px 12px;
            font-size: 12px;
        `;

    fullscreenBtn.addEventListener("click", () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
          console.log("Fullscreen not supported:", err);
        });
      } else {
        document.exitFullscreen();
      }
    });

    document.body.appendChild(fullscreenBtn);

    // Update button text based on fullscreen state
    document.addEventListener("fullscreenchange", () => {
      fullscreenBtn.textContent = document.fullscreenElement
        ? "⛶ Exit Fullscreen"
        : "⛶ Fullscreen";
    });
  }
}

// Enhanced OSINT Investigation Presentation
class OSINTPresentation {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = document.querySelectorAll(".slide").length;
    this.searchActive = false;
    this.init();
  }

  init() {
    this.initNavigation();
    this.initContactCards();
    this.initSearchFunctionality();
    this.initDocumentViewer();
    this.initKeyboardShortcuts();
    this.initMobileOptimizations();
    this.showSlide(0);
  }

  // Navigation Management
  initNavigation() {
    const navButtons = document.querySelectorAll(".nav__btn");

    navButtons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        this.showSlide(index);
      });
    });

    // Auto-update active navigation
    this.updateNavigation();
  }

  showSlide(slideIndex) {
    const slides = document.querySelectorAll(".slide");
    const navButtons = document.querySelectorAll(".nav__btn");

    // Hide all slides
    slides.forEach((slide) => slide.classList.remove("active"));
    navButtons.forEach((btn) => btn.classList.remove("active"));

    // Show selected slide
    if (slides[slideIndex]) {
      slides[slideIndex].classList.add("active");
      navButtons[slideIndex].classList.add("active");
      this.currentSlide = slideIndex;
    }

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  updateNavigation() {
    const navButtons = document.querySelectorAll(".nav__btn");
    navButtons.forEach((btn, index) => {
      btn.classList.toggle("active", index === this.currentSlide);
    });
  }

  // Contact Cards Enhancement
  initContactCards() {
    const contactCards = document.querySelectorAll(".contact-card");

    contactCards.forEach((card) => {
      const expandBtn = card.querySelector(".contact-card__expand");
      const details = card.querySelector(".contact-card__details");
      const header = card.querySelector(".contact-card__header");

      if (expandBtn && details) {
        // Click handler for expand button
        expandBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.toggleContactCard(card, expandBtn, details);
        });

        // Click handler for entire header
        header.addEventListener("click", () => {
          this.toggleContactCard(card, expandBtn, details);
        });

        // Initialize contact links
        this.initContactLinks(card);
      }
    });
  }

  toggleContactCard(card, expandBtn, details) {
    const isExpanded = expandBtn.getAttribute("data-expanded") === "true";

    if (isExpanded) {
      // Collapse
      details.classList.remove("expanded");
      expandBtn.setAttribute("data-expanded", "false");
      expandBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
    } else {
      // Expand
      details.classList.add("expanded");
      expandBtn.setAttribute("data-expanded", "true");
      expandBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    }
  }

  initContactLinks(card) {
    const contactLinks = card.querySelectorAll(".contact-link");

    contactLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        // Add visual feedback for contact interactions
        link.style.transform = "scale(0.95)";
        setTimeout(() => {
          link.style.transform = "";
        }, 150);
      });
    });
  }

  // Search Functionality
  initSearchFunctionality() {
    const searchContainer = document.querySelector(".search-container");
    const searchInput = document.getElementById("searchInput");
    const clearSearch = document.getElementById("clearSearch");

    // Toggle search with Ctrl+F or Cmd+F
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "f") {
        e.preventDefault();
        this.toggleSearch();
      }

      // Escape to close search
      if (e.key === "Escape" && this.searchActive) {
        this.closeSearch();
      }
    });

    // Search input handling
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.performSearch(e.target.value);
      });

      searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          this.findNextSearchResult();
        }
      });
    }

    // Clear search
    if (clearSearch) {
      clearSearch.addEventListener("click", () => {
        this.clearSearch();
      });
    }

    // Add search trigger button to header
    this.addSearchTrigger();
  }

  addSearchTrigger() {
    const header = document.querySelector(".header .container");
    const searchTrigger = document.createElement("button");
    searchTrigger.className = "search-trigger btn btn--secondary";
    searchTrigger.innerHTML = '<i class="fas fa-search"></i> Search';
    searchTrigger.style.position = "absolute";
    searchTrigger.style.top = "20px";
    searchTrigger.style.right = "20px";

    searchTrigger.addEventListener("click", () => {
      this.toggleSearch();
    });

    header.style.position = "relative";
    header.appendChild(searchTrigger);
  }

  toggleSearch() {
    const searchContainer = document.querySelector(".search-container");
    const searchInput = document.getElementById("searchInput");

    if (this.searchActive) {
      this.closeSearch();
    } else {
      searchContainer.classList.add("active");
      this.searchActive = true;
      setTimeout(() => {
        searchInput.focus();
      }, 300);
    }
  }

  closeSearch() {
    const searchContainer = document.querySelector(".search-container");
    const searchInput = document.getElementById("searchInput");

    searchContainer.classList.remove("active");
    this.searchActive = false;
    this.clearSearch();
    searchInput.value = "";
  }

  performSearch(query) {
    this.clearSearchHighlights();

    if (!query || query.length < 2) return;

    const slides = document.querySelectorAll(".slide");
    const searchResults = [];

    slides.forEach((slide, slideIndex) => {
      const textNodes = this.getTextNodes(slide);
      textNodes.forEach((node) => {
        const text = node.textContent;
        const regex = new RegExp(`(${this.escapeRegex(query)})`, "gi");

        if (regex.test(text)) {
          searchResults.push({ slideIndex, node });

          // Highlight matches
          const highlightedText = text.replace(
            regex,
            '<span class="search-highlight">$1</span>'
          );
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = highlightedText;

          // Replace text node with highlighted content
          const parent = node.parentNode;
          while (tempDiv.firstChild) {
            parent.insertBefore(tempDiv.firstChild, node);
          }
          parent.removeChild(node);
        }
      });
    });

    this.searchResults = searchResults;
    this.currentSearchIndex = 0;

    if (searchResults.length > 0) {
      this.showSearchResult(0);
    }
  }

  getTextNodes(element) {
    const textNodes = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        // Skip script and style elements
        const parent = node.parentNode;
        if (parent.tagName === "SCRIPT" || parent.tagName === "STYLE") {
          return NodeFilter.FILTER_REJECT;
        }
        // Only include nodes with meaningful text
        if (node.textContent.trim().length > 0) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_REJECT;
      },
    });

    let node;
    while ((node = walker.nextNode())) {
      textNodes.push(node);
    }

    return textNodes;
  }

  clearSearchHighlights() {
    const highlights = document.querySelectorAll(".search-highlight");
    highlights.forEach((highlight) => {
      const parent = highlight.parentNode;
      parent.replaceChild(
        document.createTextNode(highlight.textContent),
        highlight
      );
      parent.normalize();
    });
  }

  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  findNextSearchResult() {
    if (!this.searchResults || this.searchResults.length === 0) return;

    this.currentSearchIndex =
      (this.currentSearchIndex + 1) % this.searchResults.length;
    this.showSearchResult(this.currentSearchIndex);
  }

  showSearchResult(index) {
    if (!this.searchResults || !this.searchResults[index]) return;

    const result = this.searchResults[index];
    this.showSlide(result.slideIndex);

    // Scroll to highlight
    setTimeout(() => {
      const highlight = document.querySelector(".search-highlight");
      if (highlight) {
        highlight.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 300);
  }

  clearSearch() {
    this.clearSearchHighlights();
    this.searchResults = [];
    this.currentSearchIndex = 0;
  }

  // Document Viewer Controls
  initDocumentViewer() {
    // Create fullscreen modal
    this.createFullscreenModal();

    // Initialize print functionality
    this.initPrintFunctionality();
  }

  createFullscreenModal() {
    const modal = document.createElement("div");
    modal.className = "fullscreen-modal";
    modal.innerHTML = `
            <div class="fullscreen-content">
                <button class="fullscreen-close">
                    <i class="fas fa-times"></i>
                </button>
                <iframe id="fullscreen-frame" width="100%" height="100%"></iframe>
            </div>
        `;

    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector(".fullscreen-close");
    closeBtn.addEventListener("click", () => {
      this.closeFullscreen();
    });

    // Close on backdrop click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        this.closeFullscreen();
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        this.closeFullscreen();
      }
    });
  }

  initPrintFunctionality() {
    // Print functionality is handled by the global functions
    // defined below for backward compatibility
  }

  closeFullscreen() {
    const modal = document.querySelector(".fullscreen-modal");
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Keyboard Shortcuts
  initKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      // Ignore if user is typing in an input field
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          this.previousSlide();
          break;
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          this.nextSlide();
          break;
        case "Home":
          e.preventDefault();
          this.showSlide(0);
          break;
        case "End":
          e.preventDefault();
          this.showSlide(this.totalSlides - 1);
          break;
      }
    });
  }

  nextSlide() {
    if (this.currentSlide < this.totalSlides - 1) {
      this.showSlide(this.currentSlide + 1);
    }
  }

  previousSlide() {
    if (this.currentSlide > 0) {
      this.showSlide(this.currentSlide - 1);
    }
  }

  // Mobile Optimizations
  initMobileOptimizations() {
    // Touch gesture support
    this.initTouchGestures();

    // Mobile-specific UI adjustments
    this.initMobileUI();

    // Responsive navigation
    this.initResponsiveNav();
  }

  initTouchGestures() {
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    });

    document.addEventListener("touchend", (e) => {
      if (!touchStartX || !touchStartY) return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      const deltaX = touchStartX - touchEndX;
      const deltaY = touchStartY - touchEndY;

      // Horizontal swipe detection
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          // Swipe left - next slide
          this.nextSlide();
        } else {
          // Swipe right - previous slide
          this.previousSlide();
        }
      }

      touchStartX = 0;
      touchStartY = 0;
    });
  }

  initMobileUI() {
    // Auto-hide search on mobile when scrolling
    let lastScrollTop = 0;

    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;

      if (window.innerWidth <= 768) {
        if (currentScroll > lastScrollTop && this.searchActive) {
          this.closeSearch();
        }
      }

      lastScrollTop = currentScroll;
    });
  }

  initResponsiveNav() {
    // Create mobile navigation toggle if needed
    if (window.innerWidth <= 768) {
      this.createMobileNavToggle();
    }

    // Handle resize
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 768) {
        this.createMobileNavToggle();
      } else {
        this.removeMobileNavToggle();
      }
    });
  }

  createMobileNavToggle() {
    const nav = document.querySelector(".nav");
    const existingToggle = document.querySelector(".nav-toggle");

    if (!existingToggle && nav) {
      const toggle = document.createElement("button");
      toggle.className = "nav-toggle btn btn--secondary";
      toggle.innerHTML = '<i class="fas fa-bars"></i> Menu';
      toggle.style.marginBottom = "15px";
      toggle.style.display = "block";
      toggle.style.width = "100%";

      toggle.addEventListener("click", () => {
        nav.style.display = nav.style.display === "none" ? "flex" : "none";
      });

      nav.parentNode.insertBefore(toggle, nav);
      nav.style.display = "none";
    }
  }

  removeMobileNavToggle() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".nav");

    if (toggle) {
      toggle.remove();
    }

    if (nav) {
      nav.style.display = "flex";
    }
  }
}

// Global functions for document viewer controls
function toggleFullscreen(frameId) {
  const frame = document.getElementById(frameId);
  const modal = document.querySelector(".fullscreen-modal");
  const fullscreenFrame = document.getElementById("fullscreen-frame");

  if (frame && modal && fullscreenFrame) {
    fullscreenFrame.src = frame.src;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function printDocument(frameId) {
  const frame = document.getElementById(frameId);

  if (frame && frame.contentWindow) {
    try {
      frame.contentWindow.print();
    } catch (e) {
      // Fallback: open in new window and print
      window.open(frame.src, "_blank");
    }
  }
}

// Initialize presentation when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const presentation = new PresentationApp();

  // Make presentation globally accessible for debugging
  window.osintPresentation = presentation;

  // Add loading animation
  document.body.classList.add("loaded");
});

// Add CSS animation for loading
const style = document.createElement("style");
style.textContent = `
    body:not(.loaded) {
        opacity: 0;
    }

    body.loaded {
        opacity: 1;
        transition: opacity 0.5s ease-in-out;
    }

    .nav-toggle {
        display: none !important;
    }

    @media (max-width: 768px) {
        .nav-toggle {
            display: block !important;
        }
    }
`;
document.head.appendChild(style);

// Handle page visibility changes to pause/resume if needed
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    console.log("Report presentation paused");
  } else {
    console.log("Report presentation resumed");
  }
});

// Add error handling for better user experience
window.addEventListener("error", function (e) {
  console.error("Application error:", e.error);

  // Show user-friendly error message
  const errorDiv = document.createElement("div");
  errorDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--color-error);
        color: white;
        padding: 20px;
        border-radius: 8px;
        z-index: 10000;
        max-width: 400px;
        text-align: center;
    `;
  errorDiv.textContent = "An error occurred. Please refresh the page.";

  document.body.appendChild(errorDiv);

  // Auto-remove error message after 5 seconds
  setTimeout(() => {
    errorDiv.remove();
  }, 5000);
});

// Export for module usage if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = { PresentationApp, PresentationEnhancements };
}
