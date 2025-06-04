# React Todo App

A todo app with filtering, sorting, statistics, and local storage support. Built with React.

## Features
- Add / delete / complete todos
- Filter by status and priority
- Sort by date or priority
- Local storage persistence
- Basic tests using Jest + React Testing Library

## Setup
```bash
npm install
npm start
```

## Run Tests
```bash
npm test
```

## Docker
```bash
docker build -t react-todo-app .
docker run -p 3000:3000 react-todo-app