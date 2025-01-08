import React, { createContext, useState, useEffect } from 'react'

import { lightTheme, darkTheme } from '../design-system'

const THEME_CACHE_KEY = 'galacean-editor-theme'

type Theme = string
type MediaTheme = string

type ColorModeListener = (c: string) => void

const callbackList = new Set<ColorModeListener>()

const isBrowser = () => typeof window !== undefined
const isNode = () => !isBrowser()

export const defaultThemes = {
  light: lightTheme.className,
  dark: darkTheme.className,
  system: 'system',
}

const defaultTheme = 'dark'

const getThemePreference = (): Theme => {
  if (isNode()) return defaultTheme

  try {
    const savedMode = window.localStorage.getItem(THEME_CACHE_KEY)
    // If the user has explicitly chosen a theme, use it
    if (typeof savedMode === 'string') return savedMode
    return defaultTheme
  } catch (e) {
    // When Chrome in incognito, localStorage cannot be accessed
    console.warn(e)
    return null
  }
}

const getMediaTheme = (): MediaTheme => {
  if (isNode()) return defaultTheme

  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
  if (darkQuery.matches) return defaultThemes.dark
  return defaultThemes.light
}

export function getDefaultTheme(): Theme {
  // for SSR
  if (!isBrowser()) return 'dark'

  const html = document.documentElement
  let userThemePreference = getThemePreference()

  if (userThemePreference == null) {
    userThemePreference = getMediaTheme()
  }

  html.classList.add(defaultThemes[userThemePreference])
  return userThemePreference
}

export function addThemeChangeListener(cb: ColorModeListener) {
  callbackList.add(cb)
}

export function removeThemeChangeListener(cb: ColorModeListener) {
  callbackList.delete(cb)
}

const useTheme = () => {
  const [theme, _setTheme] = useState('')

  const applyTheme = (next_theme: Theme) => {
    const html = document.documentElement
    html.classList.remove(defaultThemes[theme])
    html.classList.add(defaultThemes[next_theme])
    _setTheme(next_theme)
  }

  const cacheTheme = (theme: Theme) => {
    try {
      if (typeof theme === 'string') window.localStorage.setItem(THEME_CACHE_KEY, theme)
    } catch (e) {
      console.warn(e)
    }
  }

  useEffect(() => {
    const defaultTheme = getDefaultTheme()
    setTheme(defaultTheme)
  }, [])

  useEffect(() => {
    function darkListener(e: MediaQueryListEvent) {
      applyTheme(e.matches ? 'dark' : 'light')
    }
    function lightListener(e: MediaQueryListEvent) {
      applyTheme(e.matches ? 'light' : 'dark')
    }
    if (theme === 'system') {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', darkListener)
      window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', lightListener)
    }
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', darkListener)
      window.matchMedia('(prefers-color-scheme: light)').removeEventListener('change', lightListener)
    }
  }, [theme])

  const setTheme = (theme: Theme) => {
    applyTheme(theme)
    cacheTheme(theme)

    if (theme && callbackList.size) {
      callbackList.forEach((cb) => {
        cb(theme)
      })
    }
  }

  return {
    theme,
    setTheme,
  }
}

const ThemeContext = createContext<{
  theme: string
  setTheme: (theme: string) => void
}>(null)

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, setTheme } = useTheme()

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export { ThemeProvider, ThemeContext, useTheme }
