#!/bin/bash

echo "Inizia la procedura di installazione del database. 💪🏼"

echo -e "Inserisci l'indirizzo dell'host del database (solitamente localhost): \c"
read host

echo -e "Inserisci l'username con cui collegarsi al database (probabilmente root): \c"
read user

echo -e "Inserisci la password dell'utente $user @ $host (probabilmente una stringa vuota o pass): \c"
read pass
passLength=${#pass}

# setup config file
sed -i.bak "s/'host': '[A-Za-z]*'/'host': '$host'/g" server/config.js
sed -i.bak "s/'user': '[A-Za-z]*'/'user': '$user'/g" server/config.js
sed -i.bak "s/'password': '[A-Za-z]*'/'password': '$pass'/g" server/config.js

install structure and some data
if [ $passLength -eq 0 ]; then
   mysql -u=$user < ./builder/CLIPS_structure.sql
   mysql -u=$user < ./builder/CLIPS_data.sql
else
   mysql -u=$user -p=$pass < ./builder/CLIPS_structure.sql
   mysql -u=$user -p=$pass < ./builder/CLIPS_data.sql
fi

echo "È finita l'installazione del database! 🎉"
