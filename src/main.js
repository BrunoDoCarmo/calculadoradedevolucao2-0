import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faNewspaper, faBars, faXmark, faCaretDown, faCaretUp, faDollarSign, faHandsHoldingChild, faChevronLeft, faTrash, faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons'
import {  } from '@fortawesome/free-brands-svg-icons'

export { FontAwesomeIcon }

library.add(faNewspaper, faBars, faXmark, faCaretDown, faCaretUp, faDollarSign, faHandsHoldingChild, faChevronLeft, faTrash, faArrowRotateLeft)

const app = createApp(App)
app.use(store)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
