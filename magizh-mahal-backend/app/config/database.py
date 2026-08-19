import logging
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from app.config.settings import settings

logger = logging.getLogger("magizh-mahal.database")


class DatabaseManager:
    """Async Motor MongoDB Database Manager."""

    client: AsyncIOMotorClient = None
    db: AsyncIOMotorDatabase = None

    async def connect_to_database(self) -> None:
        """Establish asynchronous MongoDB connection and create required indexes."""
        try:
            logger.info(f"Connecting to MongoDB at {settings.MONGODB_URL}...")
            self.client = AsyncIOMotorClient(
                settings.MONGODB_URL,
                minPoolSize=settings.MONGODB_MIN_POOL_SIZE,
                maxPoolSize=settings.MONGODB_MAX_POOL_SIZE,
                serverSelectionTimeoutMS=5000,
            )
            self.db = self.client[settings.MONGODB_DB_NAME]
            # Ping database to verify connection
            await self.client.admin.command("ping")
            logger.info(f"Successfully connected to MongoDB database '{settings.MONGODB_DB_NAME}'.")

            # Initialize collection indexes
            await self._create_indexes()
        except Exception as e:
            logger.warning(f"MongoDB connection warning: {e}. Running in standalone mode if MongoDB is not active.")

    async def close_database_connection(self) -> None:
        """Close asynchronous MongoDB connection."""
        if self.client:
            logger.info("Closing MongoDB connection...")
            self.client.close()
            logger.info("MongoDB connection closed.")

    async def _create_indexes(self) -> None:
        """Create necessary indexes for efficient queries."""
        try:
            # Admins: Unique email
            await self.db.admins.create_index("email", unique=True)
            # Bookings: Query by event_date, status, and created_at
            await self.db.bookings.create_index([("event_date", 1), ("status", 1)])
            await self.db.bookings.create_index("created_at")
            # Menu Items: Category and slug
            await self.db.menu_items.create_index("category_id")
            await self.db.menu_categories.create_index("slug", unique=True)
            # Gallery: Category and media_type
            await self.db.gallery.create_index("category")
            # Testimonials: Approved status
            await self.db.testimonials.create_index("is_approved")
            logger.info("MongoDB indexes verified.")
        except Exception as e:
            logger.warning(f"Index creation notice: {e}")

    # Collection Accessors
    @property
    def admins(self):
        return self.db["admins"]

    @property
    def bookings(self):
        return self.db["bookings"]

    @property
    def contacts(self):
        return self.db["contacts"]

    @property
    def inquiries(self):
        return self.db["inquiries"]

    @property
    def menu_categories(self):
        return self.db["menu_categories"]

    @property
    def menu_items(self):
        return self.db["menu_items"]

    @property
    def gallery(self):
        return self.db["gallery"]

    @property
    def testimonials(self):
        return self.db["testimonials"]

    @property
    def events(self):
        return self.db["events"]


db_manager = DatabaseManager()


async def get_database() -> AsyncIOMotorDatabase:
    """Dependency helper to get the current database."""
    return db_manager.db
