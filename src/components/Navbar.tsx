import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="sidebar min-h-screen w-[3.35rem] overflow-hidden border-r hover:w-56 hover:bg-white hover:shadow-lg">
        <div className="flex h-screen flex-col justify-between pt-2 pb-6">
          <div>
            <div className="w-max p-2.5">
              <img
                src="https://simpact.hu/wp-content/uploads/SALVA-VITA-logo302x100.png"
                className="w-32"
                alt=""
              />
            </div>

            <ul className="mt-6 space-y-2 tracking-wide">
              <li className="min-w-max">
                <Link
                  aria-label="dashboard"
                  to={"/"}
                  className="relative flex items-center space-x-4 bg-gradient-to-r from-sky-600 to-cyan-400 px-4 py-3 text-white"
                >
                  <svg
                    className="-ml-1 h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
                      className="fill-current text-cyan-400 dark:fill-slate-600"
                    ></path>
                    <path
                      d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
                      className="fill-current text-cyan-200 group-hover:text-cyan-300"
                    ></path>
                    <path
                      d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
                      className="fill-current group-hover:text-sky-300"
                    ></path>
                  </svg>
                  <span className="-mr-1 font-medium">Főoldal</span>
                </Link>
              </li>
              <li className="min-w-max">
                <a
                  href="#"
                  className="bg group flex items-center space-x-4 rounded-full px-4 py-3 text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      className="fill-current text-gray-300 group-hover:text-cyan-300"
                      fillRule="evenodd"
                      d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                      clipRule="evenodd"
                    />
                    <path
                      className="fill-current text-gray-600 group-hover:text-cyan-600"
                      d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
                    />
                  </svg>
                  <span className="group-hover:text-gray-700">Tesztjeim</span>
                </a>
              </li>
              <li className="min-w-max">
                <a
                  href="#"
                  className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      className="fill-current text-gray-600 group-hover:text-cyan-600"
                      fillRule="evenodd"
                      d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                      clipRule="evenodd"
                    />
                    <path
                      className="fill-current text-gray-300 group-hover:text-cyan-300"
                      d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"
                    />
                  </svg>
                  <span className="group-hover:text-gray-700">Eredményeim</span>
                </a>
              </li>
              <li className="min-w-max">
                <a
                  href="#"
                  className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      className="fill-current text-gray-600 group-hover:text-cyan-600"
                      d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                    />
                    <path
                      className="fill-current text-gray-300 group-hover:text-cyan-300"
                      d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"
                    />
                  </svg>
                  <span className="group-hover:text-gray-700">Többi adat</span>
                </a>
              </li>
              <li className="min-w-max">
                <Link
                  className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600"
                  to={"/mockup"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      className="fill-current text-gray-300 group-hover:text-cyan-300"
                      d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"
                    />
                    <path
                      className="fill-current text-gray-600 group-hover:text-cyan-600"
                      fillRule="evenodd"
                      d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="group-hover:text-gray-700">
                    Jelentkezés MockUp
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-max -mb-3">
            <a
              href="#"
              className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 group-hover:fill-cyan-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="group-hover:text-gray-700">Beállitások</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
