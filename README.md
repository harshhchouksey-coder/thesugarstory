# The Sugar Story — Premium Artisan Bakery Monorepo

> "Every bite, a chapter. Crafted by ex-Taj chef Shalini Singh."

An enterprise-grade, highly optimized hybrid ecommerce platform featuring local, fresh delivery within Bhopal and pan-India shipping for shelf-stable luxury desserts. Styled at the intersection of **Aesop**, **Ladurée**, and **Magnolia Bakery**.

---

## Repository Architecture

This is a high-performance **Turborepo monorepo** managed with `pnpm`:

```text
/
├── apps/
│   ├── web/        # Next.js 15 luxury storefront (App Router, Framer Motion, Lenis)
│   └── admin/      # Medusa Admin v2 custom dashboards & extensions
├── backend/        # Medusa.js v2 server (Node 20, Custom modules & SQL extensions)
├── studio/         # Sanity Studio v3 (storytelling posts, occasions, ingredients database)
├── packages/
│   └── shared/     # Shared styles, typography models, Bhopal zone data, and TS typings
├── docker-compose.yml  # Configures PG 16 and Redis local cluster
└── turbo.json      # Pipeline build configurations
```

---

## Core Features

1. **Serviceability & Pincode Gating**: Local items (fresh cakes, custom theme cakes) check slot serviceability inside Bhopal (30+ pincodes). Pan-India products fetch live delivery timelines using the Shiprocket SDK simulator.
2. **Kitchen Dashboard & Slot Tracker**: Admin portal tracking slot capacity, cutoff limits, and order lists for baking optimization.
3. **Loyalty Program**: Auto-enrolls customers, rewarding points (1 point per ₹10 spent). Features tier upgrades: *Reader*, *Storyteller*, *Author*.
4. **Referrals System**: Dual payouts (referrer and referee) backed by anti-fraud fingerprint analysis.
5. **WhatsApp & Communication Flows**: Custom 3-stage abandoned-cart sequence (30m, 6h, 72h) integrated via Interakt Business API fallback hooks.

---

## Local Setup Instructions

### Prerequisites
* **Node.js v20+**
* **pnpm v9+**
* **Docker & Docker Compose**

### Step-by-Step Staging

1. **Spin up local Databases**:
   ```bash
   docker compose up -d
   ```

2. **Copy Environments**:
   ```bash
   cp .env.example .env
   ```

3. **Install Dependencies**:
   ```bash
   pnpm install
   ```

4. **Run Seed & Run in Dev Mode**:
   ```bash
   pnpm dev
   ```

Storefront will boot at `http://localhost:3000`, Medusa backend admin at `http://localhost:9000`.
