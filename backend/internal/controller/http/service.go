package http

import (
	"backend/internal/controller/dto"
	"backend/internal/domain/entity"
	"context"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

type ServiceUseCase interface {
	Create(ctx context.Context, title, description string, iconURL, imageURL *string, isActive bool) error
	GetByID(ctx context.Context, id uint) (*entity.Service, error)
	ListAll(ctx context.Context) ([]*entity.Service, error)
	Update(ctx context.Context, s *entity.Service) error
	Delete(ctx context.Context, id uint) error
}

type serviceRoutes struct {
	uc ServiceUseCase
}

func NewServiceRoutes(rg *gin.RouterGroup, uc ServiceUseCase) {
	r := &serviceRoutes{uc: uc}
	service := rg.Group("/service")
	{
		service.GET("", r.listAllServices)
		service.GET("/:id", r.getServiceByID)
	}
}

func (r *serviceRoutes) listAllServices(c *gin.Context) {
	services, err := r.uc.ListAll(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка получения услуг"})
		return
	}

	c.JSON(http.StatusOK, services)
}

func (r *serviceRoutes) getServiceByID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil || id <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Некорректный ID"})
		return
	}

	service, err := r.uc.GetByID(c.Request.Context(), uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Услуга не найдена"})
		return
	}

	c.JSON(http.StatusOK, service)
}

func (r *serviceRoutes) updateService(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil || id <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Некорректный ID"})
		return
	}

	var dto dto.CreateServiceDTO
	if err := c.ShouldBindJSON(&dto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	service := &entity.Service{
		ID:          uint(id),
		Title:       dto.Title,
		Description: dto.Description,
		IconURL:     dto.IconURL,
		ImageURL:    dto.ImageURL,
		IsActive:    dto.IsActive,
	}

	if err := r.uc.Update(c.Request.Context(), service); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Не удалось обновить услугу"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Услуга обновлена"})
}

func (r *serviceRoutes) deleteService(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil || id <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Некорректный ID"})
		return
	}

	if err := r.uc.Delete(c.Request.Context(), uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка удаления услуги"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Услуга удалена"})
}
