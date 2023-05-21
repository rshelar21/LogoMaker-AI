from fastapi import status, APIRouter
from pydantic import BaseModel
from logics import NameGeneratorApi

router = APIRouter(tags=["Name Api"])

class InputData(BaseModel):
    word: str

@router.post('/predict', status_code=status.HTTP_200_OK)
async def predict(input_data: InputData):
    return NameGeneratorApi.predict(input_data.word)

