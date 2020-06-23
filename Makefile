
TAG="site"
USER="josephthomashines"

.PHONY: build run

build:
	docker build -t ${TAG} .

run:
	docker run -d -p 5001:5001 ${TAG}

push:
	dockerpush ${TAG} ${USER}/${TAG}
