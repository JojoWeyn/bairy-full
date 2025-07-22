package http

import (
	"backend/internal/controller/dto"
	"backend/internal/domain/entity"
	"encoding/json"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

type adminRoutes struct {
	serviceUC       ServiceUseCase
	accommodationUC AccommodationUseCase
	imageUC         ImageUseCase
}

func NewAdminRoutes(rg *gin.RouterGroup, serviceUC ServiceUseCase, accommodationUC AccommodationUseCase, imageUC ImageUseCase) {
	r := &adminRoutes{
		serviceUC:       serviceUC,
		accommodationUC: accommodationUC,
		imageUC:         imageUC,
	}
	admin := rg.Group("")
	{
		admin.POST("/service", r.createService)
		admin.PUT("/service/:id", r.updateService)
		admin.DELETE("/service/:id", r.deleteService)

		admin.PUT("/accommodation/:id", r.updateAccommodation)
		admin.DELETE("/accommodation/:id", r.deleteAccommodation)
		admin.POST("/accommodation", r.createAccommodation)

		admin.PUT("/image/:id", r.updateImage)
		admin.DELETE("/image/:id", r.deleteImage)
		admin.POST("/image/upload", r.uploadImage)
		admin.POST("/image", r.createImage)
	}
}

func (r *adminRoutes) createService(c *gin.Context) {
	var dto dto.CreateServiceDTO
	if err := c.ShouldBindJSON(&dto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := r.serviceUC.Create(c.Request.Context(), dto.Title, dto.Description, dto.IconURL, dto.ImageURL, dto.IsActive)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Не удалось создать услугу"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Услуга успешно создана"})
}

func (r *adminRoutes) updateService(c *gin.Context) {
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

	if err := r.serviceUC.Update(c.Request.Context(), service); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Не удалось обновить услугу"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Услуга обновлена"})
}

func (r *adminRoutes) deleteService(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil || id <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Некорректный ID"})
		return
	}

	if err := r.serviceUC.Delete(c.Request.Context(), uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка удаления услуги"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Услуга удалена"})
}

func (r *adminRoutes) createAccommodation(ctx *gin.Context) {
	var Adto dto.CreateAccommodationDTO
	if err := ctx.ShouldBindJSON(&Adto); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	price := 0.0
	if Adto.PricePerNight != nil {
		price = *Adto.PricePerNight
	}

	capacity := 0
	if Adto.Capacity != nil {
		capacity = *Adto.Capacity
	}

	if len(Adto.ImageURLs) == 0 {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Необходимо передать хотя бы одно изображение"})
		return
	}

	err := r.accommodationUC.Create(
		ctx.Request.Context(),
		Adto.Name,
		Adto.Description,
		price,
		capacity,
		Adto.Amenities,
		Adto.ImageURLs,
	)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Не удалось создать размещение"})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"message": "Размещение успешно создано"})
}

func (r *adminRoutes) updateAccommodation(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil || id <= 0 {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Некорректный ID"})
		return
	}

	var Adto dto.CreateAccommodationDTO
	if err := ctx.ShouldBindJSON(&Adto); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	price := 0.0
	if Adto.PricePerNight != nil {
		price = *Adto.PricePerNight
	}

	capacity := 0
	if Adto.Capacity != nil {
		capacity = *Adto.Capacity
	}

	// Преобразуем []string в []AccommodationImage
	var images []entity.AccommodationImage
	for _, url := range Adto.ImageURLs {
		images = append(images, entity.AccommodationImage{URL: url})
	}

	accommodation := &entity.Accommodation{
		ID:            uint(id),
		Name:          Adto.Name,
		Description:   Adto.Description,
		PricePerNight: price,
		Capacity:      capacity,
		Amenities:     StringSliceToJSONRawMessage(Adto.Amenities),
		Images:        images,
	}

	if Adto.IsAvailable != nil {
		accommodation.IsAvailable = *Adto.IsAvailable
	}

	if err := r.accommodationUC.Update(ctx.Request.Context(), accommodation); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Не удалось обновить размещение"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Размещение обновлено"})
}

func (r *adminRoutes) deleteAccommodation(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil || id <= 0 {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Некорректный ID"})
		return
	}

	if err := r.accommodationUC.Delete(ctx.Request.Context(), uint(id)); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка удаления размещения"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Размещение удалено"})
}

func StringSliceToJSONRawMessage(slice []string) json.RawMessage {
	b, err := json.Marshal(slice)
	if err != nil {
		return nil
	}
	return json.RawMessage(b)
}

func (r *adminRoutes) createImage(c *gin.Context) {
	var dto dto.CreateImageDTO
	if err := c.ShouldBindJSON(&dto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := r.imageUC.Create(c.Request.Context(), dto.URL, dto.Title, dto.Alt, dto.Category)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Не удалось создать изображение"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Изображение успешно создано"})
}

func (r *adminRoutes) uploadImage(c *gin.Context) {
	file, fileHeader, err := c.Request.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Файл изображения обязателен"})
		return
	}

	title := c.PostForm("title")
	alt := c.PostForm("alt")
	category := c.PostForm("category")

	// Указатели для необязательных значений
	var (
		titlePtr, altPtr, categoryPtr *string
	)
	if title != "" {
		titlePtr = &title
	}
	if alt != "" {
		altPtr = &alt
	}
	if category != "" {
		categoryPtr = &category
	}

	var url string
	url, err = r.imageUC.UploadAndCreate(c.Request.Context(), file, fileHeader, titlePtr, altPtr, categoryPtr)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Не удалось загрузить изображение"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Изображение успешно загружено", "url": url})
}

func (r *adminRoutes) updateImage(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil || id <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Некорректный ID"})
		return
	}

	var dto dto.CreateImageDTO
	if err := c.ShouldBindJSON(&dto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	image := &entity.Image{
		ID:       uint(id),
		URL:      dto.URL,
		Alt:      dto.Alt,
		Title:    dto.Title,
		Category: dto.Category,
	}

	if err := r.imageUC.Update(c.Request.Context(), image); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Не удалось обновить изображение"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Изображение обновлено"})
}

func (r *adminRoutes) deleteImage(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil || id <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Некорректный ID"})
		return
	}

	if err := r.imageUC.Delete(c.Request.Context(), uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка удаления"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Изображение удалено"})
}
