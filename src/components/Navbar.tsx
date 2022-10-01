import { Link } from "react-router-dom";
import IconApply from "../assets/icon-components/IconApply";
import IconData from "../assets/icon-components/IconData";
import IconHome from "../assets/icon-components/IconHome";
import IconOutCome from "../assets/icon-components/IconOutCome";
import IconSettings from "../assets/icon-components/IconSettings";
import IconTest from "../assets/icon-components/IconTest";

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
                  <IconHome />
                  <span className="-mr-1 font-medium">Főoldal</span>
                </Link>
              </li>
              <li className="min-w-max">
                <a
                  href="#"
                  className="bg group flex items-center space-x-4 rounded-full px-4 py-3 text-gray-600"
                >
                  <IconTest />
                  <span className="group-hover:text-gray-700">Tesztjeim</span>
                </a>
              </li>
              <li className="min-w-max">
                <a
                  href="#"
                  className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600"
                >
                  <IconOutCome />
                  <span className="group-hover:text-gray-700">Eredményeim</span>
                </a>
              </li>
              <li className="min-w-max">
                <a
                  href="#"
                  className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600"
                >
                  <IconData />
                  <span className="group-hover:text-gray-700">Többi adat</span>
                </a>
              </li>
              <li className="min-w-max">
                <Link
                  className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600"
                  to={"/mockup"}
                >
                  <IconApply />
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
              <IconSettings />
              <span className="group-hover:text-gray-700">Beállitások</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
