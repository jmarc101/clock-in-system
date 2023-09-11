package api

import (
	"encoding/json"
    "go-server/pkg/models"
	"log"
	"net/http"
	"strconv"
	"time"
	"gorm.io/gorm"
)

func getCurrentWorkShift(db *gorm.DB, employeeId int) (*models.WorkShift, error) {
    var workshift models.WorkShift
    result := db.Where("employee_id = ?", employeeId).Order("id desc").First(&workshift)
    return &workshift, result.Error
}

func handleError(w http.ResponseWriter, message string, err error) {
    log.Printf("%s: %s", message, err)
    http.Error(w, message, http.StatusInternalServerError)
}

func handleResponse(w http.ResponseWriter, data interface{}) {
    if err := json.NewEncoder(w).Encode(data); err != nil {
        handleError(w, "Failed to encode response", err)
    }
}

func handleRequest(r *http.Request, data interface{}, w http.ResponseWriter) {
    err := json.NewDecoder(r.Body).Decode(data)
    if err != nil {
      handleError(w, "Bad Request", err)
        return
    }
}

func parseIntFromStringAndHandleErrors(s string, w http.ResponseWriter) (n int){
employeeId, err := strconv.Atoi(s)
    if err != nil {
        handleError(w, "Error converting employeeId to int", err)
        return 
    }
    return employeeId
}

func parseTimeFromStringAndHandleErrors(s string, w http.ResponseWriter)(t time.Time){
    startDate, err := time.Parse(time.RFC3339, s)
    if err != nil {
        handleError(w, "Invalid Date Format", err)
    }
    return startDate
}
