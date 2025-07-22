package ws

import (
	"encoding/json"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

type Client struct {
	conn     *websocket.Conn
	SenderID uuid.UUID
}

func NewClient(conn *websocket.Conn, senderID uuid.UUID) *Client {
	return &Client{
		conn:     conn,
		SenderID: senderID,
	}
}

func (c *Client) ReadMessage() (int, []byte, error) {
	return c.conn.ReadMessage()
}

func (c *Client) WriteMessage(messageType int, data []byte) error {
	return c.conn.WriteMessage(messageType, data)
}

func (c *Client) Close() error {
	return c.conn.Close()
}

func (c *Client) WriteJSON(v any) error {
	data, err := json.Marshal(v)
	if err != nil {
		return err
	}
	return c.conn.WriteMessage(websocket.TextMessage, data)
}

func (c *Client) WriteText(msg string) error {
	return c.conn.WriteMessage(websocket.TextMessage, []byte(msg))
}
