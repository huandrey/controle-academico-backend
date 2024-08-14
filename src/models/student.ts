class Student extends User {
  private curso: string

  public constructor(name: string, matricula: string, curso: string) {
    super(name, matricula)
    this.curso = curso
  }
}
