package seed

import (
	"backend/internal/domain/entity"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"log"
)

func CreateDefaultAdmin(db *gorm.DB) {
	const defaultEmail = "admin@admin.com"
	const defaultPassword = "admin123"

	var user entity.User
	if err := db.Where("email = ?", defaultEmail).First(&user).Error; err == gorm.ErrRecordNotFound {
		hashed, _ := bcrypt.GenerateFromPassword([]byte(defaultPassword), bcrypt.DefaultCost)
		newUser := entity.User{
			Email:    defaultEmail,
			Password: string(hashed),
		}
		if err := db.Create(&newUser).Error; err != nil {
			log.Printf("Не удалось создать дефолтного админа: %v\n", err)
		} else {
			log.Println("✅ Дефолтный админ создан")
		}
	}
}
