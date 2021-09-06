// o ideal é um style por página! como temos só uma página...

import styled from "styled-components";

export const Container = styled.div`
height: 100%;
display: flex;
justify-content: center;
align-item: center;
`;

export const Content = styled.div`
width: 100%;
max-width: 400px; 
margin: 30px;
background: #FFF;
border-radius: 4px;
padding: 20px;
`;

// terá no máx 400px no PC ou 100% no mobile
