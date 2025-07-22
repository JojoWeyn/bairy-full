package entity

import "time"

type Service struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	Title       string    `gorm:"not null" json:"title"`
	Description string    `gorm:"type:text;not null" json:"description"`
	IconURL     *string   `json:"icon_url,omitempty"`
	ImageURL    *string   `json:"image_url,omitempty"`
	IsActive    bool      `gorm:"default:true" json:"is_active"`
	CreatedAt   time.Time `json:"created_at"`
}

func NewService(title, description string, iconURL, imageURL *string, isActive bool) *Service {
	return &Service{
		Title:       title,
		Description: description,
		IconURL:     iconURL,
		ImageURL:    imageURL,
		IsActive:    isActive,
		CreatedAt:   time.Now(),
	}
}
