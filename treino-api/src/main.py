from fastapi import FastAPI
from routers.exercise import router as exercise_router
from routers.seeders import run_seeds
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

origins = [
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def base_route():
    return "Treino legal API 💪"

@app.get("/seeders")
async def run_seeders():
    result = await run_seeds()
    return result

app.include_router(exercise_router, prefix="/exercises", tags=["exercises"])