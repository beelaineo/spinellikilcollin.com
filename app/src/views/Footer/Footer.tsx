import * as React from 'react'
import { FooterWrapper } from './styled'
import {
  FaFacebookF,
  FaTwitter,
  FaPinterest,
  FaGooglePlusG,
  FaInstagram,
  FaLongArrowAltRight,
} from 'react-icons/fa'
import { Input } from '../../components/Text'

export class Footer extends React.Component {
  render() {
    return (
      <FooterWrapper>
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
              <p>
                Hear about our new releases, and learn more about our world.{' '}
              </p>
              <Input type="text" placeholder="Email Address" />
              <button type="submit">
                <FaLongArrowAltRight />
              </button>
            </div>
          </div>
          <div className="lower-footer">
            <div className="socials">
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaPinterest />
              </a>
              <a href="#">
                <FaGooglePlusG />{' '}
              </a>
              <a href="#">
                <FaInstagram />
              </a>
            </div>
            <div className="copyright">COPYRIGHT © 2019 SPINELLI KILCOLLIN</div>
          </div>
        </div>
      </FooterWrapper>
    )
  }
}
