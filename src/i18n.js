import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import nl from './locales/nl.json'
import es from './locales/es.json'
import fr from './locales/fr.json'

i18n.use(initReactI18next).init({
  resources: {en:{translation:en},nl:{translation:nl},es:{translation:es},fr:{translation:fr}},
  lng:'en', fallbackLng:'en', keySeparator:false, nsSeparator:false, supportedLngs:['en','nl','es','fr'],
  interpolation:{escapeValue:false}, returnNull:false, initImmediate:false
})
export default i18n
