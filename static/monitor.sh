#!/bin/sh
while inotifywait -e modify less; do
  lessc less/bootstrap.less > style.css
done
