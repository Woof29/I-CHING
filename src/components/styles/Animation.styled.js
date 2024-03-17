import { keyframes } from 'styled-components';

export const fadeIn = keyframes`
from{
    opacity: 0;
}
to{
    opacity: 1;
}
`;

export const scaleIn = keyframes`
from{
    transform: scale(0);
}
to{
    transform: scale(1);
}
`;

export const scaleOut = keyframes`
    from {
        transform: scale(1);
    }
    to {
        transform: scale(0);
    }
`;
