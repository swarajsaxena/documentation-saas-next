'use client'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import useCustomQuery from '@/hooks/use-custom-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { ColumnDef } from '@tanstack/react-table'
import { useMutation } from 'convex/react'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  email: z
    .string({
      message: 'Email is required.',
    })
    .email({
      message: 'Should be an email.',
    }),
  role: z.string({
    message: 'Role is required.',
  }),
})

const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'user.fullName',
    header: 'Name',
    cell: ({ row }) => {
      return (
        <div className="mt-auto flex cursor-pointer items-center space-x-2 rounded-xl p-1 transition-all hover:bg-light/10">
          <Image
            src={row?.original.user?.profilePic ?? ''}
            alt="user"
            width={20}
            height={20}
            className="rounded-full border border-light/50"
          />
          <span>{row?.original.user?.fullName ?? ''}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'user.email',
    header: 'Email',
    cell: ({ getValue }) => {
      return <a href={'mailto:' + getValue()}>{getValue()}</a>
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'accepted',
    header: 'Accepted',
    cell: ({ getValue }) => {
      return getValue() ? 'Yes' : 'No'
    },
  },
  {
    accessorKey: '_creationTime',
    header: 'Added When',
    cell: ({ getValue }) => {
      return dayjs(getValue()).format('DD-MM-YYYY')
    },
  },
]

// Settings page
const Settings = () => {
  const params = useParams()
  const { data } = useCustomQuery(api.workspaces.getWorkspaceGrants, {
    workspaceId: params.workspace_id as Id<'workspaces'>,
  })

  const createGrant = useMutation(api.workspaces.createGrantForWorkspace)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  const onInvite = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  return (
    <Tabs defaultValue="memberships">
      <TabsList>
        <div className="flex items-center gap-1 py-1 pb-2 pl-2 font-medium">
          Settings
          <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
        </div>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="memberships">Memberships</TabsTrigger>
      </TabsList>
      <TabsContent
        value="memberships"
        className="mx-auto flex w-full max-w-5xl flex-col gap-6 py-6"
      >
        <div className="flex flex-col gap-2">
          <div className="text-lg font-semibold">Invite a member</div>
          <Form {...form}>
            <form
              className="flex items-start gap-2"
              onSubmit={form.handleSubmit(onInvite)}
            >
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Email Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="role"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="min-w-3xs">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="EDITOR">Editor</SelectItem>
                        <SelectItem value="VIEWER">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Invite</Button>
            </form>
          </Form>
        </div>
        {/* <Separator /> */}
        <div className="space-y-2">
          <div className="text-lg font-semibold">Members</div>
          {data && <DataTable columns={columns} data={data} />}
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default Settings
