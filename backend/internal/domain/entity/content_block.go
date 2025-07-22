package entity

import "time"

type ContentBlock struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Slug      string    `gorm:"uniqueIndex;not null" json:"slug"`
	Title     *string   `json:"title,omitempty"`
	Content   string    `gorm:"type:text;not null" json:"content"`
	IsActive  bool      `gorm:"default:true" json:"is_active"`
	CreatedAt time.Time `json:"created_at"`
}
