package bot

import (
	"context"
	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
)

type TelegramService struct {
	Bot    *tgbotapi.BotAPI
	ChatID int64
}

func NewTelegramService(token string, chatID int64) (*TelegramService, error) {
	bot, err := tgbotapi.NewBotAPI(token)
	if err != nil {
		return nil, err
	}
	return &TelegramService{
		Bot:    bot,
		ChatID: chatID,
	}, nil
}

func (s *TelegramService) SendMessage(ctx context.Context, text string) error {
	msg := tgbotapi.NewMessage(s.ChatID, text)
	_, err := s.Bot.Send(msg)
	return err
}
