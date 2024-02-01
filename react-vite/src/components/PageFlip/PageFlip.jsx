import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { thunkGetAllPages, thunkDeletePage } from '../../redux/pages';
// import HTMLFlipBook from 'react-pageflip';
import './PageView.css'


export default function PageFlip() {

    const navigate = useNavigate()

    const {pageId, bookId} = useParams();

    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user);
    const page = useSelector((state) => state.pages[pageId]);
    const pages = useSelector((state) => state.pages)

    const allPages = Object.values(pages)

    const prevPage = allPages.findLast((p) => p.book_id == bookId && p.page_number < page.page_number)

    const nextPage = allPages.find((p) => p.book_id == bookId && p.page_number > page.page_number)


    useEffect(() => {
        dispatch(thunkGetAllPages())
    }, [dispatch])

    if(!page) return null;


    function tearPage(pageId) {
        dispatch(thunkDeletePage(pageId));
        navigate(`/users/${page.user_id}`)
    }

    return (
        <>
        <div>
                {prevPage && page.book_id == prevPage.book_id ?
                <Link to={`/books/${bookId}/page/${prevPage.id}`}>
                    Previous
                </Link>
                :
                <>
                </>
                }
                {user.id == page.user_id &&
                <>
                    <button onClick={() => navigate(`/books/${page.book_id}/page/${page.id}/edit`)} className='revise-button'>
                        <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button onClick={() => tearPage(page.id)}>
                    <i className="fa-solid fa-scissors"></i>
                    </button>
                </>
                }
                <div>{page.page_name}</div>
                <div><img src={page.image}/></div>
                <div>{page.caption}</div>
                {nextPage && page.book_id == nextPage.book_id ?
                <Link to={`/books/${bookId}/page/${nextPage.id}`}>
                    Next
                </Link>
                :
                <>
                </>
                }
        </div>
        </>
    )
}
