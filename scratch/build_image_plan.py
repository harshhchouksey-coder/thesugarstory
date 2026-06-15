import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend')))
import database

all_products = database.PRODUCTS_SEED_LIST
print(f"Total products in database: {len(all_products)}")

def get_base_name_and_slug(name, category):
    base_name = name
    if category in ["Cakes", "Cheesecakes"]:
        if " (Half Kg)" in name:
            base_name = name.replace(" (Half Kg)", "")
        elif " (1 Kg)" in name:
            base_name = name.replace(" (1 Kg)", "")
    
    clean = ""
    for char in base_name:
        if char.isalnum() or char.isspace():
            clean += char
        elif char in ["-", "&", "_"]:
            clean += " "
            
    words = clean.lower().split()
    slug = "-".join(words) + ".png"
    return base_name, slug

mapping = []
unique_slugs = set()
category_groups = {}

for p in all_products:
    name = p['name']
    cat = p['category']
    base_name, slug = get_base_name_and_slug(name, cat)
    unique_slugs.add(slug)
    
    if cat not in category_groups:
        category_groups[cat] = []
    
    # avoid duplicates in the printed category lists
    if slug not in [item['slug'] for item in category_groups[cat]]:
        category_groups[cat].append({
            "base_name": base_name,
            "slug": slug,
            "original_name": name,
            "subtype": p.get("subtype", "")
        })

print(f"Total unique images expected: {len(unique_slugs)}")

# Let's count items per category
for cat, items in category_groups.items():
    print(f"Category: {cat} -> {len(items)} unique images")
