// src/models/UserModel.js

export class UserModel {
  constructor({ uid, name, email, photoURL }) {
    this.uid = uid || null;
    this.name = name || '';
    this.email = email || '';
    this.photoURL = photoURL || '';
  }

  // אפשרות להמיר מה-Firebase User לאובייקט שלנו
  static fromFirebaseUser(firebaseUser) {
    if (!firebaseUser) return null;

    return new UserModel({
      uid: firebaseUser.uid,
      name: firebaseUser.displayName,
      email: firebaseUser.email,
      photoURL: firebaseUser.photoURL,
    });
  }
}
