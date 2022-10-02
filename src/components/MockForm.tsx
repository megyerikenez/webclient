const axios = require("axios").default;

const submitHandler = async (e: any) => {
  e.preventDefault();
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };
  const fname = document.getElementById("Fname") as HTMLInputElement;
  const lname = document.getElementById("Lname") as HTMLInputElement;
  const email = document.getElementById("email") as HTMLInputElement;
  let bodyContent = JSON.stringify({
    firstName: fname.value,
    lastName: lname.value,
    email: email.value,
    lang: "HU", // TODO state.language
  });

  let reqOptions = {
    url: "https://api.dvpc.hu/api/register",
    method: "POST",
    headers: headersList,
    data: bodyContent,
  };

  let response = await axios.request(reqOptions);
  console.log(response);
};

export default function MockForm() {
  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
      <form>
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group mb-6">
            <input
              type="text"
              className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              aria-describedby="Fname"
              placeholder="Vezeték név"
              id="Fname"
            />
          </div>
          <div className="form-group mb-6">
            <input
              type="text"
              className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="Lname"
              aria-describedby="Lname"
              placeholder="Kereszt név"
            />
          </div>
        </div>
        <div className="form-group mb-6">
          <input
            type="email"
            className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="email"
            placeholder="Email cím"
          />
        </div>
        <button
          onClick={submitHandler}
          type="submit"
          className="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
        >
          Jelentkezés
        </button>
      </form>
    </div>
  );
}
