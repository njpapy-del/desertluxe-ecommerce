-- Migration safe desertluxe → Supabase
-- Crée uniquement les objets manquants, ne supprime RIEN d'existant.

-- ── Enums (idempotent via DO block) ──────────────────────────────────────────
DO $$ BEGIN
  CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'ADMIN');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ── Ajustement des colonnes timestamp sur les tables existantes ───────────────
-- (no-op si déjà au bon type)
DO $$ BEGIN
  ALTER TABLE "Category"
    ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
    ALTER COLUMN "updatedAt" DROP DEFAULT,
    ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);
EXCEPTION WHEN others THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "NewsletterSubscriber"
    ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3);
EXCEPTION WHEN others THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "Product"
    ALTER COLUMN "images" DROP DEFAULT,
    ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
    ALTER COLUMN "updatedAt" DROP DEFAULT,
    ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);
EXCEPTION WHEN others THEN NULL; END $$;

-- ── Remettre la FK Product → Category ────────────────────────────────────────
ALTER TABLE "Product" DROP CONSTRAINT IF EXISTS "Product_categoryId_fkey";
ALTER TABLE "Product"
  ADD CONSTRAINT "Product_categoryId_fkey"
  FOREIGN KEY ("categoryId") REFERENCES "Category"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;

-- ── Créer User ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "User" (
  "id"        TEXT      NOT NULL,
  "email"     TEXT      NOT NULL,
  "name"      TEXT,
  "role"      "Role"    NOT NULL DEFAULT 'CUSTOMER',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

-- ── Créer Order ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "Order" (
  "id"              TEXT           NOT NULL,
  "orderNumber"     TEXT           NOT NULL,
  "userId"          TEXT,
  "status"          "OrderStatus"  NOT NULL DEFAULT 'PENDING',
  "subtotal"        DOUBLE PRECISION NOT NULL,
  "shipping"        DOUBLE PRECISION NOT NULL DEFAULT 0,
  "tax"             DOUBLE PRECISION NOT NULL DEFAULT 0,
  "total"           DOUBLE PRECISION NOT NULL,
  "currency"        TEXT           NOT NULL DEFAULT 'EUR',
  "shippingAddress" JSONB          NOT NULL,
  "billingAddress"  JSONB,
  "paymentMethod"   TEXT,
  "paymentIntentId" TEXT,
  "stripeSessionId" TEXT,
  "notes"           TEXT,
  "createdAt"       TIMESTAMP(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"       TIMESTAMP(3)   NOT NULL,
  CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "Order_orderNumber_key" ON "Order"("orderNumber");

-- ── Créer OrderItem ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "OrderItem" (
  "id"        TEXT             NOT NULL,
  "orderId"   TEXT             NOT NULL,
  "productId" TEXT             NOT NULL,
  "quantity"  INTEGER          NOT NULL,
  "price"     DOUBLE PRECISION NOT NULL,
  "snapshot"  JSONB            NOT NULL,
  CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- ── Foreign keys Order / OrderItem ───────────────────────────────────────────
ALTER TABLE "Order" DROP CONSTRAINT IF EXISTS "Order_userId_fkey";
ALTER TABLE "Order"
  ADD CONSTRAINT "Order_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "OrderItem" DROP CONSTRAINT IF EXISTS "OrderItem_orderId_fkey";
ALTER TABLE "OrderItem"
  ADD CONSTRAINT "OrderItem_orderId_fkey"
  FOREIGN KEY ("orderId") REFERENCES "Order"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "OrderItem" DROP CONSTRAINT IF EXISTS "OrderItem_productId_fkey";
ALTER TABLE "OrderItem"
  ADD CONSTRAINT "OrderItem_productId_fkey"
  FOREIGN KEY ("productId") REFERENCES "Product"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;
