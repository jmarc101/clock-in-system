package models 

import (
    "time"
)

type Employee struct {
    ID         int
    Name       string
    Code       string `gorm:"unique"`
    CreatedAt  time.Time
    WorkShifts []WorkShift
}

type WorkShift struct {
    ID            int
    EmployeeID    int
    StartDate     time.Time
    EndDate       *time.Time
    Employee      Employee `gorm:"foreignKey:EmployeeID"`
}

