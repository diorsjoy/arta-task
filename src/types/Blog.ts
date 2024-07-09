interface IBlogPosts {
  id: number;
  title: string;
  text: string;
  createdAt: Date;
  deletedAt?: Date;
}
