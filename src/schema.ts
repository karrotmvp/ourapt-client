class Apartment {}

class User {
  karrotId: string;
  createdAt: Date;
  updatedAt: Date;
  pushAgreedAt: Date;
}

class PreopenNotificationSubscription {
  user: User;
  createdAt: Date;
  updatedAt: Date;
  justFunChecked: boolean;
  wantDemandChecked: boolean;
  wantSupplyChecked: boolean;
  regionId: string;
}

// type ArticleContent = Question | Vote
// type Article {
//     content: ArticleContent
//     comment: Comment
// }

class Question implements Article {}

class Vote implements Article {}

class Comment {
  article?: Article;
}

class AdminQuestion {}
