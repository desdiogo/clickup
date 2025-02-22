import 'dayjs/locale/pt-br'
import dayjs from 'dayjs'

export default defineNuxtPlugin({
  name: 'dayjs',
  enforce: 'pre',
  setup() {
    dayjs.locale('pt-br')
  },
})