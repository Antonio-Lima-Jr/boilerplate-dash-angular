# Docker Compose README

This README provides an overview of the services defined in the given Docker Compose configuration and describes how to access each service on localhost.

## Services

### web

- **Port**: `8000`
- **Description**: This service represents a web application.
- **Access**: To access the web application, open a web browser and navigate to `http://localhost:8000`.

### worker

- **Description**: This service is a worker responsible for background tasks.
- **Access**: There is no direct access to the worker service.

### db

- **Port**: `5432`
- **Description**: This service runs a PostgreSQL database.
- **Access**: To access the database, you can use a PostgreSQL client and connect to `localhost:5432`. The configured credentials are:
  - **Username**: `postgres`
  - **Password**: `postgres`

### redis

- **Port**: `6379`
- **Description**: This service runs a Redis server.
- **Access**: To access Redis, you can use a Redis client and connect to `localhost:6379`.

### rabbitmq

- **Port**: `5672` (AMQP) and `15672` (Management UI)
- **Description**: This service runs a RabbitMQ message broker with a management interface.
- **Access**:
  - To connect to RabbitMQ using AMQP, use `localhost:5672`.
  - To access the RabbitMQ management UI, open a web browser and navigate to `http://localhost:15672`. The default login credentials are:
    - **Username**: `guest`
    - **Password**: `guest`

### pgadmin

- **Port**: `8080`
- **Description**: This service provides a web-based administration interface for PostgreSQL (pgAdmin).
- **Access**: To access pgAdmin, open a web browser and navigate to `http://localhost:8080`. The default login credentials are:
  - **Email**: `postgres@teste.com`
  - **Password**: `postgres`

### prometheus

- **Port**: `9090`
- **Description**: This service runs Prometheus, a monitoring and alerting system.
- **Access**: To access Prometheus, open a web browser and navigate to `http://localhost:9090`.

### cadvisor

- **Port**: `8081`
- **Description**: This service collects and exports container resource usage information.
- **Access**: To access cAdvisor, open a web browser and navigate to `http://localhost:8081`.

<!-- ### grafana

- **Port**: `3001`
- **Description**: This service runs Grafana, a platform for analytics and monitoring.
- **Access**: To access Grafana, open a web browser and navigate to `http://localhost:3001`. The default login credentials are not specified in the provided configuration. -->
### grafana

- **Port**: `3001`
- **Description**: This service runs Grafana, a platform for analytics and monitoring.
- **Access**: To access Grafana, open a web browser and navigate to `http://localhost:3001`. The default login credentials are not specified in the provided configuration.

  **Note**: Before accessing Grafana, make sure to import the dashboard by following these steps:
  
  1. Copy the dashboard YAML file to the appropriate folder in your project.
  2. Open Grafana in your web browser at `http://localhost:3001`.
  3. Log in using your Grafana credentials (if applicable).
  4. In the Grafana UI, navigate to the dashboard section.
  5. Import the dashboard by specifying the path to the dashboard YAML file in your project, path: "docker/grafana/grafana-data/dashboards/"


Note: The services mentioned above can be accessed on localhost unless there are conflicting services running on the same ports. Make sure the required dependencies are properly installed and the necessary network configurations are in place before running the Docker Compose configuration.