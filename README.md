# [Backstage](https://backstage.io)

This is your newly scaffolded Backstage App, Good Luck!

To start the app, run:

```sh
yarn install
yarn dev
```

# Create a KIND Cluster with a Dapr Application

```
kind create cluster
```

```
helm repo add dapr https://dapr.github.io/helm-charts/
helm repo update
helm upgrade --install dapr dapr/dapr \
--version=1.14.4 \
--namespace dapr-system \
--create-namespace \
--wait
```

Install the application:

```
helm install conference oci://docker.io/salaboy/conference-app --version v2.0.0
```

Wait for all the pods are in Running state:

```
kubectl get pods
NAME                                                           READY   STATUS    RESTARTS      AGE
conference-agenda-service-deployment-5dd4bf67b-z27pp           2/2     Running   2 (81m ago)   87m
conference-c4p-service-deployment-57b5985757-pnjh9             2/2     Running   2 (81m ago)   87m
conference-frontend-deployment-69d9b479b7-5lk8n                2/2     Running   0             87m
conference-kafka-0                                             1/1     Running   0             87m
conference-notifications-service-deployment-7b6cbf965d-q577g   2/2     Running   2 (81m ago)   87m
conference-postgresql-0                                        1/1     Running   0             87m
conference-redis-master-0                                      1/1     Running   0             87m
dapr-dashboard-56788c76dd-sh24l                                1/1     Running   0             82m
flagd-6bbdc5d999-6tb5c                                         1/1     Running   0             87m
```

To access the application:

```
kubectl port-forward svc/frontend 8080:80
```

Install the Dapr Dashboard:

```
helm install dapr-dashboard dapr/dapr-dashboard
```

To access the Dashboard:

```
kubectl port-forward svc/dapr-dashboard 8081:8080
```

# APIs to get data from backend

Get all apps

```
curl http://localhost:8081/api/instances/All
```

Get `notification-service` details

```
curl http://localhost:8081/api/instances/All/notifications-service
```

Get Dapr Components

```
curl http://localhost:8081/api/components/All
```

Get Single Dapr Component

```
curl http://localhost:8081/api/components/All/conference-agenda-service-statestore
```

The Dapr Dashboard with the application running looks like this:

![](imgs/1.png)
![](imgs/2.png)
![](imgs/3.png)
![](imgs/4.png)
![](imgs/5.png)
![](imgs/6.png)
