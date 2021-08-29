export class Product {
  constructor(
    public id: number,
    public name: string,
    public category: number,
    public sub_category: number,
    public created_on?: Date,
  ) {}
}
