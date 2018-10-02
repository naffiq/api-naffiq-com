# API for [naffiq.com](https://naffiq.com)

[![Build Status](https://travis-ci.org/naffiq/api-naffiq-com.svg?branch=master)](https://travis-ci.org/naffiq/api-naffiq-com)

Serves content and manages file uploads.

## 🏗 Development

Copy `.env.example` file to `.env` and fill required configuration for Github OAuth API.
Run project with `yarn start`.

## 🐋 Running with docker

You can run `docker-compose up` in project root folder to get MongoDB and project.
I use that in production for both website and api and manage them in [portainer](https://portainer.io/).

## 📝 TODO:

- [x] Configuration with `.env` and watchers
- [x] Set up mongodb
- [x] Update posts resolvers
- [x] Set up authentication and authorization
- [x] Containerize app
- [x] Set up CI/CD cycle
- [x] Add Github sign-in option
- [ ] Create comments section
- [ ] Add websocket support (with authorization) for comments
