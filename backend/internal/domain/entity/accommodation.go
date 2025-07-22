package entity

import (
	"encoding/json"
	"time"
)

type Accommodation struct {
	ID            uint                 `gorm:"primaryKey" json:"id"`
	Name          string               `gorm:"not null" json:"name"`
	Description   string               `gorm:"type:text;not null" json:"description"`
	PricePerNight float64              `gorm:"type:numeric(10,2)" json:"price_per_night,omitempty"`
	Capacity      int                  `json:"capacity,omitempty"`
	Amenities     json.RawMessage      `gorm:"type:json" json:"amenities,omitempty"`
	IsAvailable   bool                 `gorm:"default:true" json:"is_available"`
	CreatedAt     time.Time            `json:"created_at"`
	Images        []AccommodationImage `gorm:"foreignKey:AccommodationID;constraint:OnDelete:CASCADE" json:"images"`
}

type AccommodationImage struct {
	ID              uint   `gorm:"primaryKey" json:"id"`
	AccommodationID uint   `gorm:"index" json:"accommodation_id"`
	URL             string `gorm:"not null" json:"url"`
}

func NewAccommodation(name, description string, price float64, capacity int, amenities []string) *Accommodation {
	amenitiesJSON, _ := json.Marshal(amenities)
	return &Accommodation{
		Name:          name,
		Description:   description,
		PricePerNight: price,
		Capacity:      capacity,
		Amenities:     amenitiesJSON,
		IsAvailable:   true,
	}
}
