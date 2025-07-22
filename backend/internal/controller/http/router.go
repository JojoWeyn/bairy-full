package http

import (
	"backend/internal/controller/bot"
	"backend/internal/domain/usecase"
	"backend/internal/service/auth"
	"backend/pkg/middleware"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func NewRouter(
	handler *gin.Engine,
	imageUC usecase.ImageUseCase,
	serviceUC usecase.ServiceUseCase,
	accommodationUC usecase.AccommodationUseCase,
	TelegramBot bot.TelegramService,
	UserUC usecase.AdminUseCase,
	AuthService auth.AuthService,
	frontendURL []string,
) {
	// CORS конфигурация
	config := cors.DefaultConfig()
	config.AllowOrigins = frontendURL
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Accept", "Authorization"}
	config.ExposeHeaders = []string{"Content-Length"}
	config.AllowCredentials = true

	handler.Use(cors.New(config))

	// auth middleware
	authMiddleware := middleware.NewAuthMiddleware(&AuthService)

	v1 := handler.Group("/v1")
	{
		// защищённая группа
		adminGroup := v1.Group("/admin")
		adminGroup.Use(authMiddleware.Handler())
		NewAdminRoutes(adminGroup, &serviceUC, &accommodationUC, &imageUC)

		// открытые группы
		NewImageRoutes(v1, &imageUC)
		NewServiceRoutes(v1, &serviceUC)
		NewAccommodationRoutes(v1, &accommodationUC)
		NewContactRoutes(v1, &TelegramBot)
		NewUserRoutes(v1, &UserUC, &AuthService)
	}
}
