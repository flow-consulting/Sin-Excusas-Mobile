#!/bin/zsh

echo "Bing, por favor ayudame con mi proyecto de react native:" > rn.txt
tree src >> rn.txt
echo "Necesito que me ayudes con algunas modificaciones y a mejorar el proyecto conservandolos principios de SOLID, DRY, KISS, YAGNI y que sigamos la Documentación oficial de React Native, Documentación oficial de TypeScript, Guías de estilo para TypeScript, React/JSX Style Guide. Todos los ejemplos de codigo que me muestres deben ser enteramente en ingles, me refiero a nombres de las variables, comentarios de linea, logs, etc, No podemos usar español. Hazme saber si tenemos código repetido, redundante o innecesario en mis distintos contexts bing." >> rn.txt
files=("App.tsx" "src/navigation/index.tsx" "src/hooks/useAuth.ts" "src/hooks/useNeighborhood.ts")

for file in "${files[@]}"; do
  perl -0777 -pe 's/>\s+</></g; s/\/\/.*?\n//g; s/console.log.*?\n//g; s/\n+/\n/g' $file >> rn.txt
done
