import "../stylesheets/application.css"
import { mount } from "../data/app"

function mountReactRoot() {
  const reactRoot = document.getElementById("react-root")
  if (reactRoot) {
    mount(reactRoot)
  }
}

window.addEventListener("DOMContentLoaded", mountReactRoot)
