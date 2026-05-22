# Allo Inventory Reservation System

A premium multi-warehouse inventory reservation platform built using Next.js, Prisma, PostgreSQL (Neon), and Tailwind CSS.

The system allows users to reserve inventory items safely while preventing overselling using transactional inventory updates.

---

# Live Demo

https://allo-inventory-system-five.vercel.app/

---

# Features

- Multi-warehouse inventory management
- Real-time inventory reservation
- Reservation expiry system
- Concurrency-safe stock handling
- Reservation confirmation & cancellation
- Modern glassmorphism UI
- Responsive dashboard
- PostgreSQL hosted on Neon
- Prisma ORM integration
- Next.js App Router APIs

---

# Tech Stack

## Frontend
- Next.js 16
- React
- Tailwind CSS

## Backend
- Next.js Route Handlers
- Prisma ORM
- PostgreSQL (Neon)

## Deployment
- Vercel

---

# Architecture

## Core Models

### Product
Represents inventory items.

### Warehouse
Represents physical inventory locations.

### Inventory
Tracks:
- total stock
- reserved stock
- warehouse allocations

### Reservation
Tracks:
- reservation status
- quantity
- expiry time

---

# Reservation Flow

1. User selects a product
2. Reservation API checks stock availability
3. Reserved stock is incremented atomically
4. Reservation record is created
5. User confirms or cancels reservation
6. Inventory updates accordingly

---

# Concurrency Safety

The application prevents overselling using PostgreSQL transactions.

Reservation creation uses transactional inventory updates:

1. Inventory availability is checked
2. Reserved stock is updated atomically
3. Reservation record is created inside the same transaction

This guarantees inventory consistency during concurrent requests.

---

# API Endpoints

## Products

### GET `/api/products`
Fetch all products with warehouse stock.

---

## Reservations

### POST `/api/reservations`
Create a reservation.

### GET `/api/reservations/:id`
Fetch reservation details.

### POST `/api/reservations/:id/confirm`
Confirm reservation purchase.

### POST `/api/reservations/:id/release`
Cancel reservation and release stock.

---

# Environment Variables

Create a `.env` file:

```env
DATABASE_URL="your_neon_database_url"