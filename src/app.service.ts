import { Injectable, NotFoundException } from '@nestjs/common';

/*@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  private messages: string[] = ['Hola NestJS']

  getWelcome(): string{
    return 'Bienvenidos a NestJS'
  }

  getMessages(): string[]{
    return this.messages
  }

  addMessage(message: string): string{
    return 'Mensaje agregado correctamente'
  }*/

  export interface User {
    id: number
    name: string
    email: string
  }

  @Injectable()
  export class AppService {
    private users: User[] = [
      {id: 1, name: 'Johny', email: 'john@example.com'},
      {id: 2, name: 'Lucia', email: 'lucy@example.com'}
    ]

    //Get users
    getUsers(): User[]{
      return this.users
    }

    //GET /users/id
    getUserById(id: number): User {
      const user = this.users.find((u) => u.id === id)
      if(!user) throw new NotFoundException('User not found')
        return user
    }

    //POST /users
    createUser(name: string, email: string): User {
      const newUser: User = {
        id: this.users.length +1,
        name,
        email
      }

      this.users.push(newUser)
      return newUser
    }

    //PATCH /users/:id
    updateUser(id: number, name?: string, email?: string): User {
    const user = this.getUserById(id);

    if (name) user.name = name;
    if (email) user.email = email;

    return user;
  }

  // DELETE /users/:id
  deleteUser(id: number): string {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) throw new NotFoundException('Usuario no encontrado');

    this.users.splice(index, 1);
    return 'Usuario eliminado correctamente';
  }
}
