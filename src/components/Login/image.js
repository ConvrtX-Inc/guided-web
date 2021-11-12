import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

import image from '../../assets/images/image.png';
import signin from '../../assets/images/signin.png';
import logo from '../../assets/images/logo.png';

//import './login.scss';

const ImageSection = () => {
    return (
        <Container>
            <Row className="img-wrapper">
                <div>
                    <Image src={logo} alt="Guided Logo" />
                </div>
                <Image src={signin} alt="Guided Signin to Sub Admin Portal" />
                <Image src={image} alt="Guided" />
            </Row>
        </Container>
    )
}
export default ImageSection;