<?php
/**
 * Xeflux SEO Helper
 * Drop-in SEO layer for all Xeflux pages.
 *
 * Usage (at the top of each page, BEFORE header.html):
 *   require_once __DIR__ . '/seo.php';
 *   xf_seo([
 *       'title'       => 'Custom T-Shirts | Xeflux',
 *       'description' => '...',
 *       'page_type'   => 'catalog',   // home | catalog | product | contact | reseller | customize
 *       'canonical'   => '/catalog.php?category=t-shirts',
 *       'breadcrumbs' => [['name'=>'Home','url'=>'/'],['name'=>'T-Shirts','url'=>'/catalog.php?category=t-shirts']],
 *       // Product pages only:
 *       'product'     => ['name'=>..., 'price'=>..., 'currency'=>'INR', 'image'=>..., 'sku'=>...],
 *   ]);
 */

define('XF_SITE_URL',    'https://www.xeflux.com');   // ← Change to live domain
define('XF_SITE_NAME',   'Xeflux');
define('XF_BRAND',       'Xeflux – Premium Fashion House');
define('XF_LOCALE',      'en_IN');
define('XF_TWITTER',     '@xeflux');                   // ← Update if different
define('XF_FB_APP_ID',   '');                          // ← Add Facebook App ID
define('XF_OG_IMAGE',    XF_SITE_URL . '/assets/images/og-default.jpg');

// ── Shared defaults ───────────────────────────────────────────────────────────
$_XF_SEO_DEFAULTS = [
    'title'       => 'Xeflux – Premium Fashion for the Modern Generation',
    'description' => 'Xeflux is India\'s premier fashion brand offering premium custom apparel, personalised t-shirts, mugs, bottles and merchandise. Handcrafted in Goa with pan-India delivery.',
    'keywords'    => 'custom t-shirts india, premium fashion goa, personalised apparel, custom merchandise, xeflux, printed clothing india',
    'page_type'   => 'home',
    'canonical'   => '/',
    'noindex'     => false,
    'breadcrumbs' => [],
    'product'     => null,
];

// ── Main function ─────────────────────────────────────────────────────────────
function xf_seo(array $opts = []): void {
    global $_XF_SEO_DEFAULTS;
    $cfg = array_merge($_XF_SEO_DEFAULTS, $opts);

    // Canonical URL
    $canonical = XF_SITE_URL . '/' . ltrim($cfg['canonical'], '/');

    // Current page URL for OG
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $current_url = $protocol . '://' . ($_SERVER['HTTP_HOST'] ?? 'www.xeflux.com') . ($_SERVER['REQUEST_URI'] ?? '/');

    // OG image
    $og_image = $cfg['product']['image'] ?? XF_OG_IMAGE;

    echo "\n<!-- ═══ Xeflux SEO Layer ═══ -->\n";

    // ── Meta charset / viewport (in case header.html doesn't have them) ────
    // (header.html should have these; only echo if missing)

    // ── Primary Meta ──────────────────────────────────────────────────────────
    echo '<meta name="description" content="' . _xf_esc($cfg['description']) . '">' . "\n";
    echo '<meta name="keywords" content="' . _xf_esc($cfg['keywords']) . '">' . "\n";
    echo '<meta name="author" content="Xeflux – Fluxcart E-Commerce (OPC) Private Limited">' . "\n";
    echo '<meta name="robots" content="' . ($cfg['noindex'] ? 'noindex,nofollow' : 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1') . '">' . "\n";
    echo '<link rel="canonical" href="' . _xf_esc($canonical) . '">' . "\n";

    // ── Open Graph ────────────────────────────────────────────────────────────
    $og_type = ($cfg['page_type'] === 'product') ? 'product' : 'website';
    echo '<meta property="og:type"        content="' . $og_type . '">' . "\n";
    echo '<meta property="og:url"         content="' . _xf_esc($current_url) . '">' . "\n";
    echo '<meta property="og:title"       content="' . _xf_esc($cfg['title']) . '">' . "\n";
    echo '<meta property="og:description" content="' . _xf_esc($cfg['description']) . '">' . "\n";
    echo '<meta property="og:image"       content="' . _xf_esc($og_image) . '">' . "\n";
    echo '<meta property="og:image:width" content="1200">' . "\n";
    echo '<meta property="og:image:height" content="630">' . "\n";
    echo '<meta property="og:site_name"   content="' . XF_SITE_NAME . '">' . "\n";
    echo '<meta property="og:locale"      content="' . XF_LOCALE . '">' . "\n";
    if (XF_FB_APP_ID) echo '<meta property="fb:app_id" content="' . XF_FB_APP_ID . '">' . "\n";

    // ── Twitter Card ──────────────────────────────────────────────────────────
    echo '<meta name="twitter:card"        content="summary_large_image">' . "\n";
    echo '<meta name="twitter:site"        content="' . XF_TWITTER . '">' . "\n";
    echo '<meta name="twitter:title"       content="' . _xf_esc($cfg['title']) . '">' . "\n";
    echo '<meta name="twitter:description" content="' . _xf_esc($cfg['description']) . '">' . "\n";
    echo '<meta name="twitter:image"       content="' . _xf_esc($og_image) . '">' . "\n";

    // ── JSON-LD Structured Data ───────────────────────────────────────────────
    $schemas = [];

    // 1. Organization (on every page)
    $schemas[] = [
        '@context'        => 'https://schema.org',
        '@type'           => 'Organization',
        '@id'             => XF_SITE_URL . '/#organization',
        'name'            => 'Xeflux',
        'legalName'       => 'Fluxcart E-Commerce (OPC) Private Limited',
        'url'             => XF_SITE_URL,
        'logo'            => [
            '@type' => 'ImageObject',
            'url'   => XF_SITE_URL . '/assets/images/logo.png',
        ],
        'contactPoint'    => [
            ['@type'=>'ContactPoint','telephone'=>'+91-88880-83866','contactType'=>'customer service','areaServed'=>'IN','availableLanguage'=>['English','Hindi']],
            ['@type'=>'ContactPoint','telephone'=>'+91-91759-73186','contactType'=>'sales','areaServed'=>'IN'],
        ],
        'sameAs'          => [
            'https://www.instagram.com/xeflux',
            'https://www.facebook.com/xeflux',
        ],
        'address'         => [
            '@type'           => 'PostalAddress',
            'streetAddress'   => 'FL NO.B-2, Near Loyola H.School, Margao, Salcete',
            'addressLocality' => 'Margao',
            'addressRegion'   => 'Goa',
            'postalCode'      => '403601',
            'addressCountry'  => 'IN',
        ],
    ];

    // 2. WebSite with SearchAction (enables Google Sitelinks Search Box)
    $schemas[] = [
        '@context'        => 'https://schema.org',
        '@type'           => 'WebSite',
        '@id'             => XF_SITE_URL . '/#website',
        'url'             => XF_SITE_URL,
        'name'            => 'Xeflux',
        'description'     => 'Premium Fashion for the Modern Generation',
        'publisher'       => ['@id' => XF_SITE_URL . '/#organization'],
        'potentialAction' => [
            '@type'       => 'SearchAction',
            'target'      => [
                '@type'       => 'EntryPoint',
                'urlTemplate' => XF_SITE_URL . '/catalog.php?search={search_term_string}',
            ],
            'query-input' => 'required name=search_term_string',
        ],
    ];

    // 3. LocalBusiness (contact / home pages)
    if (in_array($cfg['page_type'], ['home', 'contact'])) {
        $schemas[] = [
            '@context'       => 'https://schema.org',
            '@type'          => ['LocalBusiness', 'ClothingStore'],
            '@id'            => XF_SITE_URL . '/#localbusiness',
            'name'           => 'Xeflux',
            'image'          => XF_OG_IMAGE,
            'url'            => XF_SITE_URL,
            'telephone'      => '+91-88880-83866',
            'email'          => 'support@xeflux.com',
            'priceRange'     => '₹₹',
            'currenciesAccepted' => 'INR',
            'paymentAccepted' => 'Cash, Credit Card, UPI',
            'address'        => [
                '@type'           => 'PostalAddress',
                'streetAddress'   => 'FL NO.B-2, Near Loyola H.School, Margao, Salcete',
                'addressLocality' => 'Margao',
                'addressRegion'   => 'Goa',
                'postalCode'      => '403601',
                'addressCountry'  => 'IN',
            ],
            'geo'            => [
                '@type'     => 'GeoCoordinates',
                'latitude'  => 15.27357655011732,
                'longitude' => 73.95613479325408,
            ],
            'openingHoursSpecification' => [
                ['@type'=>'OpeningHoursSpecification','dayOfWeek'=>['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],'opens'=>'09:00','closes'=>'19:00'],
                ['@type'=>'OpeningHoursSpecification','dayOfWeek'=>['Sunday'],'opens'=>'10:00','closes'=>'17:00'],
            ],
            'hasMap'         => 'https://www.google.com/maps/dir/?api=1&destination=15.27357655011732,73.95613479325408',
            'areaServed'     => 'India',
            'servesCuisine'  => null,
        ];
    }

    // 4. BreadcrumbList
    if (!empty($cfg['breadcrumbs'])) {
        $items = [];
        foreach ($cfg['breadcrumbs'] as $i => $crumb) {
            $items[] = [
                '@type'    => 'ListItem',
                'position' => $i + 1,
                'name'     => $crumb['name'],
                'item'     => XF_SITE_URL . '/' . ltrim($crumb['url'], '/'),
            ];
        }
        $schemas[] = [
            '@context'        => 'https://schema.org',
            '@type'           => 'BreadcrumbList',
            'itemListElement' => $items,
        ];
    }

    // 5. Product schema
    if ($cfg['page_type'] === 'product' && !empty($cfg['product'])) {
        $p = $cfg['product'];
        $schemas[] = [
            '@context'    => 'https://schema.org',
            '@type'       => 'Product',
            'name'        => $p['name'] ?? '',
            'image'       => $p['image'] ?? XF_OG_IMAGE,
            'description' => $p['description'] ?? $cfg['description'],
            'sku'         => $p['sku'] ?? '',
            'brand'       => ['@type'=>'Brand','name'=>'Xeflux'],
            'offers'      => [
                '@type'         => 'Offer',
                'url'           => $current_url,
                'priceCurrency' => $p['currency'] ?? 'INR',
                'price'         => $p['price'] ?? '',
                'priceValidUntil' => date('Y-m-d', strtotime('+30 days')),
                'availability'  => 'https://schema.org/InStock',
                'seller'        => ['@type'=>'Organization','name'=>'Xeflux'],
            ],
        ];
    }

    // Emit all schemas
    foreach ($schemas as $schema) {
        // Remove null values
        $schema = _xf_clean($schema);
        echo '<script type="application/ld+json">' . "\n";
        echo json_encode($schema, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        echo "\n" . '</script>' . "\n";
    }

    // ── Breadcrumb HTML (accessible, invisible) ───────────────────────────────
    if (!empty($cfg['breadcrumbs'])) {
        echo '<nav aria-label="Breadcrumb" class="xf-seo-breadcrumb" style="display:none;">';
        echo '<ol itemscope itemtype="https://schema.org/BreadcrumbList">';
        foreach ($cfg['breadcrumbs'] as $i => $crumb) {
            echo '<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">';
            echo '<a itemprop="item" href="' . _xf_esc(XF_SITE_URL . '/' . ltrim($crumb['url'], '/')) . '">';
            echo '<span itemprop="name">' . _xf_esc($crumb['name']) . '</span></a>';
            echo '<meta itemprop="position" content="' . ($i + 1) . '">';
            echo '</li>';
        }
        echo '</ol></nav>' . "\n";
    }

    echo "<!-- ═══ /Xeflux SEO Layer ═══ -->\n";
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function _xf_esc(string $s): string {
    return htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function _xf_clean(array $arr): array {
    foreach ($arr as $k => $v) {
        if ($v === null || $v === '') {
            unset($arr[$k]);
        } elseif (is_array($v)) {
            $arr[$k] = _xf_clean($v);
        }
    }
    return $arr;
}
