package main

import (
	"backend/models"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"github.com/julienschmidt/httprouter"
)

func (app *application) getOneVaccine(w http.ResponseWriter, r *http.Request) {

	params := httprouter.ParamsFromContext(r.Context())
	fmt.Println(params)
	id, err := strconv.Atoi(params.ByName("id"))
	if err != nil {
		app.logger.Print(errors.New("invalid ID parameter"))
		app.errorJSON(w, err)
		return
	}

	app.logger.Println("id is", id)

	vaccine := models.Vaccine{

		ID:         id,
		Name:       "Pfizer",
		VaccineNum: 1,
		State:      "Florida",
		ZipCode:    32835,
	}

	err = app.writeJSON(w, http.StatusOK, vaccine, "vaccine")
}

func (app *application) getAllVaccines(w http.ResponseWriter, r *http.Request) {
	db, _ := gorm.Open("sqlite3", "./vaccine.db")
	defer db.Close()

	var p5 []models.Vaccine
	db.Find(&p5)
	fmt.Println(p5)

	app.writeJSON(w, http.StatusOK, p5, "vaccines")

}

func (app *application) getBooking(w http.ResponseWriter, r *http.Request) {

	var vaccine models.Vaccine

	err := json.NewDecoder(r.Body).Decode(&vaccine)
	if err != nil {
		app.errorJSON(w, err)
		return
	}
	//print vaccine info from front end
	log.Println(vaccine)
	log.Println("Vaccine with ID ", vaccine.ID, " is booked.")
	log.Println("Detailed Info:", vaccine.Name, ",", vaccine.VaccineNum, "-dose.")
}