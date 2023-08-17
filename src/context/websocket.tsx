import {
  createContext,
  useContext,
  FC,
  ReactNode,
  useEffect,
  useState,
  useRef,
} from 'react'

const WebsocketStore = createContext<{
  ready: boolean
  socket?: WebSocket
}>({
  ready: false,
  socket: undefined,
})

interface WebsocketProps {
  children: ReactNode
}

export enum WebSocketReadyState {
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
}

export const WebsocketProvider: FC<WebsocketProps> = ({ children }) => {
  const [isReady, setIsReady] = useState(false)
  const [socket, setSocket] = useState<WebSocket | undefined>(undefined)

  const socketRef = useRef<WebSocket | undefined>(undefined)

  const wsUrl = 'wss://stream-cloud.binanceru.net/stream'

  useEffect(() => {
    const ws: WebSocket = new WebSocket(wsUrl)
    socketRef.current = ws

    ws.addEventListener('open', async function () {
      setIsReady(true)
      setSocket(ws)
    })

    ws.onclose = () => setIsReady(false)
    ws.onerror = (error) => {
      console.log('ws', error)
    }

    return () => {
      if (ws.readyState === ws.CLOSED) {
        ws.close()
      }
    }
  }, [])

  return (
    <WebsocketStore.Provider
      value={{
        ready: isReady,
        socket,
      }}
    >
      {children}
    </WebsocketStore.Provider>
  )
}

export const useWebsocket = () => {
  const context = useContext(WebsocketStore)
  if (context === undefined) {
    throw new Error('useWebsocket must be used within an WebsocketProvider')
  }
  return context
}
