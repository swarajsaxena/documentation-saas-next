'use client'

import { OptionalRestArgsOrSkip, useQuery } from 'convex/react'
import { FunctionReference } from 'convex/server'
import { useEffect, useState } from 'react'

function useCustomQuery<Query extends FunctionReference<'query'>>(
  query: Query,
  ...args: OptionalRestArgsOrSkip<Query>
) {
  const [isLoading, setIsLoading] = useState(true)
  const queryResult = useQuery(query, ...args)

  useEffect(() => {
    if (queryResult !== undefined) {
      setIsLoading(false)
    }
  }, [queryResult])

  return {
    data: queryResult,
    isLoading,
  }
}

export default useCustomQuery
