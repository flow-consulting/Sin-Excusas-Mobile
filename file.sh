#!/bin/zsh

FOLDER=$1
OUTPUT=$2

# Generate folder tree
echo "Folder tree:" > $OUTPUT
tree $FOLDER/screens >> $OUTPUT
tree $FOLDER/navigation >> $OUTPUT

# Append file contents
echo "\nFile contents:" >> $OUTPUT
for dir in screens navigation; do
  for file in $(find $FOLDER/$dir -type f); do
    echo "\n$file:" >> $OUTPUT
    cat $file >> $OUTPUT
  done
done
