export default async function TenantPage({
  params,
}: {
  params: { slug: string; route_slug?: string[] }
}) {
  const { slug, route_slug } = await params
  // console.log(route_slug)
  return (
    <div>
      <h1>Tenant: {slug}</h1>
      <p>Path: {route_slug?.join('/') ?? 'home'}</p>
    </div>
  )
}
