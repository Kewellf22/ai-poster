<?php
/**
 * Xeflux Dynamic XML Sitemap
 * Place this at /sitemap.php on your server.
 *
 * Outputs the main sitemap + references product sitemap.
 * Access: https://www.xeflux.com/sitemap.php
 *
 * Add to Google Search Console:
 *   https://www.xeflux.com/sitemap.xml   (via .htaccess rewrite, or rename this file)
 *   https://www.xeflux.com/sitemap-products.xml
 */

define('APP_ACCESS', true);
define('XF_BASE_URL', 'https://www.xeflux.com');  // ← change to live domain

// Optional: load DB for product URLs
$load_products = false;
try {
    require_once __DIR__ . '/config.php';
    $pdo = getDatabaseConnection();
    $load_products = true;
} catch (Exception $e) {
    // Run without DB — static URLs only
}

// ── Static pages ──────────────────────────────────────────────────────────────
$static_urls = [
    ['loc' => '/',                'priority' => '1.0', 'changefreq' => 'daily'],
    ['loc' => '/catalog.php',     'priority' => '0.9', 'changefreq' => 'daily'],
    ['loc' => '/catalog.php?category=t-shirts',  'priority' => '0.9', 'changefreq' => 'daily'],
    ['loc' => '/catalog.php?category=mugs',      'priority' => '0.8', 'changefreq' => 'weekly'],
    ['loc' => '/catalog.php?category=bottles',   'priority' => '0.8', 'changefreq' => 'weekly'],
    ['loc' => '/catalog.php?category=caps',      'priority' => '0.8', 'changefreq' => 'weekly'],
    ['loc' => '/catalog.php?category=keychains', 'priority' => '0.7', 'changefreq' => 'weekly'],
    ['loc' => '/catalog.php?category=frames',    'priority' => '0.7', 'changefreq' => 'weekly'],
    ['loc' => '/catalog.php?category=gifts',     'priority' => '0.7', 'changefreq' => 'weekly'],
    ['loc' => '/catalog.php?category=mouse-pads','priority' => '0.7', 'changefreq' => 'weekly'],
    ['loc' => '/customize.php',   'priority' => '0.8', 'changefreq' => 'weekly'],
    ['loc' => '/customize.php?product=t-shirt',  'priority' => '0.8', 'changefreq' => 'weekly'],
    ['loc' => '/customize.php?product=mug',      'priority' => '0.7', 'changefreq' => 'monthly'],
    ['loc' => '/customize.php?product=bottle',   'priority' => '0.7', 'changefreq' => 'monthly'],
    ['loc' => '/customize.php?product=frame',    'priority' => '0.6', 'changefreq' => 'monthly'],
    ['loc' => '/customize.php?product=mousepad', 'priority' => '0.6', 'changefreq' => 'monthly'],
    ['loc' => '/contact.php',     'priority' => '0.6', 'changefreq' => 'monthly'],
    ['loc' => '/reseller.php',    'priority' => '0.5', 'changefreq' => 'monthly'],
];

// ── Determine which sitemap to serve ─────────────────────────────────────────
$type = $_GET['type'] ?? 'main';

header('Content-Type: application/xml; charset=utf-8');
header('X-Robots-Tag: noindex');
echo '<?xml version="1.0" encoding="UTF-8"?>';

// ── Main sitemap ──────────────────────────────────────────────────────────────
if ($type === 'main') {
    $today = date('Y-m-d');
    echo "\n" . '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">';

    foreach ($static_urls as $u) {
        $lastmod = $today;
        echo "\n  <url>";
        echo "\n    <loc>" . htmlspecialchars(XF_BASE_URL . $u['loc']) . "</loc>";
        echo "\n    <lastmod>{$lastmod}</lastmod>";
        echo "\n    <changefreq>{$u['changefreq']}</changefreq>";
        echo "\n    <priority>{$u['priority']}</priority>";
        echo "\n  </url>";
    }

    // Dynamic product URLs
    if ($load_products) {
        try {
            $stmt = $pdo->query("SELECT id, updated_at FROM products ORDER BY id ASC LIMIT 5000");
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $lastmod = date('Y-m-d', strtotime($row['updated_at'] ?? 'now'));
                echo "\n  <url>";
                echo "\n    <loc>" . htmlspecialchars(XF_BASE_URL . "/product.php?id=" . (int)$row['id']) . "</loc>";
                echo "\n    <lastmod>{$lastmod}</lastmod>";
                echo "\n    <changefreq>weekly</changefreq>";
                echo "\n    <priority>0.75</priority>";
                echo "\n  </url>";
            }
        } catch (Exception $e) { /* ignore */ }
    }

    echo "\n</urlset>";
}

// ── Sitemap index (for Google, lists all sitemaps) ────────────────────────────
if ($type === 'index') {
    echo "\n" . '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    echo "\n  <sitemap><loc>" . XF_BASE_URL . "/sitemap.php?type=main</loc><lastmod>" . date('Y-m-d') . "</lastmod></sitemap>";
    echo "\n  <sitemap><loc>" . XF_BASE_URL . "/sitemap.php?type=images</loc><lastmod>" . date('Y-m-d') . "</lastmod></sitemap>";
    echo "\n</sitemapindex>";
}

// ── Image sitemap ─────────────────────────────────────────────────────────────
if ($type === 'images') {
    echo "\n" . '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">';

    if ($load_products) {
        try {
            $stmt = $pdo->query("
                SELECT p.id, p.name, pi.image_url
                FROM products p
                JOIN product_images pi ON pi.product_id = p.id
                ORDER BY p.id ASC, pi.is_main DESC
                LIMIT 10000
            ");
            $grouped = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $grouped[$row['id']][] = $row;
            }
            foreach ($grouped as $pid => $images) {
                echo "\n  <url>";
                echo "\n    <loc>" . htmlspecialchars(XF_BASE_URL . "/product.php?id={$pid}") . "</loc>";
                foreach ($images as $img) {
                    $img_url = strpos($img['image_url'], 'http') === 0
                        ? $img['image_url']
                        : XF_BASE_URL . '/' . ltrim($img['image_url'], '/');
                    echo "\n    <image:image>";
                    echo "\n      <image:loc>" . htmlspecialchars($img_url) . "</image:loc>";
                    echo "\n      <image:title>" . htmlspecialchars($img['name']) . "</image:title>";
                    echo "\n      <image:caption>Xeflux " . htmlspecialchars($img['name']) . " – Premium Custom Merchandise</image:caption>";
                    echo "\n    </image:image>";
                }
                echo "\n  </url>";
            }
        } catch (Exception $e) { /* ignore */ }
    }

    echo "\n</urlset>";
}
