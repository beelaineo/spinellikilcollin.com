import * as React from 'react'
import { Footer } from './styled'

export class Footer extends React.Component {
	render() {
		return (
			<Footer>
				<div className="footer-inner">
					<div className="upper-footer">
						<div>
							<ul>
								<li>About</li>
								<li>Contact</li>
								<li>Press</li>
								<li>.925</li>
							</ul>
						</div>
						<div>
							<ul>
								<li>Shipping & Returns</li>
								<li>SK Ethics</li>
								<li>Diamond Education</li>
								<li>Find Us</li>
							</ul>
						</div>
						<div className="footer-newsletter">
							<h2>Keep In Touch</h2>
							<p>Hear about our new releases, and learn more about our world. </p>
						</div>
					</div>
					<div className="lower-footer">
						<div className="socials">socials</div>
						<div className="copyright">socials</div>
					</div>
				</div>
			</Footer>
		)
	}
}
