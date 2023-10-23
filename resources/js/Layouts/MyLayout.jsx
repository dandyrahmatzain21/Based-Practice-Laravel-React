import NavBar from '@/Components/NavBar';
import { Link } from '@inertiajs/react';

export default function MyLayout({ user, children }) {

    return (

        <div className='min-h-screen bg-gray-100'>
            <NavBar user={user} />
            <div className='flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch items-center gap-5 p-5'>
                {children}
            </div>
        </div>
    );
}
