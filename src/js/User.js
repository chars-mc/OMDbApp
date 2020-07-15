export class User {
   constructor(username, password, favorites = []) {
      this.username = username;
      this.password = password   
      this.favorites = favorites;
   }
}