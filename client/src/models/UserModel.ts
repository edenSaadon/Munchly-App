import { User as FirebaseUser } from 'firebase/auth';

export class UserModel {
  uid: string | null;
  name: string;
  email: string;
  photoURL: string;

  constructor({
    uid = null,
    name = '',
    email = '',
    photoURL = '',
  }: {
    uid?: string | null;
    name?: string;
    email?: string;
    photoURL?: string;
  }) {
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.photoURL = photoURL;
  }

  // המרה מ־Firebase User ל־UserModel
  static fromFirebaseUser(firebaseUser: FirebaseUser | null): UserModel | null {
    if (!firebaseUser) return null;

    return new UserModel({
      uid: firebaseUser.uid,
      name: firebaseUser.displayName || '',
      email: firebaseUser.email || '',
      photoURL: firebaseUser.photoURL || '',
    });
  }
}
