package middleware

import (
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"net/http"
	"strings"
)

type AuthService interface {
	ValidateToken(tokenString string) (*jwt.Token, error)
}

type AuthMiddleware struct {
	authService AuthService
}

func NewAuthMiddleware(authService AuthService) *AuthMiddleware {
	return &AuthMiddleware{authService: authService}
}

func (m *AuthMiddleware) Handler() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "токен не найден"})
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "неверный формат токена"})
			return
		}

		tokenStr := parts[1]

		token, err := m.authService.ValidateToken(tokenStr)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "невалидный токен"})
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok || !token.Valid {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "ошибка в claims"})
			return
		}
		
		if userID, ok := claims["id"].(float64); ok {
			c.Set("userID", uint(userID))
		}

		c.Next()
	}
}
