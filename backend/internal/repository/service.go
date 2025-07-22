package repository

import (
	"backend/internal/domain/entity"
	"context"
	"gorm.io/gorm"
)

type ServiceRepository struct {
	db *gorm.DB
}

func NewServiceRepository(db *gorm.DB) *ServiceRepository {
	return &ServiceRepository{db: db}
}

func (r *ServiceRepository) GetByID(ctx context.Context, id uint) (*entity.Service, error) {
	var service entity.Service
	if err := r.db.WithContext(ctx).Where("id = ?", id).First(&service).Error; err != nil {
		return nil, err
	}
	return &service, nil
}

func (r *ServiceRepository) ListAll(ctx context.Context) ([]*entity.Service, error) {
	var services []*entity.Service
	if err := r.db.WithContext(ctx).Find(&services).Error; err != nil {
		return nil, err
	}
	return services, nil
}

func (r *ServiceRepository) Create(ctx context.Context, a *entity.Service) error {
	return r.db.WithContext(ctx).Create(a).Error
}

func (r *ServiceRepository) Update(ctx context.Context, a *entity.Service) error {
	return r.db.WithContext(ctx).Save(a).Error
}

func (r *ServiceRepository) Delete(ctx context.Context, id uint) error {
	return r.db.WithContext(ctx).Where("id = ?", id).Delete(&entity.Service{}).Error
}
