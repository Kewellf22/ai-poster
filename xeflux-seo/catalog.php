<?php
/**
 * Xeflux Professional Catalog Page — SEO-Optimised
 * File: catalog.php
 */
define('APP_ACCESS', true);
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/seo.php';

if (session_status() === PHP_SESSION_NONE) session_start();

try {
    $pdo = getDatabaseConnection();
} catch(Exception $e) {
    error_log('Catalog DB Error: ' . $e->getMessage());
    http_response_code(503);
    die('Service temporarily unavailable. Please try again later.');
}

// ── Category supplemental data ────────────────────────────────────────────────
$category_supplemental_data = [
    't-shirts' => [
        'icon'              => 'fas fa-shirt',
        'professional_name' => 'Custom T-Shirts',
        'meta_title'        => 'Custom Printed T-Shirts India | Premium Sublimation | Xeflux',
        'meta_description'  => 'Buy custom printed t-shirts online in India. Premium sublimation printing from ₹200. Small to XXL sizes. Pan-India delivery. Corporate bulk orders welcome.',
        'meta_keywords'     => 'custom t-shirts india, printed t-shirts online, sublimation tshirts, personalised tshirts goa, bulk tshirts india',
        'sales_headline'    => 'Custom Printed T-Shirts',
        'sales_subheading'  => 'Express yourself with premium-quality custom apparel. Starting ₹200.',
        'schema_type'       => 'ClothingProduct',
    ],
    'mugs' => [
        'icon'              => 'fas fa-mug-hot',
        'professional_name' => 'Custom Printed Mugs',
        'meta_title'        => 'Custom Printed Mugs India | Personalised Coffee Mugs | Xeflux',
        'meta_description'  => 'Order custom printed mugs online in India. Premium ceramic quality with vibrant sublimation printing. Perfect personalised gifts for corporate and personal occasions.',
        'meta_keywords'     => 'custom mugs india, personalised coffee mug, printed mugs online, corporate gift mugs, ceramic mugs india',
        'sales_headline'    => 'Custom Printed Mugs',
        'sales_subheading'  => 'Premium drinkware crafted for perfection.',
        'schema_type'       => 'Product',
    ],
    'bottles' => [
        'icon'              => 'fas fa-bottle-water',
        'professional_name' => 'Custom Water Bottles',
        'meta_title'        => 'Custom Printed Water Bottles India | Personalised Bottles | Xeflux',
        'meta_description'  => 'Custom printed water bottles online India. Durable, BPA-free, fully personalised. Ideal corporate gifts and event merchandise with pan-India delivery.',
        'meta_keywords'     => 'custom water bottles india, personalised bottles, printed bottles online, corporate gift bottles',
        'sales_headline'    => 'Custom Water Bottles',
        'sales_subheading'  => 'Where style meets substance.',
        'schema_type'       => 'Product',
    ],
    'caps' => [
        'icon'              => 'fas fa-hat-cowboy',
        'professional_name' => 'Custom Embroidered Caps',
        'meta_title'        => 'Custom Embroidered Caps & Hats India | Xeflux',
        'meta_description'  => 'Custom embroidered and printed caps in India. Premium headwear for events, corporate branding and streetwear. Bulk orders accepted.',
        'meta_keywords'     => 'custom caps india, embroidered hats, printed caps online, corporate caps india',
        'sales_headline'    => 'Custom Caps',
        'sales_subheading'  => 'Signature headwear for the discerning individual.',
        'schema_type'       => 'Product',
    ],
    'keychains' => [
        'icon'              => 'fas fa-key',
        'professional_name' => 'Custom Keychains',
        'meta_title'        => 'Custom Printed Keychains India | Personalised Keyrings | Xeflux',
        'meta_description'  => 'Buy personalised custom keychains online in India. Premium materials, vibrant printing. Perfect as promotional gifts and personal accessories.',
        'meta_keywords'     => 'custom keychains india, personalised keyrings, printed keychains, promotional keychains',
        'sales_headline'    => 'Custom Keychains',
        'sales_subheading'  => 'Thoughtful accessories with impeccable design.',
        'schema_type'       => 'Product',
    ],
    'frames' => [
        'icon'              => 'fas fa-image',
        'professional_name' => 'Custom Photo Frames',
        'meta_title'        => 'Custom Photo Frames India | Personalised Picture Frames | Xeflux',
        'meta_description'  => 'Custom photo frames in India. Premium quality, personalised printing for precious memories. Ideal gifts for birthdays, anniversaries, and weddings.',
        'meta_keywords'     => 'custom photo frames india, personalised picture frames, printed frames, gift frames india',
        'sales_headline'    => 'Custom Photo Frames',
        'sales_subheading'  => 'Transform memories into timeless displays.',
        'schema_type'       => 'Product',
    ],
    'gifts' => [
        'icon'              => 'fas fa-gift',
        'professional_name' => 'Custom Gift Sets',
        'meta_title'        => 'Custom Gift Sets India | Personalised Corporate Gifts | Xeflux',
        'meta_description'  => 'Curated custom gift sets for corporate and personal occasions in India. Premium packaging, personalised printing, bulk orders welcome.',
        'meta_keywords'     => 'custom gift sets india, corporate gifts, personalised hampers, printed gift sets india',
        'sales_headline'    => 'Custom Gift Sets',
        'sales_subheading'  => 'Beautifully curated experiences for every occasion.',
        'schema_type'       => 'Product',
    ],
    'mouse-pads' => [
        'icon'              => 'fas fa-computer-mouse',
        'professional_name' => 'Custom Mouse Pads',
        'meta_title'        => 'Custom Printed Mouse Pads India | Office Accessories | Xeflux',
        'meta_description'  => 'Custom printed mouse pads in India. Premium quality, fully personalised with your design or brand logo. Fast turnaround and pan-India delivery.',
        'meta_keywords'     => 'custom mouse pads india, personalised mousepads, printed office accessories, corporate mousepads',
        'sales_headline'    => 'Custom Mouse Pads',
        'sales_subheading'  => 'Elevate your workspace with premium precision.',
        'schema_type'       => 'Product',
    ],
];

// ── Fetch categories from DB ──────────────────────────────────────────────────
$categories = [];
try {
    $stmt = $pdo->query("SELECT id, name, slug FROM categories ORDER BY CASE WHEN slug='t-shirts' THEN 0 ELSE 1 END, name ASC");
    foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $db_cat) {
        $slug = $db_cat['slug'];
        $categories[$slug] = array_merge($db_cat, $category_supplemental_data[$slug] ?? ['icon'=>'fas fa-tag','professional_name'=>$db_cat['name']]);
    }
} catch (PDOException $e) {
    error_log('Fetch Categories Error: ' . $e->getMessage());
}

// ── Input sanitisation ────────────────────────────────────────────────────────
function sanitizeCategory($input, $allowed) { $i = strtolower(trim($input)); return in_array($i, $allowed) ? $i : ($allowed[0] ?? ''); }
function sanitizeSort($input) { $a = ['popularity','price_low','price_high','newest','trending']; return in_array($input,$a)?$input:'popularity'; }
function sanitizePriceRange($input) { $a = ['all','under_500','500_1000','1000_2000','over_2000']; return in_array($input,$a)?$input:'all'; }

$allowed_slugs       = array_keys($categories);
$selected_category   = sanitizeCategory($_GET['category'] ?? ($allowed_slugs[0] ?? ''), $allowed_slugs);
$sort_by             = sanitizeSort($_GET['sort'] ?? 'popularity');
$price_range         = sanitizePriceRange($_GET['price_range'] ?? 'all');
$page                = max(1, (int)($_GET['page'] ?? 1));
$per_page            = 60;
$meta                = $categories[$selected_category] ?? ['name'=>'Products','professional_name'=>'Our Collection','icon'=>'fas fa-box','meta_title'=>'Premium Collections | Xeflux','meta_description'=>'Discover our range of premium customisable products.','meta_keywords'=>'premium products, custom collections, personalised gifts','sales_headline'=>'Premium Collection','sales_subheading'=>'Crafted excellence, personalised by you.'];
$current_category_id = $categories[$selected_category]['id'] ?? 0;

// ── SEO setup ─────────────────────────────────────────────────────────────────
$canonical_url = '/catalog.php?category=' . urlencode($selected_category);
if ($page > 1) $canonical_url .= '&page=' . $page;

$page_title       = $meta['meta_title'];
$page_description = $meta['meta_description'];

xf_seo([
    'title'       => $page_title,
    'description' => $page_description,
    'keywords'    => $meta['meta_keywords'] ?? '',
    'page_type'   => 'catalog',
    'canonical'   => $canonical_url,
    'breadcrumbs' => [
        ['name' => 'Home',    'url' => '/'],
        ['name' => 'Shop',    'url' => '/catalog.php'],
        ['name' => $meta['professional_name'], 'url' => $canonical_url],
    ],
    // noindex filter pages to avoid thin-content penalties
    'noindex'     => ($sort_by !== 'popularity' || $price_range !== 'all'),
]);

// ── Fetch products ────────────────────────────────────────────────────────────
$products      = [];
$total_products = 0;
$total_pages   = 1;
$offset        = ($page - 1) * $per_page;

if ($current_category_id > 0) {
    $sort_map = [
        'price_low'  => 'p.sale_price ASC',
        'price_high' => 'p.sale_price DESC',
        'newest'     => 'p.created_at DESC, p.id DESC',
        'trending'   => 'p.views DESC, p.id DESC',
        'popularity' => 'p.id DESC',
    ];
    $order_by = $sort_map[$sort_by] ?? $sort_map['popularity'];

    $price_conditions = [
        'under_500'  => 'AND p.sale_price < 500',
        '500_1000'   => 'AND p.sale_price BETWEEN 500 AND 1000',
        '1000_2000'  => 'AND p.sale_price BETWEEN 1000 AND 2000',
        'over_2000'  => 'AND p.sale_price > 2000',
        'all'        => '',
    ];
    $price_filter = $price_conditions[$price_range] ?? '';

    try {
        $c = $pdo->prepare("SELECT COUNT(p.id) FROM products p WHERE p.category_id = ? $price_filter");
        $c->execute([$current_category_id]);
        $total_products = (int)$c->fetchColumn();
        $total_pages    = max(1, ceil($total_products / $per_page));
    } catch(PDOException $e) { error_log('Count error: ' . $e->getMessage()); }

    if ($total_products > 0) {
        try {
            $sql = "SELECT
                p.id, p.name, p.slug,
                COALESCE(p.tagline, 'Premium personalised design') AS tagline,
                COALESCE(p.mrp, 0) AS mrp,
                COALESCE(p.sale_price, 0) AS sale_price,
                CASE WHEN pi.image_url IS NULL OR pi.image_url = '' THEN 'assets/images/products/default.jpg' ELSE pi.image_url END AS image_url
            FROM products p
            LEFT JOIN product_images pi ON pi.product_id = p.id AND pi.is_main = 1
            WHERE p.category_id = ? $price_filter
            ORDER BY $order_by
            LIMIT ? OFFSET ?";
            $s = $pdo->prepare($sql);
            $s->bindValue(1, $current_category_id, PDO::PARAM_INT);
            $s->bindValue(2, $per_page, PDO::PARAM_INT);
            $s->bindValue(3, $offset, PDO::PARAM_INT);
            $s->execute();
            $products = $s->fetchAll(PDO::FETCH_ASSOC);
        } catch(PDOException $e) { error_log('Products error: ' . $e->getMessage()); }
    }
}
?>
<?php include 'header.html'; ?>

<!-- Visible breadcrumb nav -->
<nav aria-label="Breadcrumb" style="background:#0A0A0A;padding:12px 5%;">
    <ol class="xf-breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList">
        <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
            <a itemprop="item" href="/"><span itemprop="name">Home</span></a>
            <meta itemprop="position" content="1">
        </li>
        <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
            <a itemprop="item" href="/catalog.php"><span itemprop="name">Shop</span></a>
            <meta itemprop="position" content="2">
        </li>
        <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
            <span itemprop="name" aria-current="page"><?php echo htmlspecialchars($meta['professional_name']); ?></span>
            <meta itemprop="item" content="https://www.xeflux.com<?php echo htmlspecialchars($canonical_url); ?>">
            <meta itemprop="position" content="3">
        </li>
    </ol>
</nav>

<main id="main-content">
<div class="catalog-wrapper">
<div class="container">

    <!-- ── Category nav ── -->
    <nav class="xc-sidebar" aria-label="Product categories">
        <span class="xc-sidebar-label">Collections</span>
        <ul class="xc-category-list" role="list">
            <?php foreach($categories as $slug => $cat): ?>
                <li class="xc-category-item <?php echo $selected_category === $slug ? 'active' : ''; ?>">
                    <a href="/catalog.php?category=<?php echo urlencode($slug); ?>"
                       <?php echo $selected_category === $slug ? 'aria-current="page"' : ''; ?>
                       aria-label="Browse <?php echo htmlspecialchars($cat['professional_name'] ?? $cat['name']); ?>">
                        <?php echo htmlspecialchars($cat['professional_name'] ?? $cat['name']); ?>
                    </a>
                </li>
            <?php endforeach; ?>
        </ul>
    </nav>

    <!-- ── Page header ── -->
    <header class="xc-header">
        <!-- H1 is the category keyword — critical for SEO -->
        <h1 class="xc-page-title"><?php echo htmlspecialchars($meta['professional_name'] ?? $meta['name']); ?></h1>
        <p class="xc-page-subtitle"><?php echo htmlspecialchars($meta['sales_subheading']); ?></p>
        <?php if ($total_products > 0): ?>
            <p class="xc-product-count" style="font-family:'DM Sans',sans-serif;font-size:0.78rem;color:#888880;margin-top:0.8rem;">
                Showing <?php echo min($offset + 1, $total_products); ?>–<?php echo min($offset + $per_page, $total_products); ?> of <?php echo $total_products; ?> products
            </p>
        <?php endif; ?>
    </header>

    <!-- ── Filters ── -->
    <div class="xc-filters" role="search" aria-label="Filter products">
        <label for="sortSelect" class="sr-only">Sort by</label>
        <select class="xc-filter-select" id="sortSelect" aria-label="Sort products">
            <option value="popularity" <?php echo $sort_by==='popularity'?'selected':''; ?>>Sort: Popularity</option>
            <option value="trending"   <?php echo $sort_by==='trending'?'selected':''; ?>>Sort: Trending</option>
            <option value="newest"     <?php echo $sort_by==='newest'?'selected':''; ?>>Sort: Newest</option>
            <option value="price_low"  <?php echo $sort_by==='price_low'?'selected':''; ?>>Price: Low to High</option>
            <option value="price_high" <?php echo $sort_by==='price_high'?'selected':''; ?>>Price: High to Low</option>
        </select>
        <label for="priceSelect" class="sr-only">Filter by price</label>
        <select class="xc-filter-select" id="priceSelect" aria-label="Filter by price">
            <option value="all"       <?php echo $price_range==='all'?'selected':''; ?>>All Prices</option>
            <option value="under_500" <?php echo $price_range==='under_500'?'selected':''; ?>>Under ₹500</option>
            <option value="500_1000"  <?php echo $price_range==='500_1000'?'selected':''; ?>>₹500 – ₹1,000</option>
            <option value="1000_2000" <?php echo $price_range==='1000_2000'?'selected':''; ?>>₹1,000 – ₹2,000</option>
            <option value="over_2000" <?php echo $price_range==='over_2000'?'selected':''; ?>>Above ₹2,000</option>
        </select>
    </div>

    <!-- ── Products Grid ── -->
    <section aria-label="<?php echo htmlspecialchars($meta['professional_name']); ?> products">
    <div class="xc-products-grid">
        <?php if (!empty($products)): ?>
            <?php foreach($products as $index => $product):
                $discount = 0;
                if ($product['mrp'] > 0 && $product['sale_price'] < $product['mrp']) {
                    $discount = round((($product['mrp'] - $product['sale_price']) / $product['mrp']) * 100);
                }
                $product_url = '/product.php?id=' . (int)$product['id'];
                // Use SEO-friendly slug if available
                if (!empty($product['slug'])) {
                    $product_url = '/product/' . urlencode($product['slug']);
                }
            ?>
            <!-- Product card with ItemList schema -->
            <article class="xc-product-card xc-fade"
                     style="animation-delay:<?php echo 0.05 + (min($index, 11) * 0.04); ?>s;"
                     itemscope itemtype="https://schema.org/Product">
                <a href="<?php echo htmlspecialchars($product_url); ?>"
                   class="xc-product-card-link"
                   style="text-decoration:none;display:contents;"
                   aria-label="View <?php echo htmlspecialchars($product['name']); ?> – ₹<?php echo number_format($product['sale_price']); ?>">

                    <div class="xc-product-image-wrap">
                        <img src="<?php echo htmlspecialchars($product['image_url']); ?>"
                             alt="<?php echo htmlspecialchars($product['name']); ?> – Xeflux custom <?php echo strtolower($meta['professional_name']); ?>"
                             class="xc-product-image"
                             loading="<?php echo $index < 6 ? 'eager' : 'lazy'; ?>"
                             width="400" height="400"
                             itemprop="image">
                    </div>
                    <div class="xc-product-body">
                        <h2 class="xc-product-name" itemprop="name">
                            <?php echo htmlspecialchars($product['name']); ?>
                        </h2>
                        <p class="xc-product-tagline" itemprop="description">
                            <?php echo htmlspecialchars($product['tagline']); ?>
                        </p>
                        <div class="xc-product-price" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
                            <meta itemprop="priceCurrency" content="INR">
                            <meta itemprop="availability" content="https://schema.org/InStock">
                            <span class="xc-price-sale" itemprop="price" content="<?php echo $product['sale_price']; ?>">
                                ₹<?php echo number_format($product['sale_price']); ?>
                            </span>
                            <?php if ($discount > 0): ?>
                                <span class="xc-price-mrp" aria-label="Original price ₹<?php echo number_format($product['mrp']); ?>">
                                    ₹<?php echo number_format($product['mrp']); ?>
                                </span>
                                <span class="xc-discount-badge" aria-label="<?php echo $discount; ?>% discount">
                                    <?php echo $discount; ?>% OFF
                                </span>
                            <?php endif; ?>
                        </div>
                    </div>
                </a>
            </article>
            <?php endforeach; ?>
        <?php else: ?>
            <div class="xc-empty" role="status">
                <i class="<?php echo htmlspecialchars($meta['icon']); ?> xc-empty-icon" aria-hidden="true"></i>
                <h2 class="xc-empty-title">Coming Soon</h2>
                <p class="xc-empty-text">
                    Our premium <?php echo strtolower(htmlspecialchars($meta['professional_name'] ?? $meta['name'])); ?>
                    collection is being carefully curated. Check back soon or
                    <a href="/contact.php" style="color:#C9A96E;">contact us</a> for bespoke orders.
                </p>
            </div>
        <?php endif; ?>
    </div>
    </section>

    <!-- ── Pagination ── -->
    <?php if ($total_pages > 1): ?>
    <nav class="xc-pagination-wrap" aria-label="Product pages">
        <ol class="xc-pagination">
            <?php if ($page > 1): ?>
                <li><a href="/catalog.php?category=<?php echo urlencode($selected_category); ?>&page=<?php echo $page-1; ?>" aria-label="Previous page" rel="prev">‹</a></li>
            <?php endif; ?>
            <?php
            $start = max(1, $page-2); $end = min($total_pages, $page+2);
            if ($start > 1): ?>
                <li><a href="/catalog.php?category=<?php echo urlencode($selected_category); ?>&page=1">1</a></li>
                <?php if ($start > 2): ?><li><span class="xc-page-ellipsis" aria-hidden="true">…</span></li><?php endif; ?>
            <?php endif; ?>
            <?php for ($i = $start; $i <= $end; $i++): ?>
                <li><?php if ($i === $page): ?>
                    <span class="xc-page-current" aria-current="page" aria-label="Page <?php echo $i; ?>"><?php echo $i; ?></span>
                <?php else: ?>
                    <a href="/catalog.php?category=<?php echo urlencode($selected_category); ?>&page=<?php echo $i; ?>" aria-label="Page <?php echo $i; ?>"><?php echo $i; ?></a>
                <?php endif; ?></li>
            <?php endfor; ?>
            <?php if ($end < $total_pages): ?>
                <?php if ($end < $total_pages-1): ?><li><span class="xc-page-ellipsis" aria-hidden="true">…</span></li><?php endif; ?>
                <li><a href="/catalog.php?category=<?php echo urlencode($selected_category); ?>&page=<?php echo $total_pages; ?>"><?php echo $total_pages; ?></a></li>
            <?php endif; ?>
            <?php if ($page < $total_pages): ?>
                <li><a href="/catalog.php?category=<?php echo urlencode($selected_category); ?>&page=<?php echo $page+1; ?>" aria-label="Next page" rel="next">›</a></li>
            <?php endif; ?>
        </ol>
    </nav>
    <?php endif; ?>

</div><!-- /.container -->
</div><!-- /.catalog-wrapper -->
</main><!-- /#main-content -->

<?php include 'footer.html'; ?>
<?php $pdo = null; ?>

<script>
document.addEventListener('DOMContentLoaded', function() {
    var sortSelect  = document.getElementById('sortSelect');
    var priceSelect = document.getElementById('priceSelect');

    function updateFilters() {
        var cat   = new URLSearchParams(window.location.search).get('category') || <?php echo json_encode($selected_category); ?>;
        var sort  = sortSelect.value;
        var price = priceSelect.value;
        var url   = '/catalog.php?category=' + encodeURIComponent(cat);
        if (sort  !== 'popularity') url += '&sort='        + encodeURIComponent(sort);
        if (price !== 'all')        url += '&price_range=' + encodeURIComponent(price);
        window.location.href = url;
    }

    sortSelect.addEventListener('change',  updateFilters);
    priceSelect.addEventListener('change', updateFilters);
});
</script>
