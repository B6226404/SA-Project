package main

import (
	"github.com/gin-gonic/gin"
	"github.com/phu024/G13-Outpatient-Management/controller"
	"github.com/phu024/G13-Outpatient-Management/entity"
	"github.com/phu024/G13-Outpatient-Management/middlewares"
)

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{
			// Doctor Routes
			protected.GET("/doctors", controller.ListDoctors)
			protected.GET("/doctor/:id", controller.GetDoctor)

			// Patient Routes
			protected.GET("/patients", controller.ListPatients)
			protected.GET("/patient/:id", controller.GetPatient)

			// Clinic Routes
			protected.GET("/clinics", controller.ListClinics)
			protected.GET("/clinic/:id", controller.GetClinic)

			// Disease Routes
			protected.GET("/diseases", controller.ListDiseases)
			protected.GET("/disease/:id", controller.GetDisease)

			// Medicine Routes
			protected.GET("/medicines", controller.ListMedicine)
			protected.GET("/medicine/:id", controller.GetMedicine)

			// Examination Routes
			protected.GET("/examinations", controller.ListExaminations)
			protected.GET("/examination/:id", controller.GetExamination)
			protected.POST("/examinations", controller.CreateExamiation)
			protected.PATCH("/examinations", controller.UpdateExamination)
			protected.DELETE("/examinations/:id", controller.DeleteExamination)
		}
	}

	// Authentication Routes
	r.POST("/login", controller.LoginDoctor)

	// Run the server
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
