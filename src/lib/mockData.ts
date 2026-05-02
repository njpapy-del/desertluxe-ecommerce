// ── Premium Unsplash image catalog ────────────────────────────────────────────
// All photos are freely usable under Unsplash License.
// Format: ?w=SIZE&q=85&fit=crop for consistent cropping + WebP compression.

const U = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=85&fit=crop&auto=format`

// ── Sacs à main ───────────────────────────────────────────────────────────────
const BAGS = {
  // 1 — Beige structured tote (tan leather)
  milanoMain:   U('1548036328-c9fa89d128fa'),
  milanoDetail: U('1566150905458-1bf1fc113f0d'),
  milanoLife:   U('1469334031218-e382a71b716b'),   // elegant woman

  // 2 — Gold-chain clutch / evening bag
  pochetteMain:   U('1584917865442-de89be144b2a'),
  pochetteDetail: U('1553062407-98eeb64c6a62'),
  pochetteLife:   U('1515886657613-9f3515b0c78f'),  // fashion Dubai

  // 3 — Woven raffia / tressé bag
  cabasMain:   U('1591561954557-26941169b49e'),
  cabasDetail: U('1548036328-c9fa89d128fa'),
  cabasLife:   U('1469334031218-e382a71b716b'),

  // 4 — Mini croco-embossed nude
  crocoMain:   U('1553062407-98eeb64c6a62'),
  crocoDetail: U('1566150905458-1bf1fc113f0d'),
  crocoLife:   U('1515886657613-9f3515b0c78f'),

  // 5 — Black sleek shoulder bag
  noirMain:   U('1566150905458-1bf1fc113f0d'),
  noirDetail: U('1553062407-98eeb64c6a62'),
  noirLife:   U('1469334031218-e382a71b716b'),

  // 6 — White chic summer bag
  blancMain:   U('1594938298603-c8148c4dae35'),
  blancDetail: U('1548036328-c9fa89d128fa'),
  blancLife:   U('1515886657613-9f3515b0c78f'),

  // 7 — Brown designer satchel
  marronMain:   U('1614252235316-8c857d38b5f4'),
  marronDetail: U('1553062407-98eeb64c6a62'),
  marronLife:   U('1469334031218-e382a71b716b'),

  // 8 — Fashion contemporary
  fashionMain:   U('1517841905240-472988babdf9'),
  fashionDetail: U('1584917865442-de89be144b2a'),
  fashionLife:   U('1515886657613-9f3515b0c78f'),
}

// ── Accessories ───────────────────────────────────────────────────────────────
const ACC = {
  bracelet:   U('1611085583191-a3b181a88401'),
  braceletD:  U('1602173574767-37ac01994b2a'),
  lunettes:   U('1509695507497-903c140c43b0'),
  lunettesD:  U('1577803645773-f96470509666'),
  ceinture:   U('1624623278313-a930126a11c3'),
  ceintureD:  U('1614252235316-8c857d38b5f4'),
  foulard:    U('1601924921557-45e6dea0a157'),
  foulardD:   U('1596755094514-f87e34085b2c'),
  parfum:     U('1541643600914-78b084683702'),
  parfumD:    U('1523293182086-39651edb684d'),
  robe:       U('1515886657613-9f3515b0c78f'),
  robeDet:    U('1469334031218-e382a71b716b'),
  chaussure:  U('1543163521-1bf539c55dd2'),
  chaussureD: U('1542291026-7eec264c27ff'),
}

// ─── Categories ───────────────────────────────────────────────────────────────
export const MOCK_CATEGORIES = [
  {
    id:          'cat-bags',
    name:        'Sacs à Main',
    slug:        'sacs-a-main',
    description: 'Collection exclusive de sacs à main de luxe',
    image:       U('1548036328-c9fa89d128fa', 600),
    position:    1,
  },
  {
    id:          'cat-accessories',
    name:        'Accessoires',
    slug:        'accessoires',
    description: 'Bijoux, ceintures, foulards et lunettes de luxe',
    image:       U('1611085583191-a3b181a88401', 600),
    position:    2,
  },
  {
    id:          'cat-new',
    name:        'Nouveautés',
    slug:        'nouveautes',
    description: 'Les dernières pièces de la collection',
    image:       U('1584917865442-de89be144b2a', 600),
    position:    3,
  },
  {
    id:          'cat-bestsellers',
    name:        'Best Sellers',
    slug:        'best-sellers',
    description: 'Les pièces les plus appréciées',
    image:       U('1553062407-98eeb64c6a62', 600),
    position:    4,
  },
]

// ─── Products ─────────────────────────────────────────────────────────────────
export const MOCK_PRODUCTS = [
  // ── 1 ─ Sac Cuir Milano (Beige) ──────────────────────────────────────────
  {
    id:           'prod-1',
    name:         'Sac Cuir Milano',
    slug:         'sac-cuir-milano',
    description:  "Sac à main en cuir pleine fleur d'exception, façonné en Italie. Fermeture dorée, doublure en suède. La pièce emblématique de DESERTLUXE.",
    price:        289,
    comparePrice: 349,
    images:       [BAGS.milanoMain, BAGS.milanoDetail, BAGS.milanoLife],
    categoryId:   'cat-bags',
    category:     { id: 'cat-bags', name: 'Sacs à Main', slug: 'sacs-a-main', position: 1 },
    stock:        12,
    tags:         ['cuir', 'luxe', 'bestseller'],
    featured:     true,
    active:       true,
    rating:       4.9,
    reviewCount:  47,
    createdAt:    '2024-01-15T00:00:00Z',
    updatedAt:    '2024-01-15T00:00:00Z',
  },

  // ── 2 ─ Pochette Dorée Dubai ──────────────────────────────────────────────
  {
    id:           'prod-2',
    name:         'Pochette Dorée Dubai',
    slug:         'pochette-doree-dubai',
    description:  "Mini-pochette habillée aux reflets dorés, inspirée de l'architecture de Dubai. Chaîne amovible, intérieur en velours.",
    price:        189,
    comparePrice: undefined,
    images:       [BAGS.pochetteMain, BAGS.pochetteDetail, BAGS.pochetteLife],
    categoryId:   'cat-new',
    category:     { id: 'cat-new', name: 'Nouveautés', slug: 'nouveautes', position: 3 },
    stock:        8,
    tags:         ['doré', 'soirée', 'nouveau'],
    featured:     true,
    active:       true,
    rating:       4.8,
    reviewCount:  23,
    createdAt:    '2024-02-10T00:00:00Z',
    updatedAt:    '2024-02-10T00:00:00Z',
  },

  // ── 3 ─ Cabas Tressé Luxe ────────────────────────────────────────────────
  {
    id:           'prod-3',
    name:         'Cabas Tressé Luxe',
    slug:         'cabas-tresse-luxe',
    description:  "Grand cabas en cuir tressé à la main. Espace généreux, fermeture magnétique. Un investissement mode pour l'éternité.",
    price:        349,
    comparePrice: 420,
    images:       [BAGS.cabasMain, BAGS.cabasDetail, BAGS.cabasLife],
    categoryId:   'cat-bags',
    category:     { id: 'cat-bags', name: 'Sacs à Main', slug: 'sacs-a-main', position: 1 },
    stock:        5,
    tags:         ['tressé', 'grand format', 'artisanal'],
    featured:     true,
    active:       true,
    rating:       4.7,
    reviewCount:  31,
    createdAt:    '2024-01-20T00:00:00Z',
    updatedAt:    '2024-01-20T00:00:00Z',
  },

  // ── 4 ─ Mini Sac Croco Nude ──────────────────────────────────────────────
  {
    id:           'prod-4',
    name:         'Mini Sac Croco Nude',
    slug:         'mini-sac-croco-nude',
    description:  "Mini sac structuré en cuir embossé crocodile coloris nude. Attaches dorées, format compact. Iconique et intemporel.",
    price:        429,
    comparePrice: undefined,
    images:       [BAGS.crocoMain, BAGS.crocoDetail, BAGS.crocoLife],
    categoryId:   'cat-bestsellers',
    category:     { id: 'cat-bestsellers', name: 'Best Sellers', slug: 'best-sellers', position: 4 },
    stock:        3,
    tags:         ['croco', 'mini', 'bestseller'],
    featured:     true,
    active:       true,
    rating:       5.0,
    reviewCount:  58,
    createdAt:    '2023-12-01T00:00:00Z',
    updatedAt:    '2023-12-01T00:00:00Z',
  },

  // ── 5 ─ Sac Noir Élégant ─────────────────────────────────────────────────
  {
    id:           'prod-5',
    name:         'Sac Noir Signature',
    slug:         'sac-noir-signature',
    description:  "Sac à bandoulière en cuir noir lisse. Quincaillerie argentée, intérieur organisé. La sobriété élégante à son apogée.",
    price:        319,
    comparePrice: 380,
    images:       [BAGS.noirMain, BAGS.noirDetail, BAGS.noirLife],
    categoryId:   'cat-bags',
    category:     { id: 'cat-bags', name: 'Sacs à Main', slug: 'sacs-a-main', position: 1 },
    stock:        9,
    tags:         ['noir', 'classique', 'bestseller'],
    featured:     false,
    active:       true,
    rating:       4.8,
    reviewCount:  62,
    createdAt:    '2023-11-15T00:00:00Z',
    updatedAt:    '2023-11-15T00:00:00Z',
  },

  // ── 6 ─ Sac Blanc Chic ───────────────────────────────────────────────────
  {
    id:           'prod-6',
    name:         'Sac Blanc Chic',
    slug:         'sac-blanc-chic',
    description:  "Sac structuré en cuir blanc ivoire, boucle dorée. Parfait pour l'été à Dubaï. Livré avec housse de protection.",
    price:        259,
    comparePrice: undefined,
    images:       [BAGS.blancMain, BAGS.blancDetail, BAGS.blancLife],
    categoryId:   'cat-new',
    category:     { id: 'cat-new', name: 'Nouveautés', slug: 'nouveautes', position: 3 },
    stock:        14,
    tags:         ['blanc', 'été', 'nouveau'],
    featured:     false,
    active:       true,
    rating:       4.6,
    reviewCount:  18,
    createdAt:    '2024-03-01T00:00:00Z',
    updatedAt:    '2024-03-01T00:00:00Z',
  },

  // ── 7 ─ Sac Marron Designer ──────────────────────────────────────────────
  {
    id:           'prod-7',
    name:         'Sac Marron Designer',
    slug:         'sac-marron-designer',
    description:  "Sac reporter en cuir marron camel, style architecturé. Deux compartiments, sangles ajustables. Allure intemporelle.",
    price:        379,
    comparePrice: 449,
    images:       [BAGS.marronMain, BAGS.marronDetail, BAGS.marronLife],
    categoryId:   'cat-bags',
    category:     { id: 'cat-bags', name: 'Sacs à Main', slug: 'sacs-a-main', position: 1 },
    stock:        7,
    tags:         ['marron', 'camel', 'designer'],
    featured:     false,
    active:       true,
    rating:       4.7,
    reviewCount:  29,
    createdAt:    '2024-01-08T00:00:00Z',
    updatedAt:    '2024-01-08T00:00:00Z',
  },

  // ── 8 ─ Bracelet Jonc Or Rosé ────────────────────────────────────────────
  {
    id:           'prod-8',
    name:         'Bracelet Jonc Or Rosé',
    slug:         'bracelet-jonc-or-rose',
    description:  "Jonc rigide en laiton plaqué or rose 18 carats. Finition miroir. S'adapte à tous les poignets. Livré en écrin.",
    price:        129,
    comparePrice: 159,
    images:       [ACC.bracelet, ACC.braceletD],
    categoryId:   'cat-accessories',
    category:     { id: 'cat-accessories', name: 'Accessoires', slug: 'accessoires', position: 2 },
    stock:        20,
    tags:         ['bijou', 'or rosé', 'cadeau'],
    featured:     false,
    active:       true,
    rating:       4.6,
    reviewCount:  19,
    createdAt:    '2024-01-05T00:00:00Z',
    updatedAt:    '2024-01-05T00:00:00Z',
  },

  // ── 9 ─ Lunettes Glamour Sable ───────────────────────────────────────────
  {
    id:           'prod-9',
    name:         'Lunettes Glamour Sable',
    slug:         'lunettes-glamour-sable',
    description:  "Monture acétate coloris sable, verres miroir dorés. Protection UV400. Style Old Money à la Dubai.",
    price:        199,
    comparePrice: undefined,
    images:       [ACC.lunettes, ACC.lunettesD],
    categoryId:   'cat-accessories',
    category:     { id: 'cat-accessories', name: 'Accessoires', slug: 'accessoires', position: 2 },
    stock:        14,
    tags:         ['lunettes', 'été', 'tendance'],
    featured:     false,
    active:       true,
    rating:       4.5,
    reviewCount:  12,
    createdAt:    '2024-02-20T00:00:00Z',
    updatedAt:    '2024-02-20T00:00:00Z',
  },

  // ── 10 ─ Ceinture Cuir Premium ───────────────────────────────────────────
  {
    id:           'prod-10',
    name:         'Ceinture Cuir Premium',
    slug:         'ceinture-cuir-premium',
    description:  "Ceinture en cuir veau caramel, boucle dorée interchangeable. 3 tailles disponibles. Finition sellerie.",
    price:        159,
    comparePrice: 189,
    images:       [ACC.ceinture, ACC.ceintureD],
    categoryId:   'cat-accessories',
    category:     { id: 'cat-accessories', name: 'Accessoires', slug: 'accessoires', position: 2 },
    stock:        16,
    tags:         ['ceinture', 'cuir', 'classique'],
    featured:     false,
    active:       true,
    rating:       4.4,
    reviewCount:  8,
    createdAt:    '2024-01-28T00:00:00Z',
    updatedAt:    '2024-01-28T00:00:00Z',
  },

  // ── 11 ─ Foulard Soie Desert Rose ────────────────────────────────────────
  {
    id:           'prod-11',
    name:         'Foulard Soie Desert Rose',
    slug:         'foulard-soie-desert-rose',
    description:  "Foulard 100% soie, imprimé floral oriental. 90×90 cm. Cadeau idéal, livré en boîte DESERTLUXE.",
    price:        89,
    comparePrice: undefined,
    images:       [ACC.foulard, ACC.foulardD],
    categoryId:   'cat-new',
    category:     { id: 'cat-new', name: 'Nouveautés', slug: 'nouveautes', position: 3 },
    stock:        25,
    tags:         ['soie', 'foulard', 'cadeau', 'nouveau'],
    featured:     false,
    active:       true,
    rating:       4.8,
    reviewCount:  34,
    createdAt:    '2024-03-01T00:00:00Z',
    updatedAt:    '2024-03-01T00:00:00Z',
  },

  // ── 12 ─ Parfum Oud Dubai ────────────────────────────────────────────────
  {
    id:           'prod-12',
    name:         'Parfum Oud Dubai',
    slug:         'parfum-oud-dubai',
    description:  "Eau de parfum aux notes d'oud, rose et ambre. 50 ml. Flacon collector aux dorures arabisantes. L'essence de Dubai.",
    price:        149,
    comparePrice: 179,
    images:       [ACC.parfum, ACC.parfumD],
    categoryId:   'cat-bestsellers',
    category:     { id: 'cat-bestsellers', name: 'Best Sellers', slug: 'best-sellers', position: 4 },
    stock:        18,
    tags:         ['parfum', 'oud', 'cadeau', 'bestseller'],
    featured:     false,
    active:       true,
    rating:       4.9,
    reviewCount:  76,
    createdAt:    '2023-10-01T00:00:00Z',
    updatedAt:    '2023-10-01T00:00:00Z',
  },

  // ── 13 ─ Robe Luxe Dubai ─────────────────────────────────────────────────
  {
    id:           'prod-13',
    name:         'Robe Élégance Dubai',
    slug:         'robe-elegance-dubai',
    description:  "Robe longue en soie ivoire, coupe empire. Broderies dorées sur l'encolure. La tenue parfaite pour les soirées à Dubaï.",
    price:        489,
    comparePrice: 590,
    images:       [ACC.robe, ACC.robeDet],
    categoryId:   'cat-new',
    category:     { id: 'cat-new', name: 'Nouveautés', slug: 'nouveautes', position: 3 },
    stock:        6,
    tags:         ['robe', 'soirée', 'nouveau', 'luxe'],
    featured:     false,
    active:       true,
    rating:       4.7,
    reviewCount:  11,
    createdAt:    '2024-04-01T00:00:00Z',
    updatedAt:    '2024-04-01T00:00:00Z',
  },

  // ── 14 ─ Escarpins Satin Gold ────────────────────────────────────────────
  {
    id:           'prod-14',
    name:         'Escarpins Satin Doré',
    slug:         'escarpins-satin-dore',
    description:  "Escarpins en satin champagne, talon aiguille 9 cm. Bouts pointus, petite bride dorée. Glamour absolu.",
    price:        269,
    comparePrice: 320,
    images:       [ACC.chaussure, ACC.chaussureD],
    categoryId:   'cat-bestsellers',
    category:     { id: 'cat-bestsellers', name: 'Best Sellers', slug: 'best-sellers', position: 4 },
    stock:        10,
    tags:         ['chaussures', 'doré', 'soirée', 'bestseller'],
    featured:     false,
    active:       true,
    rating:       4.6,
    reviewCount:  22,
    createdAt:    '2024-02-14T00:00:00Z',
    updatedAt:    '2024-02-14T00:00:00Z',
  },
]

export type MockProduct  = (typeof MOCK_PRODUCTS)[0]
export type MockCategory = (typeof MOCK_CATEGORIES)[0]
