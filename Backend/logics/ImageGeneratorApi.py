from PIL import Image, ImageDraw, ImageFont
import random
import string
import os
import asyncio
from fastapi import BackgroundTasks

# Set up logo fonts
font_dir = "fonts/"
font_list = [
    '1.ttf',
    '2.ttf',
    '3.otf',
    '4.otf',
    '5.ttf',
    '6.otf',
    '7.otf',
    '8.ttf',
    '9.ttf',
    '10.otf',
    '11.ttf',
    '12.ttf',
    '13.otf',
    '14.otf',
    '15.ttf',
    '16.otf',
    '17.otf',
    '18.otf',
    '20.ttf',
    '21.ttf',
    '22.ttf',
    '23.ttf',
    '24.ttf',
    '25.otf',
    '26.ttf',
    '27.otf',
    '28.ttf',
]
image_width = 1024
image_height = 768




def generate_images(word: str, background_tasks: BackgroundTasks):
    
    font_size = 120
    word = word
    lengh = len(word)
    if lengh >= 15:
        font_size = 92
    elif lengh < 6:
        font_size = 280
    elif lengh < 9:
        font_size = 180
    elif lengh < 20:
        font_size = 120
    image_urls = []
    for i in range(152):
        # Generate a random font and color
        font_file = random.choice(font_list)
        font_path = font_dir + font_file
        font = ImageFont.truetype(font_path, font_size)
        color = tuple(random.randint(0, 255) for _ in range(3))

        # Create a new image
        image = Image.new("RGBA", (image_width, image_height), color)

        # Draw the text onto the image
        draw = ImageDraw.Draw(image)
        text_width, text_height = draw.textsize(word, font=font)
        text_x = (image_width - text_width) / 2
        text_y = (image_height - text_height) / 2
        draw.text((text_x, text_y), word, font=font, fill=(
            255 - color[0], 255 - color[1], 255 - color[2], 255))

        # Generate a random filename for the image
        filename = ''.join(random.choices(
            string.ascii_letters + string.digits, k=10)) + '.png'
        file_path = f"temp/{filename}"

        # Save the image temporarily
        image.save(file_path)

        # Appends the image URL
        image_urls.append(f"http://127.0.0.1:8080/logo/{filename}")

    async def delete_images():
        # Delete the temporary images after 1 hour
        await asyncio.sleep(4)
        for url in image_urls:
            file_path = url.split("/")[-1]
            os.remove(f"temp/{file_path}")

    # Schedule a task to delete the temporary images after 1 hour
    background_tasks.add_task(delete_images)

    return image_urls