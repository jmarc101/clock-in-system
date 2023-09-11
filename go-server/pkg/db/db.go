package db

import (
	"fmt"
	"go-server/pkg/models"
	"os"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// We set DB here as global variable to be able to set it manually.
// This is going to be useful for making mock db for testing.
var DB *gorm.DB

// Connect to DB use DATABASE_URL from environment
func Initialize() {
    databaseUrl := os.Getenv("DATABASE_URL")
    db, err := gorm.Open(sqlite.Open(databaseUrl), &gorm.Config{
        Logger: logger.Default.LogMode(logger.Info), // Log all SQL queries
    })
    if err != nil {
        panic(fmt.Sprintf("failed to connect database: %v", err))
    }

    if err := db.AutoMigrate(&models.Employee{}, &models.WorkShift{}); err != nil {
        fmt.Println("DATABASE_URL:", databaseUrl)
    }
    DB = db
}

// set global DB to params DB
func SetDB(database *gorm.DB) {
    DB = database
}

