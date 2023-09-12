package db

import (
	"fmt"
	"go-server/pkg/models"
	"os"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

// Initialize establishes a connection to the database using the DATABASE_URL environment variable.
func Initialize() error {
    return initializeDB(os.Getenv("DATABASE_URL"))
}

// InitializeInMemoryDB sets up a new in-memory database.
func InitializeInMemoryDB() error {
    return initializeDB("file::memory:?cache=shared")
}

func initializeDB(dataSourceName string) error {
    db, err := gorm.Open(sqlite.Open(dataSourceName), &gorm.Config{
        Logger: logger.Default.LogMode(logger.Info),
    })
    if err != nil {
        return fmt.Errorf("failed to connect database: %v", err)
    }

    if err := db.AutoMigrate(&models.Employee{}, &models.WorkShift{}); err != nil {
        return fmt.Errorf("error with AutoMigrate: %v", err)
    }

    DB = db
    return nil
}

