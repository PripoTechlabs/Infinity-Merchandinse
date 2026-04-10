/* ==========================================================
   Infinity Merchandise — Custom JavaScript
   ========================================================== */

(function () {
    'use strict';

    /* --------------------------------------------------------
       GOOGLE SHEETS ENDPOINT
       Paste your deployed Apps Script Web App URL below.
       See: google-apps-script.js for setup instructions.
    -------------------------------------------------------- */
    const GSHEET_URL = ''; // ← replace with your Apps Script URL after deploying

    /* --------------------------------------------------------
       ENQUIRY MODAL
    -------------------------------------------------------- */
    const MODAL_OVERLAY = document.getElementById('im-enquiry-modal');
    const MODAL_CATEGORY_INPUT = document.getElementById('im-product-category');

    function openModal(category, subProduct) {
        if (!MODAL_OVERLAY) return;
        // Uncheck all product checkboxes first
        MODAL_OVERLAY.querySelectorAll('input[name="product_interest"]').forEach(cb => {
            cb.checked = false;
        });
        MODAL_OVERLAY.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (category) {
            // Check the matching checkbox if it exists
            const checkboxes = MODAL_OVERLAY.querySelectorAll('input[name="product_interest"]');
            checkboxes.forEach(cb => {
                if (cb.value.toLowerCase().includes(category.toLowerCase()) ||
                    category.toLowerCase().includes(cb.value.toLowerCase().split('&')[0].trim())) {
                    cb.checked = true;
                }
            });
        }
        // Populate sub-product hidden field (used on product.html)
        const subProductField = document.getElementById('im-subproduct');
        if (subProductField) {
            subProductField.value = subProduct || '';
        }
        // Pre-fill message textarea with sub-product if provided
        if (subProduct) {
            const msg = document.getElementById('im-message');
            if (msg && !msg.value) {
                msg.value = 'Interested in: ' + subProduct;
            }
        }
        // Focus first input
        const firstInput = MODAL_OVERLAY.querySelector('input[type="text"]');
        if (firstInput) setTimeout(() => firstInput.focus(), 100);
    }

    // Expose globally for product-page.js and other external callers
    window.openModal = openModal;

    function closeModal() {
        if (!MODAL_OVERLAY) return;
        MODAL_OVERLAY.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close on overlay click
    if (MODAL_OVERLAY) {
        MODAL_OVERLAY.addEventListener('click', function (e) {
            if (e.target === MODAL_OVERLAY) closeModal();
        });
    }

    // Close button
    const closeBtn = document.getElementById('im-modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // ESC key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
    });

    // All "Make an Enquiry" triggers
    document.querySelectorAll('[data-im-open-modal]').forEach(el => {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            openModal(this.dataset.imCategory || '');
        });
    });

    // Fixed tab (desktop + mobile)
    const enquiryTab = document.getElementById('im-enquiry-tab');
    const enquiryMobile = document.getElementById('im-enquiry-mobile');
    if (enquiryTab) enquiryTab.addEventListener('click', () => openModal());
    if (enquiryMobile) enquiryMobile.addEventListener('click', () => openModal());

    /* --------------------------------------------------------
       ENQUIRY FORM SUBMISSION → Google Sheets
    -------------------------------------------------------- */
    const enquiryForm = document.getElementById('im-enquiry-form');
    if (enquiryForm) {
        // Save original form HTML so user can resubmit
        const originalFormHTML = enquiryForm.innerHTML;

        function attachFormHandler() {
            enquiryForm.addEventListener('submit', async function (e) {
                e.preventDefault();
                const btn = this.querySelector('[type="submit"]');
                const originalText = btn.textContent;
                btn.textContent = 'Sending…';
                btn.disabled = true;

                const fd = new FormData(this);

                // Collect multi-select checkbox groups into comma-separated strings
                const productInterests = [...this.querySelectorAll('input[name="product_interest"]:checked')].map(cb => cb.value).join(', ');
                const services         = [...this.querySelectorAll('input[name="services_needed"]:checked')].map(cb => cb.value).join(', ');
                const sourceMarkets    = [...this.querySelectorAll('input[name="source_market"]:checked')].map(cb => cb.value).join(', ');
                const destinations     = [...this.querySelectorAll('input[name="destination"]:checked')].map(cb => cb.value).join(', ');

                const payload = {
                    name:             fd.get('name')      || '',
                    email:            fd.get('email')     || '',
                    phone:            fd.get('phone')     || '',
                    company:          fd.get('company')   || '',
                    country:          fd.get('country')   || '',
                    role:             fd.get('role')      || '',
                    product_interests: productInterests,
                    quantity:         fd.get('quantity')  || '',
                    frequency:        fd.get('frequency') || '',
                    budget:           fd.get('budget')    || '',
                    timeline:         fd.get('timeline')  || '',
                    source_markets:   sourceMarkets,
                    destinations:     destinations,
                    services_needed:  services,
                    message:          fd.get('message')   || '',
                    how_heard:        fd.get('how_heard') || ''
                };

                if (!GSHEET_URL) {
                    console.warn('GSHEET_URL not set — form data logged to console only:', payload);
                    showSuccess();
                    return;
                }

                try {
                    // Content-Type: text/plain avoids CORS preflight while still
                    // delivering the JSON body to Google Apps Script (e.postData.contents)
                    await fetch(GSHEET_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'text/plain' },
                        body: JSON.stringify(payload)
                    });
                    showSuccess();
                } catch (err) {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    alert('Something went wrong. Please reach us on WhatsApp or email directly.');
                }
            });
        }

        function showSuccess() {
            enquiryForm.innerHTML = `
                <div style="text-align:center;padding:3rem 1rem;">
                    <div style="font-size:3rem;margin-bottom:1rem;">✅</div>
                    <h3 style="color:#0B2641;margin-bottom:0.5rem;">Enquiry Received!</h3>
                    <p style="color:#555;">Thank you for reaching out.<br>Our sourcing team will contact you within 24 hours.</p>
                    <button id="im-new-enquiry-btn" style="margin-top:1.5rem;padding:0.7rem 1.75rem;background:#0B2641;color:#fff;border:none;border-radius:0.5rem;font-size:0.9rem;font-weight:600;cursor:pointer;letter-spacing:0.03em;">
                        Submit Another Enquiry
                    </button>
                </div>
            `;
            document.getElementById('im-new-enquiry-btn').addEventListener('click', function () {
                enquiryForm.innerHTML = originalFormHTML;
                attachFormHandler();
            });
        }

        attachFormHandler();
    }

    /* --------------------------------------------------------
       PRODUCT CATEGORY ACCORDION
    -------------------------------------------------------- */
    document.querySelectorAll('.im-product-card').forEach(card => {
        card.addEventListener('click', function (e) {
            // Don't close if enquiry btn was clicked
            if (e.target.closest('.im-product-enquiry-btn')) return;

            const isOpen = this.classList.contains('open');
            // Close all
            document.querySelectorAll('.im-product-card').forEach(c => c.classList.remove('open'));
            // Toggle current
            if (!isOpen) this.classList.add('open');
        });
    });

    // Product enquiry buttons
    document.querySelectorAll('.im-product-enquiry-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            openModal(this.dataset.category || '');
        });
    });

    /* --------------------------------------------------------
       PRODUCTS CAROUSEL — JS auto-scroll + drag (desktop & mobile)
    -------------------------------------------------------- */
    (function () {
        const outer = document.querySelector('.im-products-carousel-outer');
        const track = document.querySelector('.im-products-track');
        if (!outer || !track) return;

        let running = true;
        let isDragging = false;
        let dragStartX = 0;
        let dragScrollLeft = 0;
        let resumeTimer = null;

        function halfWidth() {
            return track.scrollWidth / 2;
        }

        // Auto-scroll loop via rAF
        function tick() {
            if (running && !isDragging) {
                outer.scrollLeft += 1;
                if (outer.scrollLeft >= halfWidth()) {
                    outer.scrollLeft -= halfWidth();
                }
            }
            requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);

        function pause() {
            running = false;
            if (resumeTimer) { clearTimeout(resumeTimer); resumeTimer = null; }
        }

        function resume(delay) {
            if (resumeTimer) clearTimeout(resumeTimer);
            resumeTimer = setTimeout(() => { running = true; }, delay || 0);
        }

        // Hover pause (desktop)
        outer.addEventListener('mouseenter', () => pause());
        outer.addEventListener('mouseleave', () => { if (!isDragging) resume(); });

        // Mouse drag (desktop)
        outer.addEventListener('mousedown', (e) => {
            isDragging = true;
            pause();
            dragStartX = e.pageX - outer.getBoundingClientRect().left;
            dragScrollLeft = outer.scrollLeft;
            outer.style.cursor = 'grabbing';
            e.preventDefault();
        });
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const x = e.pageX - outer.getBoundingClientRect().left;
            const walk = x - dragStartX;
            outer.scrollLeft = dragScrollLeft - walk;
        });
        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            outer.style.cursor = 'grab';
            resume(2000);
        });

        // Touch drag (mobile)
        outer.addEventListener('touchstart', (e) => {
            isDragging = true;
            pause();
            dragStartX = e.touches[0].pageX - outer.getBoundingClientRect().left;
            dragScrollLeft = outer.scrollLeft;
        }, { passive: true });
        outer.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const x = e.touches[0].pageX - outer.getBoundingClientRect().left;
            outer.scrollLeft = dragScrollLeft - (x - dragStartX);
        }, { passive: true });
        outer.addEventListener('touchend', () => {
            isDragging = false;
            resume(2000); // Resume auto-scroll 2s after user stops touching
        }, { passive: true });
    })();

    /* --------------------------------------------------------
       PRODUCT SLIDE CLICKS → navigate to product detail page
       Slides are now <a> tags; click handler removed.
       Kept as no-op block for future extensibility.
    -------------------------------------------------------- */

    /* --------------------------------------------------------
       WORLD MAP REGION TABS
    -------------------------------------------------------- */
    const REGION_DATA = {
        gcc: {
            label: 'GCC Markets',
            countries: 'UAE, Saudi Arabia, Qatar, Kuwait, Oman, Bahrain',
            products: ['Textiles & Apparel', 'Corporate Gifts & Promotional Items', 'Office Furniture', 'Dry Fruits & Dates', 'Kitchen Utilities', 'Small Electronics', 'Wall Paintings & Home Décor', 'Stationery Items', 'Shoes & Footwear', 'Wholesale Consumer Goods']
        },
        eu: {
            label: 'European Markets',
            countries: 'Germany, France, Netherlands, UK, Spain, Italy & more',
            products: ['Textiles & Apparel', 'Shoes & Footwear', 'Textile Accessories', 'Corporate Gifts', 'Promotional Merchandise', 'Wall Paintings & Home Décor', 'Wholesale Consumer Goods']
        },
        us: {
            label: 'United States',
            countries: 'USA — West Coast, East Coast, Midwest',
            products: ['Promotional Merchandise', 'Corporate Gifts', 'Stationery Items', 'Small Electronics', 'Kitchen Utilities', 'Wholesale Consumer Goods']
        },
        asia: {
            label: 'Asia Pacific',
            countries: 'India, Vietnam, Bangladesh, South Korea, Japan, Singapore',
            products: ['Textiles & Apparel', 'Textile Machinery', 'Imported Commercial Machinery', 'Textile Accessories', 'Shoes & Footwear', 'Kitchen Utilities & Machinery', 'Wholesale Consumer Goods']
        }
    };

    function renderRegion(regionKey) {
        const data = REGION_DATA[regionKey];
        if (!data) return;

        // Update active tab
        document.querySelectorAll('.im-region-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.region === regionKey);
        });

        // Update panel
        const panel = document.getElementById('im-region-products');
        if (!panel) return;

        panel.innerHTML = `
            <div class="im-region-product-list">
                <div style="color:rgba(255,255,255,0.5);font-size:0.75rem;margin-bottom:0.75rem;letter-spacing:0.05em;">${data.countries}</div>
                ${data.products.map(p => `<div class="im-region-product-item">${p}</div>`).join('')}
            </div>
        `;
    }

    // Tab clicks
    document.querySelectorAll('.im-region-tab').forEach(tab => {
        tab.addEventListener('click', function () {
            renderRegion(this.dataset.region);
        });
    });

    // Init with GCC
    renderRegion('gcc');

    /* --------------------------------------------------------
       SMOOTH SCROLL for NAVBAR LINKS
    -------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return; // plain # links handled elsewhere
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                // Close hamburger menu if open (click the Webflow close button)
                const crossBtn = document.querySelector('.rt-hamburger-cross-icon-wrapper');
                if (crossBtn && window.getComputedStyle(document.querySelector('.rt-nav-background') || document.body).display !== 'none') {
                    crossBtn.click();
                }
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 50);
            }
        });
    });

    /* --------------------------------------------------------
       PRODUCT-TO-MARKET MAP — pin click/tap toggle
    -------------------------------------------------------- */
    document.querySelectorAll('.im-ptm-pin-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const group = this.closest('.im-ptm-pin-group');
            const isActive = group.classList.contains('active');
            // Close all open pins
            document.querySelectorAll('.im-ptm-pin-group.active').forEach(g => {
                g.classList.remove('active');
                g.querySelector('.im-ptm-pin-btn').setAttribute('aria-expanded', 'false');
            });
            // Toggle current
            if (!isActive) {
                group.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Close map pins on outside click
    document.addEventListener('click', function () {
        document.querySelectorAll('.im-ptm-pin-group.active').forEach(g => {
            g.classList.remove('active');
            g.querySelector('.im-ptm-pin-btn').setAttribute('aria-expanded', 'false');
        });
    });

    // Prevent popup click from closing it
    document.querySelectorAll('.im-ptm-popup').forEach(popup => {
        popup.addEventListener('click', e => e.stopPropagation());
    });

    /* --------------------------------------------------------
       PRODUCT-TO-MARKET CARDS — mobile accordion
    -------------------------------------------------------- */
    document.querySelectorAll('.im-ptm-card-hdr').forEach(hdr => {
        hdr.addEventListener('click', function () {
            const card = this.closest('.im-ptm-card');
            const list = card.querySelector('.im-ptm-card-list');
            const isOpen = this.getAttribute('aria-expanded') === 'true';
            // Close all
            document.querySelectorAll('.im-ptm-card-hdr').forEach(h => {
                h.setAttribute('aria-expanded', 'false');
                h.closest('.im-ptm-card').querySelector('.im-ptm-card-list').classList.remove('open');
            });
            // Toggle current
            if (!isOpen) {
                this.setAttribute('aria-expanded', 'true');
                list.classList.add('open');
            }
        });
    });

    /* --------------------------------------------------------
       PTM MAP — animate trade route arcs on scroll into view
    -------------------------------------------------------- */
    (function () {
        var ptmSection = document.getElementById('global-reach');
        if (!ptmSection) return;
        var arcsSvg = ptmSection.querySelector('.im-ptm-arcs-svg');
        if (!arcsSvg) return;

        var animated = false;

        function startArcs() {
            if (animated) return;
            animated = true;
            arcsSvg.classList.add('im-ptm-arcs--animate');
            // Start traveling particles after arcs finish drawing
            var particles = arcsSvg.querySelectorAll('animateMotion');
            var delays = [2000, 2300, 2800, 3100];
            particles.forEach(function (anim, i) {
                setTimeout(function () { anim.beginElement(); }, delays[i] || 2000);
            });
        }

        if ('IntersectionObserver' in window) {
            var ptmObserver = new IntersectionObserver(function (entries) {
                if (entries[0].isIntersecting) {
                    startArcs();
                    ptmObserver.disconnect();
                }
            }, { threshold: 0.15 });
            ptmObserver.observe(ptmSection);
        } else {
            startArcs();
        }
    }());

    /* --------------------------------------------------------
       PRODUCT CAROUSEL — lazy-load videos + play/pause on visibility
    -------------------------------------------------------- */
    (function () {
        var videos = document.querySelectorAll('.im-product-slide-video');
        if (!videos.length || !('IntersectionObserver' in window)) {
            // Fallback: load & play all immediately (no IO support)
            videos.forEach(function (v) {
                if (v.dataset.src) { v.src = v.dataset.src; v.load(); v.play().catch(function(){}); }
            });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                var v = entry.target;
                if (entry.isIntersecting) {
                    // Load source on first intersection
                    if (!v.src && v.dataset.src) {
                        v.src = v.dataset.src;
                        v.load();
                    }
                    v.play().catch(function () {});
                } else {
                    v.pause();
                }
            });
        }, {
            root: document.querySelector('.im-products-carousel-outer'),
            rootMargin: '0px 100px 0px 100px',
            threshold: 0.1
        });

        videos.forEach(function (v) { observer.observe(v); });
    }());

    /* --------------------------------------------------------
       STICKY NAVBAR (add background on scroll)
    -------------------------------------------------------- */
    const navbar = document.querySelector('.rt-navbar-v1');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 80) {
                navbar.style.background = 'rgba(7,24,41,0.97)';
            } else {
                navbar.style.background = '';
            }
        }, { passive: true });
    }

})();
