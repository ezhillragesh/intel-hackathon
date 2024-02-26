import Coursecard from "./Coursecard";
import python from "../assets/python.png";
export default function Courses() {
  return (
    <>
      <Coursecard
        heading="Course Heading"
        desc="Course Description"
        imageSrc={python} // Provide the image source as a prop
      />
    </>
  );
}
