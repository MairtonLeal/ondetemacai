// Diz ao TypeScript: "quando alguém importar um arquivo .svg,
// trate ele como um módulo válido"
declare module "*.svg" {

  // Importa os tipos do React (não é código que vai para produção,
  // é só para o TypeScript entender tipagem)
  import React from "react";

  // Importa o tipo SvgProps da biblioteca react-native-svg.
  // Esse tipo contém propriedades como:
  // width, height, fill, stroke, etc.
  import { SvgProps } from "react-native-svg";

  // Aqui estamos dizendo que qualquer arquivo .svg
  // exporta um componente React funcional (React.FC)
  // que aceita as props do tipo SvgProps.
  const content: React.FC<SvgProps>;

  // Define que o export padrão do arquivo .svg
  // é esse componente tipado acima.
  export default content;
}