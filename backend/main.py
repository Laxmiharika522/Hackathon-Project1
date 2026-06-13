from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.analyze_image import router as image_router
from api.analyze_text import router as text_router

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)
app.include_router(image_router)
app.include_router(text_router)