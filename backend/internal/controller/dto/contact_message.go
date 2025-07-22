package dto

type ContactMessageDTO struct {
	Name    string `json:"name" binding:"required"`
	Phone   string `json:"phone" binding:"required"`
	Email   string `json:"email"`
	Message string `json:"message" binding:"required"`
}
