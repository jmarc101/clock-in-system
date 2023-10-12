# Clock-In System

A simple clock-in system to track employee work shifts.

## Project Overview

The system is composed of a server component built using `Express`, `Prisma` for database interaction, and a client-side component built using `React`.

The server offers RESTful APIs for CRUD operations related to employees and their respective work shifts.

The client provides a user-friendly interface to record work shifts, view summaries, and perform related tasks.

## Features

1. **Punch-In/Out System**: Employees can easily clock-in and clock-out using their unique codes.
2. **Work Shift Summaries**: View a summary of work shifts for a given time range for each employee.
3. **Fullscreen Mode**: Optimized for kiosk-style deployments with a fullscreen mode.
4. **Database Interface**: Database GUI used off `port:5555` for easy data manipulation. 

## Getting Started

### Prerequisites

1. Docker and Docker Compose.
2. Node.js (for development purposes)

### Setup

1. Clone this repository:
```
git clone https://github.com/jmarc101/clock-in-system
```

2. Navigate to the project folder:
```
cd clock-in-system
```

3. *First Time Setup*
 ```
 cd server && npx prisma generate
 ```

4. Start the services:
```
cd .. && docker-compose up
```
5. Open a browser and navigate to [http://localhost:8080](http://localhost:8080) to access the client app.

## API Endpoints

- `/employees`: Retrieve a list of all employees.
- `/employees/:employeeId/workshifts`: Get work shifts of an employee for a specific date range.
- `/employees/:employeeId/punch`: Record a work shift start/end for an employee.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
