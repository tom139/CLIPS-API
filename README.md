# CLIPS-API  [![Build Status](https://travis-ci.org/tom139/CLIPS-API.svg?branch=master)](https://travis-ci.org/tom139/CLIPS-API)
Server API for CLIPS client app


Per l'installazione:
 - installare `mysql`, `node` e `npm` se non presenti
 - eseguire `./installDB.sh` e rispondere alle domande a video
 - eseguire `npm install` per installare le dipendenze
 - utilizzare il comando `npm start` per avviare il server (oppure `npm test` per testarlo)



Per installare **mysql**, **npm** e **nodejs** su Ubuntu si usino i seguenti comandi:
 - `sudo apt-get install mysql`
 - `sudo apt-get install nodejs`
 - `sudo apt-get install npm`

a seconda della versione di Ubuntu *Node* potrebbe installarsi sotto `node` o `nodejs`; verificare con `node -v` per conoscere la versione. Se il terminale risponde che *node* non è installato (`node : command not found.`) dovrebbe funzionare `nodejs -v`: creare a questo punto un alias `sudo ln -s /usr/local/bin/nodejs /usr/bin/node`.
