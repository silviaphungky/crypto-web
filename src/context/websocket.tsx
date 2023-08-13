import { getCookiesData } from '@utils/cookies'
import { useRouter } from 'next/router'
import {
  createContext,
  useContext,
  FC,
  ReactNode,
  useEffect,
  useState,
  useRef,
} from 'react'
import { PATHS } from '@constants/paths'
import getConfig from 'next/config'

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
  const router = useRouter()

  const asd = '?streams=btcusdt@depth'

  const [isReady, setIsReady] = useState(false)
  const [socket, setSocket] = useState<WebSocket | undefined>(undefined)

  const socketRef = useRef<WebSocket | undefined>(undefined)

  const wsUrl = 'wss://stream.binance.com/stream?streams=btcusdt@depth'

  useEffect(() => {
    const ws: WebSocket = new WebSocket(wsUrl)
    socketRef.current = ws

    ws.addEventListener('open', async function () {
      console.log('open')
      setIsReady(true)
      setSocket(ws)
    })

    ws.addEventListener('message', async function (event) {
      console.log('message binance', JSON.parse(event.data).data.a.length)
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
