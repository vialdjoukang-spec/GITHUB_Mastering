# État de reprise
- Objectif : prototype perdu reconstruit sur autorisation explicite ; livraison HTML autonome, audit honnête.
- Architecture : isomorphic-git + mémoire interne + Buffer, bundlés par esbuild ; quatre leçons ; Issues/PR simulées ; aucun serveur produit.
- Fichiers : src/, scripts/build.mjs, tests/audit.mjs, ATLAS.html, docs/.
- Validation : voir AUDIT_FINAL.md et evidence/audit-register.json. Tests navigateur via serveur local puis contexte hors ligne ; file:// bloqué ; Firefox indisponible.
- Hash HTML : d653fd6e13bf7eaf5f2056a5b3c88a1a6684f6a44ad6e690c72e4aef93748cec.
- Corrections : normalisation chemins, Buffer, focus défilement, avis non superposé, validation objets SHA-1, avertissement stockage.
- Ouvert : transfert inédit, couverture clavier/mobile complète, arrêt brutal navigateur, file:// sur deux moteurs.
- Prochaine tâche : lever les contraintes de test file://, puis compléter les checkpoints et contrôles restants avant extension massive.
