"use client"
import { SessionProvider } from 'next-auth/react'
import React, { PropsWithChildren } from 'react'

function AuthProviders({ children }:PropsWithChildren) {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>  
  )
}

export default AuthProviders