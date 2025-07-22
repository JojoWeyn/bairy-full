// usecase/admin_uc.go
package usecase

import (
	"backend/internal/domain/entity"
	"context"
	"errors"
	"golang.org/x/crypto/bcrypt"
)

type AdminRepository interface {
	Create(ctx context.Context, user *entity.User) error
	GetByEmail(ctx context.Context, email string) (*entity.User, error)
	GetByID(ctx context.Context, id string) (*entity.User, error)
}
type AdminUseCase struct {
	repo AdminRepository
}

func NewAdminUseCase(repo AdminRepository) *AdminUseCase {
	return &AdminUseCase{repo: repo}
}

func (u *AdminUseCase) Register(ctx context.Context, email, password string) error {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	admin := &entity.User{
		Email:    email,
		Password: string(hash),
	}
	return u.repo.Create(ctx, admin)
}

func (u *AdminUseCase) Login(ctx context.Context, email, password string) (*entity.User, error) {
	admin, err := u.repo.GetByEmail(ctx, email)
	if err != nil {
		return nil, err
	}
	if err := bcrypt.CompareHashAndPassword([]byte(admin.Password), []byte(password)); err != nil {
		return nil, errors.New("неверный логин или пароль")
	}
	return admin, nil
}

func (u *AdminUseCase) GetByID(ctx context.Context, id string) (*entity.User, error) {
	return u.repo.GetByID(ctx, id)
}
