import MockForm from "../components/MockForm";
import Navbar from "../components/Navbar";

function ApplyToJobMockup() {
  return (
    <>
      <Navbar />
      <main>
        <div className="w-100 min-h-screen   mx-auto flex items-center justify-center  bg-indigo-500 overflow-hidden">
          <MockForm />
        </div>
      </main>
    </>
  );
}

export default ApplyToJobMockup;
