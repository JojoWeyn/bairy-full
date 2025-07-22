package auth

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type AuthService struct {
	secretKey string
}

func NewAuthService(secret string) *AuthService {
	return &AuthService{
		secretKey: secret,
	}
}

func (s *AuthService) GenerateToken(id uint, email string) (string, error) {
	claims := jwt.MapClaims{
		"admin_id": id,
		"email":    email,
		"exp":      time.Now().Add(24 * time.Hour).Unix(), // токен живёт 24 часа
		"iat":      time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString([]byte(s.secretKey))
}

func (s *AuthService) ValidateToken(tokenString string) (*jwt.Token, error) {
	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("неподдерживаемый метод подписи")
		}
		return []byte(s.secretKey), nil
	})

	if err != nil {
		return nil, err
	}

	if !token.Valid {
		return nil, errors.New("некорректный токен")
	}

	return token, nil
}
