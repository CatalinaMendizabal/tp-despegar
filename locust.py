import time
from locust import HttpUser, task, between


class WebsiteUser(HttpUser):
    wait_time = between(1, 5)

    @task
    def primary_url(self):
        self.client.get(url="/")

     #tunear la url segun la que necesitemos pegarle n1 ^

    @task
    def secondary_url(self):
        self.client.get(url="/secondary")

     #tunear la url segun la que necesitemos pegarle n2 ^

    @task
    def tertiary_url(self):
        self.client.get(url="/tertiary")

         #tunear la url segun la que necesitemos pegarle n3 ^



