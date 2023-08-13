import { CandleStick } from '@components'
import { WebsocketProvider } from '@context/websocket'
import { useQuery } from '@tanstack/react-query'
import { JWT } from 'google-auth-library'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const CryptoDetailPage = () => {
  const router = useRouter()
  const { symbol } = router.query

  const SPREADSHEET_ID = '1Gy1n60SJ816HOdPzTsubJ1_Gip-bas9TpV_dRgrdMCM'
  // const SHEET_ID = process.env.REACT_APP_SHEET_ID
  const CLIENT_EMAIL = 'gfinance@crypto-price-395714.iam.gserviceaccount.com'
  const PRIVATE_KEY =
    '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCtZ4iDbCt3I0tT\n6p6KfDrjUcFbiPGHamPRy7ol+GdiII/o2OOBKKAX5tm66Lf8kp9w37CqRtIJ9Pml\ncu3S5XPOl/ltdlIXIX1PbHS9f2S8ppu0MH0lACAlazLkMgMA/bH6w0MguTVz9R0z\nkWTnRtJSur1e3+KOfs78XKg5AJZ5P7OBgqO2vmXqijszl8OWliW0ufGB1zbzS+Xj\n4w2079MwL/SAMU/RfZQaiM0W0LlC8UxfsKNvIO372ZumJqOLMdWzi/6jCXLawkkC\njXQ+5DuodvRMSLHwhBJDfYQjGo257dK2vTX3pYz9uKrEAEzQnwxlXh7xd2os4yZO\n0juLJM+ZAgMBAAECggEAFTPzK8q2t98fb1fhYeKV2sTc5UHl8p5uLTGBhfINRiDg\nJ+MZUmoyxSlrlyCsmpwdFdKsSe3V8fS77+CRNvfqhKjtjVZp7D0ikusajS8+FJk0\nscA6FSOiSqEEfIWm+2CJ+jUVCLPM1uxyUSNmmKb+wbHmxOqQS8cyrQXxZeLuA040\nZHBr+ezGd3vUDs0rKn/Hr98haQRCW8YxjDCcsflj/1vjy52jCrMv6qnU88Wsu2aP\n9ZeMxrtI6BZYu81jU+uc+1/hbH1Sy6Oz0uqon073BKVie7q7q9rHnFYP3BeaOzAD\nRNhJf7mcC6mAWbU/LKdDd4petAdsc+4Lq1XDSoxCwQKBgQDqnUnPD1o9fdzWScLG\nQL/DDan/IFupFSvAFrCqAl48ZJikj4G2LzJwkc01e/KUXRFD9R+9JqeCTK6p5XzU\n4figQXo5nAANAwh4kf4LVaaqe9wX2X2d8vNl6/FrdwcwaAqXRapqATAJE3WFnavj\n3SqvzsKWIsgZwzh3mMRN0vvpEQKBgQC9NeoBo4y3iORrhahk1dTIOGgoLF3phRsr\ndbD+10m6KufkL5LwgCbcPDbFy7F7vbGKMT0Llk8ah3+jn6i7oJV8+Sho7lm3mAqX\nUPdQL5U/qQWnHFswqMgh+tF2B5o28X+cFUpfN8T04j4IiQpAOREqS6Kidpr7Iylo\n0SGB7F++CQKBgFwf4wmhV6fpsjuavxal+iaXSPdbN2LPY1yMDFbVkzdXsPB9QUvO\ngJnfRpsHzpsfaFYs/IeDlCcAAV3JNRlKmhwjWeEhNovlcwAVI5JD0awD8sqSplbN\nPXH6EdRG6tXBJNd9jYsOaFRIBc+vt/1DrS1XnOTjR3uGQrgDjqGYhT5hAoGAEljv\nBxen5og0tiRwzs5ZYsztdK/Qr3tDxjQUZLHVqWLNt7fRRNb4bbS9DvMQk9IyLBdY\nNw5tP0JSYzhxMTiCJms2uu4Z7w6kQEYOpUzn6RNnw+uhABftyDW9J/fWwWsrl6QM\n4SzUQXbK0yMOxmmCO5q3+48Kuj2Pn2VgHWwhYJkCgYB7Jmh6jMLO/xniRtJIAkXo\nWGbs30+1m2vNU+ZXj5IawCS90YmsF7nAN38h3q1b0eZFs6+TiKdVOJIjfjd6RNjO\nr/qqeB12ffD8lkDaM8h8pdJhi/+HThEEn1LEceXzfF+q51pS7dRFX6I5G+P16AX7\nAJGiF4ICYTaMLrNLoCjIBg==\n-----END PRIVATE KEY-----\n'

  // const serviceAccountAuth = new JWT({
  //   // env var values here are copied from service account credentials generated by google
  //   // see "Authentication" section in docs for more info
  //   email: CLIENT_EMAIL,
  //   key: PRIVATE_KEY,
  //   scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  // })

  const appendSpreadsheet = async () => {
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, {
      apiKey: 'AIzaSyDSszbqG1nGNyj-1oXlVSZGLPTMBwzvo7o',
    })
    try {
      // await doc.useServiceAccountAuth({
      //   client_email: CLIENT_EMAIL,
      //   private_key: PRIVATE_KEY,
      // })
      // loads document properties and worksheets
      await doc.loadInfo()

      const sheet = doc.sheetsByIndex[0]
      console.log(sheet)
      // const result = await sheet.addRow(row)
    } catch (e) {
      console.log('Error: ', e)
    }
  }

  useEffect(() => {
    appendSpreadsheet()
  }, [])

  return (
    <WebsocketProvider>
      <div>detai {symbol}</div>
      <CandleStick />
    </WebsocketProvider>
  )
}

export default CryptoDetailPage
