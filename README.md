# DESERTLUXE — Luxury Fashion E-Commerce

Site e-commerce luxe inspiré de Dubaï. Next.js 14 · Tailwind · Framer Motion · Ollama/Qwen · Stripe · WhatsApp.

---

## 🚀 Démarrage rapide

### 1. Prérequis
- Node.js 20+
- PostgreSQL 14+ (ou Docker)
- Ollama installé (pour le chatbot IA)

### 2. Installation

```bash
cd desertluxe
npm install
cp .env.example .env   # puis remplir les variables
```

### 3. Base de données

```bash
# Avec Docker (recommandé en dev)
docker compose up -d db

# Créer les tables
npm run db:push

# Remplir avec les données d'exemple
npm run db:seed
```

### 4. Ollama + Qwen (chatbot IA)

```bash
# Installer Ollama : https://ollama.ai
# Puis télécharger le modèle Qwen :
ollama pull qwen2.5:7b

# Vérifier qu'Ollama tourne :
ollama serve
# → accessible sur http://localhost:11434
```

### 5. Lancer le serveur dev

```bash
npm run dev
# → http://localhost:3000
```

---

## 📁 Structure du projet

```
desertluxe/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Layout global (Header + Footer + Chat)
│   │   ├── page.tsx            # Page d'accueil
│   │   ├── shop/               # Boutique avec filtres
│   │   ├── product/[id]/       # Page produit dynamique
│   │   ├── checkout/           # Checkout + Stripe
│   │   ├── admin/              # Dashboard admin
│   │   └── api/
│   │       ├── products/       # CRUD produits
│   │       ├── orders/         # Gestion commandes + WA notif
│   │       ├── checkout/       # Session Stripe
│   │       ├── chat/           # Chatbot Ollama/Qwen
│   │       └── newsletter/     # Inscription newsletter
│   ├── components/
│   │   ├── layout/             # Header + Footer
│   │   ├── home/               # Hero, Categories, Featured, Newsletter
│   │   ├── shop/               # ProductCard, ProductGrid
│   │   ├── cart/               # CartDrawer (slide-in)
│   │   └── chat/               # ChatWidget (Leila IA)
│   ├── lib/
│   │   ├── prisma.ts           # Client Prisma
│   │   ├── stripe.ts           # Client Stripe
│   │   ├── openai.ts           # Prompt builder
│   │   └── mockData.ts         # Données d'exemple (8 produits)
│   ├── store/
│   │   └── cartStore.ts        # Zustand cart (localStorage persist)
│   └── types/
│       └── index.ts            # Types TypeScript
├── prisma/
│   └── schema.prisma           # Schéma DB
├── scripts/
│   └── seed.ts                 # Seed DB
├── docker-compose.yml          # DB + Ollama + App
└── Dockerfile                  # Build production
```

---

## 🤖 Chatbot IA (Ollama + Qwen)

Le chatbot **Leila** utilise Ollama en local avec le modèle `qwen2.5:7b`.

**Cascade de fallback :**
1. **Ollama** (Qwen 2.5 7B) — LLM local, 0€
2. **OpenAI GPT-3.5** — si `OPENAI_API_KEY` configuré
3. **Réponses règles** — toujours disponible

**Variables d'environnement :**
```env
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=qwen2.5:7b    # ou qwen2.5:14b pour plus de qualité
```

**Modèles Qwen recommandés :**
| Modèle | RAM | Qualité |
|--------|-----|---------|
| `qwen2.5:3b` | 4 GB | Basique |
| `qwen2.5:7b` | 8 GB | Bon compromis ✓ |
| `qwen2.5:14b` | 16 GB | Excellent |
| `qwen2.5:72b` | 48 GB | Optimal |

---

## 💳 Stripe — Paiement

1. Créer un compte sur [stripe.com](https://stripe.com)
2. Copier les clés API dans `.env`
3. En dev : utiliser les cartes de test Stripe
   - Carte valide : `4242 4242 4242 4242`
   - Date : n'importe quelle date future
   - CVC : n'importe quel 3 chiffres

```env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## 📱 WhatsApp Business

### Option 1 — Lien direct (simple, immédiat)
Déjà intégré — le bouton "Commander sur WhatsApp" ouvre une conversation avec le résumé du panier.

### Option 2 — API WhatsApp Business (notifications admin)
1. Créer une app Meta for Developers
2. Configurer WhatsApp Business API
3. Ajouter les variables :
```env
WHATSAPP_ACCESS_TOKEN=EAAx...
WHATSAPP_PHONE_NUMBER_ID=12345678
WHATSAPP_PHONE_NUMBER=+33600000000
```

---

## 🗄️ Base de données

Le schéma Prisma contient :
- **User** — clients + admins
- **Product** — produits avec images[], tags[], stock
- **Category** — catégories avec slug unique
- **Order** + **OrderItem** — commandes avec adresse JSON
- **NewsletterSubscriber**

Sans DB configurée → le site fonctionne avec les **données mock** (`src/lib/mockData.ts`).

---

## 🚢 Déploiement

### Vercel (recommandé)
```bash
npm install -g vercel
vercel

# Variables d'env à configurer dans Vercel Dashboard :
# DATABASE_URL, STRIPE_SECRET_KEY, OLLAMA_URL, etc.
```

### Docker (auto-hébergé)
```bash
docker compose up -d
# → http://localhost:3000

# Pull le modèle Qwen dans Ollama :
docker exec -it desertluxe-ollama-1 ollama pull qwen2.5:7b
```

### Railway / Render
- Lier le repo GitHub
- Ajouter PostgreSQL addon
- Configurer les env vars
- Deploy

---

## 🎨 Personnalisation

### Couleurs (tailwind.config.ts)
```ts
gold:  { 500: '#C9A96E' }  // or principal
cream: { 100: '#FAF8F5' }  // fond
luxury: { dark: '#1A1A1A'} // noir doux
```

### Nom de la marque
Remplacer `DESERTLUXE` dans :
- `src/app/layout.tsx` (metadata)
- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`

### Produits
Éditer `src/lib/mockData.ts` ou remplir via l'admin panel + DB.

---

## 📊 Score Lighthouse cible

| Métrique | Cible |
|----------|-------|
| Performance | > 90 |
| Accessibilité | > 90 |
| SEO | > 95 |
| Best Practices | > 90 |

Optimisations intégrées :
- `next/image` lazy loading + WebP auto
- Fonts Google avec `display: swap`
- Static generation pour les pages produits
- Zustand cart côté client uniquement

---

## 🔒 Admin Panel

Accès : `/admin`

Fonctionnalités :
- Tableau de bord avec KPIs (revenus, commandes, clients)
- Alerte stock faible
- Liste produits avec recherche
- Gestion commandes avec statuts
- (En production : sécuriser avec NextAuth)

---

*DESERTLUXE — Built with Next.js 14 + Ollama/Qwen + Stripe*
