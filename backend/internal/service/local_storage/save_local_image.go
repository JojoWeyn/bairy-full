package local_storage

import (
	"context"
	"fmt"
	"io"
	"mime/multipart"
	"os"
	"path/filepath"
	"time"
)

type LocalImageStorage struct {
	baseURL    string // e.g., http://localhost:8080/static/
	storageDir string // e.g., ./uploads
}

func NewLocalImageStorage(baseURL, storageDir string) *LocalImageStorage {
	return &LocalImageStorage{
		baseURL:    baseURL,
		storageDir: storageDir,
	}
}

func (s *LocalImageStorage) SaveLocalImage(ctx context.Context, file multipart.File, filename string) (string, error) {
	defer file.Close()

	// Генерируем уникальное имя файла
	timestamp := time.Now().UnixNano()
	ext := filepath.Ext(filename)
	newName := fmt.Sprintf("%d%s", timestamp, ext)
	path := filepath.Join(s.storageDir, newName)

	if err := os.MkdirAll(s.storageDir, os.ModePerm); err != nil {
		return "", err
	}

	// Сохраняем файл
	dst, err := os.Create(path)
	if err != nil {
		return "", err
	}
	defer dst.Close()

	if _, err := io.Copy(dst, file); err != nil {
		return "", err
	}

	// Возвращаем публичный URL
	return fmt.Sprintf("%s%s", s.baseURL, newName), nil
}
