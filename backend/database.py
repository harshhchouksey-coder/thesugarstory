import os
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient as MotorClient
from datetime import datetime
import uuid

# MongoDB Connection coordinates
MONGO_URI = os.getenv("MONGO_URI", "mongodb://admin:adminpassword@localhost:27017/sugarstory_db?authSource=admin")

class Database:
    client: MotorClient = None
    db = None

db_instance = Database()

# Complete list of 72 exact bakery products seeded
PRODUCTS_SEED_LIST = [
    # ---- JAR CAKES ----
    {"name": "Pineapple Jar", "category": "Jar Cakes", "price": 140, "weight": "1 Jar", "min_quantity": 1, "description": "Refreshing pineapple layers with cream"},
    {"name": "Butterscotch Jar", "category": "Jar Cakes", "price": 140, "weight": "1 Jar", "min_quantity": 1, "description": "Crunchy butterscotch with caramel swirls"},
    {"name": "Vanilla Caramel Jar", "category": "Jar Cakes", "price": 140, "weight": "1 Jar", "min_quantity": 1, "description": "Classic vanilla with rich caramel"},
    {"name": "Black Forest Jar", "category": "Jar Cakes", "price": 150, "weight": "1 Jar", "min_quantity": 1, "description": "Chocolate, cherry & cream delight"},
    {"name": "White Forest Jar", "category": "Jar Cakes", "price": 150, "weight": "1 Jar", "min_quantity": 1, "description": "White chocolate with cherry compote"},
    {"name": "Choco Choco Chip Jar", "category": "Jar Cakes", "price": 150, "weight": "1 Jar", "min_quantity": 1, "description": "Double chocolate indulgence"},
    {"name": "Mix Fruit Jar", "category": "Jar Cakes", "price": 170, "weight": "1 Jar", "min_quantity": 1, "description": "Fresh seasonal fruits with cream"},
    {"name": "Blueberry Bliss Jar", "category": "Jar Cakes", "price": 170, "weight": "1 Jar", "min_quantity": 1, "description": "Fresh blueberry compote layers"},
    {"name": "Oreo Choco Jar", "category": "Jar Cakes", "price": 170, "weight": "1 Jar", "min_quantity": 1, "description": "Crushed oreos with chocolate cream"},
    {"name": "Tiramisu Jar", "category": "Jar Cakes", "price": 170, "weight": "1 Jar", "min_quantity": 1, "description": "Italian coffee-flavored delight"},
    {"name": "Rasmalai Fusion Jar", "category": "Jar Cakes", "price": 190, "weight": "1 Jar", "min_quantity": 1, "description": "Traditional Indian fusion dessert"},
    {"name": "Choco Hazelnut Jar", "category": "Jar Cakes", "price": 190, "weight": "1 Jar", "min_quantity": 1, "description": "Rich chocolate with roasted hazelnuts"},
    {"name": "Red Velvet Jar", "category": "Jar Cakes", "price": 190, "weight": "1 Jar", "min_quantity": 1, "description": "Classic red velvet with cream cheese"},
    {"name": "Lotus Biscoff Jar", "category": "Jar Cakes", "price": 190, "weight": "1 Jar", "min_quantity": 1, "description": "Premium biscoff with caramel layers"},

    # ---- BROWNIES ----
    {"name": "Chocolate Walnut Brownie", "category": "Brownies", "price": 250, "weight": "200g", "min_quantity": 1, "description": "Dense fudgy brownie loaded with walnuts"},
    {"name": "Chocolate Fudge Brownie", "category": "Brownies", "price": 250, "weight": "200g", "min_quantity": 1, "description": "Ultra rich chocolate fudge brownie"},

    # ---- TEA CAKES ----
    {"name": "Banana Walnut Tea Cake", "category": "Tea Cakes", "price": 220, "weight": "200g", "min_quantity": 1, "description": "Moist banana cake with crunchy walnuts"},
    {"name": "Tutti Frutti Tea Cake", "category": "Tea Cakes", "price": 200, "weight": "200g", "min_quantity": 1, "description": "Colorful frutti bits in soft cake"},
    {"name": "Dry Fruit Tea Cake", "category": "Tea Cakes", "price": 240, "weight": "200g", "min_quantity": 1, "description": "Loaded with premium dry fruits"},
    {"name": "Orange Chiffon Slice Cake", "category": "Tea Cakes", "price": 200, "weight": "200g", "min_quantity": 1, "description": "Light & fluffy orange flavored cake"},
    {"name": "Marble Tea Cake", "category": "Tea Cakes", "price": 210, "weight": "200g", "min_quantity": 1, "description": "Vanilla & chocolate swirl cake"},
    {"name": "Coffee Walnut Tea Cake", "category": "Tea Cakes", "price": 230, "weight": "200g", "min_quantity": 1, "description": "Aromatic coffee cake with walnuts"},
    {"name": "Chocolate Chip Tea Cake", "category": "Tea Cakes", "price": 220, "weight": "200g", "min_quantity": 1, "description": "Soft cake studded with chocolate chips"},
    {"name": "Rose Pistachio Tea Cake", "category": "Tea Cakes", "price": 240, "weight": "200g", "min_quantity": 1, "description": "Fragrant rose with crunchy pistachios"},
    {"name": "Date & Honey Tea Cake", "category": "Tea Cakes", "price": 230, "weight": "200g", "min_quantity": 1, "description": "Natural sweetness from dates & honey"},

    # ---- MUFFINS ----
    {"name": "Chocolate Muffin", "category": "Muffins", "price": 90, "weight": "1 pc", "min_quantity": 5, "description": "Rich chocolate muffin"},
    {"name": "Vanilla Muffin", "category": "Muffins", "price": 90, "weight": "1 pc", "min_quantity": 5, "description": "Classic vanilla muffin"},
    {"name": "Choco Chip Muffin", "category": "Muffins", "price": 90, "weight": "1 pc", "min_quantity": 5, "description": "Loaded with chocolate chips"},
    {"name": "Red Velvet Muffin", "category": "Muffins", "price": 110, "weight": "1 pc", "min_quantity": 5, "description": "Red velvet with cream cheese swirl"},
    {"name": "Blueberry Muffin", "category": "Muffins", "price": 110, "weight": "1 pc", "min_quantity": 5, "description": "Bursting with fresh blueberries"},

    # ---- DONUTS ----
    {"name": "Bombay Loni Donut", "category": "Donuts", "price": 150, "weight": "1 pc", "min_quantity": 4, "description": "Premium butter-rich donut"},
    {"name": "Cinnamon Donut", "category": "Donuts", "price": 80, "weight": "1 pc", "min_quantity": 4, "description": "Warm cinnamon sugar coated"},
    {"name": "Chocolate Donut", "category": "Donuts", "price": 100, "weight": "1 pc", "min_quantity": 4, "description": "Rich chocolate glazed donut"},

    # ---- COOKIES ----
    {"name": "Salted Cookies", "category": "Cookies", "price": 200, "weight": "200g", "min_quantity": 1, "description": "Perfect balance of sweet & salty"},
    {"name": "Coconut Cookies", "category": "Cookies", "price": 220, "weight": "200g", "min_quantity": 1, "description": "Crispy cookies with desiccated coconut"},
    {"name": "Vanilla Butter Cookies", "category": "Cookies", "price": 200, "weight": "200g", "min_quantity": 1, "description": "Melt-in-mouth butter cookies"},
    {"name": "Choco Chip Cookies", "category": "Cookies", "price": 240, "weight": "200g", "min_quantity": 1, "description": "Loaded with chocolate chips"},
    {"name": "Oats Cookies", "category": "Cookies", "price": 250, "weight": "200g", "min_quantity": 1, "description": "Healthy oats cookies"},
    {"name": "Ragi Cookies", "category": "Cookies", "price": 250, "weight": "200g", "min_quantity": 1, "description": "Nutritious ragi cookies"},
    {"name": "Desi Ghee Nankhatai", "category": "Cookies", "price": 280, "weight": "200g", "min_quantity": 1, "description": "Traditional nankhatai with pure ghee"},

    # ---- CAKES ----
    {"name": "Theme Cake (Half Kg)", "category": "Cakes", "price": 1400, "weight": "500g", "min_quantity": 1, "description": "Custom designed celebration cake"},
    {"name": "Theme Cake (1 Kg)", "category": "Cakes", "price": 2500, "weight": "1kg", "min_quantity": 1, "description": "Custom designed celebration cake"},
    {"name": "Pineapple Cake (Half Kg)", "category": "Cakes", "price": 800, "weight": "500g", "min_quantity": 1, "description": "Fresh pineapple cream cake"},
    {"name": "Pineapple Cake (1 Kg)", "category": "Cakes", "price": 1500, "weight": "1kg", "min_quantity": 1, "description": "Fresh pineapple cream cake"},
    {"name": "Butterscotch Cake (Half Kg)", "category": "Cakes", "price": 800, "weight": "500g", "min_quantity": 1, "description": "Crunchy butterscotch delight"},
    {"name": "Butterscotch Cake (1 Kg)", "category": "Cakes", "price": 1500, "weight": "1kg", "min_quantity": 1, "description": "Crunchy butterscotch delight"},
    {"name": "Mix Fruit Cake (Half Kg)", "category": "Cakes", "price": 900, "weight": "500g", "min_quantity": 1, "description": "Assorted seasonal fruits cake"},
    {"name": "Mix Fruit Cake (1 Kg)", "category": "Cakes", "price": 1700, "weight": "1kg", "min_quantity": 1, "description": "Assorted seasonal fruits cake"},
    {"name": "Red Velvet Cake (Half Kg)", "category": "Cakes", "price": 1000, "weight": "500g", "min_quantity": 1, "description": "Classic red velvet with cream cheese"},
    {"name": "Red Velvet Cake (1 Kg)", "category": "Cakes", "price": 1800, "weight": "1kg", "min_quantity": 1, "description": "Classic red velvet with cream cheese"},
    {"name": "Hazelnut Cake (Half Kg)", "category": "Cakes", "price": 1000, "weight": "500g", "min_quantity": 1, "description": "Rich chocolate with roasted hazelnuts"},
    {"name": "Hazelnut Cake (1 Kg)", "category": "Cakes", "price": 1800, "weight": "1kg", "min_quantity": 1, "description": "Rich chocolate with roasted hazelnuts"},
    {"name": "Truffle Cake (Half Kg)", "category": "Cakes", "price": 900, "weight": "500g", "min_quantity": 1, "description": "Decadent chocolate truffle cake"},
    {"name": "Truffle Cake (1 Kg)", "category": "Cakes", "price": 1700, "weight": "1kg", "min_quantity": 1, "description": "Decadent chocolate truffle cake"},
    {"name": "Black Forest Cake (Half Kg)", "category": "Cakes", "price": 800, "weight": "500g", "min_quantity": 1, "description": "Classic chocolate cherry cake"},
    {"name": "Black Forest Cake (1 Kg)", "category": "Cakes", "price": 1500, "weight": "1kg", "min_quantity": 1, "description": "Classic chocolate cherry cake"},

    # ---- CHEESECAKES ----
    {"name": "Biscoff Cheesecake (Half Kg)", "category": "Cheesecakes", "price": 1000, "weight": "500g", "min_quantity": 1, "description": "Creamy cheesecake with biscoff base"},
    {"name": "Biscoff Cheesecake (1 Kg)", "category": "Cheesecakes", "price": 1800, "weight": "1kg", "min_quantity": 1, "description": "Creamy cheesecake with biscoff base"},
    {"name": "New York Cheesecake (Half Kg)", "category": "Cheesecakes", "price": 900, "weight": "500g", "min_quantity": 1, "description": "Classic New York style cheesecake"},
    {"name": "New York Cheesecake (1 Kg)", "category": "Cheesecakes", "price": 1700, "weight": "1kg", "min_quantity": 1, "description": "Classic New York style cheesecake"},
    {"name": "Oreo Cheesecake (Half Kg)", "category": "Cheesecakes", "price": 900, "weight": "500g", "min_quantity": 1, "description": "Cookies & cream cheesecake"},
    {"name": "Oreo Cheesecake (1 Kg)", "category": "Cheesecakes", "price": 1700, "weight": "1kg", "min_quantity": 1, "description": "Cookies & cream cheesecake"},
    {"name": "Blueberry Cheesecake (Half Kg)", "category": "Cheesecakes", "price": 1000, "weight": "500g", "min_quantity": 1, "description": "Fresh blueberry topped cheesecake"},
    {"name": "Blueberry Cheesecake (1 Kg)", "category": "Cheesecakes", "price": 1800, "weight": "1kg", "min_quantity": 1, "description": "Fresh blueberry topped cheesecake"},
    {"name": "Strawberry Cold Cheesecake (Half Kg)", "category": "Cheesecakes", "price": 800, "weight": "500g", "min_quantity": 1, "description": "Refreshing strawberry cheesecake"},
    {"name": "Strawberry Cold Cheesecake (1 Kg)", "category": "Cheesecakes", "price": 1500, "weight": "1kg", "min_quantity": 1, "description": "Refreshing strawberry cheesecake"},
    {"name": "Classic Cold Cheesecake (Half Kg)", "category": "Cheesecakes", "price": 800, "weight": "500g", "min_quantity": 1, "description": "Simple classic cheesecake"},
    {"name": "Classic Cold Cheesecake (1 Kg)", "category": "Cheesecakes", "price": 1500, "weight": "1kg", "min_quantity": 1, "description": "Simple classic cheesecake"},

    # ---- VALENTINE HAMPERS ----
    {"name": "Mini Love Hamper", "category": "Valentine Hampers", "price": 499, "weight": "1 Unit", "min_quantity": 1, "description": "2 Dessert Jars, 2 Muffins, Greeting Note"},
    {"name": "Sweetheart Hamper", "category": "Valentine Hampers", "price": 799, "weight": "1 Unit", "min_quantity": 1, "description": "4 Dessert Jars, 250g Cookies, Gift Packaging"},
    {"name": "Couple Special Hamper", "category": "Valentine Hampers", "price": 1199, "weight": "1 Unit", "min_quantity": 1, "description": "Bento Cake, Jar Cake, Chocolate Box, Rose Bouquet"},
    {"name": "Luxury Valentine Hamper", "category": "Valentine Hampers", "price": 1999, "weight": "1 Unit", "min_quantity": 1, "description": "Half Kg Cheesecake, Chocolate Box, Muffin, Note, Rose Bouquet"}
]

# Image Mapping to serve beautiful high-styling visual assets
IMAGE_CATEGORIES_MAPPING = {
    "Jar Cakes": "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=400&auto=format&fit=crop",
    "Brownies": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=400&auto=format&fit=crop",
    "Tea Cakes": "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop",
    "Muffins": "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?q=80&w=400&auto=format&fit=crop",
    "Donuts": "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=400&auto=format&fit=crop",
    "Cookies": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=400&auto=format&fit=crop",
    "Cakes": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop",
    "Cheesecakes": "https://images.unsplash.com/photo-1524351199679-46cddf530c04?q=80&w=400&auto=format&fit=crop",
    "Valentine Hampers": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=400&auto=format&fit=crop"
}

# Attach complete ids, available statuses, and image hooks
for idx, p in enumerate(PRODUCTS_SEED_LIST):
    p["id"] = str(uuid.uuid5(uuid.NAMESPACE_DNS, p["name"]))
    p["is_available"] = True
    p["image"] = IMAGE_CATEGORIES_MAPPING.get(p["category"], "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=400&auto=format&fit=crop")
    p["created_at"] = datetime.now().isoformat()

async def connect_and_seed_db():
    try:
        # Establish connection with Motor
        db_instance.client = MotorClient(MONGO_URI, serverSelectionTimeoutMS=2000)
        # Verify connection
        await db_instance.client.admin.command('ping')
        db_instance.db = db_instance.client.sugarstory_db
        print("✓ Connected to MongoDB via Motor client successfully!")

        # Seed collection
        products_col = db_instance.db.products
        count = await products_col.count_documents({})
        if count == 0:
            await products_col.insert_many(PRODUCTS_SEED_LIST)
            print(f"✓ Seeded database with {len(PRODUCTS_SEED_LIST)} premium products successfully!")
        else:
            print(f"✓ Database already contains {count} products. Skipping seeding.")
    except Exception as e:
        print(f"⚠ MongoDB connection failed. Staging memory fallback framework: {e}")
        db_instance.db = None
