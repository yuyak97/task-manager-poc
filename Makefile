.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":"}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: start-app
start-app:
	cd app && npm install && npm run dev

.PHONY: start-api
start-api:
	cd api && npm install && docker-compose up

.PHONY: init-data
init-data: 
	cat ./api/db/dump.sql | docker exec -i task-db psql -U postgres -d task
