/* =============================================================
   INFINITY MERCHANDISE — Product Detail Page Logic
   Reads ?id= URL param, renders product data, animates entrance.
   ============================================================= */

(function () {
    'use strict';

    /* ── Read URL param ──────────────────────────────────────── */
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (!productId || !window.PRODUCT_DATA || !window.PRODUCT_DATA[productId]) {
        // Unknown product — redirect home
        window.location.replace('index.html#products');
        return;
    }

    const product = window.PRODUCT_DATA[productId];

    /* ── Inject page title ───────────────────────────────────── */
    document.title = product.name + ' — Infinity Merchandise';

    /* ── Inject per-product SEO (canonical, meta, OG, JSON-LD) ── */
    (function injectSEO() {
        const SITE = 'https://infinitymerchandise.com';
        const url  = SITE + '/product?id=' + encodeURIComponent(productId);
        const desc = (product.description || '').slice(0, 155) ||
                     'Source ' + product.name + ' from Infinity Merchandise — Dubai global sourcing partner.';
        const img  = product.image && product.image.startsWith('http')
                     ? product.image
                     : SITE + '/' + (product.image || 'images/og-image.jpg').replace(/^\//, '');

        const setMeta = (sel, attr, val) => {
            let el = document.querySelector(sel);
            if (el) el.setAttribute(attr, val);
        };
        setMeta('link[rel="canonical"]', 'href', url);
        setMeta('meta[name="description"]', 'content', desc);
        setMeta('meta[property="og:title"]', 'content', document.title);
        setMeta('meta[property="og:description"]', 'content', desc);
        setMeta('meta[property="og:url"]', 'content', url);
        setMeta('meta[property="og:image"]', 'content', img);
        setMeta('meta[property="og:image:alt"]', 'content', product.name);
        setMeta('meta[name="twitter:title"]', 'content', document.title);
        setMeta('meta[name="twitter:description"]', 'content', desc);
        setMeta('meta[name="twitter:image"]', 'content', img);

        const bcEl = document.getElementById('im-pd-breadcrumb-jsonld');
        if (bcEl) {
            bcEl.textContent = JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home',      item: SITE + '/' },
                    { '@type': 'ListItem', position: 2, name: 'Catalogue', item: SITE + '/all-products' },
                    { '@type': 'ListItem', position: 3, name: product.name, item: url }
                ]
            });
        }

        const productLd = document.createElement('script');
        productLd.type = 'application/ld+json';
        productLd.textContent = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: desc,
            image: img,
            url: url,
            brand: { '@type': 'Brand', name: 'Infinity Merchandise' },
            offers: {
                '@type': 'Offer',
                availability: 'https://schema.org/InStock',
                priceCurrency: 'AED',
                price: '0',
                priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'AED', valueAddedTaxIncluded: false },
                seller: { '@id': SITE + '/#business' },
                url: url
            }
        });
        document.head.appendChild(productLd);
    })();

    /* ── Render hero content ─────────────────────────────────── */
    const titleEl     = document.getElementById('im-pd-title');
    const taglineEl   = document.getElementById('im-pd-tagline');
    const descEl      = document.getElementById('im-pd-desc');
    const imgEl       = document.getElementById('im-pd-main-img');
    const pillsEl     = document.getElementById('im-pd-pills');
    const countEl     = document.getElementById('im-pd-varieties-count');
    const ctaPrimaryEl = document.getElementById('im-pd-cta-primary');
    const bottomTitleEl = document.getElementById('im-pd-bottom-title');
    const mobileBtnEl   = document.getElementById('im-pd-mobile-btn');
    const breadcrumbProductEl = document.getElementById('im-pd-breadcrumb-product');

    if (titleEl)      titleEl.textContent      = product.name;
    if (taglineEl)    taglineEl.textContent     = product.tagline;
    if (descEl)       descEl.textContent        = product.description;
    if (countEl)      countEl.textContent       = product.subProducts.length;
    if (breadcrumbProductEl) breadcrumbProductEl.textContent = product.name;
    if (bottomTitleEl) bottomTitleEl.textContent = 'Interested in ' + product.name + '?';

    if (imgEl) {
        imgEl.src = product.image;
        imgEl.alt = product.name;
    }

    /* ── Render sub-product pills ────────────────────────────── */
    if (pillsEl) {
        pillsEl.innerHTML = '';
        product.subProducts.forEach(function (sub, i) {
            const pill = document.createElement('button');
            pill.className = 'im-pd-pill';
            pill.type = 'button';
            pill.setAttribute('aria-label', 'Enquire about ' + sub);
            pill.innerHTML =
                '<svg class="im-pd-pill-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 2a6 6 0 100 12A6 6 0 008 2z"/><path d="M8 6v2m0 2v.5"/></svg>' +
                '<span>' + sub + '</span>';

            pill.addEventListener('click', function () {
                if (typeof window.openModal === 'function') {
                    window.openModal(product.checkboxValue, sub);
                }
            });

            pillsEl.appendChild(pill);

            // Staggered entrance animation
            setTimeout(function () {
                pill.style.animationDelay = '0ms';
                pill.classList.add('im-pd-pill--visible');
            }, 350 + i * 35);
        });
    }

    /* ── Primary CTA click ───────────────────────────────────── */
    function handleCta() {
        if (typeof window.openModal === 'function') {
            window.openModal(product.checkboxValue);
        }
    }
    if (ctaPrimaryEl)  ctaPrimaryEl.addEventListener('click', handleCta);
    if (mobileBtnEl)   mobileBtnEl.addEventListener('click', handleCta);

    /* ── Bottom strip CTA ────────────────────────────────────── */
    const bottomCta = document.getElementById('im-pd-bottom-cta');
    if (bottomCta) {
        bottomCta.addEventListener('click', handleCta);
    }

    /* ── Sub-product image carousel ──────────────────────────── */
    (function () {
        const track    = document.getElementById('im-pd-carousel-track');
        const dotsEl   = document.getElementById('im-pd-carousel-dots');
        const prevBtn  = document.getElementById('im-pd-prev');
        const nextBtn  = document.getElementById('im-pd-next');
        const titleEl2 = document.getElementById('im-pd-carousel-title');

        if (!track) return;

        if (titleEl2) titleEl2.textContent = product.name + ' — Varieties';

        const subProducts = product.subProducts;
        const CARD_WIDTH  = 276; // card flex-basis + gap ≈ 260 + 1.25rem
        let activeDot = 0;

        // ── Build cards ─────────────────────────────────────────
        subProducts.forEach(function (sub, i) {
            const card = document.createElement('div');
            card.className = 'im-pd-carousel-card';
            card.setAttribute('role', 'listitem');
            card.style.animationDelay = (i * 60) + 'ms';

            var cardImgSrc = (product.subImages && product.subImages[i]) ? product.subImages[i] : product.image;
            card.innerHTML =
                '<img class="im-pd-carousel-card-img" src="' + cardImgSrc + '" ' +
                    'alt="' + sub + '" loading="lazy" width="260" height="195">' +
                '<div class="im-pd-carousel-card-body">' +
                    '<div class="im-pd-carousel-card-name">' + sub + '</div>' +
                    '<button class="im-pd-carousel-card-btn" type="button" aria-label="Enquire about ' + sub + '">' +
                        '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 1a5 5 0 100 10A5 5 0 006 1zM6 4v2.5M6 8v.5"/></svg>' +
                        'Enquire' +
                    '</button>' +
                '</div>';

            card.querySelector('.im-pd-carousel-card-btn').addEventListener('click', function (e) {
                e.stopPropagation();
                if (typeof window.openModal === 'function') {
                    window.openModal(product.checkboxValue, sub);
                }
            });

            track.appendChild(card);
        });

        // ── Build dots ──────────────────────────────────────────
        function getVisibleCount() {
            return Math.round(track.offsetWidth / CARD_WIDTH) || 1;
        }

        function getTotalDots() {
            return Math.max(1, subProducts.length - getVisibleCount() + 1);
        }

        function buildDots() {
            if (!dotsEl) return;
            dotsEl.innerHTML = '';
            const total = getTotalDots();
            // Only show dots if more than one page
            if (total <= 1) return;
            for (var d = 0; d < total; d++) {
                var dot = document.createElement('button');
                dot.className = 'im-pd-carousel-dot' + (d === 0 ? ' active' : '');
                dot.type = 'button';
                dot.setAttribute('role', 'tab');
                dot.setAttribute('aria-label', 'Go to slide ' + (d + 1));
                dot.setAttribute('aria-selected', d === 0 ? 'true' : 'false');
                (function (idx) {
                    dot.addEventListener('click', function () { scrollToCard(idx); });
                }(d));
                dotsEl.appendChild(dot);
            }
        }

        function updateDots(idx) {
            if (!dotsEl) return;
            activeDot = idx;
            var dots = dotsEl.querySelectorAll('.im-pd-carousel-dot');
            dots.forEach(function (d, i) {
                d.classList.toggle('active', i === idx);
                d.setAttribute('aria-selected', i === idx ? 'true' : 'false');
            });
        }

        function updateArrows() {
            if (!prevBtn || !nextBtn) return;
            prevBtn.disabled = track.scrollLeft <= 4;
            nextBtn.disabled = track.scrollLeft + track.offsetWidth >= track.scrollWidth - 4;
        }

        function scrollToCard(idx) {
            var cards = track.querySelectorAll('.im-pd-carousel-card');
            if (!cards[idx]) return;
            track.scrollTo({ left: cards[idx].offsetLeft - 32, behavior: 'smooth' });
        }

        // ── Arrow buttons ───────────────────────────────────────
        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                var newIdx = Math.max(0, activeDot - 1);
                scrollToCard(newIdx);
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                var newIdx = Math.min(getTotalDots() - 1, activeDot + 1);
                scrollToCard(newIdx);
            });
        }

        // ── Sync dots + arrows on scroll ────────────────────────
        var scrollTimer;
        track.addEventListener('scroll', function () {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(function () {
                var cards = track.querySelectorAll('.im-pd-carousel-card');
                var closest = 0;
                var minDist = Infinity;
                cards.forEach(function (card, i) {
                    var dist = Math.abs(card.offsetLeft - track.scrollLeft - 32);
                    if (dist < minDist) { minDist = dist; closest = i; }
                });
                // Map card index to dot index (clamp to dot range)
                var dotIdx = Math.min(closest, getTotalDots() - 1);
                updateDots(dotIdx);
                updateArrows();
            }, 80);
        }, { passive: true });

        // ── Init ────────────────────────────────────────────────
        buildDots();
        updateArrows();

        // Rebuild dots on resize
        var resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(buildDots, 200);
        });
    }());

})();
