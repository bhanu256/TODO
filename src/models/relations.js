export class Relations {
  user;
  friend;
  status;
  isGroup;

  constructor(user, friend, status=false, isGroup=false) {
    this.user = user;
    this.friend = friend;
    this.status = status;
    this.isGroup = isGroup;
  }
}