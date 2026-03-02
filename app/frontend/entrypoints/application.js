import { Application } from '@hotwired/stimulus'
import { registerControllers } from 'stimulus-vite-helpers'
import '~/stylesheets/application.css'

const application = Application.start()
const controllers = import.meta.glob('../controllers/*_controller.js', { eager: true })
registerControllers(application, controllers)
