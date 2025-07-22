package usecase

import (
	"backend/internal/domain/entity"
	"context"
	"mime/multipart"
)

type ImageRepository interface {
	Create(ctx context.Context, a *entity.Image) error
	GetByID(ctx context.Context, id uint) (*entity.Image, error)
	ListAll(ctx context.Context) ([]*entity.Image, error)
	Update(ctx context.Context, a *entity.Image) error
	Delete(ctx context.Context, id uint) error
	ListByCategory(ctx context.Context, category string) ([]*entity.Image, error)
}

type LocalImageStorage interface {
	SaveLocalImage(ctx context.Context, file multipart.File, filename string) (string, error)
}

type ImageUseCase struct {
	repo    ImageRepository
	storage LocalImageStorage
}

func NewImageUseCase(repo ImageRepository, storage LocalImageStorage) *ImageUseCase {
	return &ImageUseCase{repo: repo, storage: storage}
}

func (uc *ImageUseCase) Create(ctx context.Context, url string, title, alt, category *string) error {
	a := entity.NewImage(url, title, alt, category)
	return uc.repo.Create(ctx, a)
}

func (uc *ImageUseCase) UploadAndCreate(ctx context.Context, file multipart.File, fileHeader *multipart.FileHeader, title, alt, category *string) (string, error) {
	url, err := uc.storage.SaveLocalImage(ctx, file, fileHeader.Filename)
	if err != nil {
		return "", err
	}

	image := entity.NewImage(url, title, alt, category)
	return url, uc.repo.Create(ctx, image)
}

func (uc *ImageUseCase) GetByID(ctx context.Context, id uint) (*entity.Image, error) {
	return uc.repo.GetByID(ctx, id)
}

func (uc *ImageUseCase) ListAll(ctx context.Context) ([]*entity.Image, error) {
	return uc.repo.ListAll(ctx)
}

func (uc *ImageUseCase) ListByCategory(ctx context.Context, category string) ([]*entity.Image, error) {
	return uc.repo.ListByCategory(ctx, category)
}
func (uc *ImageUseCase) Update(ctx context.Context, a *entity.Image) error {
	return uc.repo.Update(ctx, a)
}

func (uc *ImageUseCase) Delete(ctx context.Context, id uint) error {
	return uc.repo.Delete(ctx, id)
}
