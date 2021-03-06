import Head from "next/head";
import Link from "next/link";
import { FormEvent, useState } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import InputGroup from "../components/inputGroup";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await Axios.post(
        "/auth/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      router.push("/");
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  return (
    <div className="flex bg-white">
      <Head>
        <title>Login</title>
      </Head>

      <div
        className="h-screen bg-center bg-cover w-36"
        style={{ backgroundImage: "url('/images/background.jpg')" }}
      ></div>

      <div className="flex flex-col justify-center pl-6">
        <div className="w-70">
          <h1 className="mb-2 text-lg font-medium">Login</h1>
          <p className="mb-10 text-xs">
            By continuing, you agree to our User Agreement and Privacy Policy
          </p>
          <form onSubmit={(e) => submitForm(e)}>
            <InputGroup
              className="mb-2"
              value={username}
              placeholder="Username"
              setValue={setUsername}
              error={errors.username}
              type="text"
            />
            <InputGroup
              className="mb-4"
              value={password}
              placeholder="Password"
              setValue={setPassword}
              error={errors.password}
              type="password"
            />
            <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded">
              Login
            </button>
          </form>
          <small>
            New to Readit?
            <Link href="/register">
              <a className="ml-1 text-blue-500 uppercase">Sign up</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
