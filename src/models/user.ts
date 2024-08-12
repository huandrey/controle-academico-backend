class User {
  private name: string
  private matricula: string
  private password: string;

  public constructor(name: string, matricula: string) {
    this.name = name
    this.matricula = matricula
  }

  public getName(): string {
    return this.name;
  }
}
