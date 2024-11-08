import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/slices/authSlice";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth, error: authError } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        await dispatch(login(formData));
    }

    useEffect(() => {
        if (auth) {
            navigate("/");
        }
        
        if (authError) {
            setError(authError);
        }
    }, [auth, authError, navigate]);

    return (
        <section>
            <div className="min-h-[88lvh] flex items-center justify-center px-4 sm:px-6 lg:px-8 lg:py-24">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                    <h2 className="text-center text-2xl font-bold leading-tight text-black/80">Login to your account</h2>
                    <p className="mt-2 text-center text-sm text-gray-800">Don't have an account?{' '}
                        <Link to={"/signup"} className="font-semibold text-black/90 transition-all duration-200 hover:underline">Create a free account</Link>
                    </p>
                    {error && <p className="text-red-500 text-center">User not found. Please check your credentials or create a new account.</p>}
                    <form className="mt-8" onSubmit={handleSubmit} method="POST">
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="email" className="text-base font-medium text-gray-800">Email address</label>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-black"
                                        type="email"
                                        name='email'
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="text-base font-medium text-gray-800">Password</label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-black"
                                        type="password"
                                        name='password'
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full items-center justify-center rounded-md bg-black/90 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                >
                                    Get started
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login;