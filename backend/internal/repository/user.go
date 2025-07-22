package repository

import (
	"backend/internal/domain/entity"
	"context"

	"gorm.io/gorm"
)

type AdminRepository struct {
	db *gorm.DB
}

func NewAdminRepository(db *gorm.DB) *AdminRepository {
	return &AdminRepository{db}
}

func (r *AdminRepository) Create(ctx context.Context, admin *entity.User) error {
	return r.db.WithContext(ctx).Create(admin).Error
}

func (r *AdminRepository) GetByEmail(ctx context.Context, email string) (*entity.User, error) {
	var admin entity.User
	err := r.db.WithContext(ctx).Where("email = ?", email).First(&admin).Error
	return &admin, err
}

func (r *AdminRepository) GetByID(ctx context.Context, id string) (*entity.User, error) {
	var admin entity.User
	err := r.db.WithContext(ctx).First(&admin, "id = ?", id).Error
	return &admin, err
}
