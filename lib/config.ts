export interface IConfig {
    mapboxApiKey: string
}

export const config: IConfig = {
    mapboxApiKey: process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string
}