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
    "Valentine Hampers": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=400&auto=format&fit=crop",
    "Healthy": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=400&auto=format&fit=crop"
}

# Attach complete ids, available statuses, and image hooks
def get_slug(name: str) -> str:
    n = name.replace(' (Half Kg)', '').replace(' (1 Kg)', '')
    n = n.replace('&', ' ').replace('-', ' ').replace('/', ' ').replace(',', '')
    n = n.lower().strip()
    words = n.split()
    return '-'.join(words) + '.png'

# Path to the generated images directory
IMAGES_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend", "public", "images", "products"))

for idx, p in enumerate(PRODUCTS_SEED_LIST):
    p["id"] = str(uuid.uuid5(uuid.NAMESPACE_DNS, p["name"]))
    p["is_available"] = True
    slug = get_slug(p["name"])
    if os.path.exists(os.path.join(IMAGES_DIR, slug)):
        p["image"] = f"/images/products/{slug}"
    else:
        p["image"] = IMAGE_CATEGORIES_MAPPING.get(p["category"], "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=400&auto=format&fit=crop")
    p["created_at"] = datetime.now().isoformat()
    # Backfill delivery_scope for existing items
    p["delivery_scope"] = "local" if (p["category"] in ["Cakes", "Cheesecakes"] or "theme cake" in p["name"].lower()) else "pan_india"


# Complete list of 74 exact Healthy products
HEALTHY_PRODUCTS_SEED_LIST = [
    {
        "name": "Banana-Pecan Loaf",
        "subtype": "Banana Bread",
        "price": 288,
        "weight": "-",
        "delivery_scope": "local",
        "diet": "Gluten-free, vegan, refined-sugar-free",
        "description": "Savor the Comforting taste of Nostalgia with our gluten-free and plant based Banana Pecan Cake. This moist, te"
    },
    {
        "name": "Cardamom & Almond Biscotti",
        "subtype": "Biscotti",
        "price": 315,
        "weight": "150g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan, refined-sugar-free, millet-based",
        "description": "Inspired by the classic Italian Biscotti, this crunchy delight is crafted with nutrient-dense Almond Flour, li"
    },
    {
        "name": "Gluten Free Millet Bread",
        "subtype": "Bread",
        "price": 157,
        "weight": "220g",
        "delivery_scope": "local",
        "diet": "Gluten-free, vegan, millet-based",
        "description": "If you can't handle gluten, our gluten-free bread is like a tasty lifesaver. It's made from a mix"
    },
    {
        "name": "Jalapeno & Sundried Tomato Millet Focaccia",
        "subtype": "Bread",
        "price": 225,
        "weight": "140g",
        "delivery_scope": "local",
        "diet": "Gluten-free, vegan, refined-sugar-free, millet-based",
        "description": "Enjoy the Classic Flavors of our Gluten-Free, Vegan Focaccia Bread, topped with sun-dried cherry tomatoes and "
    },
    {
        "name": "Cacao and Orange Brownie Cookie",
        "subtype": "Brookie",
        "price": 225,
        "weight": "90g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan, refined-sugar-free",
        "description": "The best of both worlds—this Brookie combines the rich, fudgy texture of a brownie with the crisp edges of a c"
    },
    {
        "name": "Walnut-Cacao Millet Brownie",
        "subtype": "Brownie",
        "price": 288,
        "weight": "150g",
        "delivery_scope": "local",
        "diet": "Gluten-free, vegan, refined-sugar-free, millet-based",
        "description": "Our Cacao & Walnut Millet Brownie is everything you want in a brownie. Intensely fudgy, deeply chocolatey,"
    },
    {
        "name": "Apple-Blueberry Crumble Cake",
        "subtype": "Cake",
        "price": 265,
        "weight": "120g",
        "delivery_scope": "local",
        "diet": "Gluten-free, vegan",
        "description": "Apple blueberry crumble cake is a refreshing summer dessert, combining the sweetness of fresh green apples, ju"
    },
    {
        "name": "Orange-Cacao Millet Cake",
        "subtype": "Cake",
        "price": 378,
        "weight": "150g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan, millet-based",
        "description": "A 70% dark chocolate dense and moist cake with homemade candied orange peels and a dark chocolate ganache runn"
    },
    {
        "name": "Orange-Cacao Travel Loaf",
        "subtype": "Cake",
        "price": 1440,
        "weight": "650g",
        "delivery_scope": "local",
        "diet": "Gluten-free, vegan, refined-sugar-free",
        "description": "Orange & Cacao Millet travel cake is made using 70% vegan dark chocolate, has a dense and moist texture wi"
    },
    {
        "name": "Rajgira Cacao Millet Cake",
        "subtype": "Cake",
        "price": 355,
        "weight": "150g",
        "delivery_scope": "local",
        "diet": "Gluten-free, vegan, millet-based",
        "description": "This is chocolate cake—reinvented for wellness. Our Amaranth & Almond Flour Cake brings together a moist, "
    },
    {
        "name": "Saffron-Almond Orange Cake",
        "subtype": "Cake",
        "price": 378,
        "weight": "150g",
        "delivery_scope": "local",
        "diet": "Gluten-free, vegan, millet-based",
        "description": "Saffron scented vanilla sponge with bits of orange and almond topped with pistachio and rose peta"
    },
    {
        "name": "Saffron-Almond Travel Loaf",
        "subtype": "Cake",
        "price": 1260,
        "weight": "500g",
        "delivery_scope": "local",
        "diet": "Gluten-free, vegan, refined-sugar-free, millet-based",
        "description": "Saffron flavored vanilla sponge with bits of homemade candied orange and roasted almond. It’s topped with pist"
    },
    {
        "name": "Sugar-Free Cacao Travel Loaf",
        "subtype": "Cake",
        "price": 1620,
        "weight": "500g",
        "delivery_scope": "local",
        "diet": "Gluten-free, vegan, refined-sugar-free, keto & diabetic-friendly",
        "description": "An extremely fudgy & moist chocolate flourless travel cake with a chocolate ganache sweetened with xylitol"
    },
    {
        "name": "Sugar-Free Flourless Cacao Cake",
        "subtype": "Cake",
        "price": 355,
        "weight": "500g",
        "delivery_scope": "local",
        "diet": "Gluten-free, vegan, keto & diabetic-friendly",
        "description": "An extremely fudgy & moist chocolate flourless cake with a chocolate ganache sweetened with xylitol and st"
    },
    {
        "name": "Sugar-Free Mango-Strawberry Cake",
        "subtype": "Cake",
        "price": 180,
        "weight": "-",
        "delivery_scope": "local",
        "diet": "Gluten-free, vegan, refined-sugar-free, keto & diabetic-friendly",
        "description": "Our Vegan Keto Mango and Strawberry Cake combines two of your favorite fruits in a light, fluffy dessert. It f"
    },
    {
        "name": "Cheesy Millet Chips",
        "subtype": "Chips",
        "price": 140,
        "weight": "100g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan, millet-based",
        "description": "Our Cheesy Millet Chips bring the bold flavor of vegan cheddar. Made from a blend of amaranth and jowar flours"
    },
    {
        "name": "Pineapple Cream Cake",
        "subtype": "Chips",
        "price": 225,
        "weight": "-",
        "delivery_scope": "local",
        "diet": "Gluten-free, vegan, refined-sugar-free",
        "description": "A slice of tropical sunshine, Pineapple & Cream Cake wraps you in the bright tang of ripe pineapple, lifte"
    },
    {
        "name": "Almond-Berry Cacao Rocks",
        "subtype": "Chocolate Bar",
        "price": 405,
        "weight": "150g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan",
        "description": "These handcrafted chocolate rocks combine the deep, bold flavors of real Cacao with the nutty crunch of Almond"
    },
    {
        "name": "Sugar-Free Berry Cacao Rocks",
        "subtype": "Chocolate Bar",
        "price": 472,
        "weight": "150g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan, keto & diabetic-friendly",
        "description": "These handcrafted chocolate rocks combine the intense richness of cacao with the natural sweetness of cranberr"
    },
    {
        "name": "Almond-Cacao Flourless Cookies",
        "subtype": "Cookies",
        "price": 495,
        "weight": "175g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan",
        "description": "Flaky and buttery flourless almond butter protein cookies with chunky pieces of chocolate and sea salt. A heal"
    },
    {
        "name": "Berry-Cacao Oat Cookies",
        "subtype": "Cookies",
        "price": 355,
        "weight": "250g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan",
        "description": "Golden Berry-Cacao-Oat Cookies made with a mix of hearty oats, bright cranberries and rich dark chocolate chun"
    },
    {
        "name": "Cacao & Shortbread Cookie",
        "subtype": "Cookies",
        "price": 225,
        "weight": "100g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan",
        "description": "Cacao & shortbread cookies are famous for their thick, soft, and gooey centers with slightly crisp edges. "
    },
    {
        "name": "Date & Shortbread Maamoul Cookies",
        "subtype": "Cookies",
        "price": 288,
        "weight": "-",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, refined-sugar-free",
        "description": "Soft, chewy, and warmly spiced, our Date & shortbread Maamoul Cookies are an ode to traditional Middle Eas"
    },
    {
        "name": "Ginger-Spice Almond Cookies",
        "subtype": "Cookies",
        "price": 288,
        "weight": "250g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan",
        "description": "These Ginger Spice Cookies are a nostalgic blend of warmth and sweetness. Made with bold, aromatic Ginger and "
    },
    {
        "name": "Jam-Heart Butter Cookies",
        "subtype": "Cookies",
        "price": 140,
        "weight": "60g",
        "delivery_scope": "local",
        "diet": "Gluten-free, vegan, refined-sugar-free",
        "description": "Relive the Taste of Childhood with our gluten-free Jim Jam Cookies Handcrafted with wholesome ingredients, the"
    },
    {
        "name": "Lemon-Lavender Millet Cookies",
        "subtype": "Cookies",
        "price": 175,
        "weight": "100g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan, millet-based",
        "description": "These Lime Lavender Cookies bring together the bright, citrusy zing of Lemon Zest with the soothing floral not"
    },
    {
        "name": "Signature Cookie Trio",
        "subtype": "Cookies",
        "price": 405,
        "weight": "250g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan",
        "description": "A trio made for every craving, rich, chocolate-studded Almond Flour & cacao Cookies, tangy-sweet Berry-Cac"
    },
    {
        "name": "Cheddar Jowar Bites",
        "subtype": "Crackers",
        "price": 108,
        "weight": "100g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan, millet-based",
        "description": "A crispy, cheesy blast from the past — our Cheddar Millet Bites are your childhood favourite, reimagined with "
    },
    {
        "name": "Cheddar Nut & Seed Crackers",
        "subtype": "Crackers",
        "price": 180,
        "weight": "150g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, millet-based, keto & diabetic-friendly",
        "description": "These handcrafted crackers bring together the rich sharpness of Cheddar Cheese with the wholesome crunch of Pu"
    },
    {
        "name": "Crispy Millet Pita",
        "subtype": "Crackers",
        "price": 135,
        "weight": "100g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan",
        "description": "These artisanal pita crackers bring together the goodness of our in-house Gluten free Flour blend and a medley"
    },
    {
        "name": "Methi Millet Crackers",
        "subtype": "Crackers",
        "price": 135,
        "weight": "100g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan, millet-based",
        "description": "These Methi-Millet Crackers offer a delicious blend of traditional Indian spices and the wholesome goodness of"
    },
    {
        "name": "Cashew & Date Energy Bites",
        "subtype": "Energy Bites",
        "price": 212,
        "weight": "120g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan",
        "description": "Soft, nutty, and naturally sweet — these cashew & dates energy bites are a wholesome way to fuel your day."
    },
    {
        "name": "Gluten Free Millet Atta",
        "subtype": "Flour",
        "price": 175,
        "weight": "500g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan",
        "description": "Our Gluten-Free Millet Aata looks and cooks like regular aata — but delivers way more nutrition. Made with a b"
    },
    {
        "name": "Cacao, Hazelnut & Date Fudge",
        "subtype": "Fudge",
        "price": 382,
        "weight": "150g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan",
        "description": "This decadent fudge is for true chocolate lovers. Made with deep, intense Cacao, crunchy Almonds, and naturall"
    },
    {
        "name": "Cacao, Hazelnut & Date Fudge Balls",
        "subtype": "Fudge",
        "price": 809,
        "weight": "150g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan",
        "description": "For true chocolate lovers. Bittersweet dark chocolate meets crunchy and caramely hazelnut praline this Cacao, "
    },
    {
        "name": "Baklava Granola",
        "subtype": "Gifting",
        "price": 360,
        "weight": "-",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan, refined-sugar-free",
        "description": "Crunchy, warm, and layered with festive flavor, this granola takes inspiration from the richness of baklava. E"
    },
    {
        "name": "Bespoke Celebration Hamper",
        "subtype": "Gifting",
        "price": 1890,
        "weight": "900g",
        "delivery_scope": "pan_india",
        "diet": "",
        "description": "This box brings together the best of both worlds sweet and savoury favourites like Cacao Hazelnut & Date F"
    },
    {
        "name": "Best of Sugar Story Hamper",
        "subtype": "Gifting",
        "price": 2880,
        "weight": "-",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan",
        "description": "This hamper is a perfect mix of savory and sweet delights from TCK. Our Hamper contains - 1) Almond Flour &"
    },
    {
        "name": "Box of Joy Hamper",
        "subtype": "Gifting",
        "price": 2398,
        "weight": "-",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan",
        "description": "Our bundle of joy contains an assortment of our most loved cookies, fudge, crackers and Cacao hazelnut Fudge s"
    },
    {
        "name": "Cacao & Orange Truffle",
        "subtype": "Gifting",
        "price": 675,
        "weight": "-",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan, refined-sugar-free",
        "description": "Crafted from a smooth blend of almonds, cocoa, and dates, each bite carries the richness of dark chocolate wit"
    },
    {
        "name": "Healthy Trial Pack",
        "subtype": "Gifting",
        "price": 355,
        "weight": "178g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan",
        "description": "Sweet or savoury — this trial pack has you covered. A curated selection of our bestsellers, it's perfect for f"
    },
    {
        "name": "Podi & Millet Pita Combo",
        "subtype": "Gifting",
        "price": 553,
        "weight": "300g",
        "delivery_scope": "pan_india",
        "diet": "",
        "description": "A bold, savory Podi masala spread paired with juicy cherry tomatoes, crafted to balance festive sweetness. Ins"
    },
    {
        "name": "Berry & Banana Millet Granola",
        "subtype": "Granola",
        "price": 405,
        "weight": "175g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan, millet-based",
        "description": "Unlike most granolas that are made with oats. Strawberry, Banana and Cacao crunch granola is made using amaran"
    },
    {
        "name": "Oat Fig & Almond Granola",
        "subtype": "Granola",
        "price": 315,
        "weight": "200g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan",
        "description": "Start your day with a deliciously nourishing bowl of granola, packed with fiber-rich Oats, sweet chewy Figs, a"
    },
    {
        "name": "Sugar-Free Almond & Seed Granola",
        "subtype": "Granola",
        "price": 468,
        "weight": "200g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan, keto & diabetic-friendly",
        "description": "This keto-friendly granola is designed for those who want a low-carb, high-energy breakfast without compromisi"
    },
    {
        "name": "Cacao Almond Butter",
        "subtype": "Nut Butter",
        "price": 495,
        "weight": "200g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan",
        "description": "Silky-smooth, rich, and made with just four real ingredients. Our Cacao Almond Butter is your new family favor"
    },
    {
        "name": "Cacao Peanut Butter",
        "subtype": "Nut Butter",
        "price": 252,
        "weight": "200g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan",
        "description": "A creamy, nutrient-packed spread for peanut butter lovers who crave a chocolatey twist. Made with roasted Pean"
    },
    {
        "name": "Crunchy & Cacao Peanut Butter",
        "subtype": "Nut Butter",
        "price": 252,
        "weight": "200g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan",
        "description": "This Crunchy Chocolate Peanut Butter is a wholesome twist on a classic favorite. Made using 82% peanuts, rich "
    },
    {
        "name": "Crunchy Peanut Butter",
        "subtype": "Nut Butter",
        "price": 252,
        "weight": "200g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan, refined-sugar-free",
        "description": "If you love peanut butter but crave a bit of crunch, this spread is for you. Made with roasted Peanuts, it del"
    },
    {
        "name": "Hazelnut Cacao Spread",
        "subtype": "Nut Butter",
        "price": 558,
        "weight": "200g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan",
        "description": "This indulgent yet wholesome spread is crafted from slow-roasted Hazelnuts and rich, bold Cacao for a decadent"
    },
    {
        "name": "Just Almond Butter",
        "subtype": "Nut Butter",
        "price": 445,
        "weight": "200g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan, keto & diabetic-friendly",
        "description": "This almond butter is as simple as it gets just premium, slow-roasted Almonds blended into a creamy, rich spre"
    },
    {
        "name": "Just Peanut Butter",
        "subtype": "Nut Butter",
        "price": 230,
        "weight": "200g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan",
        "description": "This peanut butter is as simple and pure as it gets—just premium, slow-roasted Peanuts blended into a smooth, "
    },
    {
        "name": "Sugar-Free Hazelnut Cacao Spread",
        "subtype": "Nut Butter",
        "price": 675,
        "weight": "200g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan, keto & diabetic-friendly",
        "description": "Indulgent yet keto-friendly, this chocolate hazelnut spread is crafted with the finest roasted hazelnuts and d"
    },
    {
        "name": "Almond Crunch Katli",
        "subtype": "Other",
        "price": 765,
        "weight": "250g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan",
        "description": "Almond katli with the goodness of dates and three different textures of almonds. Available in TCK’s gift box. "
    },
    {
        "name": "Berry Cream Celebration Cake",
        "subtype": "Other",
        "price": 355,
        "weight": "200g",
        "delivery_scope": "local",
        "diet": "Gluten-free, vegan",
        "description": "Our berry and cream cake is a combination of sweet and tangy treat for a refreshing summer experience. It is a"
    },
    {
        "name": "Blueberry & Cheesecake Millet Jar",
        "subtype": "Other",
        "price": 212,
        "weight": "130g",
        "delivery_scope": "local",
        "diet": "Gluten-free, vegan, refined-sugar-free, millet-based",
        "description": "Layers of juicy blueberry compote, silky vegan cheesecake, and a nutty almond butter biscuit come together in "
    },
    {
        "name": "Brownie & Cheesecake Millet Jar",
        "subtype": "Other",
        "price": 212,
        "weight": "100g",
        "delivery_scope": "local",
        "diet": "Gluten-free, vegan, refined-sugar-free, millet-based",
        "description": "Rich, fudgy walnut brownie paired with our inhouse vegan cheesecake base in a jar. It is creamy and chocolaty "
    },
    {
        "name": "Cherry Cacao Millet Cake",
        "subtype": "Other",
        "price": 265,
        "weight": "-",
        "delivery_scope": "local",
        "diet": "Gluten-free, vegan, refined-sugar-free, millet-based",
        "description": "Rich chocolate and silky vegan custard meet bursts of fresh cherries in every bite. Made with millets, almond "
    },
    {
        "name": "Cherry Cobbler Tartlet",
        "subtype": "Other",
        "price": 265,
        "weight": "-",
        "delivery_scope": "local",
        "diet": "Gluten-free, refined-sugar-free",
        "description": "A warm cherry compote layered with smooth vanilla custard and finished with a golden oat and walnut crumble. C"
    },
    {
        "name": "Date & Orange Dog Cake",
        "subtype": "Other",
        "price": 675,
        "weight": "350g",
        "delivery_scope": "local",
        "diet": "Gluten-free, vegan, refined-sugar-free, millet-based",
        "description": "A Pup Cake You Can Share Gluten-free, vegan pound cake made with using millets, rice and gluten free oats. It’"
    },
    {
        "name": "Festive Delight Hamper",
        "subtype": "Other",
        "price": 1935,
        "weight": "-",
        "delivery_scope": "pan_india",
        "diet": "",
        "description": "For celebrations that feel thoughtful and refined. Our Medium Festive Hamper is a well-balanced curation of fi"
    },
    {
        "name": "Gluten-Free Multi-Seed Millet Bread",
        "subtype": "Other",
        "price": 175,
        "weight": "-",
        "delivery_scope": "local",
        "diet": "Gluten-free, vegan, refined-sugar-free, millet-based",
        "description": "Multi Seed Bread replaces your traditional gluten full bread and you would not even know the difference! It is"
    },
    {
        "name": "Grand Wedding Box",
        "subtype": "Other",
        "price": 2430,
        "weight": "-",
        "delivery_scope": "pan_india",
        "diet": "",
        "description": "This is our signature sweet and savory selection, handcrafted to blend comfort and contemporary taste. Whats I"
    },
    {
        "name": "Kaju Katli Box",
        "subtype": "Other",
        "price": 765,
        "weight": "250g",
        "delivery_scope": "pan_india",
        "diet": "Gluten-free, vegan",
        "description": "Healthy & Tasty Take On Classic Kaju Katli - We have reimagined our Kaju Katli using 100% organic cashews "
    },
    {
        "name": "Mango & Cream Cheesecake Tub",
        "subtype": "Other",
        "price": 315,
        "weight": "-",
        "delivery_scope": "local",
        "diet": "Gluten-free, refined-sugar-free",
        "description": "We pulled this together with layers of buttery crumble, velvety mango cheese cream, and mango jelly that adds "
    },
    {
        "name": "Mango-Strawberry Cream Cake",
        "subtype": "Other",
        "price": 315,
        "weight": "-",
        "delivery_scope": "local",
        "diet": "Gluten-free, refined-sugar-free",
        "description": "Our Mango & Strawberry Cream Cake layers a soft sponge with luscious mango cream and a vibrant strawberry "
    },
    {
        "name": "Mango-Vanilla Cake",
        "subtype": "Other",
        "price": 315,
        "weight": "-",
        "delivery_scope": "local",
        "diet": "Gluten-free, refined-sugar-free",
        "description": "A moist, fruit-studded mango sponge layered with mango pulp and finished with a light vanilla coconut cream. E"
    },
    {
        "name": "Pistachio-Cacao Tart",
        "subtype": "Other",
        "price": 225,
        "weight": "-",
        "delivery_scope": "local",
        "diet": "Gluten-free, refined-sugar-free",
        "description": "Our Chocolate Pistachio Tart features a rich almond and rice flour base layered with homemade pistachio pralin"
    },
    {
        "name": "Rose-Cardamom Cake",
        "subtype": "Other",
        "price": 201,
        "weight": "120g",
        "delivery_scope": "local",
        "diet": "Gluten-free, vegan",
        "description": "A fragrant cardamom-infused sponge, layered with velvety coconut cream, adorned with delicate rose candy, and "
    },
    {
        "name": "Salted Caramel Cacao Brownie",
        "subtype": "Other",
        "price": 315,
        "weight": "-",
        "delivery_scope": "local",
        "diet": "Gluten-free, refined-sugar-free",
        "description": "A rich, fudgy chocolate brownie layered with smooth salted caramel and finished with a hint of sea salt. Deep "
    },
    {
        "name": "Spiced Podi Spread",
        "subtype": "Other",
        "price": 334,
        "weight": "200g",
        "delivery_scope": "pan_india",
        "diet": "",
        "description": "This rich, velvety blend of roasted peanuts and sesame is elevated with the sharp tang of sundried tomatoes an"
    },
    {
        "name": "Sugar- Free Cacao Mousse Jar",
        "subtype": "Other",
        "price": 234,
        "weight": "140g",
        "delivery_scope": "local",
        "diet": "Gluten-free, vegan, refined-sugar-free, keto & diabetic-friendly",
        "description": "Enjoy our Keto Mousse Jar Cake as a delightful treat for those following a low-carb lifestyle. This silky mous"
    },
    {
        "name": "Sugar-Free Rabdi Kulfi Cake Jar",
        "subtype": "Other",
        "price": 715,
        "weight": "300g",
        "delivery_scope": "local",
        "diet": "Gluten-free, vegan, refined-sugar-free, keto & diabetic-friendly",
        "description": "Delicate saffron and cardamom notes blend into a creamy almond-cashew rabdi, layered over a soft, vegan sponge"
    },
    {
        "name": "The Sugar Story Wedding Box",
        "subtype": "Other",
        "price": 2047,
        "weight": "-",
        "delivery_scope": "pan_india",
        "diet": "",
        "description": "This thoughtful box is made to impress. It brings together our signature sweet and savoury favourites, handcra"
    }
]

# Generate stable IDs and attributes for the 74 Healthy products list
HEALTHY_PRODUCTS_FINAL = []
for p in HEALTHY_PRODUCTS_SEED_LIST:
    slug = get_slug(p["name"])
    if os.path.exists(os.path.join(IMAGES_DIR, slug)):
        img_path = f"/images/products/{slug}"
    else:
        img_path = "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=400&auto=format&fit=crop"
        
    p_final = {
        "id": str(uuid.uuid5(uuid.NAMESPACE_DNS, p["name"])),
        "name": p["name"],
        "category": "Healthy",
        "price": p["price"],
        "weight": p["weight"],
        "min_quantity": 1,
        "description": p["description"],
        "image": img_path,
        "is_available": True,
        "delivery_scope": p["delivery_scope"],
        "subtype": p["subtype"],
        "diet": p["diet"],
        "created_at": datetime.now().isoformat()
    }
    HEALTHY_PRODUCTS_FINAL.append(p_final)


# Append healthy items to the master seed list so they are available in memory fallback
PRODUCTS_SEED_LIST.extend(HEALTHY_PRODUCTS_FINAL)

async def connect_and_seed_db():
    try:
        # Establish connection with Motor
        db_instance.client = MotorClient(MONGO_URI, serverSelectionTimeoutMS=2000)
        # Verify connection
        await db_instance.client.admin.command('ping')
        db_instance.db = db_instance.client.sugarstory_db
        print("✓ Connected to MongoDB via Motor client successfully!")

        products_col = db_instance.db.products
        
        # 1. Backfill existing database products to ensure they have the delivery_scope attribute
        # Set local for Cakes, Cheesecakes, and Theme Cake
        await products_col.update_many(
            {
                "delivery_scope": {"$exists": False},
                "$or": [
                    {"category": {"$in": ["Cakes", "Cheesecakes"]}},
                    {"name": {"$regex": "theme cake", "$options": "i"}}
                ]
            },
            {"$set": {"delivery_scope": "local"}}
        )
        
        # Set pan_india for any other remaining products that don't have delivery_scope
        await products_col.update_many(
            {"delivery_scope": {"$exists": False}},
            {"$set": {"delivery_scope": "pan_india"}}
        )
        print("✓ Backfilled existing products in MongoDB successfully!")

        # 2. Idempotently seed the 74 Healthy products
        seeded_count = 0
        for p in HEALTHY_PRODUCTS_FINAL:
            exists = await products_col.find_one({"name": p["name"]})
            if not exists:
                await products_col.insert_one(p)
                seeded_count += 1
                
        print(f"✓ Idempotently seeded {seeded_count} new Healthy products to MongoDB (out of 74 total).")

        # 3. Update existing MongoDB documents with new local image paths if the file exists
        db_products = await products_col.find({}).to_list(length=None)
        db_updated_count = 0
        for doc in db_products:
            slug = get_slug(doc["name"])
            if os.path.exists(os.path.join(IMAGES_DIR, slug)):
                new_image_path = f"/images/products/{slug}"
                if doc.get("image") != new_image_path:
                    await products_col.update_one(
                        {"_id": doc["_id"]},
                        {"$set": {"image": new_image_path}}
                    )
                    db_updated_count += 1
        print(f"✓ One-time migration: updated {db_updated_count} product image paths in MongoDB.")


    except Exception as e:
        print(f"⚠ MongoDB connection failed. Staging memory fallback framework: {e}")
        db_instance.db = None
