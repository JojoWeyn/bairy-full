package usecase

import (
	"backend/internal/domain/entity"
	"context"
)

type ServiceRepository interface {
	Create(ctx context.Context, a *entity.Service) error
	GetByID(ctx context.Context, id uint) (*entity.Service, error)
	ListAll(ctx context.Context) ([]*entity.Service, error)
	Update(ctx context.Context, a *entity.Service) error
	Delete(ctx context.Context, id uint) error
}

type ServiceUseCase struct {
	repo ServiceRepository
}

func NewServiceUseCase(repo ServiceRepository) *ServiceUseCase {
	return &ServiceUseCase{repo: repo}
}

func (uc *ServiceUseCase) Create(ctx context.Context, name, description string, iconURL, imageURL *string, isActive bool) error {
	a := entity.NewService(name, description, iconURL, imageURL, isActive)
	return uc.repo.Create(ctx, a)
}

func (uc *ServiceUseCase) GetByID(ctx context.Context, id uint) (*entity.Service, error) {
	return uc.repo.GetByID(ctx, id)
}

func (uc *ServiceUseCase) ListAll(ctx context.Context) ([]*entity.Service, error) {
	return uc.repo.ListAll(ctx)
}

func (uc *ServiceUseCase) Update(ctx context.Context, a *entity.Service) error {
	return uc.repo.Update(ctx, a)
}

func (uc *ServiceUseCase) Delete(ctx context.Context, id uint) error {
	return uc.repo.Delete(ctx, id)
}
