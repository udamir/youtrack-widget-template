import Theme, { ThemeProvider } from "@jetbrains/ring-ui-built/components/global/theme"
import type ConfigWrapper from "@jetbrains/hub-widget-ui/dist/config-wrapper"
import { useEffect, useState } from "react"

import "@jetbrains/ring-ui-built/components/style.css"
import "./Windget.css"

const darkMatcher = window.matchMedia("(prefers-color-scheme: dark)")

interface WidgetProps {
  configWrapper: ConfigWrapper
  editable?: boolean
}

export function Widget(props: WidgetProps) {
  const [dark, setDark] = useState(darkMatcher.matches)

  // const { youtrack, user } = useWidgetContext()
  // const { configWrapper, editable } = props

  useEffect(() => {
    const onChange = (e: MediaQueryListEvent) => setDark(e.matches)
    darkMatcher.addEventListener("change", onChange)

    return () => darkMatcher.removeEventListener("change", onChange)
  }, [])

  return (
    <ThemeProvider className="App" theme={dark ? Theme.DARK : Theme.LIGHT}>
      <h1>Custom Widget</h1>
    </ThemeProvider>
  )
}
