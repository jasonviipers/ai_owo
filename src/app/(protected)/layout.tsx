import { Protected } from '@/components/globals/auth/protected';

interface IProtectedLayout{
    children: React.ReactNode;
}
export default function ProtectedLayout({children}:IProtectedLayout) {
  return (
    <Protected>{children}</Protected>
  )
}
