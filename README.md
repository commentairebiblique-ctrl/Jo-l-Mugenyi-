# Évangile Éternel — Site du Dr Joël Mugenyi

Plateforme pour **publier des livres et des enseignements bibliques**, avec :

- 📚 **Bibliothèque** : présentation de plusieurs livres (achat en ligne).
- 🎓 **Enseignements** : prédications, méditations et études bibliques.
- 💳 **Paiement sécurisé** : Mobile Money (M-Pesa Vodacom, Airtel Money), carte bancaire, virement.
- ❤️ **Dons** : soutien à l'œuvre par Mobile Money ou virement, avec montants prédéfinis ou libres.
- 🌍 **Réseaux sociaux** : liens vers YouTube, Facebook, WhatsApp, TikTok, Instagram, Telegram.

## Démarrage local

```bash
npm install
npm start
```

Le site est servi sur `http://localhost:3000`.

## Configuration des paiements (variables d'environnement)

Les paiements Mobile Money nécessitent un compte marchand officiel et des clés API.
Ajoutez ces variables dans `Render > Environment` (ou un fichier `.env`) :

**M-Pesa Vodacom**
- `MPESA_BASE_URL`
- `MPESA_API_KEY`
- `MPESA_PUBLIC_KEY`
- `MPESA_SHORTCODE`
- `MPESA_CALLBACK_URL`

**Airtel Money**
- `AIRTEL_BASE_URL`
- `AIRTEL_CLIENT_ID`
- `AIRTEL_CLIENT_SECRET`
- `AIRTEL_CALLBACK_URL`

Sans ces variables, le site fonctionne en **mode TEST** (les paiements et dons sont simulés).

## Routes API

| Route | Méthode | Rôle |
|-------|---------|------|
| `/api/payments/mpesa` | POST | Achat eBook via M-Pesa |
| `/api/payments/airtel` | POST | Achat eBook via Airtel Money |
| `/api/payments/donation` | POST | Don via Mobile Money |
| `/api/webhooks/mpesa` | POST | Callback M-Pesa |
| `/api/webhooks/airtel` | POST | Callback Airtel |

## Personnalisation

- **Livres / enseignements** : modifiez les sections `#bibliotheque` et `#enseignements` dans `index.html`.
- **Liens réseaux sociaux** : modifiez l'objet `CONFIG.socials` dans le `<script>` de `index.html`.
- **Numéros / bénéficiaire / prix** : recherchez-les dans `index.html` (ex. `45 $`, numéros Mobile Money).

## Réseaux sociaux et monétisation

Voir le guide détaillé : [`GUIDE-RESEAUX-SOCIAUX.md`](./GUIDE-RESEAUX-SOCIAUX.md).
</content>
</invoke>
