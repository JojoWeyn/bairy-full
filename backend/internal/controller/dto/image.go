package dto

type CreateImageDTO struct {
	URL      string  `json:"url" binding:"required,url"`
	Alt      *string `json:"alt,omitempty"`
	Title    *string `json:"title,omitempty"`
	Category *string `json:"category,omitempty"`
}
