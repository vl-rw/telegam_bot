# Telegam_bot
## This is a telegram bot for generating audiofiles from text

It uses google servers, feeding it with text chunks up to 195 symbols long, 
and glue it together in one file.

This file can be sended back to user via telegram, OR you can use desktop
version - console program sp.js OR you can launch browser-based GUI to 
get your text narrated.

All the programs are node.js based, and if you need GUI version, you 
should have Chromium in your system for web page being automatically opened
(or just change code).

Mp3 file is glued from chunks by linux built-in CAT program.

## Telegram version functions

`simple text`     This text would be narrated as english text;

`1 simple text`   This text would be narrated as russian text;

`2 simple text`   This text would be narrated as german text;

`3 15`            This starts a timer for 15 minutes;


### Secret functions

`4 simple text`   This add line `simple text` to `log.txt`

`12345678`        You would get code of this bot - file `safe.js` w/o api

### Abount virtual memory

This program creates virtual disk 115 mb size. To restore RAM memory, type:


`sudo umount ./speech`

### Also

If you like this web gui, go see it [there][(https://vl-rw.github.io/my_site/](https://vl-rw.github.io/my_site/program/stuff/webgui/index.html)https://vl-rw.github.io/my_site/program/stuff/webgui/index.html) or get it [here.](https://github.com/vl-rw/node_web_gui)
