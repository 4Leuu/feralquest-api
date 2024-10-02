import { iUsersRepository } from "src/repositories/IUsersRepository";
import { ICreateUserDTO } from "./CreateUserDTO";
import { User } from "src/entities/User";

export class CreateUserUseCase {
    constructor(
        private usersRepository: iUsersRepository
    ) {};
    async execute(data: ICreateUserDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

        if (userAlreadyExists) {
            throw new Error('User already exists.');
        }

        const user = new User(data);

        await this.usersRepository.save(user);
    }
}