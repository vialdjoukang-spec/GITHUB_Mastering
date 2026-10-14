# Dépendances intégrées au HTML

Inventaire dérivé du graphe esbuild ; dépendances de développement et transitives complètes : evidence/dependencies.json et package-lock.json. Audit npm : evidence/npm-audit.json (aucune vulnérabilité connue signalée lors de cette exécution ; cela ne constitue pas une preuve d’absence de vulnérabilités). Versions figées par le lockfile.

- base64-js 1.5.1 — MIT
- ieee754 1.2.1 — BSD-3-Clause
- buffer 6.0.3 — MIT
- inherits 2.0.4 — ISC
- safe-buffer 5.2.1 — MIT
- isarray 2.0.5 — MIT
- es-errors 1.3.0 — MIT
- es-object-atoms 1.1.2 — MIT
- math-intrinsics 1.1.0 — MIT
- gopd 1.2.0 — MIT
- es-define-property 1.0.1 — MIT
- has-symbols 1.1.0 — MIT
- get-proto 1.0.1 — MIT
- function-bind 1.1.2 — MIT
- call-bind-apply-helpers 1.0.2 — MIT
- dunder-proto 1.0.1 — MIT
- hasown 2.0.4 — MIT
- get-intrinsic 1.3.0 — MIT
- call-bound 1.0.4 — MIT
- is-callable 1.2.7 — MIT
- for-each 0.3.5 — MIT
- possible-typed-array-names 1.1.0 — MIT
- available-typed-arrays 1.0.7 — MIT
- define-data-property 1.1.4 — MIT
- has-property-descriptors 1.0.2 — MIT
- set-function-length 1.2.2 — MIT
- call-bind 1.0.9 — MIT
- has-tostringtag 1.0.2 — MIT
- which-typed-array 1.1.24 — MIT
- is-typed-array 1.1.15 — MIT
- typed-array-buffer 1.0.3 — MIT
- to-buffer 1.2.2 — MIT
- sha.js 2.4.12 — (MIT AND BSD-3-Clause)
- async-lock 1.4.1 — MIT
- clean-git-ref 2.0.1 — Apache-2.0
- crc-32 1.2.2 — Apache-2.0
- pako 1.0.11 — (MIT AND Zlib)
- pify 4.0.1 — MIT
- ignore 5.3.2 — MIT
- diff3 0.0.3 — MIT
- isomorphic-git 1.44.2 — MIT

## Choix et maintenance
Le moteur isomorphic-git est retenu pour créer des objets Git interopérables. buffer fournit les octets requis dans le navigateur. Le système de fichiers minimal est interne et n’exige pas IndexedDB. esbuild est utilisé uniquement à la construction ; Playwright et axe uniquement pour les tests. Aucune dépendance runtime externe. Repomix évalué mais non installé : quatre petits modules sources se consultent de façon ciblée, sans coût de contexte justifiant un export compressé. Monaco, xterm, Primer React, rrweb et driver.js ne sont pas requis par le prototype. État de maintenance à surveiller lors des mises à jour, aucune garantie de maintenance future.
