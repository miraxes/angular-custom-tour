SHELL := /bin/bash

dev:
	npm run start

lint:
	npm run lint

format:
	node_modules/typescript-formatter/bin/tsfmt -r

formatCheck:
	node_modules/typescript-formatter/bin/tsfmt --verify

build:
	npm run build

publish:
	npm run ngc
	tsc -d
	npm run umd
	npm publish --registry http://registry.npmjs.org
