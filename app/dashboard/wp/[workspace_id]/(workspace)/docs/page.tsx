'use client'

import { Separator } from '@/components/ui/separator'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { getDocRoute } from '@/lib/constants'
import { useQuery } from 'convex/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { CreateDocModal } from './_components/create-doc-modal'

const Team = () => {
  const params = useParams()
  const workspaceId = params.workspace_id as string
  const documents = useQuery(api.documents.getByWorkspace, {
    workspaceId: workspaceId as Id<'workspaces'>,
  })
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium">Documents</h1>
        <CreateDocModal />
      </div>
      <Separator />
      <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-4 py-6">
        {documents?.length === 0 ? (
          <div className="text-muted-foreground text-center">
            No documents found. Create one to get started!
          </div>
        ) : (
          documents?.map(doc => (
            <Link
              href={getDocRoute(workspaceId, doc._id)}
              key={doc._id}
              className="cursor-pointer rounded-lg border p-4 hover:bg-dark-100"
            >
              <h3 className="text-lg font-medium">{doc.name}</h3>
              <p className="text-muted-foreground text-sm">/{doc.slug}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default Team
