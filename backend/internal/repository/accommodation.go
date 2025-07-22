package repository

import (
	"backend/internal/domain/entity"
	"context"
	"gorm.io/gorm"
)

type AccommodationRepository struct {
	db *gorm.DB
}

func NewAccommodationRepository(db *gorm.DB) *AccommodationRepository {
	return &AccommodationRepository{db: db}
}

func (r *AccommodationRepository) Create(ctx context.Context, a *entity.Accommodation) error {
	return r.db.WithContext(ctx).Create(a).Error
}

func (r *AccommodationRepository) GetByID(ctx context.Context, id uint) (*entity.Accommodation, error) {
	var accommodation entity.Accommodation
	if err := r.db.WithContext(ctx).
		Preload("Images").
		Where("id = ?", id).
		First(&accommodation).Error; err != nil {
		return nil, err
	}
	return &accommodation, nil
}

func (r *AccommodationRepository) ListAll(ctx context.Context) ([]*entity.Accommodation, error) {
	var accommodations []*entity.Accommodation
	if err := r.db.WithContext(ctx).
		Preload("Images").
		Find(&accommodations).Error; err != nil {
		return nil, err
	}
	return accommodations, nil
}

func (r *AccommodationRepository) Update(ctx context.Context, a *entity.Accommodation) error {
	return r.db.WithContext(ctx).Save(a).Error
}

func (r *AccommodationRepository) Delete(ctx context.Context, id uint) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		if err := tx.Where("accommodation_id = ?", id).Delete(&entity.AccommodationImage{}).Error; err != nil {
			return err
		}
		if err := tx.Where("id = ?", id).Delete(&entity.Accommodation{}).Error; err != nil {
			return err
		}
		return nil
	})
}
