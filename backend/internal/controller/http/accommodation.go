package http

import (
	"backend/internal/domain/entity"
	"context"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

type AccommodationUseCase interface {
	Create(ctx context.Context, name, description string, price float64, capacity int, amenities []string, imageURLs []string) error
	GetByID(ctx context.Context, id uint) (*entity.Accommodation, error)
	ListAll(ctx context.Context) ([]*entity.Accommodation, error)
	Update(ctx context.Context, a *entity.Accommodation) error
	Delete(ctx context.Context, id uint) error
}

type accommodationRoutes struct {
	uc AccommodationUseCase
}

func NewAccommodationRoutes(rg *gin.RouterGroup, uc AccommodationUseCase) {
	r := &accommodationRoutes{uc: uc}
	accommodation := rg.Group("/accommodation")
	{
		accommodation.GET("", r.listAllAccommodations)
		accommodation.GET("/:id", r.getAccommodationByID)
	}
}

func (r *accommodationRoutes) listAllAccommodations(ctx *gin.Context) {
	list, err := r.uc.ListAll(ctx.Request.Context())
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка получения размещений"})
		return
	}
	ctx.JSON(http.StatusOK, list)
}

func (r *accommodationRoutes) getAccommodationByID(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil || id <= 0 {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Некорректный ID"})
		return
	}

	accommodation, err := r.uc.GetByID(ctx.Request.Context(), uint(id))
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Размещение не найдено"})
		return
	}

	ctx.JSON(http.StatusOK, accommodation)
}
