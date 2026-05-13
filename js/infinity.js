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
    const GSHEET_URL = 'https://script.google.com/macros/s/AKfycbzpmVmVAYIuVtZ0nGkVaP8KTFk1DuK_nlQ9Kza50_Ure0su466kpwFR-YP2s09tT7bKNQ/exec';

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
        MODAL_OVERLAY.scrollTop = 0;
        const modalBox = MODAL_OVERLAY.querySelector('.im-modal');
        if (modalBox) modalBox.scrollTop = 0;
        document.body.style.overflow = 'hidden';
        document.body.classList.add('im-modal-open');
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
        document.body.classList.remove('im-modal-open');
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
                    console.log('Submitting form to:', GSHEET_URL);
                    const response = await fetch(GSHEET_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'text/plain' },
                        body: JSON.stringify(payload)
                    });
                    console.log('Response status:', response.status);
                    const text = await response.text();
                    console.log('Response body:', text);
                    showSuccess();
                } catch (err) {
                    console.error('Fetch error:', err);
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

        // Prev/Next arrow buttons — step by one slide width
        function slideStep() {
            const slide = track.querySelector('.im-product-slide');
            if (!slide) return outer.clientWidth * 0.8;
            const styles = window.getComputedStyle(track);
            const gap = parseFloat(styles.columnGap || styles.gap || 0) || 0;
            return slide.getBoundingClientRect().width + gap;
        }
        function step(dir) {
            pause();
            const half = halfWidth();
            let next = outer.scrollLeft + dir * slideStep();
            // Keep within the first set so the seamless loop logic stays valid
            if (next < 0) next += half;
            if (next >= half) next -= half;
            outer.scrollTo({ left: next, behavior: 'smooth' });
            resume(2500);
        }
        const prevBtn = document.getElementById('im-products-prev');
        const nextBtn = document.getElementById('im-products-next');
        if (prevBtn) prevBtn.addEventListener('click', () => step(-1));
        if (nextBtn) nextBtn.addEventListener('click', () => step(1));
    })();

    /* --------------------------------------------------------
       PRODUCT SLIDE CLICKS → navigate to product detail page
       Slides are now <a> tags; click handler removed.
       Kept as no-op block for future extensibility.
    -------------------------------------------------------- */

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
       PTM MAP — geographic pin placement + auto-built arcs

       Each pin has data-lat / data-lng attributes. We project
       geo coords to % positions over the worldmap.svg image
       using an equirectangular projection with bounds tuned
       to the SVG's visible content (trimmed Antarctica/arctic).

       Tweak LAT_MAX / LAT_MIN / LON_MIN / LON_MAX below if the
       underlying worldmap.svg is swapped for a different crop.
    -------------------------------------------------------- */
    (function () {
        var mapWrap = document.querySelector('.im-ptm-map-wrap');
        var arcsSvg = document.getElementById('im-ptm-arcs');
        if (!mapWrap || !arcsSvg) return;

        // Equirectangular projection bounds — tuned for the current worldmap.svg.
        // SVG covers roughly -180°..180° longitude and ~83°N..-55°S (Antarctica trimmed).
        // Tweak these if you swap the underlying map.
        var LON_MIN = -180, LON_MAX = 180;
        var LAT_MAX = 83,   LAT_MIN = -55;

        // SVG viewBox (must match <svg viewBox="...">)
        var SVG_W = 2000, SVG_H = 857;

        function latLngToPercent(lat, lng) {
            var xPct = (lng - LON_MIN) / (LON_MAX - LON_MIN) * 100;
            var yPct = (LAT_MAX - lat) / (LAT_MAX - LAT_MIN) * 100;
            return { x: xPct, y: yPct };
        }

        function latLngToSvg(lat, lng) {
            var p = latLngToPercent(lat, lng);
            return { x: p.x / 100 * SVG_W, y: p.y / 100 * SVG_H };
        }

        // 1) Position each pin by geo coords
        var pins = Array.prototype.slice.call(mapWrap.querySelectorAll('.im-ptm-pin-group[data-lat][data-lng]'));
        var hqs = []; // [{el, lat, lng, svg}]
        var markets = []; // same shape but non-HQ

        pins.forEach(function (el) {
            var lat = parseFloat(el.dataset.lat);
            var lng = parseFloat(el.dataset.lng);
            if (isNaN(lat) || isNaN(lng)) return;
            var p = latLngToPercent(lat, lng);
            el.style.left = p.x.toFixed(3) + '%';
            el.style.top  = p.y.toFixed(3) + '%';
            var rec = { el: el, lat: lat, lng: lng, svg: latLngToSvg(lat, lng) };
            if (el.dataset.hq) hqs.push(rec); else markets.push(rec);
        });

        // 2) Build arcs — each market → nearest HQ (great-circle distance), plus HQ1↔HQ2
        var SVG_NS = 'http://www.w3.org/2000/svg';
        var XLINK_NS = 'http://www.w3.org/1999/xlink';

        function haversine(a, b) {
            var toRad = Math.PI / 180;
            var dLat = (b.lat - a.lat) * toRad;
            var dLng = (b.lng - a.lng) * toRad;
            var la1 = a.lat * toRad, la2 = b.lat * toRad;
            var h = Math.sin(dLat/2)**2 + Math.cos(la1)*Math.cos(la2)*Math.sin(dLng/2)**2;
            return 2 * Math.asin(Math.sqrt(h));
        }

        function quadPath(from, to, curve) {
            // Control point offset perpendicular to the segment, scaled by length
            var mx = (from.x + to.x) / 2;
            var my = (from.y + to.y) / 2;
            var dx = to.x - from.x, dy = to.y - from.y;
            var len = Math.sqrt(dx*dx + dy*dy);
            // Perpendicular unit vector (lifted upward)
            var px = -dy / len, py = dx / len;
            // Always lift arcs upward (negative y in SVG) when endpoints roughly horizontal
            if (py > 0) { px = -px; py = -py; }
            var lift = len * (curve || 0.22);
            var cx = mx + px * lift;
            var cy = my + py * lift;
            return 'M ' + from.x.toFixed(1) + ' ' + from.y.toFixed(1) +
                   ' Q ' + cx.toFixed(1) + ' ' + cy.toFixed(1) +
                   ' ' + to.x.toFixed(1) + ' ' + to.y.toFixed(1);
        }

        function addArc(id, from, to, colorClass, delayClass) {
            var path = document.createElementNS(SVG_NS, 'path');
            path.setAttribute('id', id);
            path.setAttribute('class', 'im-ptm-arc ' + colorClass + (delayClass ? ' ' + delayClass : ''));
            path.setAttribute('d', quadPath(from, to));
            arcsSvg.appendChild(path);

            var circle = document.createElementNS(SVG_NS, 'circle');
            var particleClass = colorClass.indexOf('blue') > -1 ? 'im-ptm-particle--blue' : 'im-ptm-particle--gold';
            circle.setAttribute('class', 'im-ptm-particle ' + particleClass);
            circle.setAttribute('r', '3.8');
            var anim = document.createElementNS(SVG_NS, 'animateMotion');
            var dist = Math.sqrt((to.x-from.x)**2 + (to.y-from.y)**2);
            anim.setAttribute('dur', Math.max(2, dist / 260).toFixed(2) + 's');
            anim.setAttribute('repeatCount', 'indefinite');
            anim.setAttribute('begin', 'indefinite');
            var mpath = document.createElementNS(SVG_NS, 'mpath');
            mpath.setAttributeNS(XLINK_NS, 'xlink:href', '#' + id);
            mpath.setAttribute('href', '#' + id);
            anim.appendChild(mpath);
            circle.appendChild(anim);
            arcsSvg.appendChild(circle);
        }

        if (hqs.length >= 1) {
            var delayClasses = ['', 'im-ptm-arc--d1', 'im-ptm-arc--d2', 'im-ptm-arc--d3', 'im-ptm-arc--d4', 'im-ptm-arc--d5'];

            // Identify HQ1 (Dubai) and HQ2 (Chennai) explicitly
            var hq1 = null, hq2 = null;
            hqs.forEach(function (h) {
                if (h.el.dataset.hq === '1') hq1 = h;
                else if (h.el.dataset.hq === '2') hq2 = h;
            });
            // Fallback: if only one HQ exists, treat it as HQ1
            if (!hq1) hq1 = hqs[0];

            var sources = markets.filter(function (m) { return m.el.dataset.source === 'true'; });
            var destinations = markets.filter(function (m) { return m.el.dataset.source !== 'true'; });

            // Stage 1: source regions → HQ2 Chennai (blue, inbound)
            if (hq2) {
                sources.forEach(function (m, i) {
                    addArc('im-arc-src' + i, m.svg, hq2.svg, 'im-ptm-arc--blue', delayClasses[i % delayClasses.length]);
                });
            }

            // Stage 2: HQ2 Chennai → HQ1 Dubai (gold, relay)
            if (hq1 && hq2) {
                addArc('im-arc-hq-link', hq2.svg, hq1.svg, 'im-ptm-arc--gold', 'im-ptm-arc--d2');
            }

            // Stage 3: HQ1 Dubai → destination markets (gold, outbound)
            destinations.forEach(function (m, i) {
                addArc('im-arc-dst' + i, hq1.svg, m.svg, 'im-ptm-arc--gold', delayClasses[(i + 1) % delayClasses.length]);
            });
        }
    })();

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
            var delays = [2000, 2200, 2400, 2600, 2800, 3000, 3200];
            particles.forEach(function (anim, i) {
                setTimeout(function () { anim.beginElement(); }, delays[i] || 2200 + i * 100);
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
            rootMargin: '0px 100px 0px 100px',
            threshold: 0.1
        });

        videos.forEach(function (v) { observer.observe(v); });
    }());

    /* --------------------------------------------------------
       WHAT WE DO — mobile interactivity
       Reveal cards on scroll, auto-activate the most centered
       card, and toggle on tap. Desktop hover is untouched.
    -------------------------------------------------------- */
    (function () {
        const section = document.getElementById('what-we-do');
        if (!section) return;
        const cards = section.querySelectorAll('.rt-card-wrapper');
        if (!cards.length) return;
        const mq = window.matchMedia('(max-width: 991px)');
        if (!mq.matches) return;

        // Reveal on enter
        if ('IntersectionObserver' in window) {
            const reveal = new IntersectionObserver(function (entries) {
                entries.forEach(function (e) {
                    if (e.isIntersecting) {
                        e.target.classList.add('im-wd-visible');
                        reveal.unobserve(e.target);
                    }
                });
            }, { threshold: 0.18, rootMargin: '0px 0px -10% 0px' });
            cards.forEach(function (c) { reveal.observe(c); });
        } else {
            cards.forEach(function (c) { c.classList.add('im-wd-visible'); });
        }

        // Auto-activate card closest to viewport center while scrolling
        let ticking = false;
        function updateActive() {
            ticking = false;
            const vh = window.innerHeight || document.documentElement.clientHeight;
            const center = vh / 2;
            let best = null;
            let bestDist = Infinity;
            cards.forEach(function (c) {
                const r = c.getBoundingClientRect();
                if (r.bottom < 0 || r.top > vh) return;
                const cardMid = r.top + r.height / 2;
                const d = Math.abs(cardMid - center);
                if (d < bestDist) { bestDist = d; best = c; }
            });
            cards.forEach(function (c) {
                if (c === best && bestDist < vh * 0.35) c.classList.add('im-wd-active');
                else c.classList.remove('im-wd-active');
            });
        }
        function onScroll() {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(updateActive);
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        updateActive();
    })();

    /* --------------------------------------------------------
       FOOTER YEAR — auto-update copyright
    -------------------------------------------------------- */
    const footerYear = document.getElementById('im-footer-year');
    if (footerYear) footerYear.textContent = new Date().getFullYear();

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

    /* --------------------------------------------------------
       SIX PILLARS — scroll reveal + card auto-cycle + 3D tilt
       Runs on both desktop and mobile.
    -------------------------------------------------------- */
    (function () {
        const section = document.getElementById('what-we-do');
        if (!section) return;

        // Cards sorted by number badge ascending (01,02,03,04,05,06)
        var allCards = Array.from(section.querySelectorAll('.rt-card-wrapper')).sort(function (a, b) {
            var numA = parseInt(a.querySelector('.rt-text-color-white')?.textContent || '0', 10);
            var numB = parseInt(b.querySelector('.rt-text-color-white')?.textContent || '0', 10);
            return numA - numB;
        });
        var cycleIdx = 0;
        var paused = false;
        var cycleTimer = null;
        var enterTimer = null;

        // SVG progress arc — tracks visited cards
        var circleWrapper = section.querySelector('.rt-main-circle-wrapper');
        var arcCircle = null;
        var total = allCards.length;
        var visited = new Set();

        if (circleWrapper) {
            var r = 156, circ = 2 * Math.PI * r;
            var svgNS = 'http://www.w3.org/2000/svg';
            var svg = document.createElementNS(svgNS, 'svg');
            svg.setAttribute('class', 'im-pillar-arc-svg');
            svg.setAttribute('viewBox', '0 0 340 340');
            var trackEl = document.createElementNS(svgNS, 'circle');
            trackEl.setAttribute('cx', '170'); trackEl.setAttribute('cy', '170');
            trackEl.setAttribute('r', String(r)); trackEl.setAttribute('fill', 'none');
            trackEl.setAttribute('stroke', 'rgba(196,154,46,0.12)'); trackEl.setAttribute('stroke-width', '3');
            arcCircle = document.createElementNS(svgNS, 'circle');
            arcCircle.setAttribute('cx', '170'); arcCircle.setAttribute('cy', '170');
            arcCircle.setAttribute('r', String(r)); arcCircle.setAttribute('fill', 'none');
            arcCircle.setAttribute('stroke', 'rgba(196,154,46,0.85)'); arcCircle.setAttribute('stroke-width', '3');
            arcCircle.setAttribute('stroke-linecap', 'round');
            arcCircle.setAttribute('stroke-dasharray', String(circ));
            arcCircle.setAttribute('stroke-dashoffset', String(circ));
            arcCircle.setAttribute('transform', 'rotate(-90 170 170)');
            svg.appendChild(trackEl); svg.appendChild(arcCircle);
            circleWrapper.appendChild(svg);
        }

        var celebrationDone = false;

        function burstCrackers() {
            var canvas = document.createElement('canvas');
            canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:99;';
            section.style.position = section.style.position || 'relative';
            section.appendChild(canvas);

            var W = canvas.offsetWidth  || section.offsetWidth;
            var H = canvas.offsetHeight || section.offsetHeight;
            canvas.width  = W;
            canvas.height = H;
            var ctx = canvas.getContext('2d');

            // Origin = center of section
            var ox = W / 2, oy = H / 2;

            var COLORS = ['#C49A2E','#E8C160','#ffffff','#0B2641','#F5D78E','#FFD700','#fffdf0'];
            var SHAPES = ['rect','circle','ribbon'];
            var particles = [];

            for (var i = 0; i < 180; i++) {
                var angle  = Math.random() * Math.PI * 2;
                var speed  = 4 + Math.random() * 9;
                var shape  = SHAPES[Math.floor(Math.random() * SHAPES.length)];
                particles.push({
                    x: ox, y: oy,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed - (Math.random() * 4),
                    size: 5 + Math.random() * 8,
                    color: COLORS[Math.floor(Math.random() * COLORS.length)],
                    shape: shape,
                    rot: Math.random() * Math.PI * 2,
                    rotV: (Math.random() - 0.5) * 0.25,
                    alpha: 1,
                    gravity: 0.18 + Math.random() * 0.12,
                    drag: 0.97
                });
            }

            var startTime = performance.now();
            var DURATION = 2200;

            function tick(now) {
                var elapsed = now - startTime;
                ctx.clearRect(0, 0, W, H);

                var alive = false;
                particles.forEach(function (p) {
                    p.vx *= p.drag;
                    p.vy  = p.vy * p.drag + p.gravity;
                    p.x  += p.vx;
                    p.y  += p.vy;
                    p.rot += p.rotV;
                    p.alpha = Math.max(0, 1 - elapsed / DURATION);

                    if (p.alpha <= 0) return;
                    alive = true;

                    ctx.save();
                    ctx.globalAlpha = p.alpha;
                    ctx.fillStyle = p.color;
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rot);

                    if (p.shape === 'circle') {
                        ctx.beginPath();
                        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                        ctx.fill();
                    } else if (p.shape === 'ribbon') {
                        ctx.fillRect(-p.size * 0.3, -p.size * 1.2, p.size * 0.6, p.size * 1.2);
                    } else {
                        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.55);
                    }
                    ctx.restore();
                });

                if (alive && elapsed < DURATION + 400) {
                    requestAnimationFrame(tick);
                } else {
                    canvas.remove();
                }
            }
            requestAnimationFrame(tick);
        }

        function updateArc() {
            if (!arcCircle) return;
            var r = 156, circ = 2 * Math.PI * r;
            var pct = visited.size / total;
            arcCircle.style.transition = 'stroke-dashoffset 0.5s ease';
            arcCircle.setAttribute('stroke-dashoffset', String(circ * (1 - pct)));

            if (visited.size === total && !celebrationDone) {
                celebrationDone = true;
                setTimeout(burstCrackers, 550); // fire after arc finishes drawing
            }
        }

        function markVisited(idx) {
            if (visited.has(idx)) return;
            visited.add(idx);
            updateArc();
        }

        // Center text cycling — restored
        var texts = section.querySelectorAll('.rt-card-main-title-v1, .rt-card-main-title-v2, .rt-card-main-title-v3');
        if (texts.length) {
            var textIdx = 0;
            texts[0].classList.add('im-pillar-text-active');
            setInterval(function () {
                texts[textIdx].classList.remove('im-pillar-text-active');
                textIdx = (textIdx + 1) % texts.length;
                texts[textIdx].classList.add('im-pillar-text-active');
            }, 3000);
        }

        function highlightCard(idx) {
            allCards.forEach(function (c) { c.classList.remove('im-pillar-active'); });
            if (allCards[idx]) allCards[idx].classList.add('im-pillar-active');
            markVisited(idx);
        }

        function stopCycle() {
            clearInterval(cycleTimer);
            clearTimeout(enterTimer);
            cycleTimer = null;
            cycleIdx = 0;
            visited.clear();
            celebrationDone = false;
            allCards.forEach(function (c) { c.classList.remove('im-pillar-active'); });
            if (arcCircle) {
                var r = 156, circ = 2 * Math.PI * r;
                arcCircle.style.transition = 'none';
                arcCircle.setAttribute('stroke-dashoffset', String(circ));
            }
        }

        function startCycle() {
            cycleIdx = 0;
            highlightCard(0);
            cycleTimer = setInterval(function () {
                if (paused) return;
                cycleIdx = (cycleIdx + 1) % allCards.length;
                highlightCard(cycleIdx);
            }, 1800);
        }


        // Observer — fly in on enter, fly out on exit, every time
        var sectionObserver = new IntersectionObserver(function (entries) {
            var entry = entries[0];

            if (entry.isIntersecting) {
                // Fly cards in with stagger
                allCards.forEach(function (card, i) {
                    setTimeout(function () {
                        card.classList.add('im-pillar-visible');
                    }, i * 150);
                });
                // Start highlight after all cards settle
                var delay = (allCards.length - 1) * 150 + 600;
                enterTimer = setTimeout(startCycle, delay);
            } else {
                // Fly cards out — remove visible so CSS reverses the translate
                stopCycle();
                allCards.forEach(function (card) {
                    card.classList.remove('im-pillar-visible');
                });
            }
        }, { threshold: 0.3 });

        sectionObserver.observe(section);

        // Pause cycle on hover + mark visited; resume on leave
        // Webflow IX2 sets inline style="background-color:..." via JS — override it directly
        function applyDarkCard(card) {
            card.style.setProperty('background-color', '#000000', 'important');
            var title = card.querySelector('.rt-card-title');
            var desc  = card.querySelector('.rt-card-description');
            if (title) title.style.setProperty('color', '#ffffff', 'important');
            if (desc)  desc.style.setProperty('color', 'rgba(255,255,255,0.65)', 'important');
        }
        function removeDarkCard(card) {
            card.style.removeProperty('background-color');
            var title = card.querySelector('.rt-card-title');
            var desc  = card.querySelector('.rt-card-description');
            if (title) title.style.removeProperty('color');
            if (desc)  desc.style.removeProperty('color');
        }

        allCards.forEach(function (card, i) {
            card.addEventListener('mouseenter', function () {
                paused = true;
                allCards.forEach(function (c) {
                    c.classList.remove('im-pillar-active');
                    removeDarkCard(c);
                });
                applyDarkCard(card);
                markVisited(i);
            });
            card.addEventListener('mouseleave', function () {
                removeDarkCard(card);
                paused = false;
            });
            card.addEventListener('touchstart', function (e) {
                e.stopPropagation();
                paused = true;
                allCards.forEach(function (c) {
                    c.classList.remove('im-pillar-active');
                    removeDarkCard(c);
                });
                applyDarkCard(card);
                markVisited(i);
            }, { passive: true });
            card.addEventListener('touchend', function () {
                removeDarkCard(card);
                paused = false;
            }, { passive: true });
        });

    }());

    /* --------------------------------------------------------
       SCROLL TO TOP
    -------------------------------------------------------- */
    (function () {
        const btn = document.getElementById('im-back-to-top');
        if (!btn) return;
        window.addEventListener('scroll', function () {
            btn.classList.toggle('is-visible', window.scrollY > 400);
        }, { passive: true });
        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }());

})();
