package composite

import (
	"backend/internal/controller/bot"
	v1 "backend/internal/controller/http"
	"backend/internal/domain/entity"
	"backend/internal/domain/usecase"
	"backend/internal/repository"
	"backend/internal/service/auth"
	"backend/internal/service/local_storage"
	"backend/internal/service/seed"
	"backend/pkg/client/sqlite"
	"context"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"log"
	"net/http"
)

type Composite struct {
	server      *http.Server
	logger      *log.Logger
	db          *gorm.DB
	frontendURL []string
}

func NewComposite(logger *log.Logger, frontendURL []string, botToken string, chatID int64) (*Composite, error) {
	db, err := sqlite.NewSqliteDB(sqlite.Config{
		Path: "data.db",
	})
	if err != nil {
		panic(err)
	}

	localImageStorage := local_storage.NewLocalImageStorage("http://localhost:8080/static/", "./uploads")

	ImageRepository := repository.NewImageRepository(db)
	AccommodationRepository := repository.NewAccommodationRepository(db)
	ServiceRepository := repository.NewServiceRepository(db)
	AdminRepository := repository.NewAdminRepository(db)

	seed.CreateDefaultAdmin(db)

	ImageUsecase := usecase.NewImageUseCase(ImageRepository, localImageStorage)
	AccommodationUsecase := usecase.NewAccommodationUseCase(AccommodationRepository)
	ServiceUsecase := usecase.NewServiceUseCase(ServiceRepository)
	AdminUsecase := usecase.NewAdminUseCase(AdminRepository)
	AuthService := auth.NewAuthService("jwt")

	TelegramBot, err := bot.NewTelegramService(botToken, chatID)
	if err != nil {
		panic(err)
	}

	router := gin.Default()

	router.Static("/static", "./uploads")

	v1.NewRouter(router, *ImageUsecase, *ServiceUsecase, *AccommodationUsecase, *TelegramBot, *AdminUsecase, *AuthService, frontendURL)

	server := &http.Server{
		Addr:    ":8080",
		Handler: router,
	}

	return &Composite{
		server: server,
		logger: logger,
		db:     db,
	}, nil
}

func (a *Composite) Migrate() {
	if err := a.db.AutoMigrate(
		&entity.Image{},
		&entity.Accommodation{},
		&entity.Service{},
		&entity.AccommodationImage{},
		&entity.User{}); err != nil {
		panic(err)
	}

}

func (a *Composite) Run() error {
	a.logger.Println("Starting server on :8080")
	return a.server.ListenAndServe()
}

// Shutdown останавливает приложение
func (a *Composite) Shutdown(ctx context.Context) error {
	a.logger.Println("Shutting down server")
	return a.server.Shutdown(ctx)
}
