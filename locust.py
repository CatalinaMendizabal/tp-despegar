import time
from locust import HttpUser, task, between


class WebsiteUser(HttpUser):
    wait_time = between(1, 5)

    @task
    def primaryProducts_url(self):
        self.client.get(url="/offers")

    @task
    def primaryFlights_url(self):
        self.client.get(url="/flights")

    @task
    def primaryCart_url(self):
        self.client.get(url="/cart")







