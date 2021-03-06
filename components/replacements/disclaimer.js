import { styled } from "goober";

export default function Disclaimer({children}) {
    return (
        <>
            <Container>
                {children}
            </Container>
        </>
    );
}

const Container = styled("div")`
    border-radius: 15px;
    background: rgba(243, 32, 19, 0.75);
    backdrop-filter: blur(4px);
    padding: 1.5rem;

    p {
        margin: 0;
        color: #fff;
        font-weight: 600;
        font-size: 1rem;
    }
`;
