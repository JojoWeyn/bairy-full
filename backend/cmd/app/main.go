package main

import (
	"backend/internal/composite"
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	logger := log.New(os.Stdout, "[bairy] ", log.LstdFlags)

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	app, err := composite.NewComposite(logger, []string{
		"http://localhost:5173",
		"http://localhost:5174",
		"http://localhost",
		"http://XN----7SBABE0CDK5CN0I.XN--P1AI",
		"https://XN----7SBABE0CDK5CN0I.XN--P1AI",
	}, "7342348758:AAGLsUaeXYBX9G0v6q84PGyqEKTXv2xijL8", 445089168)
	if err != nil {
		logger.Fatalf("Failed to initialize application: %v", err)
	}

	app.Migrate()

	go func() {
		if err := app.Run(); err != nil {
			logger.Printf("Server error: %v", err)
			cancel()
		}
	}()

	logger.Println("Server started")

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	select {
	case <-quit:
		logger.Println("Shutdown signal received")
	case <-ctx.Done():
		logger.Println("Server stopped due to error")
	}

	shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer shutdownCancel()

	if err := app.Shutdown(shutdownCtx); err != nil {
		logger.Fatalf("Server shutdown error: %v", err)
	}

	logger.Println("Server gracefully stopped")
}
