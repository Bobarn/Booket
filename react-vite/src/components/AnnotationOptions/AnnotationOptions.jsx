import { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import AnnotationEdit from './AnnotationEdit/AnnotationEdit';
import AnnotationDelete from './AnnotationDelete/AnnotationDelete';
import "./AnnotationOptions.css"

export default function AnnotationOptions({ annotationId }) {
  const [showMenu, setShowMenu] = useState(false);
  const annoRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (annoRef.current && !annoRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button className="annotation-options-button" onClick={toggleMenu}>
      <i className="fa-solid fa-ellipsis-vertical" />
      </button>
     {showMenu && <ul className={"annotation-dropdown"} ref={annoRef}>

          <>
            <OpenModalButton
              buttonText="Edit Annotation"
              onItemClick={closeMenu}
              modalComponent={<AnnotationEdit annotationId={annotationId} />}
            />

            <OpenModalButton
              buttonText="Delete Annotation"
              onItemClick={closeMenu}
              modalComponent={<AnnotationDelete annotationId={annotationId} />}
            />
          </>

      </ul>}
    </>
  );
}
