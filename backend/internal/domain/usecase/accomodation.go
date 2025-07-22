package usecase

import (
	"backend/internal/domain/entity"
	"context"
	"encoding/json"
)

type AccommodationRepository interface {
	Create(ctx context.Context, a *entity.Accommodation) error
	GetByID(ctx context.Context, id uint) (*entity.Accommodation, error)
	ListAll(ctx context.Context) ([]*entity.Accommodation, error)
	Update(ctx context.Context, a *entity.Accommodation) error
	Delete(ctx context.Context, id uint) error
}

type AccommodationUseCase struct {
	repo AccommodationRepository
}

func NewAccommodationUseCase(repo AccommodationRepository) *AccommodationUseCase {
	return &AccommodationUseCase{repo: repo}
}

func (uc *AccommodationUseCase) Create(ctx context.Context, name, description string, price float64, capacity int, amenities []string, imageURLs []string) error {
	amenitiesJSON, err := json.Marshal(amenities)
	if err != nil {
		return err
	}

	var images []entity.AccommodationImage
	for _, url := range imageURLs {
		images = append(images, entity.AccommodationImage{URL: url})
	}

	acc := &entity.Accommodation{
		Name:          name,
		Description:   description,
		PricePerNight: price,
		Capacity:      capacity,
		Amenities:     amenitiesJSON,
		IsAvailable:   true,
		Images:        images,
	}

	return uc.repo.Create(ctx, acc)
}

func (uc *AccommodationUseCase) GetByID(ctx context.Context, id uint) (*entity.Accommodation, error) {
	return uc.repo.GetByID(ctx, id)
}

func (uc *AccommodationUseCase) ListAll(ctx context.Context) ([]*entity.Accommodation, error) {
	return uc.repo.ListAll(ctx)
}

func (uc *AccommodationUseCase) Update(ctx context.Context, a *entity.Accommodation) error {
	return uc.repo.Update(ctx, a)
}

func (uc *AccommodationUseCase) Delete(ctx context.Context, id uint) error {
	return uc.repo.Delete(ctx, id)
}
