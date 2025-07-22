package http

import (
	"backend/internal/domain/entity"
	"context"
	"mime/multipart"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type ImageUseCase interface {
	Create(ctx context.Context, url string, title, alt, category *string) error
	UploadAndCreate(ctx context.Context, file multipart.File, fileHeader *multipart.FileHeader, title, alt, category *string) (string, error)
	GetByID(ctx context.Context, id uint) (*entity.Image, error)
	ListAll(ctx context.Context) ([]*entity.Image, error)
	Update(ctx context.Context, a *entity.Image) error
	Delete(ctx context.Context, id uint) error
	ListByCategory(ctx context.Context, category string) ([]*entity.Image, error)
}

type imageRoutes struct {
	uc ImageUseCase
}

func NewImageRoutes(rg *gin.RouterGroup, uc ImageUseCase) {
	r := &imageRoutes{uc: uc}
	image := rg.Group("/image")
	{
		image.GET("", r.listAllImages)
		image.GET("/:id", r.getImageByID)

	}
}

func (r *imageRoutes) listAllImages(c *gin.Context) {
	category := c.Query("category")
	if category != "" {
		images, err := r.uc.ListByCategory(c.Request.Context(), category)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка получения изображений"})
			return
		}

		c.JSON(http.StatusOK, images)
		return
	}

	images, err := r.uc.ListAll(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка получения изображений"})
		return
	}

	c.JSON(http.StatusOK, images)
}

func (r *imageRoutes) getImageByID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil || id <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Некорректный ID"})
		return
	}

	image, err := r.uc.GetByID(c.Request.Context(), uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Изображение не найдено"})
		return
	}

	c.JSON(http.StatusOK, image)
}
