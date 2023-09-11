package main

import (
   "net/http"
   "go-server/pkg/api"
   "go-server/pkg/db"
   "github.com/rs/cors"
   "github.com/joho/godotenv"
   "log"
)

func init() {
    if err := godotenv.Load(); err != nil {
        log.Print("No .env file found")
    }
    db.Initialize()
}

func main() {
    api.SetupRoutes()
    handler := cors.Default().Handler(http.DefaultServeMux)
    if err := http.ListenAndServe(":4000", handler); err != nil {
        log.Print("Server unable to listen")
    }
}

