import type { DashboardApi, Entity, User, WidgetApi, YouTrack } from "youtrack-client"
import { createContext, useContext, type ReactNode } from "react"

export const userFields = ["id", "login", "fullName", "avatarUrl", "email"] as const
export type UserEntity = Entity<User, typeof userFields>

type WidgetContextType = {
  dashboardApi: DashboardApi
  widgetApi: WidgetApi
  youtrack: YouTrack
  user: UserEntity
}

type WidgetContextProviderParams = WidgetContextType & {
  children: ReactNode
}

const WidgetContext = createContext<WidgetContextType>({} as WidgetContextType)

export const WidgetContextProvider = (params: WidgetContextProviderParams) => {
  const { children, ...props } = params
  return <WidgetContext.Provider value={props}>{children}</WidgetContext.Provider>
}

export const useWidgetContext = () => {
  return useContext(WidgetContext)
}
