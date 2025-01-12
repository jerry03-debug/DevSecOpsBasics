import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository, // Utilisation du Repository TypeORM
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should delete a user', async () => {
    // Simuler l'objet DeleteResult retourné par TypeORM
    const deleteResult: DeleteResult = {
      raw: [], // Les résultats bruts de la suppression
      affected: 1, // Indiquer que 1 utilisateur a été affecté (supprimé)
    };

    jest.spyOn(userRepository, 'delete').mockResolvedValue(deleteResult);

    const result = await userService.delete(1);
    expect(result).toBe(true); // Suppression réussie, on attend true
  });

  it('should return false if delete fails', async () => {
    // Simuler un échec de suppression
    const deleteResult: DeleteResult = {
      raw: [], // Résultats vides si la suppression a échoué
      affected: 0, // Aucun utilisateur n'a été supprimé
    };

    jest.spyOn(userRepository, 'delete').mockResolvedValue(deleteResult);

    const result = await userService.delete(1);
    expect(result).toBe(false); // Aucun utilisateur supprimé, on attend false
  });
});
