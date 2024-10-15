import InputError from "@/Components/InputError";
import { Link, useForm } from "@inertiajs/react";
import React, { FormEventHandler } from "react";

export default function Login({
    status,
}: {
    status?: string;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailPattern.test(data.email)) {
            alert("Please enter a valid email address.");
            return;
        }

        post(route("login"), {
            // onFinish: () => reset("password"),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6">
            <div className="max-w-2xl w-full flex flex-col md:flex-row bg-white shadow-xl rounded-lg overflow-hidden transform transition duration-500 hover:shadow-2xl">
                <div className="hidden md:flex w-full md:w-1/2 bg-cover justify-center items-center p-8">
                    <img
                        src="/images/authentication.png"
                        alt="Illustration"
                        className="h-auto"
                    />
                </div>
                <div className="w-full md:w-1/2 p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-gray-800">
                        Have An Account? <br /> Login Now
                    </h2>
                    <form className="space-y-4 sm:space-y-6" onSubmit={submit}>
                        {status && (
                            <div className="mb-4 font-medium text-sm text-green-600 text-center">
                                {status}
                            </div>
                        )}

                        <div className="flex flex-col items-center justify-center">
                            <input
                                type="email"
                                placeholder="Email"
                                value={data.email}
                                autoComplete="username"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-md"
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <input
                                type="password"
                                placeholder="Password"
                                value={data.password}
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-md"
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>
                        <div className="flex justify-center">
                            <Link
                                href={route("password.request")}
                                className="underline text-sm text-blue-600 hover:text-gray-800 hover:underline mt-2"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <div className="flex justify-center mt-4">
                            <button
                                type="submit"
                                className="w-full sm:w-60 py-2 px-4  bg-blue-500 text-white font-bold rounded-2xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 shadow-lg transform transition duration-200 hover:scale-105"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
