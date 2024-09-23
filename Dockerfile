# Use the official MongoDB image
FROM mongo:latest

# Optional: Set up environment variables (e.g., authentication)
ENV MONGO_INITDB_ROOT_USERNAME=root
ENV MONGO_INITDB_ROOT_PASSWORD=example
ENV MONGO_INITDB_DATABASE=todolist

# Expose MongoDB port
EXPOSE 27017

# Start MongoDB when the container launches
CMD ["mongod"]
