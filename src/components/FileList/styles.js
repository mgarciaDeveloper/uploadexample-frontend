import styled from "styled-components";

export const Container = styled.ul`
/* //este Container será uma ul */
margin-top: 20px;
/* //  /* // joga um pra esquerda e outro pra direita !  */
li {
    display: flex;
    justify-content: space-between;
    align-itens: center;
    color: #444;
/* //aiciona a partir do segundo item */
    & + li {
        margin-top: 15px;
    }
}
`;

export const FileInfo = styled.div`
display: flex;
align-items: center;

div {
    display: flex;
    flex-direction: column;
    span {
        font-size: 12px;
        color: #999;
        margin-top: 5px;
        button {
            border: 0;
            background: transparent;
            color: #e57878;
            magin-left: 5px;
            cursor: pointer;
        }
    }
}
`;

export const Preview = styled.div`
      width: 36px;
  height: 36px;
  border-radius: 5px;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  margin-right: 10px;
`;
