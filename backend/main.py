# main.py

from fastapi import FastAPI
from routes.analyze import router as analyze_router
from routes.url_scan import router as url_router

app = FastAPI()

app.include_router(
    analyze_router,
    prefix="/api"
)

app.include_router(
    url_router,
    prefix="/api"
)