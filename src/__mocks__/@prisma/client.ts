type JestFn = typeof jest.fn;

export class PrismaClient {
  public $connect: JestFn;
  public $on: JestFn;

  constructor() {
    this.$connect = jest.fn();
    this.$on = jest.fn();
  }
}
