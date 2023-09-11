package api

import (
	"fmt"
	dbpkg "go-server/pkg/db"
	"go-server/pkg/models"
	"net/http"
	"net/http/httptest"
	"testing"
	"github.com/stretchr/testify/assert"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func mockDBConnection() (*gorm.DB, error) {
    // Get Gorm to use Mocked database
    gormDB, err := gorm.Open(sqlite.Open("file::memory:?cache=shared"), &gorm.Config{})

    if err := gormDB.AutoMigrate(&models.Employee{}, &models.WorkShift{}); err != nil {
        fmt.Println("Error migrating database")
    }
    return gormDB, err
}

func TestGetEmployees(t *testing.T) {
    db, err := mockDBConnection()
    if err != nil {
        t.Fatalf("failed to open mock dv: %v", err)
    }

    dbpkg.SetDB(db) 
    
    emp := &models.Employee{
        Name: "Test",
        Code: "1234",
    }

    result := db.Create(emp)
    if result.Error != nil {
        t.Fatalf("Failed to insert employee: %v", result.Error)
    }    

    req, err := http.NewRequest(http.MethodGet, "/employes", nil)
    if err != nil {
        t.Fatalf("Failed to create Request %v", err)
    }

    rr := httptest.NewRecorder()
    handler := http.HandlerFunc(GetEmployees)
    handler.ServeHTTP(rr, req)


    assert.Equal(t, http.StatusOK, rr.Code)  // Check status code
    // Check parts of the response body
    responseBody := rr.Body.String()
    assert.Contains(t, responseBody, "\"Name\":\"Test\"")
    assert.Contains(t, responseBody, "\"Code\":\"1234\"")
    // Optionally check if ID, CreatedAt fields exist (without checking their exact values)
    assert.Contains(t, responseBody, "\"ID\":")
    assert.Contains(t, responseBody, "\"CreatedAt\":\"")
}


