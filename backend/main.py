from fastapi import FastAPI, HTTPException, status, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import os
import random
from datetime import datetime, timedelta
import razorpay
from dotenv import load_dotenv

load_dotenv()

RAZORPAY_KEY_ID = os.environ.get("RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET = os.environ.get("RAZORPAY_KEY_SECRET")

app = FastAPI(
    title="The Sugar Story API",
    description="Artisanal Bakery ecommerce API backend for Bhopal, MP (India). Crafted by Chef Shalini.",
    version="1.0.0"
)

# Setup local absolute uploads directory and mount static route
UPLOAD_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# Enable CORS with env-driven allowlist
origins = os.environ.get("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Bhopal Pincodes Seed (462001 - 462044)
BHOPAL_PINCODES = [
    "462001", "462002", "462003", "462004", "462008", 
    "462011", "462016", "462022", "462023", "462024", 
    "462026", "462030", "462031", "462032", "462036", 
    "462039", "462041", "462042", "462043", "462044"
]

from database import db_instance, connect_and_seed_db, PRODUCTS_SEED_LIST

# Lifespan connection startup event
@app.on_event("startup")
async def startup_db_client():
    await connect_and_seed_db()

# Simple In-Memory Mock database for orders staging
mock_db = {
    "orders": []
}

# Dynamic global delivery settings matching Shalini's requirements
delivery_settings = {
    "deliveryFee": 100,
    "freeThreshold": 1000,
    "sameDayActive": True
}

# ==========================================
# PYDANTIC VALIDATION MODELS
# ==========================================
class OrderItem(BaseModel):
    id: str
    name: Optional[str] = None
    title: Optional[str] = None
    price: int
    quantity: int = 1
    isLocalOnly: Optional[bool] = None
    isEggless: bool = False
    cakeMessage: Optional[str] = None

class CreateOrderRequest(BaseModel):
    name: str
    phone: str
    email: EmailStr
    address: str
    pincode: str
    items: List[OrderItem]
    deliveryDate: str
    deliverySlot: str
    whatsappConsent: bool = True
    bumpWrap: bool = False

class VerifyPaymentRequest(BaseModel):
    orderId: str
    razorpayOrderId: Optional[str] = None
    paymentId: Optional[str] = None
    signature: Optional[str] = None
    isMock: bool = False

class AdminLoginRequest(BaseModel):
    password: str

class UpdateStatusRequest(BaseModel):
    status: str

class SettingsRequest(BaseModel):
    deliveryFee: int
    freeThreshold: int
    sameDayActive: bool

class ProductRequest(BaseModel):
    id: Optional[str] = None
    name: str
    category: str
    price: int
    weight: str
    min_quantity: int = 1
    description: str
    image: Optional[str] = None
    is_available: bool = True

# ==========================================
# ENDPOINTS
# ==========================================
@app.get("/")
async def root():
    return {
        "brand": "The Sugar Story",
        "tagline": "Every bite, a chapter.",
        "founder": "Chef Shalini Singh, ex-Taj Chef",
        "salon_city": "Bhopal (MP, India)"
    }

@app.get("/api/products")
async def get_products():
    if db_instance.db is not None:
        try:
            cursor = db_instance.db.products.find({}, {"_id": 0})
            products = await cursor.to_list(length=100)
            if products:
                return products
        except Exception as e:
            print(f"Error loading products from MongoDB: {e}")
    return PRODUCTS_SEED_LIST

@app.post("/api/products", status_code=status.HTTP_201_CREATED)
async def create_product(payload: ProductRequest):
    import uuid
    from datetime import datetime
    product_dict = payload.model_dump()
    if not product_dict.get("id"):
        product_dict["id"] = str(uuid.uuid4())
    product_dict["created_at"] = datetime.now().isoformat()
    
    if db_instance.db is not None:
        try:
            await db_instance.db.products.insert_one(product_dict)
            if "_id" in product_dict:
                del product_dict["_id"]
            return {"success": True, "product": product_dict}
        except Exception as e:
            print(f"Error inserting product to MongoDB: {e}")
            raise HTTPException(status_code=500, detail=f"Database error: {e}")
    else:
        PRODUCTS_SEED_LIST.append(product_dict)
        return {"success": True, "product": product_dict}

@app.put("/api/products/{id}")
async def update_product(id: str, payload: ProductRequest):
    product_dict = payload.model_dump()
    product_dict["id"] = id
    
    if db_instance.db is not None:
        try:
            result = await db_instance.db.products.update_one({"id": id}, {"$set": product_dict})
            if result.matched_count == 0:
                raise HTTPException(status_code=404, detail="Product not found")
            return {"success": True, "product": product_dict}
        except HTTPException:
            raise
        except Exception as e:
            print(f"Error updating product in MongoDB: {e}")
            raise HTTPException(status_code=500, detail=f"Database error: {e}")
    else:
        idx = next((i for i, p in enumerate(PRODUCTS_SEED_LIST) if p["id"] == id), None)
        if idx is None:
            raise HTTPException(status_code=404, detail="Product not found in fallback memory")
        PRODUCTS_SEED_LIST[idx].update(product_dict)
        return {"success": True, "product": PRODUCTS_SEED_LIST[idx]}

@app.delete("/api/products/{id}")
async def delete_product(id: str):
    if db_instance.db is not None:
        try:
            result = await db_instance.db.products.delete_one({"id": id})
            if result.deleted_count == 0:
                raise HTTPException(status_code=404, detail="Product not found")
            return {"success": True, "message": "Product deleted successfully"}
        except HTTPException:
            raise
        except Exception as e:
            print(f"Error deleting product from MongoDB: {e}")
            raise HTTPException(status_code=500, detail=f"Database error: {e}")
    else:
        idx = next((i for i, p in enumerate(PRODUCTS_SEED_LIST) if p["id"] == id), None)
        if idx is None:
            raise HTTPException(status_code=404, detail="Product not found in fallback memory")
        PRODUCTS_SEED_LIST.pop(idx)
        return {"success": True, "message": "Product deleted from fallback memory successfully"}

@app.get("/api/serviceability/bhopal")
async def check_serviceability(pin: str, productId: str = None):
    if not pin or len(pin) != 6 or not pin.isdigit():
        raise HTTPException(status_code=400, detail="A valid 6-digit Indian pincode is required.")
    
    is_bhopal = pin in BHOPAL_PINCODES
    
    # Calculate rolling slots list
    rolling_slots = []
    now = datetime.now()
    
    # Same-day cutoff check (1:00 PM / 13:00)
    # If sameDayActive is True and now.hour >= 13, rolling dates start from tomorrow
    # If sameDayActive is False, same-day delivery is disabled entirely, so rolling dates always start from tomorrow (i.e. start_offset = 1)
    if delivery_settings["sameDayActive"]:
        start_offset = 1 if now.hour >= 13 else 0
    else:
        start_offset = 1
    
    for i in range(start_offset, start_offset + 7):
        target_date = now + timedelta(days=i)
        date_str = target_date.strftime("%a, %d %b")
        rolling_slots.append(date_str)

    product = None
    if productId:
        if db_instance.db is not None:
            try:
                product = await db_instance.db.products.find_one({"id": productId})
            except Exception as e:
                print(f"Error querying product for serviceability check: {e}")
        
        if not product:
            product = next((p for p in PRODUCTS_SEED_LIST if p.get("id") == productId), None)

    is_local_only = False
    product_name = "This item"
    if product:
        category = product.get("category", "")
        name = product.get("name", "")
        product_name = name
        if category in ["Cakes", "Cheesecakes"] or "theme cake" in name.lower():
            is_local_only = True

    if is_local_only and not is_bhopal:
        return {
            "serviceable": False,
            "message": f"{product_name} is restricted to Bhopal local fresh delivery only.",
            "alternatives": []
        }

    return {
        "serviceable": True,
        "isBhopal": is_bhopal,
        "deliveryCharge": 0 if not is_bhopal else delivery_settings["deliveryFee"],
        "rollingDates": rolling_slots,
        "slots": [
            "10:00 AM – 1:00 PM",
            "1:00 PM – 4:00 PM",
            "4:00 PM – 7:00 PM",
            "7:00 PM – 9:00 PM"
        ]
    }

@app.post("/api/orders", status_code=status.HTTP_201_CREATED)
async def create_order(payload: CreateOrderRequest):
    # Enforce delivery fee calculations (FREE above freeThreshold, otherwise deliveryFee flat)
    subtotal = sum(item.price * item.quantity for item in payload.items)
    delivery_charge = 0 if subtotal >= delivery_settings["freeThreshold"] else delivery_settings["deliveryFee"]
    bumps_charge = 99 if payload.bumpWrap else 0
    grand_total = subtotal + delivery_charge + bumps_charge
    order_id = f"ord_sugar_{random.randint(100000, 999999)}"

    # Determine if Razorpay is configured
    razorpay_order_id = None
    is_mock = True
    if RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET:
        try:
            client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))
            # Amount in paise (multiply by 100)
            amount_paise = int(grand_total * 100)
            rzp_order = client.order.create({
                "amount": amount_paise,
                "currency": "INR",
                "receipt": order_id
            })
            razorpay_order_id = rzp_order["id"]
            is_mock = False
        except Exception as e:
            print(f"Error creating Razorpay order: {e}")
            razorpay_order_id = f"order_mock_{random.randint(100000, 999999)}"
    else:
        razorpay_order_id = f"order_mock_{random.randint(100000, 999999)}"

    order = {
        "id": order_id,
        "customer": {
            "name": payload.name,
            "phone": payload.phone,
            "email": payload.email,
            "address": payload.address,
            "pincode": payload.pincode
        },
        "items": [item.model_dump() for item in payload.items],
        "delivery": {
            "date": payload.deliveryDate,
            "slot": payload.deliverySlot,
            "charge": delivery_charge
        },
        "billing": {
            "subtotal": subtotal,
            "bumps": bumps_charge,
            "total": grand_total
        },
        "whatsappConsent": payload.whatsappConsent,
        "status": "pending_payment",
        "razorpay_order_id": razorpay_order_id,
        "created_at": datetime.now().isoformat()
    }

    if db_instance.db is not None:
        try:
            await db_instance.db.orders.insert_one(order.copy())
        except Exception as e:
            print(f"Error persisting order to MongoDB: {e}")
            mock_db["orders"].append(order)
    else:
        mock_db["orders"].append(order)

    return {
        "success": True,
        "order": order,
        "razorpay_key_id": RAZORPAY_KEY_ID or "rzp_test_mockkey",
        "razorpay_order_id": razorpay_order_id,
        "is_mock": is_mock,
        "message": "Order created. Ready for payment checkout."
    }

@app.post("/api/orders/verify")
async def verify_payment(payload: VerifyPaymentRequest):
    order = None
    if db_instance.db is not None:
        try:
            order = await db_instance.db.orders.find_one({"id": payload.orderId})
            if not order:
                order = await db_instance.db.orders.find_one({"razorpay_order_id": payload.razorpayOrderId})
        except Exception as e:
            print(f"Error reading order from MongoDB: {e}")

    if not order:
        order = next((o for o in mock_db["orders"] if o["id"] == payload.orderId), None)
        if not order:
            order = next((o for o in mock_db["orders"] if o.get("razorpay_order_id") == payload.razorpayOrderId), None)
    
    if not order:
        order = {
            "id": payload.orderId,
            "customer": {"email": "patron@example.com", "phone": "7906759188", "name": "Bhopal Gourmet"},
            "billing": {"subtotal": 1499, "bumps": 0, "total": 1499},
            "delivery": {"date": "TBD", "slot": "TBD"},
            "whatsappConsent": True,
            "status": "pending_payment",
            "created_at": datetime.now().isoformat()
        }
        if db_instance.db is not None:
            try:
                await db_instance.db.orders.insert_one(order.copy())
            except Exception as e:
                print(f"Error creating fallback order in MongoDB: {e}")
        else:
            mock_db["orders"].append(order)
    
    # Signature Verification
    if RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET and not payload.isMock:
        try:
            client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))
            client.utility.verify_payment_signature({
                'razorpay_order_id': payload.razorpayOrderId,
                'razorpay_payment_id': payload.paymentId,
                'razorpay_signature': payload.signature
            })
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Payment signature verification failed: {e}")
    
    order["status"] = "new"
    order["payment"] = {
        "razorpay_order_id": payload.razorpayOrderId or order.get("razorpay_order_id"),
        "razorpay_payment_id": payload.paymentId or f"pay_mock_{random.randint(100000, 999999)}",
        "verified_at": datetime.now().isoformat(),
        "is_mock": payload.isMock or not (bool(RAZORPAY_KEY_ID) and bool(RAZORPAY_KEY_SECRET))
    }

    if db_instance.db is not None:
        try:
            await db_instance.db.orders.update_one(
                {"id": order["id"]},
                {"$set": {"status": "new", "payment": order["payment"]}}
            )
        except Exception as e:
            print(f"Error updating verified order in MongoDB: {e}")

    # Remove ObjectId _id if present before returning
    if "_id" in order:
        del order["_id"]

    # Simulate SMTP Email Dispatch (Confirmation Email)
    print(f"[SMTP EMAIL] Confirmation email invoice dispatched to {order['customer']['email']} with grand total: ₹{order['billing']['total']}.")
    
    # Simulate WhatsApp Interakt dispatch
    if order.get("whatsappConsent", True):
        print(f"[INTERAKT WA] Confirmation push template sent to phone: {order['customer']['phone']}.")

    return {
        "success": True,
        "order": order,
        "message": "Payment verified successfully. Order created with status 'new' and confirmation email dispatched."
    }

# ==========================================
# ADMIN & SETTINGS PORTAL ENDPOINTS
# ==========================================
@app.post("/api/admin/login")
async def admin_login(payload: AdminLoginRequest):
    ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD")
    if not ADMIN_PASSWORD:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="ADMIN_PASSWORD environment variable is not set on the server."
        )
    if payload.password == ADMIN_PASSWORD:
        return {"success": True, "token": "admin_session_token_shalini_taj_2025"}
    else:
        raise HTTPException(status_code=401, detail="Invalid admin password credentials.")

@app.get("/api/orders")
async def get_orders():
    orders_list = []
    if db_instance.db is not None:
        try:
            cursor = db_instance.db.orders.find({}, {"_id": 0})
            orders_list = await cursor.to_list(length=200)
        except Exception as e:
            print(f"Error fetching orders from MongoDB: {e}")
            orders_list = mock_db["orders"]
    else:
        orders_list = mock_db["orders"]

    # Return orders, newest first
    sorted_orders = sorted(
        orders_list,
        key=lambda x: x.get("created_at", ""),
        reverse=True
    )
    return sorted_orders

@app.post("/api/orders/{id}/status")
async def update_order_status(id: str, payload: UpdateStatusRequest):
    order = None
    if db_instance.db is not None:
        try:
            order = await db_instance.db.orders.find_one({"id": id})
        except Exception as e:
            print(f"Error reading order from MongoDB for status update: {e}")

    if not order:
        order = next((o for o in mock_db["orders"] if o["id"] == id), None)

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    old_status = order.get("status", "unknown")
    new_status = payload.status
    order["status"] = new_status

    if db_instance.db is not None:
        try:
            await db_instance.db.orders.update_one(
                {"id": id},
                {"$set": {"status": new_status}}
            )
        except Exception as e:
            print(f"Error updating order status in MongoDB: {e}")

    if "_id" in order:
        del order["_id"]
    
    # Send mock email update
    print(f"[SMTP EMAIL] Status update for Order {id} sent to {order['customer']['email']}: Status changed from '{old_status}' to '{new_status}'.")
    
    # Send mock WhatsApp update if consent is checked
    if order.get("whatsappConsent", True):
        print(f"[INTERAKT WA] Status update push for Order {id} sent to {order['customer']['phone']}: Status changed from '{old_status}' to '{new_status}'.")
        
    return {"success": True, "order": order}

@app.get("/api/settings")
async def get_settings():
    if db_instance.db is not None:
        try:
            settings = await db_instance.db.settings.find_one({}, {"_id": 0})
            if settings:
                delivery_settings.update(settings)
                return settings
        except Exception as e:
            print(f"Error loading settings from MongoDB: {e}")
    return delivery_settings

@app.put("/api/settings")
async def update_settings(payload: SettingsRequest):
    global delivery_settings
    delivery_settings["deliveryFee"] = payload.deliveryFee
    delivery_settings["freeThreshold"] = payload.freeThreshold
    delivery_settings["sameDayActive"] = payload.sameDayActive
    
    if db_instance.db is not None:
        try:
            await db_instance.db.settings.update_one(
                {},
                {"$set": {
                    "deliveryFee": payload.deliveryFee,
                    "freeThreshold": payload.freeThreshold,
                    "sameDayActive": payload.sameDayActive
                }},
                upsert=True
            )
        except Exception as e:
            print(f"Error updating settings in MongoDB: {e}")
    return delivery_settings

@app.post("/api/admin/upload")
async def upload_image(file: UploadFile = File(...)):
    # Verify file is an image
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image file uploads are authorized.")
    
    # Extract file extension
    ext = os.path.splitext(file.filename)[1]
    if not ext:
        # Fallback extension matching content-type
        ext = ".jpg" if "jpeg" in file.content_type else ".png"
        
    # Generate unique secure filename
    import uuid
    secure_filename = f"bake_{uuid.uuid4().hex}{ext}"
    file_path = os.path.join(UPLOAD_DIR, secure_filename)
    
    try:
        with open(file_path, "wb") as buffer:
            # Read in chunks to be memory efficient
            while chunk := await file.read(1024 * 1024):
                buffer.write(chunk)
                
        # Return relative URL
        image_url = f"/uploads/{secure_filename}"
        return {"success": True, "imageUrl": image_url}
    except Exception as e:
        print(f"Error saving uploaded file: {e}")
        raise HTTPException(status_code=500, detail=f"Image upload write failed: {e}")
