import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend')))
import database

# Create directory
images_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'frontend', 'public', 'images', 'products'))
os.makedirs(images_dir, exist_ok=True)
print(f"Verified directory: {images_dir}")

all_products = database.PRODUCTS_SEED_LIST

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
seen_slugs = {}

for p in all_products:
    name = p['name']
    cat = p['category']
    base_name, slug = get_base_name_and_slug(name, cat)
    
    mapping.append({
        "product_name": name,
        "category": cat,
        "base_name": base_name,
        "slug": slug
    })
    
    if slug not in seen_slugs:
        seen_slugs[slug] = []
    seen_slugs[slug].append(name)

# Output markdown table
md = "| Product Name | Category | Base Image Name | Target Filename |\n"
md += "| :--- | :--- | :--- | :--- |\n"
for item in mapping:
    md += f"| {item['product_name']} | {item['category']} | {item['base_name']} | {item['slug']} |\n"

output_path = os.path.abspath(os.path.join(os.path.dirname(__file__), 'image_mapping_table.md'))
with open(output_path, 'w') as f:
    f.write(md)

print(f"Markdown table written to: {output_path}")
print(f"Total Products: {len(mapping)}")
print(f"Total Unique Images: {len(seen_slugs)}")
