const LoginWithSocial = () => {

;

  return (
    <>
      <div className="col-md-6 col-12">
        <button className="button col-12 -outline-blue-1 text-blue-1 py-15 rounded-8 ">
          <i className="icon-apple text-15 mr-10" />
          Facebook
        </button>
      </div>

      <div className="col-md-6 col-12">
        <a href='http://localhost:5050/api/login/google/' className="button col-12 -outline-red-1 text-red-1 py-15 rounded-8" >
          <i className="icon-apple text-15 mr-10" />
          Google
        </a>
      </div>
    </>
  );
};

export default LoginWithSocial;
