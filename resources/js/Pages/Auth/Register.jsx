import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <>
            <Head title="NextZen App" />
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex">
                    <div className="text-center lg:text-center">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={submit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input id="name" name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} type="text" placeholder="name" className="input input-bordered" required autoFocus />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input id="email" type="email" name="email" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="email" className="input input-bordered" required autoComplete='username' />
                                <InputError message={errors.email} className="mt-2" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input id="password" type="password" name="password" value={data.password} onChange={(e) => setData('password', e.target.value)} placeholder="password" className="input input-bordered" required autoComplete='new-password' />
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password Confirmation</span>
                                </label>
                                <input id="password_confirmation" type="password" name="password_confirmation" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} placeholder="password confirmation" className="input input-bordered" required autoComplete="new-password" />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                            <Link href={route('login')} className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" > Already registered? </Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
