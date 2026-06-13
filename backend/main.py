from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.analyze import router as analyze_router
from routes.url_scan import router as url_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Adjust for frontend in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    analyze_router,
    prefix="/api"
)

app.include_router(
    url_router,
    prefix="/api"
)

@app.get("/")
def read_root():
    return {"message": "Hackathon Backend running"}