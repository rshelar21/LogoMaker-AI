from fastapi import status, APIRouter
from pydantic import BaseModel
from logics import ImageGeneratorApi
from fastapi import BackgroundTasks

router = APIRouter(tags=["Logo Api"])

class InputData(BaseModel):
    word: str

@router.post("/generate-images/", status_code=status.HTTP_200_OK)
async def generate_images(input_data: InputData, background_tasks: BackgroundTasks):
    return ImageGeneratorApi.generate_images(word = input_data.word, background_tasks = background_tasks)



