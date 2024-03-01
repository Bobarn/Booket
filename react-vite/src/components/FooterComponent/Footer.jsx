import './Footer.css';


export default function Footer() {
    return (
        <div className="footer-container">

            <div style={{paddingBottom: "15px"}}>
                Booket by Brandon Tamayo.
                <br/>
                <br/>
                For More From Me:
            </div>

            <div>

                <a href="https://www.linkedin.com/in/brandon-tamayo-bobarn7/" target='_blank' rel="noopener noreferrer" className="footer-link">
                <i className="fa-brands fa-linkedin"></i>   Linkedin
                </a>

                <a href="https://github.com/Bobarn" target='_blank' rel="noopener noreferrer" className="footer-link" style={{paddingLeft: "25px"}}>
                <i className="fa-brands fa-github"></i>   Github
                </a>

                <a href="https://github.com/Bobarn/Booket" target='_blank' rel="noopener noreferrer" className="footer-link" style={{paddingLeft: "25px"}}>
                <i className="fa-brands fa-github-alt"></i>   Booket Repo
                </a>

                <a href="https://bobarn.netlify.app/" target='_blank' rel="noopener noreferrer" className="footer-link" style={{paddingLeft: "25px"}}>
                <i className="fa-solid fa-house-chimney-user"></i>   Portfolio
                </a>

            </div>

        </div>
    );
}
