package dto

type CreateServiceDTO struct {
	Title       string  `json:"title" binding:"required"`
	Description string  `json:"description" binding:"required"`
	IconURL     *string `json:"icon_url,omitempty"`
	ImageURL    *string `json:"image_url,omitempty"`
	IsActive    bool    `json:"is_active,omitempty"`
}
