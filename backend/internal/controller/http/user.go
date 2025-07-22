package http

import (
	"backend/internal/controller/dto"
	"backend/internal/domain/entity"
	"context"
	"github.com/gin-gonic/gin"
	"net/http"
)

type UserUseCase interface {
	Login(ctx context.Context, email, password string) (*entity.User, error)
}

type AuthService interface {
	GenerateToken(id uint, email string) (string, error)
}

type userRoutes struct {
	uc          UserUseCase
	authService AuthService
}

func NewUserRoutes(rg *gin.RouterGroup, uc UserUseCase, authService AuthService) {
	r := &userRoutes{uc: uc, authService: authService}
	user := rg.Group("/user")
	{
		user.POST("/login", r.login)
	}
}

func (r *userRoutes) login(c *gin.Context) {
	var loginDto dto.LoginDTO

	if err := c.ShouldBindJSON(&loginDto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := r.uc.Login(c.Request.Context(), loginDto.Email, loginDto.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "не верный логин или пароль"})
		return
	}

	token, err := r.authService.GenerateToken(user.ID, user.Email)

	response := dto.LoginResponseDTO{
		Token: token,
	}

	c.JSON(http.StatusOK, response)
}
