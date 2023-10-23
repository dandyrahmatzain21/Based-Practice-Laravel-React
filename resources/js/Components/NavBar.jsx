import { Link } from '@inertiajs/react';

export default function NavBar({ user }) {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">NextZen App</a>
            </div>
            <div className="flex-none gap-2">
                {!user ?
                    <>
                        <ul className="menu menu-horizontal px-1">
                            <li><Link href={route('login')}>Login</Link></li>
                            <li><Link href={route('register')}>Register</Link></li>
                        </ul>
                    </>
                    :
                    <>
                        <ul className="menu menu-horizontal px-1 gap-1">
                            <li><Link href={route('dashboard')} className={route().current('dashboard') ? 'active' : ''}>Dashboard</Link></li>
                            <li><Link href={route('view.karyawan')} className={route().current('view.karyawan') ? 'active' : ''}>Karyawan</Link></li>
                        </ul>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src="https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" />
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li>
                                    <a className="justify-between">
                                        You Are Login As <strong>{user.name}</strong>
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li><Link href={route('logout')} method="post" as="button">Logout</Link></li>
                            </ul>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}
