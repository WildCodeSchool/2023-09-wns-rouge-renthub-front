import { styled } from '@mui/material';

export const DownloadInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

// const CustomButton = ({
//   padding,
//   children,
//   onClick,
//   color,
//   textColor,
//   fontSize,
//   height,
//   width,
//   type,
//   hoverColor,
// }) => {
//   const StyledButton = styled(BaseButton)`
//     font-family: "IBM Plex Sans", sans-serif;
//     font-size: ${fontSize || "0.875rem"};
//     line-height: 1.5;
//     background-color: ${color};
//     color: ${textColor || "white"};
//     border-radius: 8px;
//     font-weight: 600;
//     padding: ${padding || "4px 8px"};
//     cursor: pointer;
//     transition: all 150ms ease;
//     border: none;
//     width: ${width || "auto"};
//     height: ${height || "auto"};
//     &:hover {
//       background-color: ${hoverColor || "#1e88e5"};
//     }
//     &:hover:not(:disabled) {
//       background-color: ${hoverColor || "#1e88e5"};
//     }

//     &.${buttonClasses.focusVisible} {
//       box-shadow: 0 4px 20px 0 rgb(61 71 82 / 0.1),
//         0 0 0 5px rgb(0 127 255 / 0.5);
//       outline: none;
//     }

//     &.${buttonClasses.disabled} {
//       opacity: 0.5;
//       cursor: not-allowed;
//     }
//   `;
//   return (
//     <StyledButton onClick={onClick} type={type}>
//       {children}
//     </StyledButton>
//   );
// };
