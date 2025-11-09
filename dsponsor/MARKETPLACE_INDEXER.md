# 🏪 Marketplace Indexer Extension

## 📋 Vue d'ensemble

L'indexeur SubQuery a été étendu pour inclure les événements de la marketplace `dsponsor-market`. Cette extension permet d'indexer et de requêter toutes les activités de la marketplace en temps réel.

**✅ Statut : DÉPLOYÉ ET PRÊT**
- Contrat Marketplace : `CDSLD6CYVWNUOA6N3YPUO5364EOXRDX6BT4FGYAIAUGCEXVCGA5ANLAP`
- Indexeur : Configuré et prêt à indexer

## 🆕 Nouvelles Entités Ajoutées

### 1. **MarketplaceInit**
- **Description** : Événement d'initialisation de la marketplace
- **Champs** :
  - `admin` : Adresse de l'administrateur
  - `native_xlm` : Token natif XLM
  - `fee_bps` : Frais en basis points

### 2. **Listing**
- **Description** : NFT mis en vente à prix fixe
- **Champs** :
  - `listing_id` : ID unique du listing
  - `nft_contract` : Adresse du contrat NFT
  - `token_id` : ID du token NFT
  - `price` : Prix de vente
  - `seller` : Adresse du vendeur
  - `currency` : Devise utilisée
  - `active` : Statut actif/inactif
  - `created_at` : Timestamp de création

### 3. **ListingCancel**
- **Description** : Annulation d'un listing
- **Champs** :
  - `listing_id` : ID du listing annulé
  - `cancelled_at` : Timestamp d'annulation

### 4. **ListingSold**
- **Description** : Vente d'un listing
- **Champs** :
  - `listing_id` : ID du listing vendu
  - `buyer` : Adresse de l'acheteur
  - `sold_at` : Timestamp de vente

### 5. **Auction**
- **Description** : Enchère créée
- **Champs** :
  - `auction_id` : ID unique de l'enchère
  - `nft_contract` : Adresse du contrat NFT
  - `token_id` : ID du token NFT
  - `reserve_price` : Prix de réserve
  - `seller` : Adresse du vendeur
  - `currency` : Devise utilisée
  - `active` : Statut actif/inactif
  - `created_at` : Timestamp de création

### 6. **Bid**
- **Description** : Enchère placée
- **Champs** :
  - `auction_id` : ID de l'enchère
  - `bidder` : Adresse de l'enchérisseur
  - `amount` : Montant de l'enchère
  - `bid_at` : Timestamp de l'enchère

### 7. **AuctionSold**
- **Description** : Enchère vendue
- **Champs** :
  - `auction_id` : ID de l'enchère vendue
  - `winner` : Adresse du gagnant
  - `final_price` : Prix final
  - `sold_at` : Timestamp de vente

### 8. **AuctionNoBid**
- **Description** : Enchère sans enchère
- **Champs** :
  - `auction_id` : ID de l'enchère
  - `ended_at` : Timestamp de fin

## 🔧 Configuration

### ✅ Configuration Actuelle
L'indexeur est maintenant configuré avec l'ID réel du contrat marketplace :

```typescript
const marketplaceContractId = "CDSLD6CYVWNUOA6N3YPUO5364EOXRDX6BT4FGYAIAUGCEXVCGA5ANLAP";
```

### Déploiement
```bash
# L'indexeur est prêt à être déployé
npm run build
```

## 📊 Exemples de Requêtes GraphQL

### 1. **Tous les Listings Actifs**
```graphql
query {
  listings(filter: { active: { equalTo: true } }) {
    nodes {
      id
      listingId
      nftContract
      tokenId
      price
      seller
      currency
      createdAt
    }
  }
}
```

### 2. **Toutes les Enchères Actives**
```graphql
query {
  auctions(filter: { active: { equalTo: true } }) {
    nodes {
      id
      auctionId
      nftContract
      tokenId
      reservePrice
      seller
      currency
      createdAt
    }
  }
}
```

### 3. **Enchères pour une Enchère Spécifique**
```graphql
query {
  bids(filter: { auctionId: { equalTo: "123" } }) {
    nodes {
      id
      auctionId
      bidder
      amount
      bidAt
    }
  }
}
```

### 4. **Ventes Récentes**
```graphql
query {
  listingSolds(orderBy: SOLD_AT_DESC, first: 10) {
    nodes {
      id
      listingId
      buyer
      soldAt
    }
  }
}
```

### 5. **Statistiques de la Marketplace**
```graphql
query {
  marketplaceInits {
    nodes {
      id
      admin
      nativeXlm
      feeBps
    }
  }
  
  listings {
    totalCount
  }
  
  auctions {
    totalCount
  }
}
```

## 🚀 Déploiement

### 1. **Déploiement Local**
```bash
# Installer les dépendances
npm install

# Générer les types
npm run codegen

# Build
npm run build

# Démarrer l'indexeur
npm run start
```

### 2. **Déploiement sur SubQuery**
```bash
# Publier sur SubQuery
subql publish
```

## 🔍 Monitoring

### Logs des Événements
L'indexeur log tous les événements marketplace avec des messages informatifs :
- `Marketplace Init: [hash]`
- `Listing Created: [hash]`
- `Listing Cancelled: [hash]`
- `Listing Sold: [hash]`
- `Auction Created: [hash]`
- `Bid Placed: [hash]`
- `Auction Sold: [hash]`
- `Auction No Bid: [hash]`

### Métriques Importantes
- Nombre de listings actifs
- Nombre d'enchères actives
- Volume de transactions
- Prix moyens
- Activité des utilisateurs

## 🛠️ Maintenance

### Mise à Jour de l'ID du Contrat
Si le contrat marketplace est redéployé :
1. Mettre à jour `marketplaceContractId` dans `project.ts`
2. Régénérer les types : `npm run codegen`
3. Rebuild : `npm run build`
4. Redéployer

### Ajout de Nouveaux Événements
Pour ajouter de nouveaux événements marketplace :
1. Ajouter l'entité dans `schema.graphql`
2. Ajouter le handler dans `project.ts`
3. Implémenter le handler dans `mappingHandlers.ts`
4. Régénérer et build

## 📈 Avantages

1. **Temps Réel** : Indexation en temps réel de tous les événements marketplace
2. **Requêtes Complexes** : Support de requêtes GraphQL avancées
3. **Performance** : Indexation optimisée pour des requêtes rapides
4. **Extensibilité** : Facile d'ajouter de nouveaux événements
5. **Monitoring** : Logs détaillés pour le debugging

## 🔗 Intégration

L'indexeur peut être intégré avec :
- **Frontend dApps** : Pour afficher les listings et enchères
- **APIs** : Pour fournir des données marketplace
- **Analytics** : Pour analyser l'activité de la marketplace
- **Notifications** : Pour alerter sur les nouvelles activités

## 🎯 Prochaines Étapes

1. **Déployer l'indexeur** sur SubQuery ou localement
2. **Tester avec des transactions réelles** de la marketplace
3. **Intégrer avec le frontend** pour afficher les données
4. **Configurer des alertes** pour les nouvelles activités
