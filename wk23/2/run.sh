(trap 'kill 0' SIGINT; (cd ./server && npm start) & (cd ./client && npm start) & wait)