import Link from "next/link";
import { useRouter } from "next/router";
import { React, useState } from "react"

const SignUpForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone_no: "",
    role: "customer",
    status: "active",
  });

  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log("Register");
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      // Passwords do not match, handle the error here
      setPasswordMatch(false);
      console.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("https://nss-backend-services.onrender.com/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful registration, e.g., redirect to another page or show a success message
        console.log("User registered successfully!");
        router.push("/"); // Redirect to the home screen path
      } else {
        // Handle errors, e.g., show an error message to the user
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error occurred while registering user", error);
    }
  };

  return (
    <form className="row y-gap-20" onSubmit={handleSubmit}>
      <div className="col-12">
        <h1 className="text-22 fw-500">Welcome back</h1>
        <p className="mt-10">
          Already have an account yet?{" "}
          <Link href="/others-pages/login" className="text-blue-1">
            Log in
          </Link>
        </p>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
          <label className="lh-1 text-14 text-light-1">First Name</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
          <label className="lh-1 text-14 text-light-1">Last Name</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="text" name="email" value={formData.email} onChange={handleInputChange} required />
          <label className="lh-1 text-14 text-light-1">Email</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="text" name="phone_no" value={formData.phone_no} onChange={handleInputChange} required />
          <label className="lh-1 text-14 text-light-1">Phone</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
          <label className="lh-1 text-14 text-light-1">Password</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input className={passwordMatch ? "" : "border-danger"} type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required />
          <label className="lh-1 text-14 text-light-1">Confirm Password</label>
        </div>
        {!passwordMatch && (
          <p className={passwordMatch ? "" : "text-danger"}>Passwords do not match. Please try again.</p>
        )}
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="d-flex ">
          <div className="form-checkbox mt-5">
            <input type="checkbox" name="name" />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
          </div>
          <div className="text-15 lh-15 text-light-1 ml-10">
            Email me exclusive Agoda promotions. I can opt out later as stated
            in the Privacy Policy.
          </div>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <button
          type="submit"
          className="button py-20 -dark-1 bg-blue-1 text-white w-100"
        >
          Sign Up <div className="icon-arrow-top-right ml-15" />
        </button>
      </div>
      {/* End .col */}
    </form>
  );
};

export default SignUpForm;
