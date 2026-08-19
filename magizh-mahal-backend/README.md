# Annapathiram Catering — Backend API

Production-ready, asynchronous **FastAPI** backend powering the **Annapathiram Catering** website. Built with **MongoDB (Motor async driver)**, JWT authentication, file upload pipeline, email & WhatsApp notification triggers, and comprehensive catering event administration APIs.

---

## Tech Stack

- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.10+)
- **Database**: [MongoDB](https://www.mongodb.com/) (Async Motor Driver)
- **Authentication**: JWT (JSON Web Tokens) with `pyjwt` & `passlib` / `bcrypt`
- **Validation**: [Pydantic v2](https://docs.pydantic.dev/)
- **File Uploads**: Multi-part streaming with local static file serving / Cloudinary compatible
- **Email Notifications**: Async SMTP integration with responsive HTML templates
- **API Documentation**: Automatic Swagger UI (`/docs`) & ReDoc (`/redoc`)

---

## Project Structure

```
magizh-mahal-backend/
├── app/
│   ├── main.py                     # App factory, lifespan, CORS, static mounts & routes
│   │
│   ├── config/
│   │   ├── database.py             # Motor Async MongoDB client & collection accessors
│   │   ├── security.py             # Password hashing (bcrypt) & JWT token handlers
│   │   └── settings.py             # Pydantic BaseSettings loading from .env
│   │
│   ├── models/                     # Database document models
│   │   ├── admin.py                # Admin user accounts
│   │   ├── booking.py              # Catering reservations & muhurtham bookings
│   │   ├── contact.py              # Website contact queries
│   │   ├── inquiry.py              # Quick quote inquiries
│   │   ├── menu.py                 # Categories & dishes
│   │   ├── gallery.py              # Photos, banquet setups & video media
│   │   └── testimonial.py          # Client reviews
│   │
│   ├── schemas/                    # Pydantic request & response validation
│   │   ├── auth_schema.py
│   │   ├── booking_schema.py
│   │   ├── contact_schema.py
│   │   ├── inquiry_schema.py
│   │   ├── menu_schema.py
│   │   ├── gallery_schema.py
│   │   ├── testimonial_schema.py
│   │   └── dashboard_schema.py
│   │
│   ├── routes/                     # REST API route handlers
│   │   ├── auth_routes.py          # /api/v1/auth (Login, seed admin, profile)
│   │   ├── booking_routes.py       # /api/v1/bookings (Create, list, update status)
│   │   ├── contact_routes.py       # /api/v1/contacts (Submit & manage inquiries)
│   │   ├── inquiry_routes.py       # /api/v1/inquiries (Quick quotes)
│   │   ├── menu_routes.py          # /api/v1/menu (Categories & dishes CRUD)
│   │   ├── gallery_routes.py       # /api/v1/gallery (Media CRUD & uploads)
│   │   ├── testimonial_routes.py   # /api/v1/testimonials (Reviews CRUD)
│   │   └── dashboard_routes.py     # /api/v1/dashboard (Stats & analytics)
│   │
│   ├── services/                   # Business logic layer
│   │   ├── auth_service.py
│   │   ├── booking_service.py
│   │   ├── email_service.py
│   │   ├── whatsapp_service.py
│   │   ├── menu_service.py
│   │   └── gallery_service.py
│   │
│   ├── middleware/                 # Security dependencies
│   │   ├── auth.py                 # JWT Bearer token authentication
│   │   └── admin_guard.py          # Role-based authorization
│   │
│   ├── uploads/                    # Local storage directories for media
│   │   ├── gallery/                # Uploaded venue/food images & videos
│   │   ├── menu/                   # Dish photography
│   │   └── testimonials/           # Client avatars
│   │
│   └── utils/                      # Helper functions, validators & logger
│       ├── helpers.py              # Serialization & slug generators
│       ├── validators.py           # Phone & file upload validation
│       └── logger.py               # Structured application logger
│
├── requirements.txt                # Python dependencies
├── .env.example                    # Environment template
├── .env                            # Active environment configuration
├── Dockerfile                      # Production container configuration
├── docker-compose.yml              # Multi-container setup (API + MongoDB)
└── README.md                       # Documentation
```

---

## MongoDB Collections

1. **`admins`**: Admin credentials, hashed passwords, roles (`superadmin`, `manager`).
2. **`bookings`**: Client catering reservations with date, guest count, menu requests, and status.
3. **`contacts`**: General website contact queries.
4. **`inquiries`**: Quick quote leads.
5. **`menu_categories`**: Banana Leaf Feasts, Live Tiffin & Dosa, Biryani & Non-Veg, Traditional Sweets.
6. **`menu_items`**: Individual dishes with descriptions, highlights, and tags.
7. **`gallery`**: High-resolution catering photos, stage setups, banquet halls, and MP4 videos.
8. **`testimonials`**: Client reviews with ratings and event details.

---

## Quick Start Guide

### 1. Prerequisites
- Python 3.10+
- MongoDB running locally on port 27017 or a MongoDB Atlas connection string

### 2. Installation
```bash
# Navigate to backend directory
cd magizh-mahal-backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
.\venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env` and configure your settings:
```bash
cp .env.example .env
```

### 4. Run the Development Server
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
- Interactive Swagger API Docs: **[http://localhost:8000/docs](http://localhost:8000/docs)**
- Alternative ReDoc: **[http://localhost:8000/redoc](http://localhost:8000/redoc)**

---

## Initial Admin Credentials

Upon startup, the backend automatically seeds the default superadmin account:
- **Email**: `admin@magizhmahal.com`
- **Password**: `MagizhMahalAdmin@2026`

You can also trigger admin seeding via the API:
```bash
POST /api/v1/auth/seed-admin
```

---

## Key API Endpoints Reference

### 🔐 Authentication (`/api/v1/auth`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/seed-admin` | Public | Seeds initial admin account |
| `POST` | `/login` | Public | Authenticates admin & returns JWT Bearer token |
| `GET` | `/me` | Bearer | Returns current authenticated admin profile |

### 📅 Bookings & Reservations (`/api/v1/bookings`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Public | Submits a new catering reservation (Triggers email & WhatsApp) |
| `GET` | `/` | Bearer | Lists all bookings (supports status filter, search & pagination) |
| `GET` | `/{id}` | Bearer | Gets single booking details |
| `PATCH`| `/{id}/status`| Bearer | Updates booking status (`pending`, `confirmed`, `completed`, `cancelled`) |
| `DELETE`| `/{id}` | Bearer | Deletes a booking record |

### 🍱 Menu Management (`/api/v1/menu`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Public | Returns the full categorized menu |
| `GET` | `/categories` | Public | Lists all active menu categories |
| `POST` | `/categories` | Bearer | Creates a new menu category |
| `PATCH`| `/categories/{id}` | Bearer | Updates category details |
| `DELETE`| `/categories/{id}` | Bearer | Deactivates a category |
| `GET` | `/items` | Public | Lists dishes (supports category & veg filters) |
| `POST` | `/items` | Bearer | Creates a new dish |
| `PUT` | `/items/{id}` | Bearer | Updates dish details |
| `DELETE`| `/items/{id}` | Bearer | Deletes a dish |

### 🖼️ Gallery & Media (`/api/v1/gallery`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Public | Lists gallery media items (supports category filter) |
| `POST` | `/upload` | Bearer | Uploads image (JPG/PNG/WEBP) or video (MP4/WEBM) |
| `POST` | `/` | Bearer | Creates a new gallery item |
| `PUT` | `/{id}` | Bearer | Updates gallery item metadata |
| `DELETE`| `/{id}` | Bearer | Deletes gallery item & file |

### ⭐ Testimonials (`/api/v1/testimonials`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Public | Lists approved client testimonials |
| `POST` | `/` | Public/Bearer | Adds a new customer review |
| `PUT` | `/{id}` | Bearer | Updates testimonial content / approval |
| `DELETE`| `/{id}` | Bearer | Deletes a testimonial |

### 📊 Dashboard Analytics (`/api/v1/dashboard`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/stats` | Bearer | Real-time counts (bookings, upcoming events, inquiries, menu, gallery) |

---

## Docker Deployment

To launch the backend API and a MongoDB instance with a single command:
```bash
docker-compose up -d --build
```
This starts:
- MongoDB on port `27017`
- FastAPI on port `8000` with automatic volume persistence in `./uploads`
