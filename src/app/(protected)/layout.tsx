import { Protected } from '@/components/globals/auth/protected';
import { Header } from '@/components/globals/layout/header/header';
import Sidebar from '@/components/globals/layout/sidebar/side-bar';
import { getCurrentUser } from '@/server/actions/user';

interface IProtectedLayout {
  children: React.ReactNode;
}
export default async function ProtectedLayout({ children }: IProtectedLayout) {
  const currentUser = await getCurrentUser();
  return (
    <Protected>
      <div className="flex w-full min-h-screen">
        <Sidebar />

        <div className='flex flex-col w-full h-screen overflow-auto px-4 scroll-hide container mx-auto'>
          <Header user={currentUser}/>
          {children}

        </div>
      </div>
    </Protected >
  )
}
