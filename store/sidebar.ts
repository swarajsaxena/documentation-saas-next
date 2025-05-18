/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { atom, useAtom } from 'jotai'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// Create the atom for sidebar collapsed state
export const sidebarCollapsedAtom = atom<boolean>(false)

export const useSidebarAtom = () => {
  const pathname = usePathname()
  const [_, write] = useAtom(sidebarCollapsedAtom)

  useEffect(() => {
    if (pathname.includes('/doc/')) write(true)
    else write(false)
  }, [pathname])
}
