declare module "@jetbrains/hub-widget-ui/dist/config-wrapper" {
  import type { DashboardApi } from "hub-dashboard-addons"

  class ConfigWrapper {
    constructor(dashboardApi: DashboardApi, configFields: string[])

    init(): Promise<Record<string, any>> // Initializes the configuration
    isInitialized(): boolean // Checks if the configuration is initialized
    isNewConfig(): boolean // Checks if the configuration is new
    getFieldValue(fieldName: string): any // Retrieves a field value from the configuration
    update(newConfig: Record<string, any>): Promise<Record<string, any> | null> // Updates the configuration
    replace(newConfig: Record<string, any>): Promise<Record<string, any>> // Replaces the configuration
  }

  export default ConfigWrapper
}

declare module "@jetbrains/hub-widget-ui/dist/configurable-widget" {
  import type { ComponentType } from "react"

  interface ConfigurableWidgetProps {
    /** Whether the widget is in configuration mode */
    isConfiguring: boolean
    /** The dashboard API object */
    dashboardApi: Record<string, any>
    /** React component for configuration mode */
    Configuration: ComponentType
    /** React component for display content */
    Content: ComponentType
  }

  /**
   * A widget that can switch between configuration and content modes.
   * @param props - Properties for the widget.
   * @returns The rendered widget component.
   */
  const ConfigurableWidget: ComponentType<ConfigurableWidgetProps>

  export default ConfigurableWidget
}

declare module "@jetbrains/hub-widget-ui/dist/configuration-form" {
  import type { ReactNode, MouseEventHandler, FC } from "react"

  interface ConfigurationFormProps {
    /** Label for the save button */
    saveButtonLabel?: string
    /** Label for the cancel button */
    cancelButtonLabel?: string
    /** Warning message to display in the form */
    warning?: string
    /** Whether the form is in an invalid state */
    isInvalid?: boolean
    /** Whether the form is in a loading state */
    isLoading?: boolean
    /** Callback function when the save button is clicked */
    onSave?: MouseEventHandler<HTMLButtonElement>
    /** Callback function when the cancel button is clicked */
    onCancel?: MouseEventHandler<HTMLButtonElement>
    /** Additional controls to display in the panel */
    panelControls?: ReactNode | ReactNode[]
    /** Form children components */
    children?: ReactNode | ReactNode[]
  }

  /**
   * A configuration form component used for widget settings.
   * @param props - Properties for the configuration form.
   * @returns The configuration form component.
   */
  const ConfigurationForm: FC<ConfigurationFormProps>

  export default ConfigurationForm
}

declare module "@jetbrains/hub-widget-ui/dist/configuration-mode" {
  import type { ComponentType } from "react"

  interface ConfigurationModeProps {
    /** Boolean flag indicating if the component is in configuration mode */
    isConfiguring: boolean
    /** Dashboard API object for controlling configuration mode */
    dashboardApi: {
      enterConfigMode: () => void
      exitConfigMode: () => void
    }
  }

  /**
   * HOC to wrap a component with configuration mode functionality.
   * @param WrappedComponent - The component to be wrapped.
   * @returns The wrapped component with configuration mode capabilities.
   */
  function withConfigurationModeHOC<T extends ConfigurationModeProps>(
    WrappedComponent: ComponentType<T>,
  ): ComponentType<T>

  export default withConfigurationModeHOC
}

declare module "@jetbrains/hub-widget-ui/dist/empty-widget" {
  import type { FC, ReactNode } from "react"

  export const EmptyWidgetFaces: {
    ERROR: string
    JOY: string
    HAPPY: string
    OK: string
  }

  interface EmptyWidgetProps {
    /** The face emoji to display in the widget */
    face?: string
    /** The message to display in the widget */
    message?: string
    /** Additional content to display below the face and message */
    children?: ReactNode
  }

  /**
   * EmptyWidget component to display an empty state with an optional face, message, and additional content.
   * @param face - The face emoji to display.
   * @param message - The message to display.
   * @param children - Additional content to display below the face and message.
   */
  const EmptyWidget: FC<EmptyWidgetProps>

  export default EmptyWidget
}

declare module "@jetbrains/hub-widget-ui/dist/http-error-handler" {
  interface HubResponseError {
    data?: Record<string, any> // Additional error data
    [key: string]: any // Allow additional properties
  }

  /**
   * Retrieves a default error message.
   * @returns A string containing the default error message.
   */
  function getDefaultMessage(): string

  /**
   * Retrieves an error message based on the provided hub response error.
   * @param hubResponseError - The error response from the hub.
   * @param defaultErrorMessage - An optional default message to return if no specific message is found.
   * @returns A string containing the error message.
   */
  function getMessage(hubResponseError: HubResponseError | string, defaultErrorMessage?: string): string

  const httpErrorHandler: {
    /** Retrieves the error message */
    getMessage: typeof getMessage
    /** Retrieves the default error message */
    getDefaultMessage: typeof getDefaultMessage
  }

  export default httpErrorHandler
}

declare module "@jetbrains/hub-widget-ui/dist/init-translations" {
  interface TranslationFiles {
    keys: () => string[] // Returns an array of translation file keys
    (fileKey: string): Record<string, any> // Function to retrieve JSON content of the translation file
  }

  /**
   * Initializes translations for the specified locale using provided translation files.
   * @param locale - The locale to set for the translations (e.g., "en", "fr").
   * @param translationFiles - An object that provides access to translation files.
   */
  export function initTranslations(locale: string, translationFiles: TranslationFiles): void
}

declare module "@jetbrains/hub-widget-ui/dist/permissions" {
  import type { RingPermissions } from "@jetbrains/ring-ui/components/permissions/permissions"

  interface Options {
    // Define any specific options that can be passed to init here
    [key: string]: any // Use an index signature for flexibility
  }

  class Permissions {
    private _permissions: RingPermissions
    private _permissionCache: any // Adjust the type based on the actual structure of the permission cache

    /**
     * Initializes the Permissions class with the dashboard API and options.
     * @param dashboardApi - The dashboard API instance to fetch permissions.
     * @param options - Optional configuration for loading permissions.
     */
    init(dashboardApi: any, options?: Options): Promise<void>

    /**
     * Checks if permissions have been initialized.
     * @returns True if permissions are initialized, otherwise false.
     */
    isInitialized(): boolean

    /**
     * Checks if a specific permission is granted for a given project.
     * @param permissionQuery - The permission key to check.
     * @param projectRingId - The ID of the project to check permissions against.
     * @returns True if the permission is granted, otherwise false.
     * @throws Error if permissions have not been initialized.
     */
    has(permissionQuery: string, projectRingId: string): boolean
  }

  const permissionsInstance: Permissions

  export default permissionsInstance
}

declare module "@jetbrains/hub-widget-ui/dist/refresh-period" {
  import type { FC } from "react"

  interface RefreshPeriodProps {
    seconds: number // The current refresh period in seconds
    onChange: (newSeconds: number) => void // Callback function to handle changes in refresh period
    label?: (minutesCount: number) => string // Function to render the label for the refresh period
    tooltip?: (minutesCount: number) => string // Function to render the tooltip text
  }

  /**
   * RefreshPeriod component for adjusting the widget's refresh interval.
   * @param props - The properties for the RefreshPeriod component.
   * @returns A JSX element representing the refresh period control.
   */
  const RefreshPeriod: FC<RefreshPeriodProps>

  export default RefreshPeriod
}

declare module "@jetbrains/hub-widget-ui/dist/service-resources" {
  import type { DashboardApi, HubService } from "hub-dashboard-addons"

  /**
   * Normalizes the home URL by ensuring it ends with a slash.
   * @param homeUrl - The home URL to normalize.
   * @returns The normalized home URL.
   */
  function normalizedHomeUrl(homeUrl: string): string

  /**
   * Fetches YouTrack services from the dashboard API.
   * @param dashboardApi - The API interface for the dashboard.
   * @param optionalMinYouTrackVersion - Optional minimum version to filter the services.
   * @returns A promise that resolves to an array of YouTrack services.
   */
  function getYouTrackServices(dashboardApi: DashboardApi, optionalMinYouTrackVersion?: string): Promise<HubService[]>

  /**
   * Fetches a specific YouTrack service based on an optional YouTrack ID.
   * @param dashboardApi - The API interface for the dashboard.
   * @param optionalYtId - Optional YouTrack ID to filter the service.
   * @returns A promise that resolves to a specific YouTrack service or undefined if not found.
   */
  function getYouTrackService(dashboardApi: DashboardApi, optionalYtId?: string): Promise<HubService | undefined>

  export default {
    getYouTrackServices,
    getYouTrackService,
  }
}

declare module "@jetbrains/hub-widget-ui/dist/service-select" {
  import type { FC } from "react"
  import type { SelectProps } from "@jetbrains/ring-ui/components/select/select"

  interface Service {
    id: string
    name: string
    homeUrl?: string
  }

  interface ServiceSelectProps extends Omit<SelectProps, "data" | "onSelect" | "selected"> {
    isLoading?: boolean
    label?: string
    placeholder?: string
    selectedService?: Service
    serviceList?: Service[]
    loadError?: string
    onServiceSelect: (service: Service | null) => void
  }

  /**
   * ServiceSelect component that provides a selectable list of services.
   * @param isLoading - If true, shows a loading indicator.
   * @param label - The selected service label.
   * @param placeholder - The placeholder label when no service is selected.
   * @param selectedService - The currently selected service.
   * @param serviceList - The list of available services to select from.
   * @param loadError - Error message to display if loading fails.
   * @param onServiceSelect - Callback when a service is selected.
   */
  const ServiceSelect: FC<ServiceSelectProps>

  export default ServiceSelect
}

declare module "@jetbrains/hub-widget-ui/dist/super-digits" {
  /**
   * Converts a number to a superscript string representation.
   * @param number - The number to convert to superscript.
   * @returns A string representation of the number in superscript form.
   */
  export default function toSuperDigitsString(number: number): string
}

declare module "@jetbrains/hub-widget-ui/dist/test-mocks" {
  import type { Sandbox, spy } from "sinon"

  interface DashboardApiMock {
    fetch: spy // Spy for the fetch method
    fetchHub: spy // Spy for the fetchHub method
    readConfig: spy // Spy for the readConfig method
    setLoadingAnimationEnabled: spy // Spy for enabling/disabling loading animation
    storeConfig: spy // Spy for the storeConfig method
    exitConfigMode: spy // Spy for the exitConfigMode method
    setTitle: spy // Spy for the setTitle method
  }

  /**
   * Creates a mock for the Dashboard API.
   * @returns An object containing spies for the Dashboard API methods.
   */
  export function getDashboardApiMock(): DashboardApiMock

  /**
   * Creates a mock for the Register Widget API.
   * @returns A spy for the Register Widget API.
   */
  export function getRegisterWidgetApiMock(): spy
}

declare module "@jetbrains/hub-widget-ui/dist/timer" {
  import type { ComponentType } from "react"

  export interface TimerProps {
    tickPeriod?: number // Time in milliseconds between ticks
    onTick?: () => void // Function to call on each tick
  }

  export interface TimerState {
    prevTickPeriod?: number // Previous tick period to detect changes
    reSchedule: boolean // Whether to re-schedule the timer
  }

  /**
   * Higher Order Component (HOC) to add a timer to a React component.
   * @param WrappedComponent - The component to wrap with the timer functionality.
   * @returns A new component with the timer functionality.
   */
  export default function withTimerHOC<T extends TimerProps>(WrappedComponent: ComponentType<T>): ComponentType<T>
}

declare module "@jetbrains/hub-widget-ui/dist/widget-loader" {
  import type { ComponentType, ComponentProps } from "react"
  import type { DashboardApi, HubService } from "hub-dashboard-addons"

  interface WidgetLoaderProps {
    widgetLoader?: boolean // Optional prop to control loading animation
    dashboardApi?: DashboardApi
  }

  /**
   * Higher Order Component to wrap a widget component with loading animation functionality.
   * @param WrappedComponent - The component to be wrapped.
   * @returns A new component that handles loading animation based on widgetLoader prop.
   */
  export default function withWidgetLoaderHOC<T extends ComponentType<any>>(
    WrappedComponent: T,
  ): ComponentType<Omit<ComponentProps<T>, keyof WidgetLoaderProps> & WidgetLoaderProps>
}

declare module "widget-title" {
  import type { ComponentType, ComponentProps } from "react"
  import type { DashboardApi, HubService } from "hub-dashboard-addons"

  interface WidgetTitleProps {
    widgetTitle: string | { text: string; counter?: number; href?: string | null } // Title can be a string or an object
    dashboardApi?: DashboardApi
  }

  /**
   * Higher Order Component to wrap a widget component with title management functionality.
   * @param WrappedComponent - The component to be wrapped.
   * @returns A new component that updates the widget title based on widgetTitle prop.
   */
  export default function withWidgetTitleHOC<T extends ComponentType<any>>(
    WrappedComponent: T,
  ): ComponentType<Omit<ComponentProps<T>, keyof WidgetTitleProps> & WidgetTitleProps>
}
