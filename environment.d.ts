declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      CONTENTFUL_SPACE: string
      CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN: string
      NEXT_PUBLIC_FORMSPREE_PROJECT_ID: string
      NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID: string
    }
  }
}

export {}
