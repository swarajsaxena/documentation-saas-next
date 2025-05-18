const base = '/dashboard'

export const ROUTES = {
  dashboard: base,
  workspaces: base + '/wp',
  documentation: '/doc',
}

export const getDocRoute = (workspaceId: string, docId: string) =>
  `${ROUTES.workspaces}/${workspaceId}${ROUTES.documentation}/${docId}`
