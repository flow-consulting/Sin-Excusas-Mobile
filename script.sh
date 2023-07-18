#!/bin/zsh

FOLDER=$1

for file in $(find $FOLDER -type f \( -name "*.ts" -o -name "*.tsx" \)); do
  relative_path=${file#./}
  if ! grep -q "^// $relative_path" $file; then
    sed -i '' "1s;^;// $relative_path\n;" $file
  fi
done
