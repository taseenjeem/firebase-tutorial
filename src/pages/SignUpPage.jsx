import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../auth/firebase-init";
import { useState } from "react";
import Loading from "../components/Loading";

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const redirect = useNavigate();

  const auth = getAuth(app);

  const handleSignUp = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const email = event.target.userEmail.value;
    const password = event.target.userPassword.value;

    try {
      const authResult = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (authResult.user) {
        redirect("/home");
        alert("Your account has been created!");
      }
    } catch (error) {
      console.log(error);
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
              <h1 className="text-5xl font-bold">Sign Up Now!</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
              <span>
                Already have an account? Then{" "}
                <Link className="underline underline-offset-2" to={`/`}>
                  log in
                </Link>
              </span>
            </div>
            <div className="card shrink-0 w-full max-w-xl shadow-2xl bg-neutral">
              <form onSubmit={handleSignUp} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    required
                  />
                </div>
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
                </div>
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">
                    Create New Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpPage;
