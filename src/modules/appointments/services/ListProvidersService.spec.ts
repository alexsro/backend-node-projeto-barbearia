import FakeUsersRepository from 'modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from 'shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list all providers except logged user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John',
      email: 'john@example.com',
      password: '123',
    });

    const user3 = await fakeUsersRepository.create({
      name: 'John2',
      email: 'john2@example.com',
      password: '1234',
    });

    const providers = await listProviders.execute({
      user_id: user.id,
    });

    expect(providers).toEqual([user2, user3]);
  });
});
