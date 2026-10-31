# Llista de la compra familiar (web + sincronització en temps real)

Aquesta carpeta conté una petita aplicació web. La sincronització utilitza Firebase Authentication (inici de sessió amb Google) i Cloud Firestore.

## Abans de començar
- Necessites un compte Google.
- La configuració inicial es fa una vegada a https://console.firebase.google.com/
- Perquè la llista sigui privada, **no comparteixis només l'enllaç**: autoritza els correus de la família a `firestore.rules`. L'enllaç és una manera còmoda d'obrir la llista, no és una contrasenya.

## Pas 1 — Crea el projecte Firebase
1. Obre https://console.firebase.google.com/ i prem **Create a project / Crear un projecte**.
2. Posa-li un nom, per exemple `llista-compra-familiar`.
3. Google Analytics no és necessari per a aquesta app; pots desactivar-lo durant la creació.

## Pas 2 — Activa l'inici de sessió Google
1. Dins del projecte, ves a **Build → Authentication → Get started**.
2. A **Sign-in method**, activa **Google** i desa.
3. A la configuració de Authentication, afegeix el domini del lloc web allotjat a **Authorized domains** si no hi és.

## Pas 3 — Crea Firestore
1. Ves a **Build → Firestore Database → Create database**.
2. Tria una ubicació propera, si n'hi ha una disponible, i crea la base de dades.
3. Obre la pestanya **Rules** i substitueix les regles per les del fitxer `firestore.rules`.
4. Canvia `EL_TEU_CORREU@gmail.com` i els correus d'exemple pels comptes Google exactes de les persones que podran accedir-hi. Afegeix o elimina línies segons calgui.
5. Prem **Publish**. No deixis regles obertes a tothom.

## Pas 4 — Registra l'aplicació web i copia la configuració
1. A la pàgina principal del projecte, prem la icona `</>` per afegir una aplicació web.
2. Posa-li un nom, per exemple `llista-compra-web`. No cal activar Firebase Hosting en aquest pas si prefereixes un altre allotjament.
3. Firebase mostrarà un objecte `firebaseConfig`. Copia els valors `apiKey`, `authDomain`, `projectId` i `appId`.
4. Obre `index.html` en un editor de text i substitueix els quatre valors `ENGANXA_...` dins de `firebaseConfig`.
5. Desa el fitxer.

## Pas 5 — Publica la pàgina a Internet
Una manera senzilla és Firebase Hosting:
1. Segueix la guia oficial: https://firebase.google.com/docs/hosting
2. Instal·la Node.js i Firebase CLI a l'ordinador i inicia sessió amb `firebase login`.
3. A la carpeta de publicació, executa `firebase init hosting`, selecciona el projecte i configura `public` com a carpeta pública. Copia `index.html` a aquesta carpeta. Si et pregunta si és una aplicació d'una sola pàgina, respon **No**.
4. Executa `firebase deploy --only hosting`.
5. Obtindràs una adreça HTTPS del tipus `https://PROJECT_ID.web.app`.

Si no vols instal·lar eines, pots utilitzar un altre allotjament estàtic HTTPS, sempre que tinguis en compte que cal afegir el domini als dominis autoritzats de Firebase Authentication.

## Pas 6 — Crea i comparteix l'enllaç de la llista
1. Obre la pàgina publicada. Afegeix a l'adreça un `#` seguit d'un identificador llarg i aleatori. Exemple de format:
   `https://PROJECT_ID.web.app/#compra-7f3b91c8a2d44e6fa10b`
2. Obre aquest enllaç i inicia sessió amb un dels comptes Google autoritzats a les regles.
3. La llista s'inicialitzarà amb els productes de la foto.
4. Prem **Copiar enllaç per compartir** i envia'l als familiars autoritzats. Tothom ha d'iniciar sessió amb el compte Google que has afegit a les regles.

**Important:** si canvies l'identificador de la part `#...`, estaràs obrint una llista diferent. Manteniu exactament el mateix enllaç.

## Ús
- Marca/desmarca productes; els canvis se sincronitzen en temps real.
- Pots afegir productes nous.
- El botó `×` elimina un producte per a tothom.
- La llista inicial conserva alguns mots transcrits de la foto; revisa “Sofregit brasa” i “Pollastres — 3½” si cal.

## Privacitat i límits
- Aquesta configuració permet accedir a les dades només als comptes de Google indicats a les regles de Firestore.
- L'identificador de l'enllaç no és un mecanisme d'autenticació; les regles i els comptes autoritzats són la protecció real.
- La configuració Firebase no s'inclou perquè és específica del teu projecte.
- L'aplicació utilitza el navegador i requereix connexió a Internet per sincronitzar.
