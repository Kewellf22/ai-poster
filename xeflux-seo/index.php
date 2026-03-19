<?php
/**
 * Xeflux — Homepage (SEO-optimised)
 * File: index.php
 */
session_start();

// ── SEO setup (BEFORE header.html) ───────────────────────────────────────────
$page_title       = 'Xeflux – Premium Custom Fashion | T-Shirts, Mugs & Merchandise | Goa, India';
$page_description = 'Xeflux offers premium custom apparel and personalised merchandise in India — custom t-shirts, mugs, bottles, caps, keychains & more. Handcrafted quality with pan-India delivery. Starting ₹200.';
$page_keywords    = 'custom t-shirts india, personalised apparel, premium merchandise goa, custom mugs, printed clothing, xeflux, fashion goa, custom gifts india';
$canonical_url    = '/';
?>
<?php include 'header.html'; ?>

<!--
    ════════════════════════════════════════════════
    IMPORTANT SEO NOTES for this page:
    ────────────────────────────────────────────────
    1. The <h1> MUST appear once. It's the primary
       keyword signal for Google. ✓ done below.
    2. Every <img> MUST have a descriptive alt="".
    3. Internal links to catalog/customize use
       keyword-rich anchor text.
    4. Structured data is emitted by seo.php above.
    ════════════════════════════════════════════════
-->

<main id="main-content">

<!-- ═══════════════════════════════════════════
     HERO — H1 is the primary keyword phrase
     ═══════════════════════════════════════════ -->
<section class="xf-hero" aria-label="Hero – Xeflux Premium Fashion">
    <div class="xf-hero-grain" aria-hidden="true"></div>
    <div class="xf-hero-line" aria-hidden="true"></div>
    <div class="xf-hero-line" aria-hidden="true"></div>
    <div class="xf-hero-line" aria-hidden="true"></div>
    <div class="xf-hero-line" aria-hidden="true"></div>

    <div class="xf-hero-inner">
        <div class="xf-hero-content">
            <!-- ✅ Single H1 with primary keyword -->
            <div class="xf-hero-label">Established in India · Made in Goa</div>
            <h1>Premium Custom <em>Fashion</em> &amp; Merchandise</h1>
            <p class="xf-hero-subtitle">Personalised T-Shirts, Mugs, Bottles &amp; More</p>
            <p class="xf-hero-desc">
                Crafted with precision, designed for distinction. Xeflux brings you apparel and
                merchandise that blends contemporary streetwear with timeless elegance —
                made for those who refuse to blend in.
                <strong>Custom printing, pan-India delivery.</strong>
            </p>

            <div class="xf-hero-actions">
                <a href="/catalog.php" class="xf-btn-primary" aria-label="Explore Xeflux fashion collection">
                    Explore Collection
                </a>
                <a href="/customize.php" class="xf-btn-ghost" aria-label="Design your custom apparel">
                    Customize Yours
                    <span class="arrow-line" aria-hidden="true"></span>
                </a>
            </div>

            <!-- Trust signals (microdata) -->
            <div class="xf-hero-trust" itemscope itemtype="https://schema.org/Organization">
                <meta itemprop="name" content="Xeflux">
                <div class="xf-trust-item">
                    <span class="xf-trust-number" itemprop="numberOfEmployees">500+</span>
                    <div class="xf-trust-label">Happy Customers</div>
                </div>
                <div class="xf-trust-divider" aria-hidden="true"></div>
                <div class="xf-trust-item">
                    <span class="xf-trust-number">100%</span>
                    <div class="xf-trust-label">Handcrafted</div>
                </div>
                <div class="xf-trust-divider" aria-hidden="true"></div>
                <div class="xf-trust-item">
                    <span class="xf-trust-number">Pan-India</span>
                    <div class="xf-trust-label">Delivery</div>
                </div>
            </div>
        </div>

        <!-- Product showcase carousel -->
        <div class="xf-hero-showcase" aria-label="Xeflux product showcase">
            <div class="xf-showcase-glow" aria-hidden="true"></div>
            <div class="xf-showcase-orbit" aria-hidden="true">
                <div class="xf-showcase-ring" id="showcaseRing"></div>
            </div>
        </div>
    </div>

    <div class="xf-scroll-indicator" aria-hidden="true">
        <span class="xf-scroll-text">Scroll</span>
        <div class="xf-scroll-line"></div>
    </div>
</section>

<!-- ═══════════════════════════════════════════
     MARQUEE — keyword-rich ticker
     ═══════════════════════════════════════════ -->
<div class="xf-marquee" aria-hidden="true" role="presentation">
    <div class="xf-marquee-track">
        <div class="xf-marquee-item">Premium Quality <span class="dot"></span> Handcrafted in India <span class="dot"></span> Free Shipping <span class="dot"></span> Custom Designs <span class="dot"></span> Trendy Streetwear <span class="dot"></span> Premium Quality <span class="dot"></span> Handcrafted in India <span class="dot"></span> Free Shipping <span class="dot"></span> Custom Designs <span class="dot"></span> Trendy Streetwear <span class="dot"></span></div>
        <div class="xf-marquee-item" aria-hidden="true">Premium Quality <span class="dot"></span> Handcrafted in India <span class="dot"></span> Free Shipping <span class="dot"></span> Custom Designs <span class="dot"></span> Trendy Streetwear <span class="dot"></span> Premium Quality <span class="dot"></span> Handcrafted in India <span class="dot"></span> Free Shipping <span class="dot"></span> Custom Designs <span class="dot"></span> Trendy Streetwear <span class="dot"></span></div>
    </div>
</div>

<!-- ═══════════════════════════════════════════
     HOW IT WORKS — H2 section heading
     ═══════════════════════════════════════════ -->
<section class="xf-process" aria-labelledby="process-heading">
    <div class="xf-section-header">
        <span class="xf-section-label" aria-hidden="true">The Experience</span>
        <h2 id="process-heading" class="xf-section-title">How to Shop with <em>Xeflux</em></h2>
    </div>

    <div class="xf-process-grid" role="list">
        <article class="xf-process-card xf-animate" role="listitem">
            <div class="xf-process-num" aria-hidden="true">01</div>
            <div class="xf-process-icon" aria-hidden="true"><i class="fas fa-search"></i></div>
            <h3>Browse Our Collection</h3>
            <p>Explore curated pieces designed for every style and occasion — from bold streetwear to refined essentials. Custom t-shirts, mugs, bottles, caps and premium gift sets.</p>
        </article>
        <article class="xf-process-card xf-animate" role="listitem">
            <div class="xf-process-num" aria-hidden="true">02</div>
            <div class="xf-process-icon" aria-hidden="true"><i class="fas fa-paint-brush"></i></div>
            <h3>Select &amp; Customize</h3>
            <p>Personalise your favourite items to match your unique identity — choose size, print, and style your way with our easy online design tool.</p>
        </article>
        <article class="xf-process-card xf-animate" role="listitem">
            <div class="xf-process-num" aria-hidden="true">03</div>
            <div class="xf-process-icon" aria-hidden="true"><i class="fas fa-box-open"></i></div>
            <h3>Delivered to Your Door</h3>
            <p>Receive premium fashion pieces with careful packaging and swift pan-India delivery. Free shipping on select orders.</p>
        </article>
    </div>
</section>

<!-- ═══════════════════════════════════════════
     FEATURES — Why choose Xeflux
     ═══════════════════════════════════════════ -->
<section class="xf-features" aria-labelledby="features-heading">
    <div class="xf-section-header">
        <span class="xf-section-label" aria-hidden="true">The Difference</span>
        <h2 id="features-heading" class="xf-section-title">Why Choose <em>Xeflux</em></h2>
    </div>

    <div class="xf-features-grid">
        <article class="xf-feature-item xf-animate">
            <div class="xf-feature-icon" aria-hidden="true"><i class="fas fa-gem"></i></div>
            <h3>Premium Fabrics</h3>
            <p>We source only the finest materials, ensuring every garment feels as exceptional as it looks — built for comfort, longevity, and vibrant sublimation printing.</p>
        </article>
        <article class="xf-feature-item xf-animate">
            <div class="xf-feature-icon" aria-hidden="true"><i class="fas fa-drafting-compass"></i></div>
            <h3>Contemporary Design</h3>
            <p>Our design team blends global trends with Indian sensibility — creating pieces that are distinctively modern, confidently bold, and perfect for custom branding.</p>
        </article>
        <article class="xf-feature-item xf-animate">
            <div class="xf-feature-icon" aria-hidden="true"><i class="fas fa-award"></i></div>
            <h3>Crafted with Care</h3>
            <p>Every piece passes through meticulous quality checks. We don't just sell clothing — we deliver an experience you can feel, ideal for corporate gifting and personal orders.</p>
        </article>
    </div>
</section>

<!-- ═══════════════════════════════════════════
     COLLECTION PREVIEW — internal link to catalog
     ═══════════════════════════════════════════ -->
<section class="xf-collection" aria-labelledby="collection-heading">
    <div class="xf-collection-inner">
        <div class="xf-section-header">
            <span class="xf-section-label" aria-hidden="true">New Arrivals</span>
            <h2 id="collection-heading" class="xf-section-title">Explore the <em>Collection</em></h2>
        </div>

        <a href="/catalog.php" class="xf-collection-frame" aria-label="View Xeflux fashion catalog – custom t-shirts, mugs and more">
            <div class="xf-collection-placeholder">
                <i class="fas fa-spinner fa-spin" aria-hidden="true" style="margin-right:10px;"></i>
                Loading Preview…
            </div>
            <div class="xf-collection-overlay">
                <h3>The Latest Drop</h3>
                <p>Premium streetwear and custom apparel — explore pieces that define your style</p>
            </div>
        </a>

        <a href="/catalog.php" class="xf-collection-cta" aria-label="Shop Xeflux premium collection now">
            Shop Now
        </a>
    </div>
</section>

<!-- ═══════════════════════════════════════════
     STORE LOCATOR — LocalBusiness signals
     ═══════════════════════════════════════════ -->
<section class="xf-location" aria-labelledby="location-heading"
         itemscope itemtype="https://schema.org/ClothingStore">
    <div class="xf-location-inner">
        <div class="xf-section-header">
            <span class="xf-section-label" aria-hidden="true">Find Us</span>
            <h2 id="location-heading" class="xf-section-title">Visit Our <em>Studio</em></h2>
        </div>

        <div class="xf-location-body xf-animate">
            <!-- Info Panel -->
            <address class="xf-location-info" itemscope itemtype="https://schema.org/PostalAddress">
                <div class="xf-location-badge">
                    <i class="fas fa-circle" aria-hidden="true" style="color:#4ade80;font-size:0.5rem;"></i>
                    <span>Open Now</span>
                </div>

                <div class="xf-location-info-block">
                    <h4>Address</h4>
                    <p itemprop="streetAddress">FL No. B-2, Near Loyola H. School</p>
                    <p><span itemprop="addressLocality">Margao</span>, <span itemprop="addressRegion">Salcete, South Goa</span> — <span itemprop="postalCode">403601</span></p>
                    <p itemprop="addressCountry">Goa, India</p>
                </div>

                <div class="xf-location-divider" aria-hidden="true"></div>

                <div class="xf-location-info-block">
                    <h4>Studio Hours</h4>
                    <p>Mon – Sat &nbsp; 9:00 AM – 7:00 PM</p>
                    <p>Sunday &nbsp;&nbsp;&nbsp;&nbsp; 10:00 AM – 5:00 PM</p>
                </div>

                <div class="xf-location-divider" aria-hidden="true"></div>

                <div class="xf-location-info-block">
                    <h4>Contact</h4>
                    <a href="tel:+919404969188" itemprop="telephone">+91 94049 69188</a>
                    <a href="mailto:support@xeflux.com" itemprop="email">support@xeflux.com</a>
                </div>

                <a href="https://www.google.com/maps/dir/?api=1&destination=15.27357655011732,73.95613479325408"
                   target="_blank" rel="noopener noreferrer"
                   class="xf-directions-btn"
                   aria-label="Get directions to Xeflux studio in Margao, Goa">
                    <i class="fas fa-location-arrow" aria-hidden="true"></i>
                    Get Directions
                </a>
            </address>

            <!-- Embedded Map -->
            <div class="xf-map-wrapper">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847.912!2d73.95613479325408!3d15.27357655011732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfb33b6eb5c595%3A0x6eb12823cbcb22b4!2sXeflux!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    allowfullscreen
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    title="Xeflux Studio Location – Margao, South Goa"
                    aria-label="Google Maps showing Xeflux store location in Margao, Goa"
                ></iframe>
            </div>
        </div>
    </div>
</section>

</main><!-- /#main-content -->

<?php include 'footer.html'; ?>

<!-- ────────────────────────────────────────
     JAVASCRIPT (keep non-critical JS below fold)
──────────────────────────────────────────── -->
<script>
(function() {
    // ── Product showcase ──────────────────────────────────────────────────────
    var productImages = [];
    for (var i = 1; i <= 21; i++) productImages.push('assets/images/products/' + i + '.png');
    var currentSet = 0, perSet = 5;

    function getImageSet() {
        var start = currentSet * perSet, set = [];
        for (var i = start; i < start + perSet; i++) set.push(productImages[i % productImages.length]);
        currentSet = (currentSet + 1) % Math.ceil(productImages.length / perSet);
        return set;
    }

    function populateShowcase() {
        var ring = document.getElementById('showcaseRing');
        if (!ring) return;
        ring.innerHTML = '';
        var w = window.innerWidth;
        var tz = w <= 400 ? 105 : w <= 576 ? 120 : w <= 768 ? 145 : w <= 992 ? 170 : w <= 1200 ? 190 : 220;
        getImageSet().forEach(function(src, i) {
            var card = document.createElement('div');
            card.className = 'xf-showcase-card';
            var img = document.createElement('img');
            img.src = src;
            img.alt = 'Xeflux premium custom product – design ' + (i + 1);
            img.width = 500; img.height = 500;
            img.loading = 'lazy';
            card.appendChild(img);
            ring.appendChild(card);
            card.style.transform = 'rotateY(' + (i * 72) + 'deg) translateZ(' + tz + 'px)';
            img.addEventListener('load', function() { this.classList.add('loaded'); });
            if (img.complete) img.classList.add('loaded');
        });
    }

    // ── Init ──────────────────────────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', function() {
        populateShowcase();
        setInterval(populateShowcase, 30000);

        // Scroll animations
        var obs = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, idx) {
                if (entry.isIntersecting) {
                    setTimeout(function() { entry.target.classList.add('visible'); }, idx * 150);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        document.querySelectorAll('.xf-animate').forEach(function(el) { obs.observe(el); });

        // Collection preview image
        setTimeout(function() {
            var ph = document.querySelector('.xf-collection-placeholder');
            if (!ph) return;
            var img = document.createElement('img');
            img.src   = 'assets/images/fashion-preview.jpg';
            img.alt   = 'Xeflux fashion collection preview – custom apparel India';
            img.style = 'width:100%;height:100%;object-fit:cover;object-position:center;';
            img.onerror = function() { this.src = 'assets/images/products/1.png'; };
            ph.innerHTML = '';
            ph.appendChild(img);
            ph.style.background = 'transparent';
        }, 1200);
    });
})();
</script>
