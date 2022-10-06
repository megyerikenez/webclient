import Navbar from "../components/Navbar";
import AccordionComponent from "./Accordion";

export default function AdminPage() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div className="w-3/4 mt-10">
          <AccordionComponent />
        </div>
      </div>
    </>
  );
}
