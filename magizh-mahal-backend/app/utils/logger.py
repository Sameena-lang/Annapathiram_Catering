import logging
import sys
from app.config.settings import settings


def setup_logger(name: str = "magizh-mahal") -> logging.Logger:
    """Configure structured console logger."""
    logger = logging.getLogger(name)
    level = logging.DEBUG if settings.DEBUG else logging.INFO
    logger.setLevel(level)

    if not logger.handlers:
        handler = logging.StreamHandler(sys.stdout)
        handler.setLevel(level)
        formatter = logging.Formatter(
            fmt="%(asctime)s [%(levelname)s] [%(name)s]: %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S",
        )
        handler.setFormatter(formatter)
        logger.addHandler(handler)

    return logger


logger = setup_logger()
