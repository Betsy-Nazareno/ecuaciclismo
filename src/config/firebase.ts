import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBUskTxCtQT-9L3Ih2ES5Zh9PnrcvNB2lc',
  authDomain: 'omega-keep-354005.firebaseapp.com',
  databaseURL: 'https://omega-keep-354005-default-rtdb.firebaseio.com',
  projectId: 'omega-keep-354005',
  storageBucket: 'omega-keep-354005.appspot.com',
  messagingSenderId: '492631611294',
  appId: '1:492631611294:web:90ecd447a69d1b0ba5288f',
}

const firebaseApp = initializeApp(firebaseConfig)
const firebaseStorage = getStorage(firebaseApp)

export { firebaseApp, firebaseStorage }
