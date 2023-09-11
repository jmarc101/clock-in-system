package api

import (
    "net/http"
    "github.com/gorilla/mux"
)

func SetupRoutes() {
    r := mux.NewRouter() // Create a new Gorilla Mux NewRouter

    r.HandleFunc("/employees", GetEmployees).Methods("GET")
    r.HandleFunc("/employees", CreateEmployee).Methods("POST")
    r.HandleFunc("/employees", UpdateEmployee).Methods("PUT")
    r.HandleFunc("/employees/{employeeId}/punch", Punch).Methods("POST")    
    
    r.HandleFunc("/workshifts", GetWorkshifts).Methods("GET")
    r.HandleFunc("/workshifts", CreateWorkshift).Methods("POST")
    r.HandleFunc("/workshifts", UpdateWorkshift).Methods("PUT")
    
    http.Handle("/", r)
}
