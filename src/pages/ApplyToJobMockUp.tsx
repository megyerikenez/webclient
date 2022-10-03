import MockForm from "../components/MockForm";
import Navbar from "../components/Navbar";

function ApplyToJobMockup() {
  return (
    <>
      <Navbar />
      
        <main className="w-full min-h-screen mx-auto flex items-center justify-center bg-indigo-500 overflow-hidden absolute top-0">
          <MockForm />
        </main>
      
    </>
  );
}

export default ApplyToJobMockup;
