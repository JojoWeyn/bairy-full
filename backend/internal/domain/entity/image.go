package entity

import "time"

type Image struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	URL       string    `gorm:"not null" json:"url"`
	Alt       *string   `json:"alt,omitempty"`
	Title     *string   `json:"title,omitempty"`
	Category  *string   `json:"category,omitempty"` // gallery, main-banner и т.д.
	CreatedAt time.Time `json:"created_at"`
}

func NewImage(url string, title, alt, category *string) *Image {
	return &Image{
		URL:       url,
		Alt:       alt,
		Title:     title,
		Category:  category,
		CreatedAt: time.Now(),
	}
}
