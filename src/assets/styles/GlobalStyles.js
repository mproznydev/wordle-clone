import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');

    *,*::after,*::before{
        box-sizing:border-box;
    }
    *{
        margin:0;
        padding:0;
        font-family: 'Roboto', sans-serif;
    }
`;
