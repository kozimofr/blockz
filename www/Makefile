clean:
	rm -rf node_modules yarn.lock package-lock.json

share_package:
	cd ../packages/${package} && rm -rf node_modules yarn.lock package-lock.json && npm unlink -g && npm i && npm run build && npm link
	npm link @kozimo/${package}

share_dependency:
	cd ../packages/${package} && npm link ../../www/node_modules/${dependency}

link:
	rm -rf node_modules yarn.lock package-lock.json
	npm i
	make share_package package="blockz-react"
	make share_dependency package="blockz-react" dependency="react"
	# make create_link package="blockz-icons"
	# make create_link package="blockz-scss"
