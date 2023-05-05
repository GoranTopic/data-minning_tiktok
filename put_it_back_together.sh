#!/bin/bash

# Get a list of all files in the current directory
files=$(ls)


# for every file in the list of files
# split the string by the delimiter "_"
# make a diretory of the first half of the string
# move the file into the directory
for f in $files; do
  IFS='_' read -ra ADDR <<< "$f"
  mkdir "${ADDR[0]}"
  mv "$f" "${ADDR[0]}"
done


# Loop over all possible combinations of four files
current_dir=$(pwd)
dirs=$(ls -d */)

#for dir in $dirs; do
#    # Change to the directory
#    cd $current_dir/$dir
#    # Get a list of all files in the current directory
#    files=$(ls)
#    # Loop over all possible combinations of four files
#    for f1 in $files; do
#        for f2 in $files; do
#            for f3 in $files; do
#                for f4 in $files; do
#                    # Make sure we don't include the same file twice
#                    if [ "$f1" != "$f2" ] && [ "$f1" != "$f3" ] && [ "$f1" != "$f4" ] && [ "$f2" != "$f3" ] && [ "$f2" != "$f4" ] && [ "$f3" != "$f4" ]; then
#                        # Print the combination of files
#                        cat  $f1 $f2 $f3 $f4 > "$f1$f2$f3$f4".mp4
#                    fi
#                done
#            done
#        done
#    done
#done
