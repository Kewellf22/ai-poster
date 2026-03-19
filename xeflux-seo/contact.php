<?php
/**
 * Xeflux — Contact Page (SEO-Optimised)
 * File: contact.php
 */
session_start();

// Handle AJAX form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'send_message') {
    header('Content-Type: application/json');
    $name    = htmlspecialchars(trim($_POST['name']    ?? ''), ENT_QUOTES, 'UTF-8');
    $email   = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(trim($_POST['message'] ?? ''), ENT_QUOTES, 'UTF-8');
    if (!empty($name) && filter_var($email, FILTER_VALIDATE_EMAIL) && !empty($message)) {
        echo json_encode(['success' => true,  'message' => 'Thank you for your message! We will get back to you within 24 hours.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Please fill in all required fields with valid information.']);
    }
    exit;
}

// ── SEO ───────────────────────────────────────────────────────────────────────
$page_title       = 'Contact Xeflux | Custom Apparel Enquiries | Margao, Goa';
$page_description = 'Contact Xeflux for custom apparel, corporate gifting, and bulk merchandise orders in India. Visit our studio in Margao, South Goa or call +91 88880 83866. We respond within 24 hours.';
$page_keywords    = 'contact xeflux, custom apparel enquiry, bulk order india, corporate gifting goa, xeflux studio margao';
$canonical_url    = '/contact.php';
?>
<?php include 'header.html'; ?>

<!-- Breadcrumb -->
<nav aria-label="Breadcrumb" style="background:#0A0A0A;padding:12px 5%;">
    <ol class="xf-breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList">
        <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
            <a itemprop="item" href="/"><span itemprop="name">Home</span></a>
            <meta itemprop="position" content="1">
        </li>
        <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
            <span itemprop="name" aria-current="page">Contact</span>
            <meta itemprop="item" content="https://www.xeflux.com/contact.php">
            <meta itemprop="position" content="2">
        </li>
    </ol>
</nav>

<main id="main-content" itemscope itemtype="https://schema.org/ContactPage">
<div class="xc-contact-page">

    <!-- ── Hero ── -->
    <header class="xc-contact-hero">
        <span class="xc-hero-label" aria-hidden="true">Get in Touch</span>
        <!-- H1 with keyword: "contact" + brand + location signals -->
        <h1 class="xc-hero-title">Contact <em>Xeflux</em> – Let's Create Something Beautiful</h1>
        <p class="xc-hero-sub">
            Whether it's custom apparel, corporate branding, bulk orders, or a creative partnership —
            we'd love to hear from you. Based in <strong>Margao, South Goa</strong>, delivering across India.
        </p>
    </header>

    <!-- ── Business Banner ── -->
    <div class="xc-biz-banner" itemscope itemtype="https://schema.org/Organization">
        <meta itemprop="name" content="Xeflux">
        <meta itemprop="legalName" content="Fluxcart E-Commerce (OPC) Private Limited">
        <div class="xc-biz-item">
            <span class="xc-biz-label">Registered Entity</span>
            <span class="xc-biz-value" itemprop="legalName">Fluxcart E-Commerce (OPC) Private Limited</span>
        </div>
        <div class="xc-biz-divider" aria-hidden="true"></div>
        <div class="xc-biz-item">
            <span class="xc-biz-label">GSTIN</span>
            <span class="xc-biz-value">30AAFCF7534G1ZW</span>
        </div>
        <div class="xc-biz-divider" aria-hidden="true"></div>
        <div class="xc-biz-item">
            <span class="xc-biz-label">Location</span>
            <span class="xc-biz-value" itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
                <span itemprop="addressLocality">Margao</span>, <span itemprop="addressRegion">South Goa</span>
            </span>
        </div>
    </div>

    <!-- ── Two-column grid ── -->
    <div class="xc-contact-grid">

        <!-- Info side — rich with LocalBusiness microdata -->
        <section class="xc-info-section"
                 aria-labelledby="contact-info-heading"
                 itemscope itemtype="https://schema.org/LocalBusiness">
            <h2 id="contact-info-heading" class="xc-section-label" style="font-size:0.8rem;">Contact Information</h2>

            <address>
                <div class="xc-info-card">
                    <h3 class="xc-info-heading">
                        <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
                        Visit Our Studio
                    </h3>
                    <p itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
                        <span itemprop="streetAddress">FL NO.B-2, Near Loyola H.School</span><br>
                        <span itemprop="addressLocality">Margao</span>,
                        <span itemprop="addressRegion">Salcete, South Goa</span> —
                        <span itemprop="postalCode">403601</span><br>
                        <span itemprop="addressCountry">Goa, India</span>
                    </p>
                </div>

                <div class="xc-info-card">
                    <h3 class="xc-info-heading">
                        <i class="fas fa-phone" aria-hidden="true"></i>
                        Call or WhatsApp
                    </h3>
                    <p><a href="tel:+918888083866" itemprop="telephone" aria-label="Call Xeflux at +91 88880 83866">+91 88880 83866</a></p>
                    <p><a href="tel:+919175973186" itemprop="telephone" aria-label="Call Xeflux at +91 91759 73186">+91 91759 73186</a></p>
                    <p><a href="tel:+917397865172" itemprop="telephone" aria-label="Call Xeflux at +91 73978 65172">+91 73978 65172</a></p>
                </div>

                <div class="xc-info-card">
                    <h3 class="xc-info-heading">
                        <i class="fas fa-envelope" aria-hidden="true"></i>
                        Email Us
                    </h3>
                    <p>Support: <a href="mailto:support@xeflux.com" itemprop="email">support@xeflux.com</a></p>
                    <p>Business: <a href="mailto:xeflux.in@gmail.com">xeflux.in@gmail.com</a></p>
                </div>

                <div class="xc-info-card">
                    <h3 class="xc-info-heading">
                        <i class="fas fa-clock" aria-hidden="true"></i>
                        Studio Hours
                    </h3>
                    <p itemprop="openingHours" content="Mo-Sa 09:00-19:00">Mon – Sat: 9:00 AM – 7:00 PM</p>
                    <p itemprop="openingHours" content="Su 10:00-17:00">Sunday: 10:00 AM – 5:00 PM</p>
                </div>
            </address>

            <div class="xc-quick-actions">
                <a href="https://wa.me/918888083866?text=Hi%20Xeflux!%20I%27m%20interested%20in%20your%20custom%20apparel%20services."
                   target="_blank" rel="noopener noreferrer"
                   class="xc-action-btn xc-whatsapp"
                   aria-label="Chat with Xeflux on WhatsApp">
                    <i class="fab fa-whatsapp" aria-hidden="true"></i> WhatsApp
                </a>
                <a href="mailto:support@xeflux.com?subject=Inquiry%20from%20Website"
                   class="xc-action-btn xc-email-btn"
                   aria-label="Email Xeflux">
                    <i class="fas fa-envelope" aria-hidden="true"></i> Email
                </a>
            </div>
        </section>

        <!-- Form side -->
        <section class="xc-form-section" aria-labelledby="contact-form-heading">
            <h2 id="contact-form-heading" class="xc-section-label" style="font-size:0.8rem;">Send a Message</h2>

            <form id="contact-form" novalidate aria-label="Contact form">
                <div class="xc-form-row">
                    <div class="xc-form-group">
                        <label for="name">Full Name <abbr title="required">*</abbr></label>
                        <input type="text" id="name" name="name" placeholder="Your name"
                               required autocomplete="name" maxlength="100">
                    </div>
                    <div class="xc-form-group">
                        <label for="email">Email Address <abbr title="required">*</abbr></label>
                        <input type="email" id="email" name="email" placeholder="you@example.com"
                               required autocomplete="email" maxlength="150">
                    </div>
                </div>
                <div class="xc-form-row">
                    <div class="xc-form-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone" placeholder="+91 XXXXX XXXXX"
                               autocomplete="tel" maxlength="20">
                    </div>
                    <div class="xc-form-group">
                        <label for="subject">Subject <abbr title="required">*</abbr></label>
                        <select id="subject" name="subject" required aria-label="Select enquiry subject">
                            <option value="">Select a subject</option>
                            <option value="custom-tshirts">Custom T-Shirts Order</option>
                            <option value="custom-mugs">Custom Mugs Order</option>
                            <option value="bulk-order">Bulk / Corporate Order</option>
                            <option value="reseller">Reseller Partnership</option>
                            <option value="support">Support</option>
                            <option value="feedback">Feedback</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
                <div class="xc-form-group">
                    <label for="message">Message <abbr title="required">*</abbr></label>
                    <textarea id="message" name="message" maxlength="2000"
                              placeholder="Tell us about your requirements, quantity, design ideas, or questions…"
                              required aria-describedby="msg-hint"></textarea>
                    <small id="msg-hint" style="color:#888880;font-size:0.72rem;">
                        Include quantity and product type for faster quotes.
                    </small>
                </div>
                <button type="submit" class="xc-submit-btn" aria-label="Send message to Xeflux">
                    <i class="fas fa-paper-plane" aria-hidden="true"></i>
                    Send Message
                </button>
            </form>
        </section>
    </div>

    <!-- ── Map ── -->
    <section class="xc-map-section" aria-labelledby="map-heading">
        <div class="xc-map-header">
            <h2 id="map-heading" class="xc-map-title">
                <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
                Our Studio Location – Margao, Goa
            </h2>
            <a href="https://www.google.com/maps/dir/?api=1&destination=15.27357655011732,73.95613479325408"
               target="_blank" rel="noopener noreferrer"
               class="xc-map-link"
               aria-label="Open Xeflux studio in Google Maps">
                Open in Google Maps <i class="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
        </div>
        <iframe
            class="xc-map-embed"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847.8!2d73.958!3d15.2832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfb5c2b0e0d7e7%3A0x7a0b48c0f77f3ea1!2sMargao%2C%20Goa!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Xeflux Studio – FL NO.B-2, Near Loyola H.School, Margao, South Goa"
            aria-label="Map showing Xeflux studio location in Margao, Goa"
        ></iframe>
        <div class="xc-map-address-bar">
            <i class="fas fa-location-dot" aria-hidden="true"></i>
            <span>FL NO.B-2, Near Loyola H.School, Margao, Salcete, South Goa — 403601, India</span>
        </div>
    </section>

    <!-- ── FAQ section (boosts featured snippets) ── -->
    <section class="xc-faq-section" aria-labelledby="faq-heading"
             itemscope itemtype="https://schema.org/FAQPage"
             style="padding:4rem 0 6rem;">
        <h2 id="faq-heading" style="font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:300;color:#F5F0E8;text-align:center;margin-bottom:3rem;">
            Frequently Asked <em style="color:#C9A96E;">Questions</em>
        </h2>
        <div style="max-width:800px;margin:0 auto;display:grid;gap:1.5rem;">

            <?php
            $faqs = [
                ['q'=>'How do I place a custom order with Xeflux?',
                 'a'=>'You can place a custom order by visiting our online catalog and customizer at xeflux.com, or by contacting us directly on WhatsApp at +91 88880 83866. We accept designs, logos, and text for printing on t-shirts, mugs, bottles, and more.'],
                ['q'=>'What is the minimum order quantity for bulk orders?',
                 'a'=>'For corporate and bulk orders, the minimum order is typically 10 pieces. We offer special pricing for orders of 50+ pieces. Contact us for a custom quote.'],
                ['q'=>'Do you offer pan-India delivery?',
                 'a'=>'Yes, Xeflux delivers across India. Standard delivery takes 5–7 business days. Express delivery options are available for urgent orders.'],
                ['q'=>'What printing methods do you use?',
                 'a'=>'We use sublimation printing for t-shirts and soft goods, and UV printing for hard products like mugs and bottles. All prints are vibrant, durable, and wash-resistant.'],
                ['q'=>'How long does production take for custom orders?',
                 'a'=>'Standard custom orders are ready in 3–5 business days. Bulk orders of 50+ pieces may take 7–10 business days. Rush orders can be accommodated — contact us to discuss.'],
                ['q'=>'Can I visit the Xeflux studio in Goa?',
                 'a'=>'Absolutely! Our studio is located at FL NO.B-2, Near Loyola H.School, Margao, South Goa. We are open Monday to Saturday 9 AM–7 PM and Sunday 10 AM–5 PM.'],
            ];
            foreach ($faqs as $faq): ?>
            <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question"
                 style="background:#1A1A1A;border:1px solid rgba(201,169,110,0.1);padding:1.8rem 2rem;">
                <h3 itemprop="name"
                    style="font-family:'DM Sans',sans-serif;font-size:1rem;font-weight:500;color:#F5F0E8;margin-bottom:0.8rem;">
                    <?php echo htmlspecialchars($faq['q']); ?>
                </h3>
                <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                    <p itemprop="text"
                       style="font-family:'DM Sans',sans-serif;font-size:0.88rem;color:#888880;line-height:1.7;margin:0;">
                        <?php echo htmlspecialchars($faq['a']); ?>
                    </p>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </section>

</div><!-- /.xc-contact-page -->
</main><!-- /#main-content -->

<?php include 'footer.html'; ?>

<script>
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('contact-form');

    function showNotification(msg, type) {
        var n = document.createElement('div');
        n.className = 'xc-notification ' + type;
        n.setAttribute('role', 'alert');
        n.setAttribute('aria-live', 'polite');
        n.textContent = msg;
        document.body.appendChild(n);
        setTimeout(function() { n.classList.add('show'); }, 10);
        setTimeout(function() { n.classList.remove('show'); setTimeout(function() { n.remove(); }, 500); }, 5000);
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var btn = form.querySelector('.xc-submit-btn');
        var orig = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Sending…';
        btn.disabled = true;

        fetch('', { method: 'POST', body: new FormData(form) })
            .then(function(r) { return r.json(); })
            .then(function(d) {
                showNotification(d.message, d.success ? 'success' : 'error');
                if (d.success) form.reset();
            })
            .catch(function() { showNotification('An error occurred. Please try again or call us.', 'error'); })
            .finally(function() { btn.innerHTML = orig; btn.disabled = false; });
    });

    // Scroll reveal
    var obs = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
            if (e.isIntersecting) {
                e.target.style.opacity  = '1';
                e.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.08 });

    document.querySelectorAll('.xc-info-section, .xc-form-section, .xc-biz-banner, .xc-map-section, .xc-faq-section').forEach(function(el) {
        el.style.opacity   = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'all 0.7s cubic-bezier(0.22,1,0.36,1)';
        obs.observe(el);
    });
});
</script>
