# Kubernetes (Minikube) deployment

```bash
minikube start --driver=docker

# Replace DOCKERHUB_USERNAME placeholders first
sed -i 's/DOCKERHUB_USERNAME/yourname/g' *.yaml

# Secrets (Mongo Atlas URI + JWT secret)
kubectl create secret generic tpms-secrets \
  --from-literal=MONGO_URI='mongodb+srv://...' \
  --from-literal=JWT_SECRET='supersecret'

kubectl apply -f .

kubectl get pods,svc

minikube service frontend-service --url
minikube service backend-service  --url
```
