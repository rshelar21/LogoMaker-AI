from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from router import ImageGeneratorApi, NameGeneratorApi
from fastapi.staticfiles import StaticFiles


app = FastAPI(title="Ai Business Name Generator")

app.mount("/logo", StaticFiles(directory="temp"), name="temp")

origins = ['*']
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ImageGeneratorApi.router)
app.include_router(NameGeneratorApi.router)