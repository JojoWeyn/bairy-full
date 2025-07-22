package ws

import (
	"encoding/json"
	"sync"

	"github.com/google/uuid"
)

type Hub struct {
	mu         sync.Mutex
	clientsMap map[uuid.UUID]map[*Client]bool
}

func NewHub() *Hub {
	return &Hub{
		clientsMap: make(map[uuid.UUID]map[*Client]bool),
	}
}

func (h *Hub) Register(matchID uuid.UUID, client *Client) {
	h.mu.Lock()
	defer h.mu.Unlock()
	if h.clientsMap[matchID] == nil {
		h.clientsMap[matchID] = make(map[*Client]bool)
	}
	h.clientsMap[matchID][client] = true
}

func (h *Hub) Unregister(matchID uuid.UUID, client *Client) {
	h.mu.Lock()
	defer h.mu.Unlock()
	delete(h.clientsMap[matchID], client)
	if len(h.clientsMap[matchID]) == 0 {
		delete(h.clientsMap, matchID)
	}
}

func (h *Hub) Broadcast(matchID uuid.UUID, data any) {
	h.mu.Lock()
	defer h.mu.Unlock()

	bytes, _ := json.Marshal(data)

	for client := range h.clientsMap[matchID] {
		if err := client.WriteMessage(1, bytes); err != nil {
			client.Close()
			delete(h.clientsMap[matchID], client)
		}
	}
}
