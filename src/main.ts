import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import './clear.css'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faXmarkCircle, faArrowAltCircleLeft, faCircleLeft } from '@fortawesome/free-regular-svg-icons'
import { setSetting } from './lib/localStorage'
/* add icons to the library */
library.add(faUserSecret, faXmarkCircle, faArrowAltCircleLeft, faCircleLeft)

// settingの初期値設定
setSetting('isAutocomplete', true)
setSetting('isLight', false)
setSetting('inputNum', 5)

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
