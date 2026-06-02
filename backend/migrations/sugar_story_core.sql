-- PostgreSQL DDL Migration for The Sugar Story custom tables

-- ENUM Types
CREATE TYPE loyalty_transaction_type AS ENUM ('earn', 'redeem', 'expire', 'adjust');
CREATE TYPE referral_reward_status AS ENUM ('pending', 'approved', 'declined');
CREATE TYPE subscription_status AS ENUM ('active', 'paused', 'cancelled');
CREATE TYPE quote_status AS ENUM ('New', 'Quoted', 'Accepted', 'In Production', 'Shipped', 'Closed');
CREATE TYPE wa_optin_source AS ENUM ('checkout', 'popup', 'review');

-- 1. Bhopal Service Zones
CREATE TABLE IF NOT EXISTS bhopal_service_zones (
    id SERIAL PRIMARY KEY,
    zone_name VARCHAR(100) NOT NULL,
    pincodes TEXT[] NOT NULL,
    delivery_fee_inr INT NOT NULL,
    same_day_cutoff_hour INT DEFAULT 13,
    midnight_slot_available BOOLEAN DEFAULT TRUE,
    midnight_fee_inr INT DEFAULT 199,
    early_morning_fee_inr INT DEFAULT 199,
    active BOOLEAN DEFAULT TRUE
);

-- 2. Delivery Slots
CREATE TABLE IF NOT EXISTS delivery_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    slot_label VARCHAR(100) NOT NULL,
    capacity INT DEFAULT 25,
    booked INT DEFAULT 0,
    zone_id INT REFERENCES bhopal_service_zones(id) ON DELETE CASCADE,
    is_midnight BOOLEAN DEFAULT FALSE,
    fee_override_inr INT
);

-- 3. Founder Stories
CREATE TABLE IF NOT EXISTS founder_stories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    product_id VARCHAR(255), -- references Medusa product ID
    body TEXT NOT NULL,
    image_url VARCHAR(512),
    signature_image_url VARCHAR(512),
    display_locations TEXT[] NOT NULL, -- e.g. ['home', 'pdp', 'footer']
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Notebook Posts
CREATE TABLE IF NOT EXISTS notebook_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    body_mdx TEXT NOT NULL,
    hero_image VARCHAR(512),
    author VARCHAR(100) DEFAULT 'Shalini Singh',
    category VARCHAR(100) NOT NULL,
    tags TEXT[],
    read_minutes INT DEFAULT 3,
    meta_title VARCHAR(255),
    meta_description TEXT,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'draft'
);

-- 5. Product Delivery Meta
CREATE TABLE IF NOT EXISTS product_delivery_meta (
    product_id VARCHAR(255) PRIMARY KEY, -- Medusa product ID
    is_local_only BOOLEAN DEFAULT FALSE,
    is_pan_india BOOLEAN DEFAULT TRUE,
    shelf_life_days INT DEFAULT 5,
    storage_instructions TEXT,
    pack_weight_grams INT,
    pack_dimensions_cm VARCHAR(50),
    fragile BOOLEAN DEFAULT FALSE,
    requires_cold_chain BOOLEAN DEFAULT FALSE,
    hsn_code VARCHAR(50),
    gst_pct NUMERIC(4,2) DEFAULT 5.00,
    founder_story_id UUID REFERENCES founder_stories(id) ON DELETE SET NULL,
    advance_hours_required INT DEFAULT 0
);

-- 6. Product Ingredients
CREATE TABLE IF NOT EXISTS product_ingredients (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(255) NOT NULL,
    ingredient_name VARCHAR(255) NOT NULL,
    origin VARCHAR(255),
    is_premium BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0
);

-- 7. Order Customisations
CREATE TABLE IF NOT EXISTS order_customisations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id VARCHAR(255) NOT NULL, -- Medusa order ID
    line_item_id VARCHAR(255) NOT NULL, -- Medusa line item ID
    cake_message VARCHAR(500),
    photo_upload_url VARCHAR(512),
    flavour_notes TEXT,
    allergen_notes TEXT,
    is_eggless BOOLEAN DEFAULT FALSE,
    moderation_status VARCHAR(50) DEFAULT 'pending',
    moderator_id VARCHAR(255),
    moderated_at TIMESTAMP WITH TIME ZONE
);

-- 8. Loyalty Accounts
CREATE TABLE IF NOT EXISTS loyalty_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id VARCHAR(255) UNIQUE NOT NULL, -- Medusa customer ID
    points_balance INT DEFAULT 0,
    lifetime_spend_inr INT DEFAULT 0,
    tier VARCHAR(50) DEFAULT 'Reader',
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Loyalty Transactions
CREATE TABLE IF NOT EXISTS loyalty_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id VARCHAR(255) NOT NULL,
    order_id VARCHAR(255),
    type loyalty_transaction_type NOT NULL,
    points INT NOT NULL,
    reason VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Referrals
CREATE TABLE IF NOT EXISTS referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    referrer_customer_id VARCHAR(255) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    referred_customer_id VARCHAR(255),
    first_order_id VARCHAR(255),
    reward_status referral_reward_status DEFAULT 'pending',
    give_amount_inr INT DEFAULT 250,
    get_amount_inr INT DEFAULT 250,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Product Reviews
CREATE TABLE IF NOT EXISTS product_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id VARCHAR(255) NOT NULL,
    customer_id VARCHAR(255) NOT NULL,
    order_id VARCHAR(255),
    rating INT CHECK (rating BETWEEN 1 AND 5),
    title VARCHAR(255),
    body TEXT,
    photo_urls TEXT[],
    verified_buyer BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'pending',
    helpful_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. Subscriptions (The Notebook Box)
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id VARCHAR(255) NOT NULL,
    plan_id VARCHAR(100) NOT NULL,
    status subscription_status DEFAULT 'active',
    next_renewal_date DATE NOT NULL,
    address_id VARCHAR(255),
    razorpay_subscription_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. Gift Cards
CREATE TABLE IF NOT EXISTS gift_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    initial_amount_inr INT NOT NULL,
    current_balance_inr INT NOT NULL,
    purchased_by_customer_id VARCHAR(255),
    recipient_email VARCHAR(255),
    recipient_phone VARCHAR(50),
    recipient_name VARCHAR(255),
    message TEXT,
    scheduled_send_at TIMESTAMP WITH TIME ZONE,
    expiry_date DATE,
    status VARCHAR(50) DEFAULT 'active'
);

-- 14. Corporate Quotes
CREATE TABLE IF NOT EXISTS corporate_quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    units INT NOT NULL,
    target_date DATE NOT NULL,
    budget_inr INT NOT NULL,
    custom_branding BOOLEAN DEFAULT FALSE,
    addresses_csv_url VARCHAR(512),
    status quote_status DEFAULT 'New',
    assigned_to_user_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 15. WhatsApp Opt-ins
CREATE TABLE IF NOT EXISTS wa_optins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id VARCHAR(255),
    phone VARCHAR(50) NOT NULL,
    consent BOOLEAN DEFAULT TRUE,
    captured_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    source wa_optin_source NOT NULL
);

-- 16. Abandoned Carts
CREATE TABLE IF NOT EXISTS abandoned_carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id VARCHAR(255) UNIQUE NOT NULL,
    customer_id VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    cart_value_inr INT NOT NULL,
    items_snapshot JSONB NOT NULL,
    last_step VARCHAR(100),
    message1_sent_at TIMESTAMP WITH TIME ZONE,
    message2_sent_at TIMESTAMP WITH TIME ZONE,
    message3_sent_at TIMESTAMP WITH TIME ZONE,
    recovered BOOLEAN DEFAULT FALSE,
    recovered_at TIMESTAMP WITH TIME ZONE,
    recovered_order_id VARCHAR(255)
);

-- 17. Event Log
CREATE TABLE IF NOT EXISTS event_log (
    id BIGSERIAL PRIMARY KEY,
    occurred_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    session_id VARCHAR(255),
    customer_id VARCHAR(255),
    event VARCHAR(255) NOT NULL,
    properties JSONB NOT NULL
);

-- CREATE GIN INDEX on properties for fast event logging queries
CREATE INDEX IF NOT EXISTS idx_event_log_properties ON event_log USING gin (properties);
