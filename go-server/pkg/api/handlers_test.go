package api

import (
	"go-server/pkg/db"
	"go-server/pkg/models"
	"net/http"
	"net/http/httptest"
	"testing"
	"github.com/stretchr/testify/assert"
)

func setupMockDB(t *testing.T) {
	t.Helper()  // Mark this as a test helper function

	db.InitializeInMemoryDB()

	// Set up cleanup to reset the global database variable after this test
	t.Cleanup(func() {
		db.DB = nil
	})
}

func TestGetEmployees(t *testing.T) {
	setupMockDB(t)
    
	emp := &models.Employee{
		Name: "Test",
		Code: "1234",
	}

	result := db.DB.Create(emp)
	if result.Error != nil {
		t.Fatalf("Failed to insert employee: %v", result.Error)
	}    

	req, err := http.NewRequest(http.MethodGet, "/employees", nil)
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

