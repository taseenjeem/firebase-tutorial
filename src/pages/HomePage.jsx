import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import app from "../auth/firebase-init";
import Loading from "../components/Loading";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth(app);

  const handleResetPass = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const email = event.target.userEmail.value;

    try {
      const result = await sendPasswordResetEmail(auth, email);

      if (result) {
        alert("email sent!");
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
        <div className="min-h-screen text-4xl font-bold flex flex-col justify-center items-center">
          <h1>This is your Home page</h1>
          <form onSubmit={handleResetPass} className="mt-9">
            <input
              type="email"
              name="userEmail"
              placeholder="Enter your registered email"
              className="input input-bordered input-primary w-full max-w-xl"
              required
            />
            <button type="submit" className="btn btn-primary">
              Sent reset mail
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default HomePage;
