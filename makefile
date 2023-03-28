

build:
	docker compose up -d --build --remove-orphans

up:
	docker compose up -d

down:
	docker compose down

restart:
	docker compose restart

clean:
	docker compose down --rmi all --volumes --remove-orphans