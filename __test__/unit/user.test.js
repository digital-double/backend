const { Users } = require('../../app/models');

describe('Users Model', () => {
  it('should find a user by primary key', async () => {
    const user = await Users.findByPk('test-id');
    expect(user).toBeDefined();
    expect(user.id).toBe('test-id');
    expect(user.userName).toBe('testuser');
  });

  it('should create a new user', async () => {
    const userData = {
      userName: 'newuser',
      email: 'newuser@example.com',
      password: 'password123',
    };
    const newUser = await Users.create(userData);
    expect(newUser.id).toBeDefined();
    expect(newUser.userName).toBe('newuser');
    expect(newUser.email).toBe('newuser@example.com');
  });

  it('should update a user', async () => {
    const updatedRows = await Users.update(
      { email: 'updateduser@example.com' }, // Fields to update
      { where: { id: 'test-id' } } // Condition for update
    );
    expect(updatedRows[0]).toBe(1); // 1 row updated
  });

  it('should delete a user', async () => {
    const deletedRows = await Users.destroy({ where: { id: 'test-id' } });
    expect(deletedRows).toBe(1); // 1 row deleted
  });

  it('should retrieve a user by login credentials', async () => {
    const user = await Users.findByLogin('userName', 'testuser');
    expect(user).toBeDefined();
    expect(user.userName).toBe('testuser');
    expect(user.email).toBe('testuser@example.com');
  });

  it('should throw an error when trying to create a user with duplicate credentials', async () => {
    Users.create.mockImplementationOnce(() =>
      Promise.reject(new Error('User already exists'))
    );
    await expect(
      Users.create({
        userName: 'duplicateuser',
        email: 'duplicate@example.com',
        password: 'password123',
      })
    ).rejects.toThrow('User already exists');
  });
});


