import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { thunkGetAllPages } from '../../redux/pages';
import { thunkGetAllAnnotations} from '../../redux/annotations';
import { thunkGetBookmarks, thunkRemoveBookmark, thunkAddBookmark } from '../../redux/bookmarks';
import AnnotationOptions from '../AnnotationOptions/AnnotationOptions';
import AddAnnotation from '../AddAnnotation/AddAnnotation';
import PageDelete from '../DeleteModals/DeletePage';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import './PageView.css'



export default function PageFlip() {


    const navigate = useNavigate()

    const {pageId} = useParams();

    const dispatch = useDispatch();

    const [checked, setChecked] = useState(true)
    const [checked2, setChecked2] = useState(false)

    const user = useSelector((state) => state.session.user);
    const page = useSelector((state) => state.pages[pageId]);
    const pages = useSelector((state) => state.pages);
    const bookmarks = useSelector((state) => state.bookmarks)

    //Reconfigure to place inside useEffect on line 44.
    if((!page && !user) || !user && page?.book_id !== 8 || (page?.private && page?.book_id !== 8 && page?.user_id != user.id)) {
        navigate('/home')
    }

    const allPages = Object.values(pages)

    const prevPage = allPages.findLast((p) => p.book_id == page.book_id && p.page_number < page.page_number)

    const nextPage = allPages.find((p) => p.book_id == page.book_id && p.page_number > page.page_number)

    useEffect(() => {
        if(!page?.book_id) {
            navigate("/home")
        }
    }, [page])

    useEffect(() => {
        dispatch(thunkGetAllPages())
        dispatch(thunkGetAllAnnotations())
        dispatch(thunkGetBookmarks())
    }, [dispatch])

    function removeBookmark(pageId) {
        dispatch(thunkRemoveBookmark(pageId))
    }

    function addBookmark(pageId) {
        dispatch(thunkAddBookmark(pageId))
    }


    function displayAnnotations() {

        if(!user) return null

       return(
        <>
           <div className='annotation-container'>
                {page?.annotations.map((annotation) => {
                    return (
                        <div key={annotation?.id} className="annotation-tile">
                            <div className='annotation-user'>
                            {annotation.user}:
                            </div>

                            <div className="annotation-content">
                                <p id='annotation-text'>{annotation?.text}</p>

                                {user && user.id == annotation.user_id ? (
                                        <AnnotationOptions annotationId={annotation?.id} />
                                ) : (
                                    <div></div>
                                )}
                            </div>
                        </div>
                    );
                    })}
            </div>
            <AddAnnotation pageId={pageId}/>
        </>
           )
    }

    return (
    <>
        <div id="buffer"></div>
        <div id='book-container'>
            {/* Add in on changes so that we avoid the warning for uncontrolled/controlled inputs. Also add checked so we can force it closed again after navigation */}
                <input type="checkbox" className='checkbox' defaultChecked={true} id="checkbox-cover"/>
                <input type="checkbox" className='checkbox' onChange={() => null} checked={checked} id="checkbox-page1"/>
                <input type="checkbox" className='checkbox' onChange={() => null} checked={checked2} id="checkbox-page2"/>
                <div className="book">

                    <div className="cover">
                    </div>
                    <div className="page" onTransitionEnd={(e) => {
                        e.stopPropagation()
                        // if(checked === false && checked2 === false) {
                            setChecked(true)
                            navigate(`/page/${prevPage.id}`)
                        // }
                    }
                        } id="page1">
                        <div className="front-page">
                            Flipping...
                        </div>
                        <div className="back-page">
                            {user && !bookmarks[page?.id] &&
                            <button className='bookmark-button' onClick={() => addBookmark(page.id)}><i className="fa-xl fa-regular fa-bookmark"></i></button>
                            }
                            {user && bookmarks[page?.id] &&
                            <button className='bookmark-button' onClick={() => removeBookmark(page.id)} ><i className="fa-xl fa-solid fa-bookmark"></i></button>
                            }

                        <h4>{page?.page_name}</h4>
                            <img id='page-image' src={page?.image}/>
                            {prevPage && <label className="flip prev" onClick={() => setChecked(false)} htmlFor="checkbox-page1"><i className="turn-page-prev fas fa-chevron-left"></i></label>}
                        </div>
                    </div>
                    <div className="page" id="page2" onTransitionEnd={(e) => {
                        e.stopPropagation()
                        // if(checked2 && checked) {
                            setChecked2(false)
                            navigate(`/page/${nextPage.id}`)
                        // }
                    }}>
                        <div className="front-page">
                            {user && user.id == page?.user_id &&
                        <>
                            <button onClick={() => navigate(`/books/${page?.book_id}/page/${page?.id}/edit`)} className='page-revise-button'>
                                <i className="fa-regular fa-xl fa-pen-to-square"></i>
                            </button>
                            <div className='tear-button'>
                                <OpenModalButton
                                buttonText={<i className="fa-xl fa-solid fa-scissors"></i>}
                                modalComponent={<PageDelete pageId={page?.id}/>}
                                 />
                            </div>
                        </>
                        }
                        <h2>Caption</h2>
                        <p className='page-caption'>{page?.caption}</p>
                        {displayAnnotations()}

                            {nextPage && <label className="flip next" onClick={() => setChecked2(true)} htmlFor="checkbox-page2"><i className="turn-page-next fas fa-chevron-right"></i></label>}
                        </div>
                        <div className="back-page">
                            Flipping...
                        </div>
                    </div>
                    <div className="back-cover"></div>
                </div>
            </div>
        </>
    )
}
