package api

import (
    "encoding/json"
    "go-server/pkg/models"
    "go-server/pkg/db"
    "log"
    "net/http"
    "time"
    "github.com/gorilla/mux" //gorilla mux to get path variable
    "gorm.io/gorm" // gorm is ORM used
)

func GetEmployees(w http.ResponseWriter, r *http.Request) {
    db := db.DB
    var employees []models.Employee
    db.Find(&employees)
    if err := json.NewEncoder(w).Encode(employees); err != nil {
        log.Print(err)
    }
}

func CreateEmployee(w http.ResponseWriter, r *http.Request){
    type CreateEmployeeRequest struct {
        Name string `json:"name"`
        Code string `json:"Code"`
    }
    
    var req CreateEmployeeRequest
    handleRequest(r, &req, w)
    db := db.DB
    
    emp := &models.Employee{
        Name: req.Name,
        Code: req.Code,
    }
    
    dbResult := db.Create(emp)
    if dbResult.Error != nil {
        handleError(w, "Error creating employee", dbResult.Error)
    }

    handleResponse(w, emp)
}

func UpdateEmployee(w http.ResponseWriter, r *http.Request) {
    type UpdateEmployeeRequest struct {
        Id   int    `json:"id"`
        Name string `json:"name"`
        Code string `json:"code"`
    }
    
    var req UpdateEmployeeRequest
    handleRequest(r, &req, w)

    db := db.DB

    var emp models.Employee
    dbResult := db.Where("employee_id = ?", req.Id).First(&emp)
    if dbResult.Error != nil {
        handleError(w, "Error fetching employee", dbResult.Error)
    }
    
    emp.Code = req.Code
    emp.Name = req.Name
    db.Save(emp)
    
    handleResponse(w, emp)
}

func Punch(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    employeeId := parseIntFromStringAndHandleErrors(vars["employeeId"], w)
    db := db.DB

    workshift, err := getCurrentWorkShift(db, employeeId)
    if err == gorm.ErrRecordNotFound {
        workshift = &models.WorkShift{EmployeeID: employeeId, StartDate: time.Now()}
        db.Create(workshift)
        handleResponse(w, workshift)
        return
    } else if err != nil {
        handleError(w, "Error retrieving workshift", err)
        return
    }

    if workshift.EndDate == nil {
        now := time.Now()
        workshift.EndDate = &now
        db.Save(&workshift)
        handleResponse(w, workshift)
        return
    } 

    newWorkshift := models.WorkShift{EmployeeID: employeeId, StartDate: time.Now()}
    db.Create(&newWorkshift)
    handleResponse(w, &newWorkshift)
}

func GetWorkshifts(w http.ResponseWriter, r *http.Request){
    
    employeeIdStr := r.URL.Query().Get("employeeId")
    startDateStr := r.URL.Query().Get("startDate")
    endDateStr := r.URL.Query().Get("endDate")


    db := db.DB
    query := db

    if employeeIdStr != "" {
        employeeId := parseIntFromStringAndHandleErrors(employeeIdStr, w)
        query.Where("employee_id = ?", employeeId)
    }
    if startDateStr != "" {
        startDate := parseTimeFromStringAndHandleErrors(startDateStr, w)
        query.Where("start_date >= ?", startDate)
    }
    if endDateStr != "" {
        endDate := parseTimeFromStringAndHandleErrors(endDateStr, w)
        query.Where("end_date <= ?", endDate)
    }

    var workshifts []models.WorkShift
    db.Find(&workshifts)
    handleResponse(w, workshifts)
}

func CreateWorkshift(w http.ResponseWriter, r *http.Request){
    type CreateWorkshiftRequest struct {
        EmployeeId   int        `json:"employeeId"`
        StartDate    time.Time  `json:"startDate"`
        EndDate      *time.Time `json:"endDate"`
    }
    
    var req CreateWorkshiftRequest
    handleRequest(r, &req, w)
    db := db.DB
    
    workshift := &models.WorkShift{
        EmployeeID: req.EmployeeId,
        StartDate: req.StartDate,
        EndDate: req.EndDate,
    }
    
    dbResult := db.Create(workshift)
    if dbResult.Error != nil {
        handleError(w, "Error creating workshift", dbResult.Error)
    }
    
    handleResponse(w, workshift)
    
}

func UpdateWorkshift(w http.ResponseWriter, r *http.Request) {
    type UpdateWorkshiftRequest struct {
        Id           int        `json:"id"`
        StartDate    time.Time  `json:"startDate"`
        EndDate      *time.Time `json:"endDate"`
    }
    
    var req UpdateWorkshiftRequest
    handleRequest(r, &req, w)
    db := db.DB

    var workshift models.WorkShift
    dbResult := db.Where("id = ?", req.Id).First(&workshift)
    if dbResult.Error != nil {
        handleError(w, "Error fetching workshift", dbResult.Error)
    }
    
    workshift.StartDate = req.StartDate
    workshift.EndDate = req.EndDate
    db.Save(workshift)
    
    handleResponse(w, workshift)
}

