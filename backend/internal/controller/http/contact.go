package http

import (
	"backend/internal/controller/dto"
	"context"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

type TelegramBot interface {
	SendMessage(ctx context.Context, text string) error
}
type contactRoutes struct {
	bot TelegramBot
}

func NewContactRoutes(rg *gin.RouterGroup, bot TelegramBot) {
	r := &contactRoutes{bot: bot}
	contact := rg.Group("/contact")
	{
		contact.POST("", r.SendMessage)
	}
}

func (r *contactRoutes) SendMessage(c *gin.Context) {
	var dto dto.ContactMessageDTO
	if err := c.ShouldBindJSON(&dto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	message := fmt.Sprintf(
		`📬 *Новое сообщение с сайта*
		👤 *Имя:* %s
		📞 *Телефон:* %s
		📧 *Email:* %s
		📝 *Сообщение:* 
		%s`,
		dto.Name,
		dto.Phone,
		dto.Email,
		dto.Message,
	)

	if err := r.bot.SendMessage(c.Request.Context(), message); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при отправке в Telegram"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Сообщение успешно отправлено"})
}
