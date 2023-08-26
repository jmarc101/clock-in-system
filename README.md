# clock-in-system

## API Endpoints

| Method | Endpoint                               | Description                                                                                                           |
|--------|----------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| GET    | `/employees`                           | Fetches all employees.                                                                                                |
| GET    | `/workshifts`                          | Fetches work shifts between the specified `startDate` and `endDate`.                                                  |
| GET    | `/admins`                              | Fetches all admins.                                                                                                   |
| GET    | `/employees/:employeeId/workshifts`    | Fetches work shifts of a specific employee between `startDate` and `endDate`.                                         |
| POST   | `/employee`                            | Creates a new employee with given `name` and `code`.                                                                  |
| POST   | `/employee/:employeeId/workshift`      | Ends the current work shift for a specified employee or starts a new one based on the provided `date`.                |
| POST   | `/workshift`                           | Creates a new work shift for a specified `employeeId`, `startDate`, and `endDate`.                                     |
| PUT    | `/employee/:employeeId`                | Updates the `name` and `code` for a specified employee.                                                               |
| PUT    | `/workshift/:workshiftId`              | Updates the `startDate` and `endDate` for a specified work shift.                                                      |
| DELETE | `/workshift/:workshiftId`              | Deletes a specified work shift.                                                                                       |


## Data Models

### Employee

| Field       | Type         | Attributes                           |
|-------------|--------------|--------------------------------------|
| `id`        | `Int`        | `@id @default(autoincrement())`      |
| `name`      | `String`     |                                      |
| `code`      | `String`     | `@unique`                            |
| `createdAt` | `DateTime`   | `@default(now())`                    |
| `workShifts`| `WorkShift[]`|                                      |

### WorkShift

| Field       | Type         | Attributes                           |
|-------------|--------------|--------------------------------------|
| `id`        | `Int`        | `@id @default(autoincrement())`      |
| `employeeId`| `Int`        |                                      |
| `start`     | `DateTime`   |                                      |
| `end`       | `DateTime?`  |                                      |
| `employee`  | `Employee`   | `@relation(fields: [employeeId], references: [id])`|

### Admin

| Field       | Type         | Attributes                           |
|-------------|--------------|--------------------------------------|
| `id`        | `Int`        | `@id @default(autoincrement())`      |
| `name`      | `String`     |                                      |
| `email`     | `String`     | `@unique`                            |
| `password`  | `String`     |                                      |
| `createdAt` | `DateTime`   | `@default(now())`                    |
