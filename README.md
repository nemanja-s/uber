# Project: uber
ToDo app implemented with React.js on client side and https://jsonplaceholder.typicode.com/ fake RESTful API as backend

# Scenarios
- Admin goes to home page (127.0.0.1:8080). System redirects s/he  to the login page. Admin logs in by entering email and password. On successful log in Admin is redirected back to the home page. Note: for Admin login use some predefined email/password and check it on front end side only.
- On the home page, Admin overviews the tasks list and selects one task to edit. On task edit page Admin modifies the task's assignee. Once changes are saved Admin is redirected back to the home page.
- On the home page, Admin adds new task and marks it as done.

# Features
- Admin log in
- Tasks list
- Add new task
- Edit existing task
- Delete existing task
- Mark task as done
- User profile overview

# RESTful API Endpoints (JSON Placeholder Fake RESTful API Endpoints)
- task list: https://jsonplaceholder.typicode.com/todos,
- users - for list of assignees: https://jsonplaceholder.typicode.com/users
- for user profile: the user - https://jsonplaceholder.typicode.com/users/1  and user's todos - https://jsonplaceholder.typicode.com/users/1/todos
