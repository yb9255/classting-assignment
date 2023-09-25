import 'styled-components';

type HexCode = `#${string}`;

declare module 'styled-components' {
  export interface DefaultTheme {
    brightPrimaryColor: HexCode;
    white: HexCode;
    primaryColor: HexCode;
  }
}
