import {createGlobalStyle} from 'styled-components'
// allows me to create my owncss

import 'react-circular-progressbar/dist/styles.css'; //importa a biblio padrão da react-circular-progressBar
export default createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    background: #7159c1;
    text-rendering: optimizedLegibility;
    -webkit-font-smoothing: antialiased;
}
`;