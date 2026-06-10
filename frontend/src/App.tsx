import React, { useState, useEffect } from "react";
import { 
  ShoppingBag, 
  MapPin, 
  Clock, 
  Check, 
  ShieldCheck, 
  Star, 
  Award, 
  Cake, 
  ChevronRight, 
  Phone, 
  Mail, 
  Send,
  HelpCircle,
  AlertCircle,
  MessageCircle,
  Lock,
  Plus,
  Trash2,
  LogOut,
  RefreshCw,
  Search,
  X
} from "lucide-react";

// ScrollReveal component for premium, subtle fade-in-up animations on scroll
function ScrollReveal({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.unobserve(ref);
      }
    }, { threshold: 0.05 });
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  return (
    <div 
      ref={setRef as any} 
      className={`${className} transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {children}
    </div>
  );
}

// Fallback Master list of all 72 products seeded on the frontend for instant offline load
const MASTER_PRODUCTS = [
  // ---- JAR CAKES ----
  {"id": "jar-1", "name": "Pineapple Jar", "category": "Jar Cakes", "price": 140, "weight": "1 Jar", "min_quantity": 1, "description": "Refreshing pineapple cream layers", "image": "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=400&auto=format&fit=crop"},
  {"id": "jar-2", "name": "Butterscotch Jar", "category": "Jar Cakes", "price": 140, "weight": "1 Jar", "min_quantity": 1, "description": "Crunchy butterscotch swirls", "image": "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=400&auto=format&fit=crop"},
  {"id": "jar-3", "name": "Vanilla Caramel Jar", "category": "Jar Cakes", "price": 140, "weight": "1 Jar", "min_quantity": 1, "description": "Classic vanilla with caramel", "image": "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=400&auto=format&fit=crop"},
  {"id": "jar-4", "name": "Black Forest Jar", "category": "Jar Cakes", "price": 150, "weight": "1 Jar", "min_quantity": 1, "description": "Chocolate cherry delight", "image": "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=400&auto=format&fit=crop"},
  {"id": "jar-5", "name": "White Forest Jar", "category": "Jar Cakes", "price": 150, "weight": "1 Jar", "min_quantity": 1, "description": "White chocolate cherry compote", "image": "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=400&auto=format&fit=crop"},
  {"id": "jar-6", "name": "Choco Choco Chip Jar", "category": "Jar Cakes", "price": 150, "weight": "1 Jar", "min_quantity": 1, "description": "Double chocolate indulgence", "image": "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=400&auto=format&fit=crop"},
  {"id": "jar-7", "name": "Mix Fruit Jar", "category": "Jar Cakes", "price": 170, "weight": "1 Jar", "min_quantity": 1, "description": "Seasonal fruits with cream", "image": "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=400&auto=format&fit=crop"},
  {"id": "jar-8", "name": "Blueberry Bliss Jar", "category": "Jar Cakes", "price": 170, "weight": "1 Jar", "min_quantity": 1, "description": "Fresh blueberry compote layers", "image": "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=400&auto=format&fit=crop"},
  {"id": "jar-9", "name": "Oreo Choco Jar", "category": "Jar Cakes", "price": 170, "weight": "1 Jar", "min_quantity": 1, "description": "Oreo chocolate cream", "image": "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=400&auto=format&fit=crop"},
  {"id": "jar-10", "name": "Tiramisu Jar", "category": "Jar Cakes", "price": 170, "weight": "1 Jar", "min_quantity": 1, "description": "Coffee-flavored delight", "image": "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=400&auto=format&fit=crop"},
  {"id": "jar-11", "name": "Rasmalai Fusion Jar", "category": "Jar Cakes", "price": 190, "weight": "1 Jar", "min_quantity": 1, "description": "Traditional fusion dessert", "image": "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=400&auto=format&fit=crop"},
  {"id": "jar-12", "name": "Choco Hazelnut Jar", "category": "Jar Cakes", "price": 190, "weight": "1 Jar", "min_quantity": 1, "description": "Rich hazelnut chocolate cream", "image": "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=400&auto=format&fit=crop"},
  {"id": "jar-13", "name": "Red Velvet Jar", "category": "Jar Cakes", "price": 190, "weight": "1 Jar", "min_quantity": 1, "description": "Velvet layers with cream cheese", "image": "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=400&auto=format&fit=crop"},
  {"id": "jar-14", "name": "Lotus Biscoff Jar", "category": "Jar Cakes", "price": 190, "weight": "1 Jar", "min_quantity": 1, "description": "Biscoff biscuit cream", "image": "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=400&auto=format&fit=crop"},

  // ---- BROWNIES ----
  {"id": "br-1", "name": "Chocolate Walnut Brownie", "category": "Brownies", "price": 250, "weight": "200g", "min_quantity": 1, "description": "Dense fudgy brownie loaded with walnuts", "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=400&auto=format&fit=crop"},
  {"id": "br-2", "name": "Chocolate Fudge Brownie", "category": "Brownies", "price": 250, "weight": "200g", "min_quantity": 1, "description": "Ultra rich chocolate fudge brownie", "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=400&auto=format&fit=crop"},

  // ---- TEA CAKES ----
  {"id": "tc-1", "name": "Banana Walnut Tea Cake", "category": "Tea Cakes", "price": 220, "weight": "200g", "min_quantity": 1, "description": "Banana cake with crunchy walnuts", "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop"},
  {"id": "tc-2", "name": "Tutti Frutti Tea Cake", "category": "Tea Cakes", "price": 200, "weight": "200g", "min_quantity": 1, "description": "Frutti bits in soft butter cake", "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop"},
  {"id": "tc-3", "name": "Dry Fruit Tea Cake", "category": "Tea Cakes", "price": 240, "weight": "200g", "min_quantity": 1, "description": "Loaded with premium dry fruits", "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop"},
  {"id": "tc-4", "name": "Orange Chiffon Slice Cake", "category": "Tea Cakes", "price": 200, "weight": "200g", "min_quantity": 1, "description": "Fluffy orange flavored tea cake", "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop"},
  {"id": "tc-5", "name": "Marble Tea Cake", "category": "Tea Cakes", "price": 210, "weight": "200g", "min_quantity": 1, "description": "Vanilla & chocolate swirl cake", "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop"},
  {"id": "tc-6", "name": "Coffee Walnut Tea Cake", "category": "Tea Cakes", "price": 230, "weight": "200g", "min_quantity": 1, "description": "Aromatic coffee cake with walnuts", "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop"},
  {"id": "tc-7", "name": "Chocolate Chip Tea Cake", "category": "Tea Cakes", "price": 220, "weight": "200g", "min_quantity": 1, "description": "Studded with premium chocolate chips", "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop"},
  {"id": "tc-8", "name": "Rose Pistachio Tea Cake", "category": "Tea Cakes", "price": 240, "weight": "200g", "min_quantity": 1, "description": "Fragrant rose with pistachios", "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop"},
  {"id": "tc-9", "name": "Date & Honey Tea Cake", "category": "Tea Cakes", "price": 230, "weight": "200g", "min_quantity": 1, "description": "Natural date honey sweetness", "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop"},

  // ---- MUFFINS ----
  {"id": "muf-1", "name": "Chocolate Muffin", "category": "Muffins", "price": 90, "weight": "1 pc", "min_quantity": 5, "description": "Rich double chocolate muffin", "image": "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?q=80&w=400&auto=format&fit=crop"},
  {"id": "muf-2", "name": "Vanilla Muffin", "category": "Muffins", "price": 90, "weight": "1 pc", "min_quantity": 5, "description": "Classic vanilla bean muffin", "image": "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?q=80&w=400&auto=format&fit=crop"},
  {"id": "muf-3", "name": "Choco Chip Muffin", "category": "Muffins", "price": 90, "weight": "1 pc", "min_quantity": 5, "description": "Loaded with chocolate chips", "image": "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?q=80&w=400&auto=format&fit=crop"},
  {"id": "muf-4", "name": "Red Velvet Muffin", "category": "Muffins", "price": 110, "weight": "1 pc", "min_quantity": 5, "description": "Red velvet with cream cheese swirl", "image": "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?q=80&w=400&auto=format&fit=crop"},
  {"id": "muf-5", "name": "Blueberry Muffin", "category": "Muffins", "price": 110, "weight": "1 pc", "min_quantity": 5, "description": "Bursting with fresh blueberries", "image": "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?q=80&w=400&auto=format&fit=crop"},

  // ---- DONUTS ----
  {"id": "don-1", "name": "Bombay Loni Donut", "category": "Donuts", "price": 150, "weight": "1 pc", "min_quantity": 4, "description": "Butter-rich local specialty donut", "image": "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=400&auto=format&fit=crop"},
  {"id": "don-2", "name": "Cinnamon Donut", "category": "Donuts", "price": 80, "weight": "1 pc", "min_quantity": 4, "description": "Warm cinnamon sugar coated", "image": "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=400&auto=format&fit=crop"},
  {"id": "don-3", "name": "Chocolate Donut", "category": "Donuts", "price": 100, "weight": "1 pc", "min_quantity": 4, "description": "Rich chocolate glazed donut", "image": "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=400&auto=format&fit=crop"},

  // ---- COOKIES ----
  {"id": "ck-1", "name": "Salted Cookies", "category": "Cookies", "price": 200, "weight": "200g", "min_quantity": 1, "description": "Perfect balance of sweet & salty", "image": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=400&auto=format&fit=crop"},
  {"id": "ck-2", "name": "Coconut Cookies", "category": "Cookies", "price": 220, "weight": "200g", "min_quantity": 1, "description": "Crispy desiccated coconut cookies", "image": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=400&auto=format&fit=crop"},
  {"id": "ck-3", "name": "Vanilla Butter Cookies", "category": "Cookies", "price": 200, "weight": "200g", "min_quantity": 1, "description": "Melt-in-mouth butter cookies", "image": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=400&auto=format&fit=crop"},
  {"id": "ck-4", "name": "Choco Chip Cookies", "category": "Cookies", "price": 240, "weight": "200g", "min_quantity": 1, "description": "Caramelized dough with chocolate chips", "image": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=400&auto=format&fit=crop"},
  {"id": "ck-5", "name": "Oats Cookies", "category": "Cookies", "price": 250, "weight": "200g", "min_quantity": 1, "description": "Healthy high-fiber oats cookies", "image": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=400&auto=format&fit=crop"},
  {"id": "ck-6", "name": "Ragi Cookies", "category": "Cookies", "price": 250, "weight": "200g", "min_quantity": 1, "description": "Nutritious ragi farm grain cookies", "image": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=400&auto=format&fit=crop"},
  {"id": "ck-7", "name": "Desi Ghee Nankhatai", "category": "Cookies", "price": 280, "weight": "200g", "min_quantity": 1, "description": "Traditional pure ghee nankhatai", "image": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=400&auto=format&fit=crop"},

  // ---- CAKES ----
  {"id": "cake-1", "name": "Theme Cake (Half Kg)", "category": "Cakes", "price": 1400, "weight": "500g", "min_quantity": 1, "description": "Custom designed celebration cake", "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop"},
  {"id": "cake-2", "name": "Theme Cake (1 Kg)", "category": "Cakes", "price": 2500, "weight": "1kg", "min_quantity": 1, "description": "Custom designed celebration cake", "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop"},
  {"id": "cake-3", "name": "Pineapple Cake (Half Kg)", "category": "Cakes", "price": 800, "weight": "500g", "min_quantity": 1, "description": "Fresh pineapple cream cake", "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop"},
  {"id": "cake-4", "name": "Pineapple Cake (1 Kg)", "category": "Cakes", "price": 1500, "weight": "1kg", "min_quantity": 1, "description": "Fresh pineapple cream cake", "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop"},
  {"id": "cake-5", "name": "Butterscotch Cake (Half Kg)", "category": "Cakes", "price": 800, "weight": "500g", "min_quantity": 1, "description": "Crunchy butterscotch cream delight", "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop"},
  {"id": "cake-6", "name": "Butterscotch Cake (1 Kg)", "category": "Cakes", "price": 1500, "weight": "1kg", "min_quantity": 1, "description": "Crunchy butterscotch cream delight", "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop"},
  {"id": "cake-7", "name": "Mix Fruit Cake (Half Kg)", "category": "Cakes", "price": 900, "weight": "500g", "min_quantity": 1, "description": "Assorted fresh seasonal fruits cake", "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop"},
  {"id": "cake-8", "name": "Mix Fruit Cake (1 Kg)", "category": "Cakes", "price": 1700, "weight": "1kg", "min_quantity": 1, "description": "Assorted fresh seasonal fruits cake", "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop"},
  {"id": "cake-9", "name": "Red Velvet Cake (Half Kg)", "category": "Cakes", "price": 1000, "weight": "500g", "min_quantity": 1, "description": "Velvet crumb with cream cheese layers", "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop"},
  {"id": "cake-10", "name": "Red Velvet Cake (1 Kg)", "category": "Cakes", "price": 1800, "weight": "1kg", "min_quantity": 1, "description": "Velvet crumb with cream cheese layers", "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop"},
  {"id": "cake-11", "name": "Hazelnut Cake (Half Kg)", "category": "Cakes", "price": 1000, "weight": "500g", "min_quantity": 1, "description": "Chocolate sponge with roasted hazelnut", "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop"},
  {"id": "cake-12", "name": "Hazelnut Cake (1 Kg)", "category": "Cakes", "price": 1800, "weight": "1kg", "min_quantity": 1, "description": "Chocolate sponge with roasted hazelnut", "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop"},
  {"id": "cake-13", "name": "Truffle Cake (Half Kg)", "category": "Cakes", "price": 900, "weight": "500g", "min_quantity": 1, "description": "Decadent chocolate ganache truffle cake", "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop"},
  {"id": "cake-14", "name": "Truffle Cake (1 Kg)", "category": "Cakes", "price": 1700, "weight": "1kg", "min_quantity": 1, "description": "Decadent chocolate ganache truffle cake", "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop"},
  {"id": "cake-15", "name": "Black Forest Cake (Half Kg)", "category": "Cakes", "price": 800, "weight": "500g", "min_quantity": 1, "description": "Classic chocolate sponge with cherries", "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop"},
  {"id": "cake-16", "name": "Black Forest Cake (1 Kg)", "category": "Cakes", "price": 1500, "weight": "1kg", "min_quantity": 1, "description": "Classic chocolate sponge with cherries", "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop"},

  // ---- CHEESECAKES ----
  {"id": "ch-1", "name": "Biscoff Cheesecake (Half Kg)", "category": "Cheesecakes", "price": 1000, "weight": "500g", "min_quantity": 1, "description": "Baked cheesecake with Lotus biscoff glaze", "image": "https://images.unsplash.com/photo-1524351199679-46cddf530c04?q=80&w=400&auto=format&fit=crop"},
  {"id": "ch-2", "name": "Biscoff Cheesecake (1 Kg)", "category": "Cheesecakes", "price": 1800, "weight": "1kg", "min_quantity": 1, "description": "Baked cheesecake with Lotus biscoff glaze", "image": "https://images.unsplash.com/photo-1524351199679-46cddf530c04?q=80&w=400&auto=format&fit=crop"},
  {"id": "ch-3", "name": "New York Cheesecake (Half Kg)", "category": "Cheesecakes", "price": 900, "weight": "500g", "min_quantity": 1, "description": "Classic dense New York style baked cheesecake", "image": "https://images.unsplash.com/photo-1524351199679-46cddf530c04?q=80&w=400&auto=format&fit=crop"},
  {"id": "ch-4", "name": "New York Cheesecake (1 Kg)", "category": "Cheesecakes", "price": 1700, "weight": "1kg", "min_quantity": 1, "description": "Classic dense New York style baked cheesecake", "image": "https://images.unsplash.com/photo-1524351199679-46cddf530c04?q=80&w=400&auto=format&fit=crop"},
  {"id": "ch-5", "name": "Oreo Cheesecake (Half Kg)", "category": "Cheesecakes", "price": 900, "weight": "500g", "min_quantity": 1, "description": "Cookies & cream folded cheesecake", "image": "https://images.unsplash.com/photo-1524351199679-46cddf530c04?q=80&w=400&auto=format&fit=crop"},
  {"id": "ch-6", "name": "Oreo Cheesecake (1 Kg)", "category": "Cheesecakes", "price": 1700, "weight": "1kg", "min_quantity": 1, "description": "Cookies & cream folded cheesecake", "image": "https://images.unsplash.com/photo-1524351199679-46cddf530c04?q=80&w=400&auto=format&fit=crop"},
  {"id": "ch-7", "name": "Blueberry Cheesecake (Half Kg)", "category": "Cheesecakes", "price": 1000, "weight": "500g", "min_quantity": 1, "description": "Topped with fresh blueberry glaze", "image": "https://images.unsplash.com/photo-1524351199679-46cddf530c04?q=80&w=400&auto=format&fit=crop"},
  {"id": "ch-8", "name": "Blueberry Cheesecake (1 Kg)", "category": "Cheesecakes", "price": 1800, "weight": "1kg", "min_quantity": 1, "description": "Topped with fresh blueberry glaze", "image": "https://images.unsplash.com/photo-1524351199679-46cddf530c04?q=80&w=400&auto=format&fit=crop"},
  {"id": "ch-9", "name": "Strawberry Cold Cheesecake (Half Kg)", "category": "Cheesecakes", "price": 800, "weight": "500g", "min_quantity": 1, "description": "Refreshing strawberry cold cheesecake", "image": "https://images.unsplash.com/photo-1524351199679-46cddf530c04?q=80&w=400&auto=format&fit=crop"},
  {"id": "ch-10", "name": "Strawberry Cold Cheesecake (1 Kg)", "category": "Cheesecakes", "price": 1500, "weight": "1kg", "min_quantity": 1, "description": "Refreshing strawberry cold cheesecake", "image": "https://images.unsplash.com/photo-1524351199679-46cddf530c04?q=80&w=400&auto=format&fit=crop"},
  {"id": "ch-11", "name": "Classic Cold Cheesecake (Half Kg)", "category": "Cheesecakes", "price": 800, "weight": "500g", "min_quantity": 1, "description": "Simple classic cold set cheesecake", "image": "https://images.unsplash.com/photo-1524351199679-46cddf530c04?q=80&w=400&auto=format&fit=crop"},
  {"id": "ch-12", "name": "Classic Cold Cheesecake (1 Kg)", "category": "Cheesecakes", "price": 1500, "weight": "1kg", "min_quantity": 1, "description": "Simple classic cold set cheesecake", "image": "https://images.unsplash.com/photo-1524351199679-46cddf530c04?q=80&w=400&auto=format&fit=crop"},

  // ---- VALENTINE HAMPERS ----
  {"id": "val-1", "name": "Mini Love Hamper", "category": "Valentine Hampers", "price": 499, "weight": "1 Unit", "min_quantity": 1, "description": "2 Dessert Jars, 2 Muffins, Greeting Note", "image": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=400&auto=format&fit=crop"},
  {"id": "val-2", "name": "Sweetheart Hamper", "category": "Valentine Hampers", "price": 799, "weight": "1 Unit", "min_quantity": 1, "description": "4 Dessert Jars, 250g Cookies, Gift Packaging", "image": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=400&auto=format&fit=crop"},
  {"id": "val-3", "name": "Couple Special Hamper", "category": "Valentine Hampers", "price": 1199, "weight": "1 Unit", "min_quantity": 1, "description": "Bento Cake, Jar Cake, Chocolate Box, Rose Bouquet", "image": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=400&auto=format&fit=crop"},
  {"id": "val-4", "name": "Luxury Valentine Hamper", "category": "Valentine Hampers", "price": 1999, "weight": "1 Unit", "min_quantity": 1, "description": "Half Kg Cheesecake, Chocolate Box, Muffin, Note, Rose Bouquet", "image": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=400&auto=format&fit=crop"}
];

const CATEGORIES = [
  "Jar Cakes", "Brownies", "Tea Cakes", "Muffins", "Donuts", "Cookies", "Cakes", "Cheesecakes", "Valentine Hampers"
];

// Seeded Bhopal Pincodes (462001 - 462044)
const BHOPAL_PINCODES = [
  "462001", "462002", "462003", "462004", "462008", 
  "462011", "462016", "462022", "462023", "462024", 
  "462026", "462030", "462031", "462032", "462036", 
  "462039", "462041", "462042", "462043", "462044"
];

// Default Delivery Slots
const DELIVERY_SLOTS = [
  "10:00 AM – 1:00 PM",
  "1:00 PM – 4:00 PM",
  "4:00 PM – 7:00 PM",
  "7:00 PM – 9:00 PM"
];

export default function App() {
  // Navigation Routing States
  const [currentPage, setCurrentPage] = useState<"home" | "product" | "checkout" | "confirm" | "story" | "admin">("home");
  const [selectedProduct, setSelectedProduct] = useState<any>(MASTER_PRODUCTS[0]);
  const [cart, setCart] = useState<any[]>([]);

  // Products Database list
  const [productsList, setProductsList] = useState<any[]>(MASTER_PRODUCTS);
  const [selectedCategoryTab, setSelectedCategoryTab] = useState("Jar Cakes");

  // Geolocation Check / Serviceability
  const [pincode, setPincode] = useState("");
  const [serviceStatus, setServiceStatus] = useState<"idle" | "serviceable" | "blocked">("idle");
  const [serviceMessage, setServiceMessage] = useState("");
  const [rollingDates, setRollingDates] = useState<string[]>([]);
  
  // Checkout selections
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliverySlot, setDeliverySlot] = useState("");
  const [isEggless, setIsEggless] = useState(false);
  const [cakeMessage, setCakeMessage] = useState("");

  // Customer Contact Info
  const [custName, setCustName] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [custEmail, setCustEmail] = useState("");
  const [custAddress, setCustAddress] = useState("");
  const [whatsappConsent, setWhatsappConsent] = useState(true);

  // Upgrades
  const [bumpWrap, setBumpWrap] = useState(false);
  const [bumpNote, setBumpNote] = useState(false);
  const [bumpNoteText, setBumpNoteText] = useState("");

  // Checkout Payment
  const [processing, setProcessing] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Dynamic Admin Portal & Delivery Settings States
  const [deliverySettings, setDeliverySettings] = useState({
    deliveryFee: 100,
    freeThreshold: 1000,
    sameDayActive: true
  });
  const [adminToken, setAdminToken] = useState<string>(() => localStorage.getItem("adminToken") || "");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminTab, setAdminTab] = useState<"orders" | "products" | "settings">("orders");
  const [adminOrders, setAdminOrders] = useState<any[]>([]);
  const [adminOrdersSearch, setAdminOrdersSearch] = useState("");
  const [adminProductsSearch, setAdminProductsSearch] = useState("");
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [productForm, setProductForm] = useState({
    name: "",
    category: "Jar Cakes",
    price: 0,
    weight: "1 Jar",
    min_quantity: 1,
    description: "",
    image: "",
    is_available: true
  });

  // Fetch admin orders helper
  const fetchAdminOrders = async () => {
    try {
      const res = await fetch("http://localhost:9000/api/orders");
      if (res.ok) {
        const data = await res.json();
        setAdminOrders(data);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  // Fetch products & settings from database on mount
  useEffect(() => {
    async function loadDbProducts() {
      try {
        const res = await fetch("http://localhost:9000/api/products");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setProductsList(data);
            console.log("✓ Dynamic product catalog loaded from FastAPI MongoDB!");
          }
        }
      } catch (e) {
        console.log("Staged standalone local fallback: Database connection pending.", e);
      }
    }

    async function loadSettings() {
      try {
        const res = await fetch("http://localhost:9000/api/settings");
        if (res.ok) {
          const data = await res.json();
          setDeliverySettings(data);
          console.log("✓ Delivery settings synchronized from backend.");
        }
      } catch (e) {
        console.log("Error loading delivery settings, using defaults.", e);
      }
    }

    loadDbProducts();
    loadSettings();
  }, []);

  // Fetch admin orders automatically when admin token changes
  useEffect(() => {
    if (adminToken) {
      fetchAdminOrders();
    }
  }, [adminToken]);

  useEffect(() => {
    // Generate rolling 7 days calendar dates based on same-day status & 1 PM cutoff
    const dates = [];
    const now = new Date();
    const isPastCutoff = now.getHours() >= 13; // 1:00 PM cutoff
    const startOffset = (deliverySettings.sameDayActive && !isPastCutoff) ? 0 : 1;
    
    for (let i = startOffset; i < startOffset + 7; i++) {
      const d = new Date();
      d.setDate(now.getDate() + i);
      dates.push(d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }));
    }
    setRollingDates(dates);
    if (dates.length > 0) {
      setDeliveryDate(dates[0]);
    }
    setDeliverySlot(DELIVERY_SLOTS[0]);
  }, [deliverySettings.sameDayActive]);

  const handleCheckServiceability = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length !== 6 || isNaN(Number(pincode))) {
      alert("Please enter a valid 6-digit Indian Pincode.");
      return;
    }

    const isBhopal = BHOPAL_PINCODES.includes(pincode);
    const isCake = selectedProduct.category === "Cakes" || selectedProduct.category === "Cheesecakes";

    if (isCake) {
      if (isBhopal) {
        setServiceStatus("serviceable");
        setServiceMessage("Serviced by Bhopal Salon. Local fresh delivery fee applies.");
      } else {
        setServiceStatus("blocked");
        setServiceMessage("This delicate celebration item is restricted to Bhopal fresh delivery only.");
      }
    } else {
      // Pan India ship-stable items are serviceable everywhere
      setServiceStatus("serviceable");
      setServiceMessage(isBhopal 
        ? "Serviced via local fresh courier." 
        : "Serviced via express air cargo (arrives in 3-5 business days).");
    }
  };

  const handleAddToCart = () => {
    if (serviceStatus !== "serviceable") {
      alert("Please check pincode serviceability first.");
      return;
    }
    const existingIndex = cart.findIndex(item => item.id === selectedProduct.id && item.isEggless === isEggless);
    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, {
        ...selectedProduct,
        quantity: selectedProduct.min_quantity || 1,
        isEggless,
        cakeMessage
      }]);
    }
    setCurrentPage("checkout");
  };

  // Calculations based on dynamic rules from Shalini's admin panel
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = cartSubtotal >= deliverySettings.freeThreshold ? 0 : deliverySettings.deliveryFee;
  const bumpsCost = (bumpWrap ? 99 : 0);
  const totalAmount = cartSubtotal + deliveryFee + bumpsCost;

  const handleSendWhatsAppSummary = () => {
    const itemsSummary = cart.map(item => `${item.name} (x${item.quantity})`).join(", ") || "Custom Bakes";
    const summaryMsg = `Hello Chef Shalini! I have successfully completed payment on The Sugar Story. Here is my order summary:

*Order ID:* ${orderId || "Pending"}
*Patron Name:* ${custName}
*Contact Phone:* ${custPhone}
*Contact Email:* ${custEmail}
*Fulfillment Date:* ${deliveryDate}
*Reserved Time Slot:* ${deliverySlot}
*Delivery Address:* ${custAddress} (Pincode: ${pincode || "Bhopal"})
*Bakes Ordered:* ${itemsSummary}
*Grand Total:* ₹${totalAmount}
*Baking Message:* ${cakeMessage || "None"}
*Gift Ribbon Box Wrap:* ${bumpWrap ? "Yes" : "No"}

Thank you so much! Looking forward to tasting your five-star Taj-quality bakes.`;

    const encoded = encodeURIComponent(summaryMsg);
    window.open(`https://wa.me/917906759188?text=${encoded}`, "_blank");
  };

  // Dynamic Razorpay payment checkout script load
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName || !custPhone || !custEmail || !custAddress) {
      alert("Please fill all required coordinates.");
      return;
    }

    setProcessing(true);

    try {
      // 1. Create Order on Backend
      const response = await fetch("http://localhost:9000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: custName,
          phone: custPhone,
          email: custEmail,
          address: custAddress,
          pincode: pincode || "462016",
          items: cart.map(item => ({
            id: item.id,
            name: item.name,
            title: item.name,
            price: item.price,
            quantity: item.quantity,
            isLocalOnly: item.category === "Cakes" || item.category === "Cheesecakes",
            isEggless: item.isEggless || false,
            cakeMessage: item.cakeMessage || cakeMessage || ""
          })),
          deliveryDate: deliveryDate,
          deliverySlot: deliverySlot,
          whatsappConsent: whatsappConsent,
          bumpWrap: bumpWrap
        })
      });

      if (!response.ok) {
        throw new Error("Unable to create order on server.");
      }

      const orderData = await response.json();
      const { razorpay_key_id, razorpay_order_id, is_mock, order: createdOrder } = orderData;

      // 2. Perform Payment
      if (is_mock) {
        // Run in high-fidelity mock payment confirmation mode
        setTimeout(async () => {
          try {
            const verifyRes = await fetch("http://localhost:9000/api/orders/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: createdOrder.id,
                razorpayOrderId: razorpay_order_id,
                isMock: true
              })
            });

            if (!verifyRes.ok) {
              throw new Error("Failed to verify mock payment.");
            }

            const verifyData = await verifyRes.json();
            setOrderId(verifyData.order.id);
            setProcessing(false);
            setCart([]); // Clear cart on success
            setCurrentPage("confirm");
          } catch (err: any) {
            alert("Error confirming payment: " + err.message);
            setProcessing(false);
          }
        }, 1500);
      } else {
        // Run in real Razorpay checkout mode!
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          alert("Unable to load Razorpay SDK. Please check your internet connection.");
          setProcessing(false);
          return;
        }

        const options = {
          key: razorpay_key_id,
          amount: createdOrder.billing.total * 100, // paise
          currency: "INR",
          name: "The Sugar Story",
          description: "Premium Artisanal Patisserie, Bhopal",
          order_id: razorpay_order_id,
          handler: async function (rzpResponse: any) {
            try {
              const verifyRes = await fetch("http://localhost:9000/api/orders/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  orderId: createdOrder.id,
                  razorpayOrderId: rzpResponse.razorpay_order_id,
                  paymentId: rzpResponse.razorpay_payment_id,
                  signature: rzpResponse.razorpay_signature,
                  isMock: false
                })
              });

              if (!verifyRes.ok) {
                throw new Error("Payment signature verification failed.");
              }

              const verifyData = await verifyRes.json();
              setOrderId(verifyData.order.id);
              setProcessing(false);
              setCart([]); // Clear cart on success
              setCurrentPage("confirm");
            } catch (err: any) {
              alert("Payment verification error: " + err.message);
              setProcessing(false);
            }
          },
          prefill: {
            name: custName,
            email: custEmail,
            contact: custPhone
          },
          theme: {
            color: "#6B3F2A"
          },
          modal: {
            ondismiss: function () {
              setProcessing(false);
            }
          }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      }

    } catch (err: any) {
      alert("Error: " + err.message);
      setProcessing(false);
    }
  };

  // Clean navigation helper
  const navigateToProduct = (prod: any) => {
    setSelectedProduct(prod);
    setPincode("");
    setServiceStatus("idle");
    setServiceMessage("");
    setIsEggless(false);
    setCakeMessage("");
    setCurrentPage("product");
    window.scrollTo(0, 0);
  };

  // Cart item management helpers
  const handleRemoveFromCart = (productId: string, isEggless: boolean) => {
    setCart(cart.filter(item => !(item.id === productId && item.isEggless === isEggless)));
  };

  const handleUpdateQuantity = (productId: string, isEggless: boolean, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === productId && item.isEggless === isEggless) {
        const newQty = item.quantity + delta;
        const minQty = item.min_quantity || 1;
        if (newQty >= minQty) {
          return { ...item, quantity: newQty };
        }
      }
      return item;
    }));
  };

  // Filter products by selected category tab
  const activeTabProducts = productsList.filter(p => p.category === selectedCategoryTab);

  // Bestsellers row (Pick 6 products)
  const bestsellerProducts = [
    productsList.find(p => p.name === "Chocolate Fudge Brownie") || productsList[15],
    productsList.find(p => p.name === "Lotus Biscoff Jar") || productsList[13],
    productsList.find(p => p.name === "Blueberry Cheesecake (Half Kg)") || productsList[66],
    productsList.find(p => p.name === "Truffle Cake (Half Kg)") || productsList[52],
    productsList.find(p => p.name === "Desi Ghee Nankhatai") || productsList[39],
    productsList.find(p => p.name === "Rose Pistachio Tea Cake") || productsList[23]
  ];

  return (
    <div className="min-h-screen bg-cream text-cocoa font-sans flex flex-col justify-between selection:bg-primary selection:text-cream">
      
      {/* Top Tagline Strip */}
      <div className="bg-cocoa text-cream text-[10px] tracking-[0.2em] py-2 text-center uppercase font-sans font-semibold flex flex-col sm:flex-row justify-center items-center gap-1.5 px-4">
        <span>"Every bite, a chapter." • Crafted by ex-Taj chef Shalini Singh.</span>
        <span className="hidden sm:inline">•</span>
        <span className="text-gold font-bold">✨ Free delivery above ₹{deliverySettings.freeThreshold} in Bhopal!</span>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-sm border-b border-cocoa/10">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <button 
            onClick={() => setCurrentPage("home")}
            className="font-serif text-2xl md:text-3xl font-medium tracking-[0.06em] text-cocoa hover:opacity-90"
          >
            THE SUGAR STORY
          </button>

          <nav className="hidden md:flex items-center gap-8 text-[11px] font-sans uppercase tracking-widest font-semibold text-cocoa/90">
            <button onClick={() => { setCurrentPage("home"); window.scrollTo(0, 0); }} className="hover:text-primary transition-colors">Salon Home</button>
            <button onClick={() => { setCurrentPage("story"); window.scrollTo(0, 0); }} className="hover:text-primary transition-colors">Our Story</button>
            <button onClick={() => { setSelectedCategoryTab("Cakes"); setCurrentPage("home"); setTimeout(() => document.getElementById("catalog-section")?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-primary transition-colors">Cakes</button>
            <button onClick={() => { setSelectedCategoryTab("Cheesecakes"); setCurrentPage("home"); setTimeout(() => document.getElementById("catalog-section")?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-primary transition-colors">Cheesecakes</button>
            <a href="https://instagram.com/the_sugar_story" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">@the_sugar_story</a>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                if (cart.length > 0) setCurrentPage("checkout");
                else alert("Your shopping bag is empty. Please select a bake!");
              }} 
              className="relative p-2 text-cocoa hover:text-primary transition-colors"
              aria-label="Bag"
            >
              <ShoppingBag size={20} strokeWidth={1.8} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-cream text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Main Pages router workspace */}
      <main className="flex-grow">
        
        {/* ==========================================
            ROUTER 1: LUXURY HOME PAGE
            ========================================== */}
        {currentPage === "home" && (
          <div className="w-full">
            
            {/* Task 3 - Cinematic Homepage Hero */}
            <section className="relative h-[85vh] bg-cocoa text-cream flex items-center justify-center text-center px-6 overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=1200&auto=format&fit=crop')" }} />
              
              <div className="relative z-10 max-w-4xl space-y-6">
                <span className="text-xs uppercase tracking-[0.35em] text-gold font-semibold font-sans">Artisanal Patisserie • Bhopal</span>
                <h1 className="font-serif text-5xl md:text-8xl tracking-tight leading-tight">
                  Every bite, <span className="italic font-light text-cream/90">a chapter.</span>
                </h1>
                <p className="font-sans text-stone text-xs md:text-sm max-w-xl mx-auto leading-relaxed text-[#F6EFE3]/80">
                  Premium handcrafted bakery in Bhopal, by ex-Taj chef Shalini Singh.
                </p>
                <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => {
                      document.getElementById("catalog-section")?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-8 py-4 bg-primary hover:bg-primary/95 text-cream font-sans font-semibold text-xs uppercase tracking-[0.2em] transition-all shadow-md cursor-pointer"
                  >
                    Shop Cakes
                  </button>
                   <a 
                    href="https://wa.me/917906759188"
                    target="_blank" 
                    rel="noreferrer"
                    className="px-8 py-4 border border-cream hover:bg-cream hover:text-cocoa text-cream font-sans font-semibold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={14} className="text-green-400" />
                    <span>Order on WhatsApp</span>
                  </a>
                </div>
              </div>
            </section>

            {/* Task 3 - Bestsellers row (pick 6 products) */}
            <ScrollReveal>
              <section className="py-24 max-w-6xl mx-auto px-6 border-b border-cocoa/5">
                <div className="text-center space-y-2 mb-16">
                  <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold font-sans">Signature Selections</span>
                  <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight">The Bestsellers Row</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {bestsellerProducts.map((prod, idx) => (
                    <div key={idx} className="group border border-cocoa/10 p-4 bg-cream/40 hover:-translate-y-2 hover:shadow-xl transition-all duration-500 ease-out flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="aspect-[4/3] bg-cocoa/5 overflow-hidden relative">
                          <div className="absolute inset-0 bg-cover bg-center group-hover:scale-102 transition-transform duration-500" style={{ backgroundImage: `url(${prod.image})` }} />
                          <div className="absolute top-4 left-4">
                            <span className={`text-[8px] uppercase tracking-widest font-bold font-sans px-2.5 py-1 text-cream bg-cocoa`}>
                              {prod.category}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-1 text-left">
                          <h3 className="font-serif text-xl font-medium group-hover:text-primary transition-colors">{prod.name}</h3>
                          <p className="font-sans text-stone text-xs leading-relaxed line-clamp-2">{prod.description}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center border-t border-cocoa/10 pt-4 mt-6">
                        <span className="font-serif text-lg font-bold">₹{prod.price}</span>
                        <button 
                          onClick={() => navigateToProduct(prod)}
                          className="flex items-center gap-1 text-[10px] font-sans font-bold uppercase tracking-widest text-primary hover:text-cocoa transition-colors"
                        >
                          <span>Select Card</span>
                          <ChevronRight size={10} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            {/* Task 2 - Rebuilt Product listing page */}
            <ScrollReveal>
              <section id="catalog-section" className="py-24 max-w-7xl mx-auto px-6 text-left scroll-mt-20">
                <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 border-b border-cocoa/10 pb-6 gap-4">
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-[0.25em] text-primary font-bold font-sans">Freshly Baked Catalog</span>
                    <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight">The Product Catalogue</h2>
                  </div>
                  <span className="text-xs font-sans uppercase text-stone tracking-widest">
                    Showing {activeTabProducts.length} chapters
                  </span>
                </div>

                {/* Category filter tabs */}
                <div className="flex flex-wrap gap-2 mb-12">
                  {CATEGORIES.map(tab => (
                    <button
                      key={tab}
                      onClick={() => setSelectedCategoryTab(tab)}
                      className={`px-4 py-2 text-[10px] font-sans uppercase tracking-widest transition-all ${selectedCategoryTab === tab ? "bg-primary text-cream" : "bg-cream text-cocoa border border-cocoa/20 hover:border-primary"}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Mobile-first responsive grid (2 cols mobile, 3-4 desktop) */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                  {activeTabProducts.map(prod => (
                    <div key={prod.id} className="group flex flex-col justify-between bg-cream/40 border border-cocoa/10 p-3 md:p-4 hover:-translate-y-2 hover:shadow-xl transition-all duration-500 ease-out text-left">
                      
                      <div className="space-y-4">
                        {/* Product Card Media Box */}
                        <div className="relative aspect-square bg-cocoa/5 overflow-hidden">
                          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-102" style={{ backgroundImage: `url(${prod.image})` }} />
                          
                          {/* Minimum quantity tag */}
                          {prod.min_quantity > 1 && (
                            <div className="absolute top-2 left-2 z-10">
                              <span className="bg-[#C9962B] text-cream text-[8px] font-sans uppercase tracking-widest px-2 py-0.5 font-bold">
                                Min {prod.min_quantity} pcs
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-1 text-left">
                          <h3 className="font-serif text-base md:text-lg font-semibold text-cocoa group-hover:text-primary transition-colors line-clamp-1">
                            {prod.name}
                          </h3>
                          <p className="text-stone text-[11px] leading-relaxed line-clamp-2">
                            {prod.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center border-t border-cocoa/10 pt-3 mt-4">
                        <span className="font-serif text-base font-bold text-cocoa">
                          ₹{prod.price}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <a
                            href={`https://wa.me/917906759188?text=Hello%20Chef%20Shalini!%20I%20would%20like%20to%20order%20the%20${encodeURIComponent(prod.name)}.`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2 py-1.5 border border-[#25D366] hover:bg-[#25D366]/5 text-[#25D366] text-[8px] font-sans font-bold uppercase tracking-wider transition-all flex items-center gap-1"
                          >
                            <MessageCircle size={10} className="fill-current stroke-none" /> WA Quick
                          </a>
                          <button
                            onClick={() => navigateToProduct(prod)}
                            className="px-3 py-1.5 bg-cocoa hover:bg-primary text-cream text-[9px] font-sans font-bold uppercase tracking-widest transition-all"
                          >
                            Add
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            {/* Founder Strip (Real Facts - Short Version) */}
            <ScrollReveal>
              <section className="bg-cocoa text-cream py-20 text-left">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="aspect-[3/4] bg-[#D7CCC8]/10 max-w-sm mx-auto w-full p-2 border border-primary/20 relative">
                    <div className="absolute inset-2 bg-cover bg-center" style={{ backgroundImage: "url('/images/chef-shalini-portrait.jpg')" }} />
                    <div className="absolute bottom-4 right-4 bg-primary text-cream py-2 px-4 text-[10px] font-sans uppercase tracking-widest font-semibold">
                      Chef Shalini Singh
                    </div>
                  </div>

                  <div className="space-y-6">
                    <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold font-sans">The Founder</span>
                    <h2 className="font-serif text-3xl md:text-5xl font-light text-cream/95 leading-tight">
                      "From a Taj kitchen, to your celebration."
                    </h2>
                    <p className="font-sans text-stone text-xs md:text-sm leading-relaxed text-[#D7CCC8]">
                      After crafting desserts for banquets and celebrations at Taj Lakefront Bhopal, Chef Shalini Singh began her own chapter: The Sugar Story. Today every cake, cookie and loaf is made by her hands, with five-star standards and a homemade heart.
                    </p>
                    <div className="pt-2">
                      <button 
                        onClick={() => {
                          setCurrentPage("story");
                          window.scrollTo(0, 0);
                        }}
                        className="text-primary hover:text-cream text-xs font-sans font-bold uppercase tracking-wider transition-colors flex items-center gap-1 group"
                      >
                        <span>Read her story</span>
                        <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                      </button>
                    </div>
                    <div className="pt-4 flex flex-col gap-2">
                      <span className="font-signature text-5xl text-primary">Shalini Singh</span>
                      <span className="text-[10px] font-sans text-stone uppercase tracking-widest">Master Pastry Chef & Founder</span>
                    </div>
                  </div>
                </div>
              </section>
            </ScrollReveal>

            {/* Customer Reviews & Trust Badges Section */}
            <ScrollReveal>
              <section className="py-24 max-w-7xl mx-auto px-6 text-left border-t border-cocoa/10 bg-cream/20">
                <div className="space-y-2 mb-12">
                  <span className="text-xs uppercase tracking-[0.25em] text-primary font-bold font-sans">Patron Appreciations</span>
                  <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight">Customer Testimonials</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Review 1 */}
                  <div className="bg-cream/40 border border-cocoa/10 p-8 space-y-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 relative">
                    <div className="flex text-gold gap-1">
                      <Star size={12} className="fill-current" />
                      <Star size={12} className="fill-current" />
                      <Star size={12} className="fill-current" />
                      <Star size={12} className="fill-current" />
                      <Star size={12} className="fill-current" />
                    </div>
                    <p className="font-serif text-base italic leading-relaxed text-cocoa/90">
                      "Chef Shalini's customized bakes are a true masterpiece of flavors. The Pineapple cake is incredibly moist and light. Truly five-star standards!"
                    </p>
                    <div className="pt-2 border-t border-cocoa/5">
                      <p className="font-sans text-[10px] uppercase tracking-wider font-bold text-cocoa">Aishwarya R.</p>
                      <p className="font-sans text-[9px] text-stone">Arera Colony, Bhopal</p>
                    </div>
                  </div>

                  {/* Review 2 */}
                  <div className="bg-cream/40 border border-cocoa/10 p-8 space-y-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 relative">
                    <div className="flex text-gold gap-1">
                      <Star size={12} className="fill-current" />
                      <Star size={12} className="fill-current" />
                      <Star size={12} className="fill-current" />
                      <Star size={12} className="fill-current" />
                      <Star size={12} className="fill-current" />
                    </div>
                    <p className="font-serif text-base italic leading-relaxed text-cocoa/90">
                      "Having experienced her desserts at the Taj, I was absolutely thrilled to find her home bakery. The dry fruit tea cakes are exceptional."
                    </p>
                    <div className="pt-2 border-t border-cocoa/5">
                      <p className="font-sans text-[10px] uppercase tracking-wider font-bold text-cocoa">Dr. Anurag Sharma</p>
                      <p className="font-sans text-[9px] text-stone">Gulmohar Colony, Bhopal</p>
                    </div>
                  </div>

                  {/* Review 3 */}
                  <div className="bg-cream/40 border border-cocoa/10 p-8 space-y-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 relative">
                    <div className="flex text-gold gap-1">
                      <Star size={12} className="fill-current" />
                      <Star size={12} className="fill-current" />
                      <Star size={12} className="fill-current" />
                      <Star size={12} className="fill-current" />
                      <Star size={12} className="fill-current" />
                    </div>
                    <p className="font-serif text-base italic leading-relaxed text-cocoa/90">
                      "The Biscoff Cheesecake is absolutely heavenly. Pure ingredients and elegant presentation. Hands down the best in Bhopal!"
                    </p>
                    <div className="pt-2 border-t border-cocoa/5">
                      <p className="font-sans text-[10px] uppercase tracking-wider font-bold text-cocoa">Megha Singh</p>
                      <p className="font-sans text-[9px] text-stone">Arera Colony, Bhopal</p>
                    </div>
                  </div>
                </div>

                {/* Trust Badges Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 border-t border-cocoa/5 mt-16 text-center">
                  <div className="flex flex-col items-center space-y-2">
                    <Award className="text-gold w-8 h-8" />
                    <span className="font-serif text-xs font-bold uppercase tracking-wider text-cocoa">Trained at Taj</span>
                    <span className="text-[10px] font-sans text-stone">Taj Hotel culinary standards</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <ShieldCheck className="text-gold w-8 h-8" />
                    <span className="font-serif text-xs font-bold uppercase tracking-wider text-cocoa">Hygienically Packed</span>
                    <span className="text-[10px] font-sans text-stone">Sealed fresh with love</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <ShoppingBag className="text-gold w-8 h-8" />
                    <span className="font-serif text-xs font-bold uppercase tracking-wider text-cocoa">Freshly Baked Daily</span>
                    <span className="text-[10px] font-sans text-stone">Zero commercial stabilizers</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <Clock className="text-gold w-8 h-8" />
                    <span className="font-serif text-xs font-bold uppercase tracking-wider text-cocoa">Bhopal Fresh Delivery</span>
                    <span className="text-[10px] font-sans text-stone">Same-day cutoff at 1:00 PM</span>
                  </div>
                </div>
              </section>
            </ScrollReveal>

          </div>
        )}

        {/* ==========================================
            ROUTER 5: OUR STORY PAGE
            ========================================== */}
        {currentPage === "story" && (
          <div className="w-full bg-cream text-cocoa">
            
            {/* Elegant Hero Header */}
            <section className="py-20 text-center max-w-4xl mx-auto px-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.35em] text-primary font-bold font-sans">Our Story</span>
              <h1 className="font-serif text-4xl md:text-7xl font-light tracking-tight leading-tight">
                "From a Taj kitchen,<br />
                <span className="italic font-light text-primary">to your celebration."</span>
              </h1>
              <div className="w-16 h-px bg-primary/40 mx-auto my-8" />
            </section>

            {/* Main content grid */}
            <section className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              
              {/* Left Column: Portrait */}
              <div className="lg:col-span-5 space-y-4">
                <div className="aspect-[3/4] bg-cocoa/5 p-3 border border-cocoa/10 relative shadow-sm">
                  <div className="absolute inset-3 bg-cover bg-center" style={{ backgroundImage: "url('/images/chef-shalini-portrait.jpg')" }} />
                  <div className="absolute bottom-6 right-6 bg-primary text-cream py-2.5 px-5 text-[10px] font-sans uppercase tracking-[0.15em] font-semibold shadow-md">
                    Chef Shalini Singh
                  </div>
                </div>
                <p className="text-[10px] font-sans text-stone text-center italic tracking-wider text-cocoa/50">
                  Founder Portrait (Real photo from Chef Shalini to be added)
                </p>
              </div>

              {/* Right Column: Copy and Signature */}
              <div className="lg:col-span-7 space-y-8 text-left">
                
                {/* EXACT REAL FOUNDER COPY */}
                <div className="space-y-6 text-base md:text-lg font-sans text-cocoa/90 leading-relaxed font-light font-sans">
                  <p>
                    Shalini Singh spent years in the pastry kitchen of Taj Lakefront Bhopal, crafting desserts for banquets, fine dining and celebrations — and training the next generation of bakers.
                  </p>
                  <p>
                    In July 2025, she began her own chapter: <strong className="font-semibold text-cocoa">The Sugar Story</strong>. Today every cake, cookie and loaf is made by her hands, with five-star standards and a homemade heart.
                  </p>
                  <p className="font-semibold text-primary italic font-serif text-xl tracking-wide">
                    Made in Bhopal, with love.
                  </p>
                </div>

                {/* Elegant Signature */}
                <div className="pt-6 border-t border-cocoa/10 flex flex-col gap-2">
                  <span className="font-signature text-7xl text-primary leading-none">Shalini Singh</span>
                  <span className="text-[10px] font-sans text-stone uppercase tracking-[0.2em] font-semibold text-cocoa/60">
                    Master Pastry Chef & Founder
                  </span>
                </div>

                {/* Return CTA */}
                <div className="pt-8">
                  <button 
                    onClick={() => {
                      setCurrentPage("home");
                      setTimeout(() => document.getElementById("catalog-section")?.scrollIntoView({ behavior: 'smooth' }), 100);
                    }}
                    className="px-8 py-4 bg-cocoa hover:bg-primary text-cream font-sans font-semibold text-xs uppercase tracking-[0.25em] transition-all shadow-md"
                  >
                    Explore The Catalogue
                  </button>
                </div>

              </div>

            </section>

            {/* Three Trust Pillars Grid */}
            <section className="bg-cocoa text-cream py-24 text-left">
              <div className="max-w-6xl mx-auto px-6 space-y-16">
                <div className="text-center space-y-3">
                  <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold font-sans">Our Core Values</span>
                  <h2 className="font-serif text-3xl md:text-5xl font-light text-cream">The Three Trust Pillars</h2>
                  <div className="w-12 h-px bg-primary mx-auto mt-6" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {/* Pillar 1 */}
                  <div className="space-y-4 border-t border-primary/20 pt-6">
                    <span className="text-primary font-serif text-4xl block font-light">01</span>
                    <h3 className="font-serif text-2xl font-light text-cream">Trained at Taj</h3>
                    <p className="font-sans text-stone text-xs md:text-sm leading-relaxed text-[#D7CCC8]">
                      Rigorous five-star pastry standards, professional banquet crafting, and hospitality excellence honed at one of India's premier luxury properties.
                    </p>
                  </div>

                  {/* Pillar 2 */}
                  <div className="space-y-4 border-t border-primary/20 pt-6">
                    <span className="text-primary font-serif text-4xl block font-light">02</span>
                    <h3 className="font-serif text-2xl font-light text-cream">Handcrafted Fresh</h3>
                    <p className="font-sans text-stone text-xs md:text-sm leading-relaxed text-[#D7CCC8]">
                      Every batch is made completely fresh by hand using premium, preservative-free ingredients, pure butter, and professional lamination.
                    </p>
                  </div>

                  {/* Pillar 3 */}
                  <div className="space-y-4 border-t border-primary/20 pt-6">
                    <span className="text-primary font-serif text-4xl block font-light">03</span>
                    <h3 className="font-serif text-2xl font-light text-cream">Made in Bhopal</h3>
                    <p className="font-sans text-stone text-xs md:text-sm leading-relaxed text-[#D7CCC8]">
                      Proudly rooted in Bhopal, celebrating local dessert evolution and hand-delivering luxury pastry moments directly to our community.
                    </p>
                  </div>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ==========================================
            ROUTER 2: INTERACTIVE PRODUCT DETAIL
            ========================================== */}
        {currentPage === "product" && (
          <section className="max-w-6xl mx-auto px-6 py-20 text-left">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Product Media Column */}
              <div className="space-y-6">
                <div className="aspect-square bg-cocoa/10 border border-cocoa/10 relative p-2">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                  <div className="absolute top-6 left-6">
                    <span className="bg-cocoa text-cream text-[9px] font-sans font-bold uppercase tracking-widest px-3 py-1">
                      {selectedProduct.category}
                    </span>
                  </div>
                </div>

                {/* Storage block */}
                <div className="bg-cream border border-cocoa/10 p-6 space-y-3">
                  <h4 className="font-serif text-base font-semibold text-cocoa flex items-center gap-1.5">
                    <ShieldCheck className="text-gold" size={16} />
                    <span>Storage & Care Guidelines</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                    <div>
                      <span className="text-stone uppercase text-[9px] block">Shelf Life</span>
                      <span className="font-semibold text-cocoa">{selectedProduct.shelfLife || "5 Days"}</span>
                    </div>
                    <div>
                      <span className="text-stone uppercase text-[9px] block">Delivery Rate</span>
                      <span className="font-semibold text-cocoa">₹100 Flat (FREE &gt; ₹1k)</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-stone uppercase text-[9px] block">Storage Instructions</span>
                      <p className="text-cocoa/90 italic mt-0.5 font-medium">"{selectedProduct.description}"</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Details Column */}
              <div className="space-y-8">
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-[0.25em] text-primary font-bold font-sans">Chef Shalini's Signature Selection</span>
                  <h1 className="font-serif text-3xl md:text-5xl font-medium tracking-tight">{selectedProduct.name}</h1>
                  
                  <div className="flex items-center gap-4 border-b border-cocoa/10 pb-4">
                    <span className="font-serif text-2xl font-bold text-cocoa">₹{selectedProduct.price}</span>
                    <span className="text-[10px] font-sans text-stone uppercase tracking-widest">Bhopal Flat Delivery feerates apply</span>
                  </div>
                  
                  <p className="font-sans text-stone text-xs md:text-sm leading-relaxed">{selectedProduct.description}</p>
                </div>

                {/* Pincode checker gate */}
                <div className="border border-cocoa/15 p-6 bg-cream/40 space-y-4">
                  <div className="space-y-1">
                    <h4 className="font-serif text-base font-medium text-cocoa flex items-center gap-1.5">
                      <MapPin size={16} className="text-gold" />
                      <span>Delivery Service Check</span>
                    </h4>
                    <p className="text-[10px] font-sans text-stone uppercase leading-relaxed">
                      {(selectedProduct.category === "Cakes" || selectedProduct.category === "Cheesecakes")
                        ? "Delicate celebration cakes are hand-delivered only inside Bhopal."
                        : "Premium brownies and tea cakes ship pan-India."}
                    </p>
                  </div>

                  <form onSubmit={handleCheckServiceability} className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={e => setPincode(e.target.value.replace(/\D/g, ""))}
                      placeholder="Enter 6-digit Pincode"
                      className="flex-grow px-4 py-3 bg-cream border border-cocoa/30 text-xs font-sans focus:outline-none focus:border-primary"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-cocoa text-cream text-[10px] font-sans font-bold uppercase tracking-widest hover:bg-primary transition-all"
                    >
                      Verify
                    </button>
                  </form>

                  {serviceStatus !== "idle" && (
                    <div className={`p-4 text-xs font-sans flex items-start gap-2 ${serviceStatus === "serviceable" ? "bg-green-50 text-green-700 border-l-2 border-green-600" : "bg-red-50 text-red-700 border-l-2 border-red-600"}`}>
                      {serviceStatus === "serviceable" ? (
                        <>
                          <Check size={14} className="mt-0.5" />
                          <p className="font-semibold">{serviceMessage}</p>
                        </>
                      ) : (
                        <>
                          <AlertCircle size={14} className="mt-0.5" />
                          <p className="font-semibold">{serviceMessage}</p>
                        </>
                      )}
                    </div>
                  )}

                  {/* Dynamic Slots Picker (only when serviceable and local cake) */}
                  {serviceStatus === "serviceable" && (selectedProduct.category === "Cakes" || selectedProduct.category === "Cheesecakes") && (
                    <div className="space-y-4 pt-4 border-t border-cocoa/10">
                      <h4 className="font-serif text-sm font-semibold text-cocoa flex items-center gap-1.5">
                        <Clock size={14} className="text-gold" />
                        <span>Select Date & Time Slot</span>
                      </h4>

                      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                        {rollingDates.map(date => (
                          <button
                            key={date}
                            type="button"
                            onClick={() => setDeliveryDate(date)}
                            className={`px-3.5 py-2 border text-[9px] font-sans uppercase tracking-widest whitespace-nowrap transition-all ${deliveryDate === date ? "bg-primary text-cream border-primary" : "bg-cream text-cocoa border-cocoa/20 hover:border-primary"}`}
                          >
                            {date}
                          </button>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {DELIVERY_SLOTS.map(slot => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setDeliverySlot(slot)}
                            className={`p-3 border text-left font-sans text-xs flex justify-between items-center transition-all ${deliverySlot === slot ? "bg-primary/10 border-primary ring-1 ring-primary" : "bg-cream border-cocoa/20"}`}
                          >
                            <span>{slot}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Customisations workspace */}
                {serviceStatus === "serviceable" && (
                  <div className="border border-cocoa/15 p-6 bg-cream/40 space-y-6">
                    <h3 className="font-serif text-lg font-medium text-cocoa flex items-center gap-2 border-b border-cocoa/10 pb-3">
                      <Cake size={16} className="text-gold" />
                      <span>Customisation Directives</span>
                    </h3>

                    {/* Eggless */}
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="eggless-home"
                        checked={isEggless}
                        onChange={e => setIsEggless(e.target.checked)}
                        className="w-4 h-4 text-primary bg-cream border-cocoa/30 focus:ring-0 cursor-pointer"
                      />
                      <label htmlFor="eggless-home" className="font-sans text-xs font-semibold uppercase tracking-wider text-cocoa cursor-pointer">
                        100% Eggless Preparation
                      </label>
                    </div>

                    {/* Message plaque */}
                    {(selectedProduct.category === "Cakes" || selectedProduct.category === "Cheesecakes") && (
                      <div className="space-y-2">
                        <label className="block font-sans text-xs uppercase tracking-widest text-stone">Cake Message (Max 500 Characters)</label>
                        <input
                          type="text"
                          maxLength={500}
                          value={cakeMessage}
                          onChange={e => setCakeMessage(e.target.value)}
                          placeholder="e.g. Happy Anniversary Shalini!"
                          className="w-full px-4 py-3 bg-cream border border-cocoa/30 text-xs font-sans focus:outline-none focus:border-primary"
                        />
                        <div className="flex justify-between text-[9px] font-sans text-stone uppercase">
                          <span>Write clearly in capitals</span>
                          <span>{cakeMessage.length}/500</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Add to shopping bag & WhatsApp Quick Order actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    disabled={serviceStatus !== "serviceable"}
                    onClick={handleAddToCart}
                    className={`flex-1 py-4 text-xs font-sans font-bold uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-2 ${serviceStatus !== "serviceable" ? "bg-cocoa/10 text-cocoa/40 border border-cocoa/20 cursor-not-allowed" : "bg-cocoa hover:bg-primary text-cream shadow-md cursor-pointer"}`}
                  >
                    <ShoppingBag size={14} />
                    <span>Configure Checkout Card</span>
                  </button>
                  <a
                    href={`https://wa.me/917906759188?text=Hello%20Chef%20Shalini!%20I%20would%20like%20to%20order%20the%20${encodeURIComponent(selectedProduct.name)}%20(Price:%20₹${selectedProduct.price}).`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-4 border border-[#25D366] hover:bg-[#25D366]/5 text-[#25D366] text-xs font-sans font-bold uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle size={14} className="fill-current stroke-none" />
                    <span>Order on WhatsApp</span>
                  </a>
                </div>

              </div>

            </div>
          </section>
        )}

        {/* ==========================================
            ROUTER 3: MOBILE-FIRST UNIFIED CHECKOUT
            ========================================== */}
        {currentPage === "checkout" && (
          <section className="max-w-6xl mx-auto px-6 py-20 text-left">
            <h1 className="font-serif text-3xl md:text-5xl font-medium tracking-tight mb-12 border-b border-cocoa/15 pb-6">
              Bespoke Transaction Desk
            </h1>

            {cart.length === 0 ? (
              <div className="text-center py-20 space-y-6 max-w-md mx-auto">
                <ShoppingBag size={64} className="text-gold mx-auto opacity-40 animate-pulse" />
                <h2 className="font-serif text-3xl font-light">Your Shopping Bag is Empty</h2>
                <p className="font-sans text-stone text-xs leading-relaxed">
                  Before you check out at the bespoke transaction desk, please select some freshly baked gourmet chapters from our catalogue.
                </p>
                <div className="pt-4">
                  <button 
                    onClick={() => setCurrentPage("home")}
                    className="px-8 py-3.5 bg-cocoa hover:bg-primary text-cream font-sans font-bold text-xs uppercase tracking-widest transition-colors shadow-md"
                  >
                    Return to Catalogue
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Checkout Forms Workspace - 7 Columns */}
                <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-8">
                  
                  {/* Coordinates */}
                  <div className="space-y-4">
                    <h3 className="font-serif text-2xl font-medium text-cocoa flex items-center gap-2">
                      <span className="bg-primary text-cream text-xs w-6 h-6 flex items-center justify-center rounded-full font-sans font-bold">1</span>
                      <span>Customer Coordinates</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[9px] font-sans uppercase tracking-widest text-stone font-semibold">Name *</label>
                        <input
                          type="text"
                          required
                          value={custName}
                          onChange={e => setCustName(e.target.value)}
                          placeholder="Shalini Singh"
                          className="w-full px-4 py-3 bg-cream border border-cocoa/30 text-xs font-sans focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[9px] font-sans uppercase tracking-widest text-stone font-semibold">Mobile *</label>
                        <input
                          type="tel"
                          required
                          value={custPhone}
                          onChange={e => setCustPhone(e.target.value.replace(/\D/g, ""))}
                          placeholder="7906759188"
                          className="w-full px-4 py-3 bg-cream border border-cocoa/30 text-xs font-sans focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div className="sm:col-span-2 space-y-1">
                        <label className="block text-[9px] font-sans uppercase tracking-widest text-stone font-semibold">Email *</label>
                        <input
                          type="email"
                          required
                          value={custEmail}
                          onChange={e => setCustEmail(e.target.value)}
                          placeholder="patron@thesugarstory.co.in"
                          className="w-full px-4 py-3 bg-cream border border-cocoa/30 text-xs font-sans focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Delivery */}
                  <div className="space-y-4">
                    <h3 className="font-serif text-2xl font-medium text-cocoa flex items-center gap-2">
                      <span className="bg-primary text-cream text-xs w-6 h-6 flex items-center justify-center rounded-full font-sans font-bold">2</span>
                      <span>Bhopal Delivery Coordinates</span>
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="block text-[9px] font-sans uppercase tracking-widest text-stone font-semibold">Address *</label>
                        <input
                          type="text"
                          required
                          value={custAddress}
                          onChange={e => setCustAddress(e.target.value)}
                          placeholder="Flat no., block, street or colony, Bhopal"
                          className="w-full px-4 py-3 bg-cream border border-cocoa/30 text-xs font-sans focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-[9px] font-sans uppercase tracking-widest text-stone font-semibold">Pincode *</label>
                          <input
                            type="text"
                            disabled
                            value={pincode || "462016"}
                            className="w-full px-4 py-3 bg-cocoa/5 border border-cocoa/20 text-xs font-sans text-stone cursor-not-allowed"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[9px] font-sans uppercase tracking-widest text-stone font-semibold">City</label>
                          <input
                            type="text"
                            disabled
                            value="Bhopal"
                            className="w-full px-4 py-3 bg-cocoa/5 border border-cocoa/20 text-xs font-sans text-stone cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Slots Review */}
                  <div className="space-y-4">
                    <h3 className="font-serif text-2xl font-medium text-cocoa flex items-center gap-2">
                      <span className="bg-primary text-cream text-xs w-6 h-6 flex items-center justify-center rounded-full font-sans font-bold">3</span>
                      <span>Delivery Date & Slot Selection</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[9px] font-sans uppercase tracking-widest text-stone font-semibold">Bhopal Delivery Date * (Calendar)</label>
                        <input 
                          type="date"
                          required
                          value={deliveryDate}
                          onChange={e => setDeliveryDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 bg-cream border border-cocoa/30 text-xs font-sans focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[9px] font-sans uppercase tracking-widest text-stone font-semibold">Time Slot *</label>
                        <select 
                          value={deliverySlot}
                          onChange={e => setDeliverySlot(e.target.value)}
                          className="w-full px-4 py-3 bg-cream border border-cocoa/30 text-xs font-sans focus:outline-none focus:border-primary"
                        >
                          {DELIVERY_SLOTS.map(sl => <option key={sl} value={sl}>{sl}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Optional message tag */}
                  <div className="space-y-4">
                    <h3 className="font-serif text-2xl font-medium text-cocoa flex items-center gap-2">
                      <span className="bg-primary text-cream text-xs w-6 h-6 flex items-center justify-center rounded-full font-sans font-bold">4</span>
                      <span>Baking Directive (Optional Tag Message)</span>
                    </h3>
                    <div className="space-y-1">
                      <label className="block text-[9px] font-sans uppercase tracking-widest text-stone font-semibold">Message on Cake tag or Baking instruction note</label>
                      <textarea
                        maxLength={200}
                        value={cakeMessage}
                        onChange={e => setCakeMessage(e.target.value)}
                        placeholder="e.g. Write 'Happy Birthday Shalini' on the tag, keep cookies eggless..."
                        className="w-full px-4 py-3 bg-cream border border-cocoa/30 text-xs font-sans focus:outline-none focus:border-primary h-24 resize-none"
                      />
                      <div className="flex justify-between text-[9px] font-sans text-stone uppercase">
                        <span>Directives for custom cake inscription</span>
                        <span>{cakeMessage.length}/200</span>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp consent */}
                  <div className="p-4 bg-cream border border-cocoa/25 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="wa-consent"
                      checked={whatsappConsent}
                      onChange={e => setWhatsappConsent(e.target.checked)}
                      className="w-4 h-4 text-primary bg-cream border-cocoa/30 focus:ring-0 cursor-pointer mt-0.5"
                    />
                    <label htmlFor="wa-consent" className="font-sans text-[11px] text-cocoa leading-relaxed cursor-pointer select-none">
                      Subscribe to our transactional order progress, kitchen dispatch statuses, and baking journals directly on WhatsApp. 
                      <span className="text-stone block mt-0.5 font-semibold">Standard opt-in agreement for @the_sugar_story Business API channels.</span>
                    </label>
                  </div>

                  {/* Order Bumps */}
                  <div className="space-y-4">
                    <h3 className="font-serif text-2xl font-medium text-cocoa flex items-center gap-2">
                      <span className="bg-primary text-cream text-xs w-6 h-6 flex items-center justify-center rounded-full font-sans font-bold">5</span>
                      <span>Bespoke Upgrades (Order Bumps)</span>
                    </h3>
                    
                    <div className="space-y-3">
                      {/* Handwritten note */}
                      <div className={`p-4 border flex items-start gap-4 transition-all ${bumpNote ? "bg-primary/5 border-primary" : "bg-cream border-cocoa/25"}`}>
                        <input
                          type="checkbox"
                          id="bump-note-check"
                          checked={bumpNote}
                          onChange={e => setBumpNote(e.target.checked)}
                          className="w-4 h-4 text-primary border-cocoa/30 focus:ring-0 mt-1 cursor-pointer"
                        />
                        <div className="flex-grow space-y-2">
                          <div className="flex justify-between items-baseline">
                            <label htmlFor="bump-note-check" className="font-serif text-base font-semibold text-cocoa cursor-pointer">
                              Wax-Sealed Handwritten Card by Shalini
                            </label>
                            <span className="text-[10px] font-sans font-bold text-green-700 uppercase tracking-widest">FREE</span>
                          </div>
                          <p className="font-sans text-stone text-xs leading-relaxed">
                            A beautiful card signed by Chef Shalini Singh herself, sealed with premium cocoa gold-wax crests.
                          </p>
                          {bumpNote && (
                            <input
                              type="text"
                              maxLength={150}
                              value={bumpNoteText}
                              onChange={e => setBumpNoteText(e.target.value)}
                              placeholder="Write message for handwritten note..."
                              className="w-full px-4 py-2.5 bg-cream border border-cocoa/30 text-xs font-sans focus:outline-none focus:border-primary mt-2"
                            />
                          )}
                        </div>
                      </div>

                      {/* Ladurée Wrapping box */}
                      <div className={`p-4 border flex items-start gap-4 transition-all ${bumpWrap ? "bg-primary/5 border-primary" : "bg-cream border-cocoa/25"}`}>
                        <input
                          type="checkbox"
                          id="bump-wrap-check"
                          checked={bumpWrap}
                          onChange={e => setBumpWrap(e.target.checked)}
                          className="w-4 h-4 text-primary border-cocoa/30 focus:ring-0 mt-1 cursor-pointer"
                        />
                        <div className="flex-grow space-y-1">
                          <div className="flex justify-between items-baseline">
                            <label htmlFor="bump-wrap-check" className="font-serif text-base font-semibold text-cocoa cursor-pointer">
                              Premium Ribbon Box Gift Wrap
                            </label>
                            <span className="text-xs font-serif font-semibold text-gold">₹99</span>
                          </div>
                          <p className="font-sans text-stone text-xs leading-relaxed">
                            Exquisite textured ivory paper wrap, silk-tied caramel ribbons, and a delicate sprig of fresh lavender.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Razorpay Call */}
                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full py-4 bg-cocoa hover:bg-primary text-cream text-xs font-sans font-bold uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    {processing ? (
                      <span>Initiating UPI Gateway...</span>
                    ) : (
                      <>
                        <ShieldCheck size={16} />
                        <span>Securely Pay ₹{totalAmount}</span>
                      </>
                    )}
                  </button>

                </form>

                {/* Recalculating totals sidebar - 5 columns */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="border border-cocoa/15 bg-cream/40 p-6 space-y-6 text-left">
                    <h3 className="font-serif text-xl font-medium border-b border-cocoa/10 pb-4 flex items-center gap-2">
                      <ShoppingBag size={18} className="text-gold" />
                      <span>Bespoke Cart Ledger</span>
                    </h3>

                    <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 scrollbar-thin">
                      {cart.map((item, idx) => (
                        <div key={idx} className="flex gap-4 border-b border-cocoa/10 pb-4">
                          <div className="w-16 h-16 bg-cocoa/10 bg-cover bg-center border border-cocoa/10 flex-shrink-0" style={{ backgroundImage: `url(${item.image})` }} />
                          <div className="flex-grow space-y-1">
                            <div className="flex justify-between items-start">
                              <h4 className="font-serif text-base font-semibold text-cocoa leading-tight">{item.name}</h4>
                              <button 
                                type="button"
                                onClick={() => handleRemoveFromCart(item.id, item.isEggless)}
                                className="text-[9px] font-sans uppercase font-bold tracking-wider text-red-600 hover:text-red-800 transition-colors"
                              >
                                Remove
                              </button>
                            </div>
                            
                            <p className="text-[10px] font-sans text-stone uppercase tracking-wider font-semibold">
                              ₹{item.price} • HSN: Confectionery
                            </p>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 pt-1">
                              <button 
                                type="button"
                                disabled={item.quantity <= (item.min_quantity || 1)}
                                onClick={() => handleUpdateQuantity(item.id, item.isEggless, -1)}
                                className="w-5 h-5 rounded-full bg-cocoa/5 hover:bg-cocoa/10 text-cocoa disabled:opacity-40 disabled:hover:bg-cocoa/5 flex items-center justify-center font-sans font-bold text-xs transition-colors"
                                title={`Min quantity: ${item.min_quantity || 1}`}
                              >
                                –
                              </button>
                              <span className="font-sans text-xs font-semibold text-cocoa w-6 text-center">{item.quantity}</span>
                              <button 
                                type="button"
                                onClick={() => handleUpdateQuantity(item.id, item.isEggless, 1)}
                                className="w-5 h-5 rounded-full bg-cocoa/5 hover:bg-cocoa/10 text-cocoa flex items-center justify-center font-sans font-bold text-xs transition-colors"
                              >
                                +
                              </button>
                              {item.min_quantity > 1 && (
                                <span className="text-[8px] font-sans text-stone uppercase tracking-widest font-semibold ml-2">Min: {item.min_quantity}</span>
                              )}
                            </div>

                            {item.isEggless && (
                              <span className="inline-block bg-green-50 text-green-700 text-[8px] font-sans uppercase tracking-widest px-2 py-0.5 font-bold mt-1">Eggless</span>
                            )}
                            {item.cakeMessage && (
                              <p className="text-[10px] font-sans text-cocoa leading-relaxed bg-cream p-2 italic border-l border-primary mt-1">"{item.cakeMessage}"</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Progress Bar for Free Delivery */}
                    <div className="space-y-2 py-3 border-t border-b border-cocoa/10 my-4">
                      <div className="flex justify-between text-[10px] font-sans uppercase tracking-wider font-semibold text-stone">
                        {cartSubtotal < deliverySettings.freeThreshold ? (
                          <span>Add <strong className="text-cocoa">₹{deliverySettings.freeThreshold - cartSubtotal}</strong> more for FREE delivery</span>
                        ) : (
                          <span className="text-green-700 font-bold">✓ You qualify for FREE fresh delivery!</span>
                        )}
                        <span>₹{cartSubtotal} / ₹{deliverySettings.freeThreshold}</span>
                      </div>
                      <div className="w-full h-1.5 bg-cocoa/5 rounded-full overflow-hidden border border-cocoa/10">
                        <div 
                          className="h-full bg-gold transition-all duration-500 rounded-full" 
                          style={{ width: `${Math.min(100, (cartSubtotal / deliverySettings.freeThreshold) * 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Calculations ledger display */}
                    <div className="space-y-3 font-sans text-xs text-stone">
                      <div className="flex justify-between">
                        <span>Bakes Subtotal</span>
                        <span className="font-semibold text-cocoa">₹{cartSubtotal}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Bhopal Local Delivery fee</span>
                        <span className="font-semibold text-cocoa">
                          {deliveryFee === 0 ? "FREE Delivery" : `₹${deliveryFee}`}
                        </span>
                      </div>

                      {bumpWrap && (
                        <div className="flex justify-between">
                          <span>Gift Ribbon Box Wrapping</span>
                          <span className="font-semibold text-cocoa">+₹99</span>
                        </div>
                      )}

                      <div className="flex justify-between text-cocoa/80 text-[10px] uppercase tracking-wider border-t border-cocoa/10 pt-2">
                        <span>Free shipping threshold</span>
                        <span>Order &gt; ₹1,000</span>
                      </div>

                      <div className="flex justify-between items-baseline border-t border-cocoa/15 pt-4 text-base text-cocoa">
                        <span className="font-serif text-lg font-medium">Grand Total</span>
                        <span className="font-serif text-2xl font-bold">₹{totalAmount}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </section>
        )}

        {/* ==========================================
            ROUTER 4: SUCCESS RECEIPT & GRATITUDE
            ========================================== */}
        {currentPage === "confirm" && (
          <section className="max-w-3xl mx-auto px-6 py-24 text-center space-y-12">
            <div className="space-y-4 flex flex-col items-center">
              <Check className="text-gold w-16 h-16 border-2 border-gold rounded-full p-2.5 animate-pulse" />
              <span className="text-[10px] font-sans text-gold uppercase tracking-[0.3em] font-semibold">Payment webhook success</span>
              <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight">Chapter Confirmed</h1>
              <p className="font-sans text-stone text-xs uppercase tracking-widest">
                Order Code: <strong className="text-cocoa">{orderId}</strong>
              </p>
            </div>

            {/* Gratitude Letter */}
            <div className="border border-gold/30 bg-cream p-8 md:p-12 text-left space-y-6 relative shadow-sm">
              <div className="absolute -top-3 left-8 bg-gold text-cream px-4 py-0.5 text-[8px] font-sans font-bold uppercase tracking-widest">
                Chef de Pâtisserie Correspondence
              </div>
              <p className="font-serif text-lg md:text-xl italic text-cocoa/90 leading-relaxed pt-2">
                "Thank you for letting us bake a chapter of your celebrations. Every fold of real French butter, split Madagascar pod, and tempering of single-origin cocoa is crafted strictly to our ex-Taj hotel standards. We hope it brings comfort and absolute delight."
              </p>
              
              {bumpNoteText && (
                <div className="p-4 bg-[#F5F5F5] border-l border-primary font-sans text-xs italic space-y-1">
                  <span className="text-[9px] uppercase tracking-widest text-stone font-bold not-italic">Chef's Card Inscription:</span>
                  <p>"{bumpNoteText}"</p>
                </div>
              )}

              <div className="border-t border-cocoa/10 pt-6 flex justify-between items-center">
                <div>
                  <p className="font-sans text-[10px] text-stone uppercase tracking-widest">Patisserie Founder</p>
                  <p className="font-signature text-4xl text-primary mt-1">Shalini Singh</p>
                </div>
                <svg className="w-16 h-8 text-primary stroke-current" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 25 C 20 5, 40 45, 50 25 C 60 5, 80 45, 90 25" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="90" cy="25" r="2" fill="currentColor" />
                </svg>
              </div>
            </div>

            {/* Delivery scheduling summary */}
            <div className="border border-cocoa/10 p-6 text-left font-sans text-xs space-y-4 bg-cream/40">
              <h4 className="font-serif text-base font-semibold text-cocoa">Baking Slots Dispatch Card</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-stone uppercase text-[9px] block">Bhopal Target Date</span>
                  <span className="font-semibold text-cocoa text-sm">{deliveryDate}</span>
                </div>
                <div>
                  <span className="text-stone uppercase text-[9px] block">Time Slot Reserved</span>
                  <span className="font-semibold text-cocoa text-sm">{deliverySlot}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-stone uppercase text-[9px] block">WhatsApp notifications status</span>
                  <span className="text-success font-semibold flex items-center gap-1.5 mt-0.5">
                    <ShieldCheck size={12} /> Active: Confirmation message pushed to mobile phone.
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 border-t border-cocoa/10">
              <button 
                onClick={handleSendWhatsAppSummary}
                className="px-8 py-4 bg-[#25D366] hover:bg-[#20BA5A] text-cream text-[10px] font-sans font-bold uppercase tracking-[0.2em] transition-all text-center w-full sm:w-auto flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <MessageCircle size={14} className="fill-current stroke-none" /> Send Summary to Chef's WhatsApp
              </button>
              <button 
                onClick={() => {
                  setCart([]);
                  setBumpWrap(false);
                  setBumpNote(false);
                  setBumpNoteText("");
                  setCurrentPage("home");
                }}
                className="px-8 py-4 bg-cocoa hover:bg-primary text-cream text-[10px] font-sans font-bold uppercase tracking-[0.2em] transition-all text-center w-full sm:w-auto cursor-pointer"
              >
                Return to Salon Home
              </button>
            </div>

          </section>
        )}

        {/* ==========================================
            ROUTER 5: ADMIN PORTAL
            ========================================== */}
        {currentPage === "admin" && (
          <section className="max-w-6xl mx-auto px-6 py-12 space-y-8 min-h-[60vh] text-left">
            <div className="border-b border-cocoa/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-sans text-gold uppercase tracking-[0.3em] font-semibold text-left">Administrative Coordinates</span>
                <h1 className="font-serif text-3xl font-medium tracking-tight text-cocoa text-left">Chef's Management Salon</h1>
              </div>
              {adminToken && (
                <div className="flex items-center gap-4">
                  <span className="font-sans text-xs text-stone">Logged in as <strong>Chef Shalini Singh</strong></span>
                  <button 
                    onClick={() => {
                      localStorage.removeItem("adminToken");
                      setAdminToken("");
                      alert("Successfully logged out from administrative salon.");
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-red-200 text-red-700 bg-red-50 hover:bg-red-100 font-sans text-[10px] uppercase tracking-wider font-bold transition-all rounded"
                  >
                    <LogOut size={12} /> Log Out
                  </button>
                </div>
              )}
            </div>

            {/* Admin Login Form */}
            {!adminToken ? (
              <div className="max-w-md mx-auto py-12 text-left">
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!adminPassword) return;
                    setProcessing(true);
                    try {
                      const res = await fetch("http://localhost:9000/api/admin/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ password: adminPassword })
                      });
                      if (res.ok) {
                        const data = await res.json();
                        localStorage.setItem("adminToken", data.token);
                        setAdminToken(data.token);
                        setAdminPassword("");
                        // Fetch fresh orders and settings
                        fetchAdminOrders();
                        // Get settings
                        const settingsRes = await fetch("http://localhost:9000/api/settings");
                        if (settingsRes.ok) {
                          const settingsData = await settingsRes.json();
                          setDeliverySettings(settingsData);
                        }
                      } else {
                        const err = await res.json();
                        alert(err.detail || "Authentication Failed.");
                      }
                    } catch (err) {
                      alert("Unable to reach administrative server.");
                    } finally {
                      setProcessing(false);
                    }
                  }}
                  className="bg-cream border border-gold/30 p-8 space-y-6 relative shadow-md"
                >
                  <div className="absolute -top-3 left-6 bg-gold text-cream px-3 py-0.5 text-[8px] font-sans font-bold uppercase tracking-widest">
                    Gate Access Required
                  </div>
                  <div className="space-y-2">
                    <label className="font-serif text-sm font-medium text-cocoa flex items-center gap-1.5">
                      <Lock size={14} className="text-gold" /> Administrative Password
                    </label>
                    <input 
                      type="password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="Enter Chef's password..."
                      className="w-full bg-[#FAFAFA] border border-cocoa/20 px-4 py-3 text-xs font-sans focus:outline-none focus:border-gold transition-colors text-cocoa font-bold"
                      required
                    />
                    <p className="text-[10px] font-sans text-stone italic text-cocoa/50 mt-1">
                      Developer review default password: <code className="font-mono bg-cocoa/5 px-1 py-0.5 rounded text-cocoa">ShaliniTajBakery2025</code>
                    </p>
                  </div>
                  <button 
                    type="submit"
                    disabled={processing}
                    className="w-full bg-cocoa hover:bg-primary text-cream text-[10px] font-sans font-bold uppercase tracking-[0.2em] py-3.5 transition-all"
                  >
                    {processing ? "Decrypting Session..." : "Authorize Access"}
                  </button>
                </form>
              </div>
            ) : (
              // Administrative Panel Workspace
              <div className="space-y-6 text-left">
                {/* Tabs Selector */}
                <div className="flex border-b border-cocoa/10 font-sans text-[10px] uppercase tracking-widest font-bold">
                  <button 
                    onClick={() => { setAdminTab("orders"); fetchAdminOrders(); }}
                    className={`px-6 py-3 border-b-2 transition-all ${adminTab === "orders" ? "border-gold text-cocoa bg-cream/40" : "border-transparent text-stone hover:text-cocoa"}`}
                  >
                    Orders Dashboard
                  </button>
                  <button 
                    onClick={() => setAdminTab("products")}
                    className={`px-6 py-3 border-b-2 transition-all ${adminTab === "products" ? "border-gold text-cocoa bg-cream/40" : "border-transparent text-stone hover:text-cocoa"}`}
                  >
                    Product Manager
                  </button>
                  <button 
                    onClick={() => setAdminTab("settings")}
                    className={`px-6 py-3 border-b-2 transition-all ${adminTab === "settings" ? "border-gold text-cocoa bg-cream/40" : "border-transparent text-stone hover:text-cocoa"}`}
                  >
                    Delivery & Cutoffs
                  </button>
                </div>

                {/* TAB 1: ORDERS DASHBOARD */}
                {adminTab === "orders" && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                      <div className="relative w-full sm:w-80">
                        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone/60" />
                        <input 
                          type="text"
                          value={adminOrdersSearch}
                          onChange={(e) => setAdminOrdersSearch(e.target.value)}
                          placeholder="Search customer, ID, status..."
                          className="w-full bg-[#FAFAFA] border border-cocoa/20 pl-9 pr-4 py-2 text-xs font-sans focus:outline-none focus:border-gold transition-colors text-cocoa"
                        />
                      </div>
                      <button 
                        onClick={() => fetchAdminOrders()}
                        className="flex items-center gap-1.5 px-4 py-2 bg-cream hover:bg-gold/10 border border-gold/30 text-cocoa font-sans text-[10px] uppercase tracking-wider font-bold transition-all"
                      >
                        <RefreshCw size={12} className={processing ? "animate-spin" : ""} /> Refresh Orders
                      </button>
                    </div>

                    {/* Orders List */}
                    <div className="space-y-4">
                      {adminOrders.length === 0 ? (
                        <div className="text-center py-12 bg-cream/20 border border-dashed border-cocoa/10 rounded font-sans text-xs text-stone">
                          No orders staged in the database session yet. Create some mock orders on checkout!
                        </div>
                      ) : (
                        adminOrders
                          .filter(order => {
                            const term = adminOrdersSearch.toLowerCase();
                            return (
                              order.id.toLowerCase().includes(term) ||
                              order.customer.name.toLowerCase().includes(term) ||
                              order.customer.phone.toLowerCase().includes(term) ||
                              order.status.toLowerCase().includes(term)
                            );
                          })
                          .map(order => {
                            // Badge Colors helper
                            const getBadgeClass = (status: string) => {
                              switch(status) {
                                case "new": return "bg-amber-100 text-amber-800 border-amber-200";
                                case "preparing": return "bg-orange-100 text-orange-800 border-orange-200";
                                case "out_for_delivery": return "bg-blue-100 text-blue-800 border-blue-200";
                                case "delivered": return "bg-green-100 text-green-800 border-green-200";
                                case "cancelled": return "bg-rose-100 text-rose-800 border-rose-200";
                                default: return "bg-stone-100 text-stone-800 border-stone-200";
                              }
                            };

                            const handleStatusUpdate = async (newStatus: string) => {
                              try {
                                const res = await fetch(`http://localhost:9000/api/orders/${order.id}/status`, {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ status: newStatus })
                                });
                                if (res.ok) {
                                  fetchAdminOrders();
                                  alert(`Successfully updated Order ${order.id} status to '${newStatus}'. Notifications printed to backend console!`);
                                }
                              } catch (err) {
                                alert("Failed to transition status.");
                              }
                            };

                            return (
                              <div key={order.id} className="bg-cream border border-cocoa/10 p-6 space-y-4 hover:shadow-sm transition-all text-cocoa text-left">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cocoa/5 pb-3">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <span className="font-serif text-sm font-bold tracking-tight">{order.id}</span>
                                      <span className={`px-2 py-0.5 text-[8px] font-sans font-bold uppercase tracking-wider border rounded ${getBadgeClass(order.status)}`}>
                                        {order.status}
                                      </span>
                                    </div>
                                    <span className="text-[10px] font-sans text-stone block">Created: {new Date(order.created_at || Date.now()).toLocaleString("en-IN")}</span>
                                  </div>
                                  <div className="flex flex-wrap gap-1 items-center">
                                    <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-stone mr-2">Fulfill:</span>
                                    {["new", "preparing", "out_for_delivery", "delivered", "cancelled"].map(st => (
                                      <button 
                                        key={st}
                                        onClick={() => handleStatusUpdate(st)}
                                        disabled={order.status === st}
                                        className={`px-2 py-1 font-sans text-[8px] font-bold uppercase tracking-wider border transition-all ${order.status === st ? "bg-cocoa text-cream border-cocoa cursor-not-allowed opacity-50 font-bold" : "bg-white hover:bg-cocoa/5 text-stone border-cocoa/10"}`}
                                      >
                                        {st.replace("_", " ")}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs">
                                  {/* Col 1: Customer Info */}
                                  <div className="space-y-2 text-left">
                                    <h4 className="font-serif text-xs font-semibold text-cocoa tracking-wider uppercase border-b border-cocoa/5 pb-1">Patron Information</h4>
                                    <div className="space-y-1 text-stone">
                                      <p className="font-semibold text-cocoa">{order.customer.name}</p>
                                      <p>Phone: {order.customer.phone}</p>
                                      <p>Email: {order.customer.email}</p>
                                      <p>Pincode: {order.customer.pincode}</p>
                                      <p className="italic bg-[#F5F5F5] p-2 mt-1.5 text-[11px] text-cocoa leading-relaxed border-l-2 border-gold/30">Address: {order.customer.address}</p>
                                    </div>
                                  </div>

                                  {/* Col 2: Order Items */}
                                  <div className="space-y-2 text-left">
                                    <h4 className="font-serif text-xs font-semibold text-cocoa tracking-wider uppercase border-b border-cocoa/5 pb-1">Baking Checklist</h4>
                                    <ul className="space-y-2">
                                      {order.items.map((item: any, idx: number) => (
                                        <li key={idx} className="border-b border-cocoa/5 pb-1.5 last:border-b-0">
                                          <div className="flex justify-between">
                                            <span className="font-semibold text-cocoa">{item.name || item.title} <strong className="text-gold font-bold">x{item.quantity}</strong></span>
                                            <span className="text-stone font-semibold">₹{item.price * item.quantity}</span>
                                          </div>
                                          <div className="flex gap-2 text-[9px] mt-0.5 text-stone uppercase tracking-wider">
                                            {item.isEggless && <span className="text-green-700 font-bold">● Eggless</span>}
                                            {item.cakeMessage && <span className="text-primary italic font-semibold">Msg: "{item.cakeMessage}"</span>}
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  {/* Col 3: Delivery & Billing */}
                                  <div className="space-y-2 text-left">
                                    <h4 className="font-serif text-xs font-semibold text-cocoa tracking-wider uppercase border-b border-cocoa/5 pb-1">Delivery & Billing</h4>
                                    <div className="space-y-1.5 text-stone text-[11px]">
                                      <div className="flex justify-between">
                                        <span>Target Slot:</span>
                                        <span className="font-semibold text-cocoa">{order.delivery.date} ({order.delivery.slot})</span>
                                      </div>
                                      <div className="flex justify-between border-t border-cocoa/5 pt-1.5">
                                        <span>Subtotal:</span>
                                        <span className="font-semibold">₹{order.billing.subtotal}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Fulfillment Fee:</span>
                                        <span className="font-semibold">{order.delivery.charge === 0 ? "FREE" : `₹${order.delivery.charge}`}</span>
                                      </div>
                                      {order.billing.bumps > 0 && (
                                        <div className="flex justify-between">
                                          <span>Gift Box Wrapping:</span>
                                          <span className="font-semibold">+₹{order.billing.bumps}</span>
                                        </div>
                                      )}
                                      <div className="flex justify-between border-t border-cocoa/10 pt-1.5 font-serif text-sm font-bold text-cocoa">
                                        <span>Grand Total:</span>
                                        <span className="text-primary">₹{order.billing.total}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 2: PRODUCT MANAGER */}
                {adminTab === "products" && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                      <div className="relative w-full sm:w-80">
                        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone/60" />
                        <input 
                          type="text"
                          value={adminProductsSearch}
                          onChange={(e) => setAdminProductsSearch(e.target.value)}
                          placeholder="Search product by name or category..."
                          className="w-full bg-[#FAFAFA] border border-cocoa/20 pl-9 pr-4 py-2 text-xs font-sans focus:outline-none focus:border-gold transition-colors text-cocoa"
                        />
                      </div>
                      <button 
                        onClick={() => {
                          setEditingProduct(null);
                          setProductForm({
                            name: "",
                            category: "Jar Cakes",
                            price: 0,
                            weight: "1 Jar",
                            min_quantity: 1,
                            description: "",
                            image: "",
                            is_available: true
                          });
                          setIsProductModalOpen(true);
                        }}
                        className="flex items-center gap-1.5 px-4 py-2.5 bg-cocoa hover:bg-primary text-cream font-sans text-[10px] uppercase tracking-wider font-bold transition-all"
                      >
                        <Plus size={12} /> Add New Bake Product
                      </button>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {productsList
                        .filter(prod => {
                          const term = adminProductsSearch.toLowerCase();
                          return prod.name.toLowerCase().includes(term) || prod.category.toLowerCase().includes(term);
                        })
                        .map(product => {
                          const toggleAvailability = async () => {
                            try {
                              const updatedProduct = { ...product, is_available: !product.is_available };
                              const res = await fetch(`http://localhost:9000/api/products/${product.id}`, {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(updatedProduct)
                              });
                              if (res.ok) {
                                setProductsList(productsList.map(p => p.id === product.id ? updatedProduct : p));
                              }
                            } catch (err) {
                              alert("Error toggling product status.");
                            }
                          };

                          const handleDeleteProduct = async () => {
                            if (!confirm(`Are you absolutely sure you want to delete ${product.name}?`)) return;
                            try {
                              const res = await fetch(`http://localhost:9000/api/products/${product.id}`, {
                                method: "DELETE"
                              });
                              if (res.ok) {
                                setProductsList(productsList.filter(p => p.id !== product.id));
                                alert("Product deleted successfully.");
                              }
                            } catch (err) {
                              alert("Error deleting product.");
                            }
                          };

                          return (
                            <div key={product.id} className="bg-cream border border-cocoa/10 p-4 flex gap-4 text-cocoa shadow-sm text-left">
                              <img 
                                src={product.image || "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=200&auto=format&fit=crop"} 
                                alt={product.name}
                                className="w-20 h-20 object-cover border border-cocoa/10 shrink-0"
                              />
                              <div className="flex-grow space-y-1 text-left min-w-0 font-sans text-xs">
                                <div className="flex justify-between items-start gap-1">
                                  <h3 className="font-serif text-sm font-bold text-cocoa leading-tight truncate">{product.name}</h3>
                                  <span className="font-serif text-xs font-bold text-primary shrink-0">₹{product.price}</span>
                                </div>
                                <div className="flex gap-2 text-[9px] uppercase tracking-wider font-semibold text-stone">
                                  <span>{product.category}</span>
                                  <span>•</span>
                                  <span>{product.weight}</span>
                                  <span>•</span>
                                  <span>Min: {product.min_quantity}</span>
                                </div>
                                <p className="text-[10px] text-stone leading-relaxed line-clamp-2">{product.description}</p>
                                
                                <div className="flex items-center justify-between pt-2 border-t border-cocoa/5 mt-2 gap-2">
                                  <div className="flex items-center gap-1.5">
                                    <button 
                                      onClick={toggleAvailability}
                                      className={`px-2 py-0.5 text-[8px] font-sans font-bold uppercase tracking-wider rounded transition-all border ${product.is_available !== false ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" : "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"}`}
                                    >
                                      {product.is_available !== false ? "● Available" : "○ Sold Out"}
                                    </button>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <button 
                                      onClick={() => {
                                        setEditingProduct(product);
                                        setProductForm({
                                          name: product.name,
                                          category: product.category,
                                          price: product.price,
                                          weight: product.weight,
                                          min_quantity: product.min_quantity || 1,
                                          description: product.description,
                                          image: product.image || "",
                                          is_available: product.is_available !== false
                                        });
                                        setIsProductModalOpen(true);
                                      }}
                                      className="px-2 py-1 font-sans text-[8px] font-bold uppercase tracking-wider border border-cocoa/10 hover:bg-cocoa/5 text-stone"
                                    >
                                      Edit
                                    </button>
                                    <button 
                                      onClick={handleDeleteProduct}
                                      className="px-2 py-1 font-sans text-[8px] font-bold uppercase tracking-wider border border-red-200 hover:bg-red-50 text-red-700"
                                    >
                                      <Trash2 size={9} className="inline mr-0.5" /> Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}

                {/* TAB 3: SALON SETTINGS */}
                {adminTab === "settings" && (
                  <div className="max-w-xl bg-cream border border-cocoa/10 p-8 space-y-6 relative shadow-sm text-cocoa text-left">
                    <div className="absolute -top-3 left-6 bg-gold text-cream px-3 py-0.5 text-[8px] font-sans font-bold uppercase tracking-widest">
                      Rules Coordinates
                    </div>
                    <h3 className="font-serif text-lg font-semibold tracking-tight border-b border-cocoa/5 pb-2">Patron Delivery Policies</h3>
                    
                    <form 
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setProcessing(true);
                        try {
                          const res = await fetch("http://localhost:9000/api/settings", {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(deliverySettings)
                          });
                          if (res.ok) {
                            const data = await res.json();
                            setDeliverySettings(data);
                            alert("Delivery and Cutoff parameters updated in real-time successfully!");
                          }
                        } catch (err) {
                          alert("Failed to sync settings.");
                        } finally {
                          setProcessing(false);
                        }
                      }}
                      className="space-y-5 text-xs font-sans"
                    >
                      <div className="space-y-1.5 text-left">
                        <label className="font-serif text-xs font-bold text-cocoa tracking-wider uppercase">Bhopal Flat delivery fee</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-sans font-bold text-stone">₹</span>
                          <input 
                            type="number"
                            value={deliverySettings.deliveryFee}
                            onChange={(e) => setDeliverySettings({ ...deliverySettings, deliveryFee: Number(e.target.value) })}
                            className="w-full bg-[#FAFAFA] border border-cocoa/20 pl-7 pr-4 py-2.5 font-sans focus:outline-none focus:border-gold transition-colors text-cocoa font-bold text-sm"
                            required
                            min="0"
                          />
                        </div>
                        <p className="text-[10px] text-stone italic text-[#D7CCC8]/70">Standard fresh local courier delivery charge when subtotal is below the cutoff threshold.</p>
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label className="font-serif text-xs font-bold text-cocoa tracking-wider uppercase">Free delivery subtotal threshold</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-sans font-bold text-stone">₹</span>
                          <input 
                            type="number"
                            value={deliverySettings.freeThreshold}
                            onChange={(e) => setDeliverySettings({ ...deliverySettings, freeThreshold: Number(e.target.value) })}
                            className="w-full bg-[#FAFAFA] border border-cocoa/20 pl-7 pr-4 py-2.5 font-sans focus:outline-none focus:border-gold transition-colors text-cocoa font-bold text-sm"
                            required
                            min="0"
                          />
                        </div>
                        <p className="text-[10px] text-stone italic text-[#D7CCC8]/70">The minimum subtotal value above which the local delivery charges are completely waived (FREE delivery).</p>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-[#FAFAFA] border border-cocoa/15 my-4 text-left">
                        <div className="space-y-0.5">
                          <span className="font-serif text-xs font-bold text-cocoa tracking-wider uppercase block">Same-Day fresh delivery</span>
                          <span className="text-[10px] text-stone leading-relaxed block max-w-sm text-[#D7CCC8]/70">Enable patrons to order same-day items before the 1:00 PM cutoff time. If disabled, orders are forced to next-day onwards.</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer select-none shrink-0 ml-4">
                          <input 
                            type="checkbox"
                            checked={deliverySettings.sameDayActive}
                            onChange={(e) => setDeliverySettings({ ...deliverySettings, sameDayActive: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-10 h-6 bg-stone/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone/30 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                        </label>
                      </div>

                      <button 
                        type="submit"
                        disabled={processing}
                        className="w-full bg-cocoa hover:bg-primary text-cream text-[10px] font-sans font-bold uppercase tracking-[0.2em] py-3.5 transition-all font-bold"
                      >
                        {processing ? "Saving..." : "Apply Salon Parameters"}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* Product CRUD Dialog Modal Overlay */}
        {isProductModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa/50 backdrop-blur-sm p-4">
            <div className="bg-cream border border-gold/30 p-6 md:p-8 space-y-6 relative shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto text-left text-cocoa">
              <button 
                onClick={() => setIsProductModalOpen(false)}
                className="absolute top-4 right-4 text-stone hover:text-cocoa transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="absolute -top-3 left-6 bg-gold text-cream px-3 py-0.5 text-[8px] font-sans font-bold uppercase tracking-widest">
                {editingProduct ? "Revise Bake Coordinate" : "Formulate Novel Bake"}
              </div>

              <h2 className="font-serif text-xl font-semibold tracking-tight">
                {editingProduct ? `Edit Product: ${editingProduct.name}` : "Create New Bakery Product"}
              </h2>

              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  setProcessing(true);
                  try {
                    const method = editingProduct ? "PUT" : "POST";
                    const url = editingProduct 
                      ? `http://localhost:9000/api/products/${editingProduct.id}`
                      : "http://localhost:9000/api/products";
                    
                    const res = await fetch(url, {
                      method,
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(productForm)
                    });

                    if (res.ok) {
                      const data = await res.json();
                      if (editingProduct) {
                        setProductsList(productsList.map(p => p.id === editingProduct.id ? data.product : p));
                        alert("Product updated successfully in real-time!");
                      } else {
                        setProductsList([data.product, ...productsList]);
                        alert("New product created successfully in real-time!");
                      }
                      setIsProductModalOpen(false);
                    } else {
                      alert("Error processing product details.");
                    }
                  } catch (err) {
                    alert("Unable to contact administrative server.");
                  } finally {
                    setProcessing(false);
                  }
                }}
                className="space-y-4 text-xs font-sans text-left"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-stone uppercase text-[9px] tracking-wider">Product Name</label>
                    <input 
                      type="text"
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      placeholder="e.g. Lavender Honey Scone"
                      className="w-full bg-[#FAFAFA] border border-cocoa/20 px-3.5 py-2 font-sans focus:outline-none focus:border-gold transition-colors text-cocoa"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-stone uppercase text-[9px] tracking-wider">Category Tab</label>
                    <select 
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      className="w-full bg-[#FAFAFA] border border-cocoa/20 px-3.5 py-2 font-sans focus:outline-none focus:border-gold transition-colors text-cocoa"
                      required
                    >
                      {["Jar Cakes", "Brownies", "Tea Cakes", "Muffins", "Donuts", "Cookies", "Cakes", "Cheesecakes", "Valentine Hampers"].map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-stone uppercase text-[9px] tracking-wider">Price (₹)</label>
                    <input 
                      type="number"
                      value={productForm.price || ""}
                      onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                      placeholder="e.g. 250"
                      className="w-full bg-[#FAFAFA] border border-cocoa/20 px-3.5 py-2 font-sans focus:outline-none focus:border-gold transition-colors text-cocoa"
                      required
                      min="0"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-stone uppercase text-[9px] tracking-wider">Serving Weight</label>
                    <input 
                      type="text"
                      value={productForm.weight}
                      onChange={(e) => setProductForm({ ...productForm, weight: e.target.value })}
                      placeholder="e.g. 500g, 1 pc, 1 Jar"
                      className="w-full bg-[#FAFAFA] border border-cocoa/20 px-3.5 py-2 font-sans focus:outline-none focus:border-gold transition-colors text-cocoa"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-stone uppercase text-[9px] tracking-wider">Minimum Quantity</label>
                    <input 
                      type="number"
                      value={productForm.min_quantity}
                      onChange={(e) => setProductForm({ ...productForm, min_quantity: Number(e.target.value) })}
                      className="w-full bg-[#FAFAFA] border border-cocoa/20 px-3.5 py-2 font-sans focus:outline-none focus:border-gold transition-colors text-cocoa"
                      required
                      min="1"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2 border border-gold/10 p-3 bg-cream/40 rounded flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <label className="font-bold text-stone uppercase text-[9px] tracking-wider">Product Visual Asset</label>
                      {productForm.image && (
                        <span className="text-[8px] font-sans text-green-700 font-bold">✓ Photo Attached</span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
                      <div className="space-y-1">
                        <span className="text-[8px] font-sans uppercase text-stone font-semibold block">Option A: Upload Local Image File</span>
                        <input 
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            
                            const formData = new FormData();
                            formData.append("file", file);
                            
                            setProcessing(true);
                            try {
                              const res = await fetch("http://localhost:9000/api/admin/upload", {
                                method: "POST",
                                body: formData
                              });
                              if (res.ok) {
                                const data = await res.json();
                                setProductForm({ ...productForm, image: data.imageUrl });
                                alert("✓ Chef's real bake photo uploaded successfully!");
                              } else {
                                const err = await res.json();
                                alert(err.detail || "Image upload failed.");
                              }
                            } catch (err) {
                              alert("Unable to contact administrative uploads server.");
                            } finally {
                              setProcessing(false);
                            }
                          }}
                          className="w-full bg-[#FAFAFA] border border-cocoa/20 px-2 py-1 text-[10px] font-sans file:bg-cocoa file:text-cream file:border-none file:px-2.5 file:py-1 file:text-[9px] file:uppercase file:font-sans file:font-bold file:mr-2 file:cursor-pointer hover:file:bg-primary transition-all text-cocoa"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[8px] font-sans uppercase text-stone font-semibold block">Option B: Enter Web Photo URL</span>
                        <input 
                          type="url"
                          value={productForm.image}
                          onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full bg-[#FAFAFA] border border-cocoa/20 px-3.5 py-2.5 font-sans focus:outline-none focus:border-gold text-cocoa text-[10px] h-[30px]"
                        />
                      </div>
                    </div>
                    {productForm.image && (
                      <div className="mt-1 flex items-center gap-2 border border-cocoa/10 p-2 bg-white rounded">
                        <img 
                          src={productForm.image} 
                          alt="Bake preview"
                          className="w-10 h-10 object-cover border border-cocoa/5 shrink-0" 
                        />
                        <span className="text-[8px] font-mono text-stone break-all truncate">{productForm.image}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <label className="font-bold text-stone uppercase text-[9px] tracking-wider">Detailed Description</label>
                  <textarea 
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    placeholder="Describe textures, aroma, and Taj-level patisserie notes..."
                    rows={3}
                    className="w-full bg-[#FAFAFA] border border-cocoa/20 px-3.5 py-2 font-sans focus:outline-none focus:border-gold transition-colors text-cocoa resize-none"
                    required
                  />
                </div>

                <div className="flex items-center gap-2 py-2 select-none cursor-pointer">
                  <input 
                    type="checkbox"
                    id="is_available_box"
                    checked={productForm.is_available}
                    onChange={(e) => setProductForm({ ...productForm, is_available: e.target.checked })}
                    className="h-4 w-4 text-gold border-cocoa/20 focus:ring-gold"
                  />
                  <label htmlFor="is_available_box" className="font-bold text-cocoa uppercase text-[9px] tracking-wider select-none cursor-pointer">Set Bake Available instantly on storefront</label>
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t border-cocoa/10">
                  <button 
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="px-4 py-2 border border-cocoa/20 text-cocoa text-[10px] font-sans uppercase tracking-widest hover:bg-cocoa/5 font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={processing}
                    className="px-6 py-2 bg-cocoa hover:bg-primary text-cream text-[10px] font-sans font-bold uppercase tracking-widest transition-all font-bold"
                  >
                    {processing ? "Processing..." : editingProduct ? "Commit Revision" : "Formulate Bake"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>

      {/* Exquisite Footer (Aesop & Ladurée Inspired) */}
      <footer className="bg-cocoa text-cream pt-20 pb-10 border-t border-primary/20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-primary/10 pb-12 text-left">
          
          <div className="space-y-4">
            <h3 className="font-serif text-2xl italic tracking-wide">The Sugar Story</h3>
            <p className="font-sans text-xs italic text-primary">"Every bite, a chapter."</p>
            <p className="font-sans text-stone text-xs leading-relaxed max-w-sm text-[#D7CCC8] text-left">
              Established in Bhopal by ex-Taj Pastry Chef Shalini Singh. We reject industrial cake stabilizers and additives, crafting customized celebration chapters utilizing pure European dairy fats and Madagascar vanilla bean pods.
            </p>
          </div>

          <div className="space-y-4 text-left">
            <h4 className="font-serif text-base tracking-widest text-primary uppercase font-bold">Salon Coordinates</h4>
            <ul className="space-y-2.5 font-sans text-xs text-stone text-[#D7CCC8]">
              <li className="flex items-center gap-2">
                <MapPin size={12} className="text-primary" />
                <span>Arera Colony, Bhopal, MP, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={12} className="text-primary" />
                <a href="tel:+917906759188" className="hover:text-cream transition-colors">+91 79067 59188</a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle size={12} className="text-primary" />
                <a href="https://wa.me/917906759188" target="_blank" rel="noreferrer" className="hover:text-cream transition-colors">WhatsApp Order Line</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={12} className="text-primary" />
                <span>chef@thesugarstory.co.in</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4 text-left">
            <h4 className="font-serif text-base tracking-widest text-primary uppercase font-bold">Chef's Endorsement</h4>
            <div className="flex flex-col gap-2">
              <span className="font-signature text-5xl text-primary">Shalini Singh</span>
              <p className="text-[9px] font-sans text-stone uppercase tracking-widest text-[#D7CCC8]">
                Diploma in Food & Beverage, CIHM Chandigarh (2018)
              </p>
            </div>
          </div>

        </div>

        <div className="max-w-6xl mx-auto px-6 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans text-[#D7CCC8]/60 gap-4">
          <p>© 2026 The Sugar Story. All rights reserved. Managed by Chef Shalini Singh.</p>
          <div className="flex gap-6 uppercase tracking-wider text-[9px] font-semibold">
            <button onClick={() => { setCurrentPage("story"); window.scrollTo(0, 0); }} className="hover:text-cream">Our Story</button>
            <button onClick={() => { setCurrentPage("admin"); window.scrollTo(0, 0); }} className="hover:text-cream text-gold font-bold">Admin Portal</button>
            <a href="https://instagram.com/the_sugar_story" target="_blank" rel="noreferrer" className="hover:text-cream">@the_sugar_story</a>
            <span className="text-[#D7CCC8]/40">Made in Bhopal</span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Quick Link (Bottom-Right) */}
      <a 
        href="https://wa.me/917906759188?text=Hello%20Chef%20Shalini!%20I%20would%20love%20to%20explore%20customized%20celebration%20bakes."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20BA5A] text-cream p-4 rounded-full shadow-2xl hover:scale-115 active:scale-95 transition-all duration-300 flex items-center justify-center border border-white/20 group cursor-pointer"
        aria-label="Contact Chef on WhatsApp"
      >
        <MessageCircle size={24} className="fill-current stroke-none text-cream" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 font-sans text-xs uppercase tracking-widest font-bold text-cream whitespace-nowrap">
          Order on WhatsApp
        </span>
      </a>

    </div>
  );
}
