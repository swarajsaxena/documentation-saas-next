'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import useCustomQuery from '@/hooks/use-custom-query'
import { getDocRoute, ROUTES } from '@/lib/constants'
import {
  ArrowRight01Icon,
  Doc01FreeIcons,
  Doc02Icon,
  File02Icon,
  Home01Icon,
  PaintBrush04Icon,
  Route01Icon,
  Settings01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { ReactNode } from 'react'

const routes = (docId: string, workspaceId: string) => [
  {
    label: 'General Info',
    route: getDocRoute(workspaceId, docId),
    icon: Home01Icon,
  },
  {
    label: 'Configure Routes',
    route: getDocRoute(workspaceId, docId) + '/config',
    icon: Route01Icon,
  },
  {
    label: 'Theme',
    route: getDocRoute(workspaceId, docId) + '/theme',
    icon: PaintBrush04Icon,
  },
  {
    label: 'Settings',
    route: getDocRoute(workspaceId, docId) + '/settings',
    icon: Settings01Icon,
  },
]

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const { workspace_id, doc_id } = useParams()
  const { data, isLoading } = useCustomQuery(api.documents.getById, {
    id: doc_id as Id<'documentations'>,
  })

  if (isLoading) return <>Loading...</>

  return (
    <Tabs
      defaultValue={routes(doc_id as string, workspace_id as string)[0].route}
      value={pathname}
    >
      <TabsList>
        <div className="flex items-center gap-1 py-1 pb-2 pl-2 font-medium">
          <HugeiconsIcon
            icon={File02Icon}
            className="size-5 text-primary-400"
          />
          <span className="font-medium text-primary-500">{data?.name}</span>
          <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
        </div>
        {routes(doc_id as string, workspace_id as string).map(route => (
          <Link key={route.route} href={route.route}>
            <TabsTrigger value={route.route}>{route.label}</TabsTrigger>
          </Link>
        ))}
      </TabsList>
      <div className="flex-1 overflow-auto bg-light">{children}</div>
    </Tabs>
  )
}

export default Layout
