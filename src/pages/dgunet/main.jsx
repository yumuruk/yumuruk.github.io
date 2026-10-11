import { createRoot } from 'react-dom/client'
import '../../index.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'katex/dist/katex.min.css'
import './dgunet.css'
import DgunetPage from './DgunetPage.jsx'

createRoot(document.getElementById('root')).render(<DgunetPage />)
