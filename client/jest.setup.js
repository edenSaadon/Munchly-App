// jest.setup.js
global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      title: 'Test Recipe',
      ingredients: ['Tomato'],
      instructions: 'Chop vegetables',
    }),
  });
  