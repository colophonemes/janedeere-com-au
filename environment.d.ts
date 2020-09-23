declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      NEXT_PUBLIC_CONTENTFUL_SPACE: string
      NEXT_PUBLIC_CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN: string
      NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID: string
      NEXT_PUBLIC_STATICKIT_SITE_ID: string
    }
  }
}

export {}
