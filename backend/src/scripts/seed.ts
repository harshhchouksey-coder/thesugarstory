// Seeding script for The Sugar Story custom tables
import { BHOPAL_SERVICE_ZONES } from "../../../packages/shared/src/tokens";

export const seedFounderStories = [
  {
    id: "f1b8a510-1847-4cba-8178-57d45f340801",
    slug: "shalini-singh-taj-chef",
    title: "From the Grand Kitchens of Taj to The Sugar Story",
    product_id: "prod_chocolate_taj",
    body: `After spending over a decade heading the elite pastry section at the iconic Taj Mahal Palace, Chef Shalini Singh envisioned a new chapter: bringing world-class, uncompromising French-style artisanal baking to her hometown, Bhopal. Every creation at The Sugar Story is infused with her precision, utilizing premium European ingredients like Lescure French butter and Valrhona single-origin chocolates. Her philosophy is simple: desserts aren't just sweet endings, they are chapters of our lives written in flavor.`,
    image_url: "/images/founder-shalini.jpg",
    signature_image_url: "/images/shalini-signature.svg",
    display_locations: ["home", "about", "pdp"],
    created_at: new Date()
  }
];

export const seedProducts = [
  {
    product_id: "prod_brownies_665",
    title: "Assorted Brownies Box (Signature)",
    description: "An elegant assortment of our finest signature brownies. Features intense double fudge, sea-salt caramel, and Ghana roasted almond brownies. Crafted using ex-Taj chef Shalini's secret recipe.",
    is_local_only: false,
    is_pan_india: true,
    shelf_life_days: 5,
    storage_instructions: "Consume within 4 days, refrigerate in summer. Serve slightly warm with vanilla bean gelato.",
    pack_weight_grams: 450,
    pack_dimensions_cm: "20x15x5",
    fragile: true,
    requires_cold_chain: false,
    hsn_code: "19059010",
    gst_pct: 18.00,
    price_inr: 665,
    advance_hours_required: 0,
    ingredients: [
      { name: "Valrhona 70% Dark Chocolate", origin: "France", premium: true },
      { name: "Lescure Cultured Butter", origin: "France", premium: true },
      { name: "Single-origin Cocoa", origin: "Ghana", premium: true },
      { name: "Organic Demerara Sugar", origin: "Local Farms", premium: false }
    ]
  },
  {
    product_id: "prod_chocolate_taj",
    title: "Taj Signature Chocolate Mousse Cake",
    description: "Our signature celebration cake. Decadent layers of Valrhona dark chocolate mousse, chocolate sponge, and a gold-flecked mirror glaze.",
    is_local_only: true,
    is_pan_india: false,
    shelf_life_days: 1,
    storage_instructions: "Keep refrigerated at all times. Consume within 24 hours.",
    pack_weight_grams: 1000,
    pack_dimensions_cm: "22x22x12",
    fragile: true,
    requires_cold_chain: true,
    hsn_code: "19059010",
    gst_pct: 18.00,
    price_inr: 1499,
    advance_hours_required: 24,
    ingredients: [
      { name: "Valrhona 70% Dark Chocolate", origin: "France", premium: true },
      { name: "Madagascar Vanilla Bean", origin: "Madagascar", premium: true },
      { name: "AOP French Butter (Lescure)", origin: "France", premium: true }
    ]
  },
  {
    product_id: "prod_wedding_gold",
    title: "Shalini's Vanilla Bean Wedding Cake",
    description: "A breathtaking bespoke wedding masterpiece. Delicate sponge infused with premium vanilla beans and decorated with gold leaf accents.",
    is_local_only: true,
    is_pan_india: false,
    shelf_life_days: 1,
    storage_instructions: "Keep refrigerated. Handle with ultimate care during transit.",
    pack_weight_grams: 3000,
    pack_dimensions_cm: "30x30x40",
    fragile: true,
    requires_cold_chain: true,
    hsn_code: "19059010",
    gst_pct: 18.00,
    price_inr: 4999,
    advance_hours_required: 48,
    ingredients: [
      { name: "Madagascar Vanilla Bean", origin: "Madagascar", premium: true },
      { name: "Organic Egg Yolks", origin: "Local Farms", premium: false },
      { name: "French Butter", origin: "France", premium: true }
    ]
  },
  {
    product_id: "prod_cheesecake_classic",
    title: "New York Style Salted Caramel Cheesecake",
    description: "Velvety, rich cream cheese filling baked on a graham cracker crust, topped with house-made copper caramel. Shipped frozen under cold chain.",
    is_local_only: false,
    is_pan_india: true,
    shelf_life_days: 30, // 30 days frozen
    storage_instructions: "Store in freezer for up to 30 days. Thaw in the refrigerator for 2 hours before enjoying.",
    pack_weight_grams: 950,
    pack_dimensions_cm: "24x24x10",
    fragile: true,
    requires_cold_chain: true,
    hsn_code: "19059010",
    gst_pct: 18.00,
    price_inr: 1250,
    advance_hours_required: 12,
    ingredients: [
      { name: "Organic Cream Cheese", origin: "Australia", premium: true },
      { name: "Sea Salt Crystals", origin: "Maldon", premium: true },
      { name: "Real Butter", origin: "Lescure, France", premium: true }
    ]
  },
  {
    product_id: "prod_cookies_box",
    title: "Exquisite Sea-Salt Chocolate Cookies",
    description: "Crispy edges with a soft, chewy, chocolate-packed center. Sprinkled with premium hand-harvested Maldon sea salt.",
    is_local_only: false,
    is_pan_india: true,
    shelf_life_days: 25,
    storage_instructions: "Store in an airtight container at room temperature. Keep away from direct sunlight.",
    pack_weight_grams: 300,
    pack_dimensions_cm: "15x15x6",
    fragile: false,
    requires_cold_chain: false,
    hsn_code: "19053100",
    gst_pct: 18.00,
    price_inr: 450,
    advance_hours_required: 0,
    ingredients: [
      { name: "Single-origin Chocolate Chips", origin: "Ghana", premium: true },
      { name: "Maldon Sea Salt", origin: "United Kingdom", premium: true }
    ]
  },
  {
    product_id: "prod_tea_cake_vanilla",
    title: "Madagascar Vanilla Bean Tea Cake",
    description: "A delicate, aromatic tea cake infused with premium Madagascar bourbon vanilla beans. An perfect companion to fine Darjeeling tea.",
    is_local_only: false,
    is_pan_india: true,
    shelf_life_days: 8,
    storage_instructions: "Store in a cool dry place. Consume within 8 days of baking.",
    pack_weight_grams: 400,
    pack_dimensions_cm: "18x8x8",
    fragile: true,
    requires_cold_chain: false,
    hsn_code: "19059010",
    gst_pct: 18.00,
    price_inr: 550,
    advance_hours_required: 0,
    ingredients: [
      { name: "Madagascar Vanilla Bean", origin: "Madagascar", premium: true },
      { name: "French Cream Butter", origin: "France", premium: true }
    ]
  }
];

export const seedNotebookPosts = [
  {
    id: "n1d3b510-1847-4cba-8178-57d45f340801",
    slug: "chemistry-of-chocolate-valrhona",
    title: "The Chemistry of Chocolate: Working with Valrhona",
    excerpt: "Discover why ex-Taj chef Shalini Singh prioritizes premium French chocolate, exploring fat content, crystallization, and taste.",
    body_mdx: `### Understanding High-Percentage Cocoa

Baking isn't just an art form; it is a rigid science of chemical balance. In the premium kitchens of *The Sugar Story*, we deal almost exclusively with **Valrhona 70% Dark Chocolate**, sourced directly from the Tain-l'Hermitage region in France. 

#### Why Valrhona?
1. **Unrivaled Cocoa Butter Ratio**: With a precise 31-35% fat content, it ensures a silk-smooth mouthfeel without cloying viscosity.
2. **Crystallization Stability**: Tempering Valrhona allows our kitchen team to achieve the ultimate glassy, high-gloss shine for our custom wedding cakes.
3. **Complexity of Acidic Profiles**: Notes of red berries and toasted nuts shine through our brownies, turning a simple bite into a detailed sensory chapter.

*Tip: When baking at home, never overheat chocolate above 50°C to protect its organic fat structure.*`,
    hero_image: "/images/notebook-chocolate.jpg",
    author: "Shalini Singh",
    category: "Chocolate",
    tags: ["valrhona", "baking-science", "ingredients"],
    read_minutes: 4,
    meta_title: "The Science of Baking with Valrhona Chocolate",
    meta_description: "Ex-Taj Chef Shalini Singh writes about the chemical balance, fat structures, and tempering secrets behind French chocolates.",
    published_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    status: "published"
  },
  {
    id: "n2d3b510-1847-4cba-8178-57d45f340802",
    slug: "artisanal-philosophy-sugar-story",
    title: "Artisanal Baking vs Mass Production: The Sugar Story Philosophy",
    excerpt: "Why we choose small batches, real butter, and say an absolute no to cheap additives and chemical stabilizers.",
    body_mdx: `### Returning to the Roots of Real Baking

In an era of hyper-optimized industrial factories and chemical-shelf stabilizers, *The Sugar Story* takes a stand. Every cake, macaron, and cookie that leaves our kitchen is hand-rolled, hand-iced, and completely preservative-free.

#### Our Non-Negotiables
* **Real Butter**: We utilize French butter (AOP Lescure) over hydrogenated fats. Real dairy creates layers of melt-in-mouth richness.
* **No Added Stabilizers**: No artificial cake gels, zero additives. We rely entirely on precise whip times, egg aeration, and moisture control.
* **Small-Batch Tempering**: Our kitchen operates in controlled small batches, ensuring every cake gets individual artistic focus.

It takes longer. It costs more. But the resulting flavor chapters are undeniably distinct.`,
    hero_image: "/images/notebook-philosophy.jpg",
    author: "Shalini Singh",
    category: "Philosophy",
    tags: ["artisanal", "purity", "baking"],
    read_minutes: 5,
    meta_title: "Artisanal Baking Philosophy — The Sugar Story",
    meta_description: "Learn about Shalini Singh's baking manifesto, prioritizing small-batch purity and French butter over industrial additives.",
    published_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    status: "published"
  },
  {
    id: "n3d3b510-1847-4cba-8178-57d45f340803",
    slug: "bhopal-dessert-evolution-french-techniques",
    title: "Bhopal's Dessert Evolution: French Techniques for local Palates",
    excerpt: "Chef Shalini reflects on bringing high-end pastry design to Bhopal and finding the harmony between sugar and structure.",
    body_mdx: `### Adapting Global Mastery to Local Palates

When I returned to Bhopal after years of service in Mumbai's luxury hotels, the local dessert scene was dominated by highly sugary, color-laden cakes. 

My dream was to introduce the nuanced world of high-end French pastry:
1. **Less Sugar, More Flavor**: By reducing refined sugar ratios, we allow the Madagascar vanilla beans and Ghana cocoa to shine.
2. **Temperature Management**: Bhopal's summers are intensely hot. Designing stable mousses without using gelatin or artificial emulsifiers required modifying our cold-chain transit systems.
3. **Occasion Integration**: Creating customized fusion cakes that honor Bhopal's heritage while using world-class baking techniques.

We are proud to see Bhopal's foodies embracing these modern culinary chapters with open arms.`,
    hero_image: "/images/notebook-bhopal.jpg",
    author: "Shalini Singh",
    category: "Culture",
    tags: ["bhopal", "french-pastry", "culinary"],
    read_minutes: 3,
    meta_title: "Bhopal Dessert Evolution & Fine Pastry",
    meta_description: "How Chef Shalini adapted classic French techniques to Bhopal's local climate and palates.",
    published_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    status: "published"
  },
  {
    id: "n4d3b510-1847-4cba-8178-57d45f340804",
    slug: "perfect-afternoon-high-tea-menu",
    title: "The Perfect Afternoon High Tea: Menu Curation Guide",
    excerpt: "An ex-Taj expert's guide to curating standard sweet and savory ratios for high tea celebrations.",
    body_mdx: `### Elevating Your Afternoon Tea Experience

A premium high tea is a beautiful dance of balances: savory to sweet, light to dense, acidic to rich. 

#### The Ideal Menu Structure
* **The Savory Base**: Premium cucumber & dill sand-wiches, followed by warm, crumbly cheese biscuits.
* **The Scone Interlude**: Freshly baked English cream tea cakes, paired with organic fruit preserves and clotted cream.
* **The Sweet Finale**: A curated selection of high-end desserts like sea-salt caramel cookies and Valrhona brownies.

#### Tea Pairings
Prefer light, fragrant floral black teas (like Darjeeling First Flush) to complement butter-heavy pastries. Avoid sweet milk teas that mask the elegant taste notes.`,
    hero_image: "/images/notebook-hightea.jpg",
    author: "Shalini Singh",
    category: "Guide",
    tags: ["high-tea", "menu-design", "lifestyle"],
    read_minutes: 6,
    meta_title: "Curating the Perfect Afternoon High Tea Menu",
    meta_description: "Learn how to structure high-class high teas with balanced savories and sweet pairings.",
    published_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: "published"
  },
  {
    id: "n5d3b510-1847-4cba-8178-57d45f340805",
    slug: "sourcing-madagascar-vanilla-lescure-butter",
    title: "Inside the Pantry: Sourcing Madagascar Vanilla & Lescure Butter",
    excerpt: "A deep dive into our pantry, exploring the origins of our exceptional farm-sourced raw materials.",
    body_mdx: `### Sourcing the Ingredients of Legend

An artisan is only as great as their tools. At *The Sugar Story*, our pantry contains ingredients that have stories of their own.

#### Madagascar Bourbon Vanilla Beans
We reject artificial vanillin extracts. We source organic vanilla pods directly from Sava, Madagascar. Every pod is hand-split, releasing thousands of black specks of complex woody-floral sweetness.

#### Lescure Charentes-Poitou Butter
For our delicate laminated pastries and tea cakes, we import **AOP Lescure Butter** from France. Its high butterfat percentage (84%) and biological culture fermentation grant it unmatched elasticity and creaminess.

We believe that respect for the soil yields the most premium taste profiles.`,
    hero_image: "/images/notebook-sourcing.jpg",
    author: "Shalini Singh",
    category: "Sourcing",
    tags: ["sourcing", "ingredients", "luxury"],
    read_minutes: 4,
    meta_title: "Ingredient Sourcing Secrets — The Sugar Story",
    meta_description: "Why premium ingredients like Madagascar Vanilla and AOP French Lescure Butter define our bakery's success.",
    published_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    status: "published"
  },
  {
    id: "n6d3b510-1847-4cba-8178-57d45f340806",
    slug: "celebration-masterpieces-custom-cake-design",
    title: "Creating Celebration Masterpieces: The Art of Custom Cake Design",
    excerpt: "Go behind the scenes of our kitchen as we design high-fashion customized cakes for life's special occasions.",
    body_mdx: `### Sculpting Memories in Frosting

Designing a custom celebration cake is a highly personal journey. It begins with a pencil sketch, an occasion brief, and an exploration of structural bounds.

#### The Creative Stages
1. **The Vision Consult**: Understanding the client's story. We ask about color boards, florals, and mood aesthetics.
2. **Structural Engineering**: Multi-tiered cakes require internal support matrices. We calculate weight distributions to ensure stability.
3. **Artistic Embellishment**: Every sugar flower is individually hand-sculpted petal by petal, requiring up to 48 hours of meticulous dry times.

The final creation is not just a cake; it is the center-piece of a lifelong memory.`,
    hero_image: "/images/notebook-customs.jpg",
    author: "Shalini Singh",
    category: "Art",
    tags: ["custom-cakes", "sugar-art", "celebration"],
    read_minutes: 5,
    meta_title: "Art of Custom Cake Design — The Sugar Story",
    meta_description: "How Chef Shalini engineers complex, visually stunning tiered celebration cakes in Bhopal.",
    published_at: new Date(),
    status: "published"
  }
];

// Seed execution helper
export async function runSeeder(dbClient: any) {
  console.log("Seeding Bhopal service zones...");
  for (const zone of BHOPAL_SERVICE_ZONES) {
    await dbClient.query(`
      INSERT INTO bhopal_service_zones (id, zone_name, pincodes, delivery_fee_inr, active)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (id) DO UPDATE SET
        zone_name = EXCLUDED.zone_name,
        pincodes = EXCLUDED.pincodes,
        delivery_fee_inr = EXCLUDED.delivery_fee_inr
    `, [zone.id === "Z1" ? 1 : zone.id === "Z2" ? 2 : zone.id === "Z3" ? 3 : zone.id === "Z4" ? 4 : 5, zone.name, zone.pincodes, zone.deliveryFee, zone.active]);
  }

  console.log("Seeding Founder Stories...");
  for (const story of seedFounderStories) {
    await dbClient.query(`
      INSERT INTO founder_stories (id, slug, title, product_id, body, image_url, signature_image_url, display_locations)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (slug) DO NOTHING
    `, [story.id, story.slug, story.title, story.product_id, story.body, story.image_url, story.signature_image_url, story.display_locations]);
  }

  console.log("Seeding Products and Ingredients...");
  for (const p of seedProducts) {
    await dbClient.query(`
      INSERT INTO product_delivery_meta (product_id, is_local_only, is_pan_india, shelf_life_days, storage_instructions, pack_weight_grams, pack_dimensions_cm, fragile, requires_cold_chain, hsn_code, gst_pct, advance_hours_required)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      ON CONFLICT (product_id) DO NOTHING
    `, [p.product_id, p.is_local_only, p.is_pan_india, p.shelf_life_days, p.storage_instructions, p.pack_weight_grams, p.pack_dimensions_cm, p.fragile, p.requires_cold_chain, p.hsn_code, p.gst_pct, p.advance_hours_required]);

    for (let i = 0; i < p.ingredients.length; i++) {
      const ing = p.ingredients[i];
      await dbClient.query(`
        INSERT INTO product_ingredients (product_id, ingredient_name, origin, is_premium, display_order)
        VALUES ($1, $2, $3, $4, $5)
      `, [p.product_id, ing.name, ing.origin, ing.premium, i]);
    }
  }

  console.log("Seeding Notebook Posts...");
  for (const post of seedNotebookPosts) {
    await dbClient.query(`
      INSERT INTO notebook_posts (id, slug, title, excerpt, body_mdx, hero_image, author, category, tags, read_minutes, meta_title, meta_description, published_at, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      ON CONFLICT (slug) DO NOTHING
    `, [post.id, post.slug, post.title, post.excerpt, post.body_mdx, post.hero_image, post.author, post.category, post.tags, post.read_minutes, post.meta_title, post.meta_description, post.published_at, post.status]);
  }

  console.log("Database seeded successfully.");
}
