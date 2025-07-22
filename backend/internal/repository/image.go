package repository

import (
	"backend/internal/domain/entity"
	"context"
	"gorm.io/gorm"
)

type ImageRepository struct {
	db *gorm.DB
}

func NewImageRepository(db *gorm.DB) *ImageRepository {
	return &ImageRepository{db: db}
}

func (r *ImageRepository) GetByID(ctx context.Context, id uint) (*entity.Image, error) {
	var image entity.Image
	if err := r.db.WithContext(ctx).Where("id = ?", id).First(&image).Error; err != nil {
		return nil, err
	}
	return &image, nil
}

func (r *ImageRepository) ListAll(ctx context.Context) ([]*entity.Image, error) {
	var images []*entity.Image
	if err := r.db.WithContext(ctx).Find(&images).Error; err != nil {
		return nil, err
	}
	return images, nil
}

func (r *ImageRepository) ListByCategory(ctx context.Context, category string) ([]*entity.Image, error) {
	var images []*entity.Image
	if err := r.db.WithContext(ctx).Where("category = ?", category).Find(&images).Error; err != nil {
		return nil, err
	}
	return images, nil
}

func (r *ImageRepository) Create(ctx context.Context, a *entity.Image) error {
	return r.db.WithContext(ctx).Create(a).Error
}

func (r *ImageRepository) Update(ctx context.Context, a *entity.Image) error {
	return r.db.WithContext(ctx).Save(a).Error
}

func (r *ImageRepository) Delete(ctx context.Context, id uint) error {
	return r.db.WithContext(ctx).Where("id = ?", id).Delete(&entity.Image{}).Error
}
