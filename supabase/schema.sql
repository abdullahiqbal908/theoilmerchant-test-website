-- ================================================================
-- THE OIL MERCHANT — SUPABASE SCHEMA
-- Run this ONCE in Supabase SQL Editor
-- Safe to run even if tables already exist
-- ================================================================

-- PRODUCTS TABLE (create if not exists, then add missing columns)
create table if not exists products (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz default now(),
  name            text not null,
  slug            text unique not null,
  category        text,
  subcategory     text,
  price           numeric(10,2) not null,
  description     text,
  image_url       text,
  stock_quantity  integer default 50,
  badge           text,
  size            text,
  is_active       boolean default true,
  rating          numeric(3,1) default 4.8,
  review_count    integer default 24
);

-- Add columns that may not exist yet (safe to run multiple times)
alter table products add column if not exists original_price  numeric(10,2);
alter table products add column if not exists benefits        jsonb;
alter table products add column if not exists how_to_use      text;
alter table products add column if not exists ingredients     text;
alter table products add column if not exists bg_color        text;
alter table products add column if not exists text_color      text;

-- ORDERS TABLE
create table if not exists orders (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz default now(),
  updated_at       timestamptz default now(),
  order_number     text unique not null,
  customer_name    text not null,
  customer_email   text not null,
  customer_phone   text not null,
  delivery_address text not null,
  city             text not null,
  notes            text,
  items            jsonb not null,
  subtotal         numeric(10,2) not null,
  delivery_fee     numeric(10,2) not null,
  total            numeric(10,2) not null,
  payment_method   text default 'Cash on Delivery',
  status           text default 'pending'
);

-- Enable RLS
alter table products enable row level security;
alter table orders enable row level security;

-- Drop old policies if they exist and recreate
drop policy if exists "Public can read active products" on products;
drop policy if exists "Service role only on orders" on orders;

-- Allow public read on active products
create policy "Public can read active products"
  on products for select
  using (is_active = true);

-- Indexes
create index if not exists products_slug_idx on products (slug);
create index if not exists products_category_idx on products (category);
create index if not exists orders_number_idx on orders (order_number);
create index if not exists orders_created_idx on orders (created_at desc);

-- ================================================================
-- After running this SQL, run: node scripts/seed.mjs
-- ================================================================
