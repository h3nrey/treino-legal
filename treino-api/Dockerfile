FROM python:3.9-slim

# Set working directory
WORKDIR /src

# Copy application files
COPY ./src /src

# Install dependencies
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Install Uvicorn with the `reload` option enabled
RUN pip install uvicorn[reload]

# Command to run the application in development mode with hot-reload
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80", "--reload"]
