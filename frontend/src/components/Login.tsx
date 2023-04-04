import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SigninPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [warning, setWarning] = useState<string>("");

  const navigate = useNavigate();

  const handleOnClick = async (): Promise<void> => {
    if (!username || !password) {
      setWarning("username, password are required");
    }
    const signinResponse = await axios.post(`/auth/login`, {
      username: username,
      password: password,
    });
    if (signinResponse && signinResponse.status === 201) {
      localStorage.setItem("webshop", signinResponse.data.access_token);
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <section className='vh-100 gradient-custom'>
      <div className='container py-5 h-100'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className='col-12 col-md-8 col-lg-6 col-xl-5'>
            <div className='card text-dark'>
              <div className='card-body p-5 text-center'>
                <div className='mb-md-4 mt-md-4 pb-5'>
                  <h2 className='fw-bold mb-2 text-uppercase'>Sign in</h2>
                  <p className='text-secondary-50 mb-5'>
                    Please enter your username and password!
                  </p>
                  <div className='form-outline form-white mb-4'>
                    <input
                      type='email'
                      id='typeEmailX'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className='form-control form-control-lg'
                    />
                    <label className='form-label' htmlFor='typeEmailX'>
                      Username
                    </label>
                  </div>

                  <div className='form-outline form-white mb-4'>
                    <input
                      type='password'
                      id='typePasswordX'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className='form-control form-control-lg'
                    />
                    <label className='form-label' htmlFor='typePasswordX'>
                      Password
                    </label>
                  </div>
                  <button
                    className='btn btn-primary btn-lg px-5'
                    onClick={handleOnClick}
                    type='submit'
                  >
                    Login
                  </button>
                </div>
                <div>
                  {warning && (
                    <div className='alert alert-warning' role='alert'>
                      {warning}
                    </div>
                  )}
                </div>
                <div className='mb-1 pb-5'>
                  <p className='mb-0'>
                    Don't have an account?{" "}
                    <a href='/signup' className='text-primary-50 fw-bold'>
                      Sign Up
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
