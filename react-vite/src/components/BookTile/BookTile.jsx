import { Link } from 'react-router-dom';
import './BookTile.css'

export default function BookTile({book}) {


    return (
        <div className='book-tile'>
            <Link to={`/books/${book.id}`} className="book-cover-link">
                <img src={book.cover} alt={book.coverName} className='cover-image'/>
                <div className='book-title'>{book.title}</div>
            </Link>
            <Link to={`/users/${book.author.id}`}>
                <div className='tile-author-area'>
                    <p>
                        {book.synopsis}
                    </p>
                    <div className='tile-book-author'>
                    <img
                    src={book.author.profileImage}
                    alt={book.author.profileImageName}
                    className='tile-book-author-image'
                    />
                        {book.author.username}
                    </div>
                </div>
            </Link>
            <div className='tile-index'>
                <p>Table of Contents:</p>
                {book?.pages.slice(0, 5).map((page) => (
                    <Link className='index-link' to={`/books/${book.id}/${page.id}`} key={page.id}>
                        {page.page_name}
                    </Link>
                ))}
            </div>
        </div>
    )
}
