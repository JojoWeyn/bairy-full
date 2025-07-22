package dto

type CreateAccommodationDTO struct {
	Name          string   `json:"name" binding:"required"`
	Description   string   `json:"description" binding:"required"`
	ImageURLs     []string `json:"image_urls" binding:"required"`
	PricePerNight *float64 `json:"price_per_night,omitempty"`
	Capacity      *int     `json:"capacity,omitempty"`
	Amenities     []string `json:"amenities,omitempty"`
	IsAvailable   *bool    `json:"is_available,omitempty"`
}
