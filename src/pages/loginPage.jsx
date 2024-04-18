import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import app from "../auth/firebase-init";
import Loading from "../components/Loading";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const redirect = useNavigate();
  const auth = getAuth(app);

  const handleLogin = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const email = event.target.userEmail.value;
    const password = event.target.userPassword.value;

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result);
      if (result.user) {
        redirect("/home");
      }
    } catch (error) {
      console.log(error);
      if (error.message === "Firebase: Error (auth/invalid-credential).") {
        alert("You entered wrong info");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="hero min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Login now!</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
              <span>
                Do not have an account? Then{" "}
                <Link className="underline underline-offset-2" to={`/sign-up`}>
                  create new account
                </Link>
              </span>
            </div>
            <div className="card shrink-0 w-full max-w-xl shadow-2xl bg-neutral">
              <form onSubmit={handleLogin} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="userEmail"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="userPassword"
                    className="input input-bordered"
                    required
                  />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
