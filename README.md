# Where's Rex?
Where's Rex is a fun and interactive game to guess locations around UofC

## Structure
Where's Rex is comprised of two components:
The web client in React
The supporting server in Node

## Running
To run you need port `3000` and `5000` free.

Deployment and networking is managed by `docker` and `docker-compose`

To start: navigate to this directory and run `docker-compose up`
Both the client and server will download their node modules and start themselves.
Once the client has indicated it is ready in the logs navigate to `localhost:3000` and sign in!

## Debugging 
If you run into issues:
- stop docker
- delete all `package-log.json` files
- delete all `node-modules` folders
- restart `docker-compose`

### Suggested versions:
- docker-compose version 1.29.2
- Docker version 20.10.12

