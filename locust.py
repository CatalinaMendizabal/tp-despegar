import time
from locust import HttpUser, task, between


class WebsiteUser(HttpUser):
    wait_time = between(1, 5)

    @task
    def primaryProducts_url(self):
        self.client.get(url="/products")

    @task
    def primaryFlights_url(self):
        self.client.get(url="/flights")

    @task
    def secondaryProducts_url(self):
        self.client.get(url="/products/idEjemplo")

    @task
    def secondaryFlights_url(self):
        self.client.get(url="/flights/idEjemplo")

    @task
    def tertiary_url(self):
        self.client.get(url="/flights/multiflight")

         #tunear la url segun la que necesitemos pegarle n3 ^



