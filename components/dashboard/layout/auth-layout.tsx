'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { api } from '@/convex/_generated/api'
import useCustomQuery from '@/hooks/use-custom-query'
import { ROUTES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { sidebarCollapsedAtom, useSidebarAtom } from '@/store/sidebar'
import { SignOutButton, useUser } from '@clerk/nextjs'
import {
  Add01Icon,
  AddTeamIcon,
  Files01Icon,
  Home03Icon,
  Logout03Icon,
  MoreVerticalIcon,
  OfficeIcon,
  Settings01Icon,
  UnfoldMoreIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Authenticated, useMutation } from 'convex/react'
import { useAtomValue } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

const routes = (workspace_id: string) => [
  {
    label: 'Dashboard',
    route: ROUTES.workspaces + `/${workspace_id}`,
    icon: Home03Icon,
  },
  {
    label: 'Documentations',
    route: ROUTES.workspaces + `/${workspace_id}/docs`,
    icon: Files01Icon,
  },
  {
    label: 'Settings',
    route: ROUTES.workspaces + `/${workspace_id}/settings`,
    icon: Settings01Icon,
  },
]

const AuthLayout = ({ children }: { children: ReactNode }) => {
  useSidebarAtom()
  const syncUser = useMutation(api.users.sync)

  // Call it when needed:
  const { user } = useUser()

  useEffect(() => {
    if (user && user.id)
      syncUser({
        fullName: user.fullName ?? '',
        email: user.emailAddresses[0].emailAddress ?? '',
        userId: user.id ?? '',
        profilePic: user.imageUrl ?? '',
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const router = useRouter()
  const pathname = usePathname()
  const { data: listWorkspaces, isLoading } = useCustomQuery(
    api.workspaces.getWorkspaces,
  )
  const { workspace_id } = useParams() as {
    workspace_id?: string
    doc_id?: string
  }

  const isCollapsed = useAtomValue(sidebarCollapsedAtom)

  useEffect(() => {
    console.log(isCollapsed)
  }, [isCollapsed])

  return (
    <Authenticated>
      <div
        className="relative flex h-screen flex-1 gap-2 overflow-hidden bg-gradient-to-b from-primary-500 to-primary-600 p-2"
        data-collapsed={isCollapsed}
      >
        <div
          className="absolute top-0 left-0 z-0 h-full w-full"
          style={{
            backgroundImage:
              'radial-gradient(circle, var(--primary-500) 0.5px, transparent 1.5px)',
            backgroundPosition: '0',
            backgroundSize: '16px 16px',
          }}
        />
        <div
          className={cn(
            'z-10 flex w-56 min-w-56 flex-col gap-4 overflow-hidden transition-all duration-300',
            isCollapsed && 'w-[32px] max-w-[32px] min-w-[32px]',
          )}
        >
          {isLoading ? (
            <></>
          ) : (
            <>
              <Select
                value={workspace_id}
                onValueChange={value =>
                  value !== 'new' &&
                  router.push(ROUTES.workspaces + '/' + value)
                }
              >
                <SelectTrigger
                  className="!h-max w-full border-none p-0 shadow-none"
                  isIconVisible={false}
                >
                  <div
                    className={cn(
                      'group flex w-full cursor-pointer items-center gap-2 rounded-xl p-1 transition-all hover:bg-light/10',
                      isCollapsed && 'mx-auto w-max',
                    )}
                  >
                    <div
                      className={cn(
                        'grid aspect-square size-9 min-w-9 place-content-center rounded-lg border bg-light',
                        isCollapsed && 'size-7 min-w-7',
                      )}
                    >
                      <HugeiconsIcon
                        className={cn('mx-auto my-2 size-4 text-dark-500')}
                        icon={OfficeIcon}
                      />
                    </div>
                    {!isCollapsed && (
                      <>
                        <div className="flex flex-col items-start">
                          <div className="font-semibold text-dark-100">
                            {
                              listWorkspaces?.find(
                                wp => wp._id === workspace_id,
                              )?.name
                            }
                            `&apos;s{' '}
                          </div>
                          <div className="text-xs text-dark-200">Workspace</div>
                        </div>
                        <HugeiconsIcon
                          className="ml-auto size-6 text-dark-300 transition-all group-hover:text-dark-200"
                          icon={UnfoldMoreIcon}
                        />
                      </>
                    )}
                  </div>
                </SelectTrigger>
                <SelectContent align="start" side="right">
                  <SelectGroup>
                    <SelectLabel>Workspaces</SelectLabel>
                    {listWorkspaces?.map(workspace => (
                      <SelectItem
                        key={workspace._id}
                        value={workspace._id}
                        className="pr-16"
                      >
                        {workspace.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectItem value="new" className="pr-2">
                    Create New Workspace
                    <HugeiconsIcon
                      className="ml-2 size-4 text-dark-400"
                      icon={Add01Icon}
                    />
                  </SelectItem>
                </SelectContent>
              </Select>
              <div className="mx-auto flex w-full flex-col gap-1">
                {routes(workspace_id!).map(route => (
                  <Tooltip key={route.label}>
                    <TooltipTrigger asChild autoFocus={false}>
                      <Link
                        href={route.route}
                        className={cn(
                          'group flex cursor-pointer items-center gap-2 rounded-lg border border-transparent px-3 py-2 text-base text-primary-300 transition-all hover:bg-primary-400/70 hover:text-primary-100',
                          route.route === pathname
                            ? 'border-primary-400 bg-gradient-to-r from-primary-500 to-primary-400 text-primary-100'
                            : '',
                          isCollapsed &&
                            'grid aspect-square place-items-center p-1',
                        )}
                      >
                        <HugeiconsIcon
                          className={cn(
                            'size-5',
                            // route.route === pathname ? "text-primary-500" : "",
                          )}
                          icon={route.icon}
                        />
                        {!isCollapsed && (
                          <div className="font-medium">{route.label}</div>
                        )}
                      </Link>
                    </TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent side="right" align="center">
                        {route.label}
                      </TooltipContent>
                    )}
                  </Tooltip>
                ))}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="mx-auto mt-auto flex w-max cursor-pointer items-center space-x-2 rounded-xl p-1 text-light transition-all hover:bg-light/10">
                    <Image
                      src={user?.imageUrl ?? ''}
                      alt="user"
                      width={28}
                      height={28}
                      className="rounded-full border border-light/50"
                    />
                    {!isCollapsed && (
                      <>
                        <div className="flex flex-col -space-y-px leading-0">
                          <span>{user?.fullName ?? ''}</span>
                          <span className="text-xs text-light-soft">
                            {user?.emailAddresses[0].emailAddress}
                          </span>
                        </div>
                        <HugeiconsIcon
                          icon={MoreVerticalIcon}
                          className="size-5"
                        />
                      </>
                    )}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem>
                    Invitations
                    <HugeiconsIcon
                      icon={AddTeamIcon}
                      className="ml-auto size-4"
                    />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <SignOutButton redirectUrl="/">
                      <div className="flex w-full items-center gap-2">
                        Logout
                        <HugeiconsIcon
                          icon={Logout03Icon}
                          className="ml-auto size-4"
                        />
                      </div>
                    </SignOutButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
        <div className="z-10 flex flex-1 flex-col rounded-xl border bg-light p-2">
          {children}
        </div>
      </div>
    </Authenticated>
  )
}

export default AuthLayout
