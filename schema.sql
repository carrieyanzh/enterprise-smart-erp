-- Enable foreign key support for this session
PRAGMA foreign_keys = ON;

-- 1. ROLE-BASED ACCESS CONTROL (RBAC) TABLES
CREATE TABLE IF NOT EXISTS roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE CHECK(name IN ('ROLE_ADMIN', 'ROLE_STAFF', 'ROLE_FINANCE')),
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL, 
    is_active INTEGER NOT NULL DEFAULT 1 CHECK(is_active IN (0, 1)),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id INTEGER NOT NULL,
    role_id INTEGER NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- 2. INVENTORY & PRODUCT MANAGEMENT TABLES
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sku TEXT NOT NULL UNIQUE, 
    name TEXT NOT NULL,
    description TEXT,
    category_id INTEGER,
    purchase_price REAL NOT NULL CHECK(purchase_price >= 0.0), 
    selling_price REAL NOT NULL CHECK(selling_price >= 0.0),  
    stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK(stock_quantity >= 0),
    low_stock_threshold INTEGER NOT NULL DEFAULT 10, 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- 3. ORDERS & SALES TRACKING TABLES
CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT,
    contact_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_number TEXT NOT NULL UNIQUE, 
    customer_id INTEGER,
    order_status TEXT NOT NULL DEFAULT 'PENDING' CHECK(order_status IN ('PENDING', 'PAID', 'SHIPPED', 'CANCELLED', 'REFUNDED')),
    total_amount REAL NOT NULL DEFAULT 0.0 CHECK(total_amount >= 0.0),
    tax_amount REAL NOT NULL DEFAULT 0.0 CHECK(tax_amount >= 0.0),
    created_by_user_id INTEGER, 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by_user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK(quantity > 0),
    unit_price REAL NOT NULL CHECK(unit_price >= 0.0), 
    total_price REAL NOT NULL CHECK(total_price >= 0.0),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

-- 4. FINANCIAL LEDGER & REVENUE METRICS TABLES
CREATE TABLE IF NOT EXISTS financial_ledger (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    transaction_ref TEXT NOT NULL UNIQUE, 
    type TEXT NOT NULL CHECK(type IN ('REVENUE', 'EXPENSE')), 
    category TEXT NOT NULL, 
    amount REAL NOT NULL CHECK(amount > 0.0),
    description TEXT,
    transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    recorded_by_user_id INTEGER,
    FOREIGN KEY (recorded_by_user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 5. PERFORMANCE INDEXES
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_ledger_type_date ON financial_ledger(type, transaction_date);
