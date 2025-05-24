LOCAL_UID	?= $(shell id -u)
LOCAL_GID	?= $(shell id -g)
DOCKER_USER	?= ${LOCAL_GID}:${LOCAL_UID}


up: #: Start the development environment services in foreground mode
	docker compose up --attach app

install: #: install deps
	docker compose run --rm -ti --no-deps app npm install

clean: #: Bring down containers, remove all data, and delete specified folders
	@echo "Bringing down Docker containers and removing all volumes"
	docker compose down --remove-orphans --volumes

shell: #: Enter user-mode shell (same UID:GID as host user)
	docker compose run -u ${DOCKER_USER} --rm -ti app bash