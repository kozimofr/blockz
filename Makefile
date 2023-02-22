tag:
	git tag -a v$(version) -m "Version $(version)"

clean:
	cd ./www && rm -rf node_modules yarn.lock package-lock.json .next
	cd ./packages/blockz-scss && rm -rf node_modules yarn.lock package-lock.json dist
	cd ./packages/blockz-icons && rm -rf node_modules yarn.lock package-lock.json dist
	cd ./packages/blockz-react && rm -rf node_modules yarn.lock package-lock.json dist
