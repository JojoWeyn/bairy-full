package dto

type CreateContentBlockDTO struct {
	Slug     string  `json:"slug" binding:"required"`
	Title    *string `json:"title,omitempty"`
	Content  string  `json:"content" binding:"required"`
	IsActive *bool   `json:"is_active,omitempty"`
}
