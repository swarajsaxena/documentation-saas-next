import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="p-4">{children}</div>
)

export default Layout
