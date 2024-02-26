import "./Coursecard.css";

export default function Coursecard(props) {
  const { heading, desc, imageSrc } = props;

  return (
    <div className="course-card">
      <div className="course-image-container">
        <img
          src={imageSrc || "/placeholder.svg"} // Use the provided image source or fallback to a placeholder
          alt="Course"
          className="course-image"
        />
      </div>
      <div className="course-info">
        <p className="course-heading">{heading}</p>
        <p className="course-description">{desc}</p>
      </div>
    </div>
  );
}
