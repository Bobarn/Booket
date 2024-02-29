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

                <a href="https://www.linkedin.com/in/brandon-tamayo-bobarn7/" className="footer-link">
                <i className="fa-brands fa-linkedin"></i>   Linkedin
                </a>

                <a href="https://github.com/Bobarn" className="footer-link" style={{paddingLeft: "25px"}}>
                <i className="fa-brands fa-github"></i>   Github
                </a>

                <a href="https://github.com/Bobarn/Booket" className="footer-link" style={{paddingLeft: "25px"}}>
                <i className="fa-brands fa-github-alt"></i>   Booket Repo
                </a>

                <a href="https://bobarn.netlify.app/" className="footer-link" style={{paddingLeft: "25px"}}>
                <i className="fa-solid fa-house-chimney-user"></i>   Portfolio
                </a>

            </div>

        </div>
    );
}
