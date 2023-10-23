import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <>
            <Head title="NextZen App" />
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex">
                    <div className="text-center lg:text-center">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={submit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    autoComplete="username"
                                    autoFocus
                                    onChange={(e) => setData('email', e.target.value)} placeholder="email" className="input input-bordered" required />
                                <InputError message={errors.email} className="mt-2" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)} placeholder="password" className="input input-bordered" required />
                                <InputError message={errors.password} className="mt-2" />
                                <label className="label">
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="label-text-alt link link-hover"
                                        >
                                            Forgot your password?
                                        </Link>
                                    )}
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary" disabled={processing}>Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
